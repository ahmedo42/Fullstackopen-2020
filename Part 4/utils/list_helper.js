// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((a, b) => a + b.likes, 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  return blogs.reduce((max, blog) => (max.likes > blog.likes ? max : blog));
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
