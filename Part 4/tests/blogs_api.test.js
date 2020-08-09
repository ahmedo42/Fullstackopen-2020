const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');
const { initialBlogs } = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  jest.setTimeout(30000);
  await Blog.deleteMany({});
  helper.initialBlogs.forEach(async (blog) => {
    const BlogObject = new Blog(blog);
    await BlogObject.save();
  });
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('blogs are actually submitted to the database', async () => {
  const newBlog = {
    title: 'U.S Elections',
    Author: 'Barack Obama',
    url: 'http://xyz.com',
    likes: 8,
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogs = await helper.notesInDb();

  expect(blogs).toHaveLength(initialBlogs.length + 1);
});

test('blogs with empty likes field default to zero', async () => {
  const emptyLikes = {
    title: 'U.S Elections',
    author: 'Donald Trump',
    url: 'http://xyz.com',
  };
  const res = await api
    .post('/api/blogs')
    .send(emptyLikes)
    .expect(200);
  expect(res.body.likes).toBe(0);
});

test('blogs with empty url and title get 404 bad request', async () => {
  const badBlog = {
    author: 'Donald Trump',
    likes: 2,
  };
  await api
    .post('/api/blogs')
    .send(badBlog)
    .expect(404);
});

afterAll(() => {
  mongoose.connection.close();
});
