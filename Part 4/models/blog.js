/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const obj = returnedObject;
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});
module.exports = mongoose.model('Blog', blogSchema);
