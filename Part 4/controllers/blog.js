/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  console.log(authorization);
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
  const { body } = request;

  const token = getTokenFrom(request);
  console.log(token);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  if (body.title === undefined && body.url === undefined) {
    response.status(404).send('Bad Request');
  }
  const blog = new Blog({
    author: body.author === undefined ? '' : body.author,
    title: body.title === undefined ? '' : body.title,
    url: body.url === undefined ? '' : body.url,
    likes: body.author === undefined ? 0 : body.likes,
    // eslint-disable-next-line no-underscore-dangle
    user: user._id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.json(savedBlog);
});

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndDelete(request.params.id);
  if (blog) {
    response.status(204).end();
  } else {
    response.status(404).end();
  }
});

blogRouter.put('/:id', async (request, response) => {
  const { body } = request;
  let current = await Blog.findById(request.params.id);
  current = {
    title: body.title || current.title,
    author: body.author || current.author,
    likes: body.likes || current.likes,
    url: body.url || current.url,
  };
  const updated = await Blog.findByIdAndUpdate(request.params.id, current, { new: true });
  if (updated) {
    response.json(updated);
  } else {
    response.status(404).end();
  }
});

module.exports = blogRouter;
