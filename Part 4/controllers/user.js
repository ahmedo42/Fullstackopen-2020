const bcryptjs = require('bcryptjs');
const userRouter = require('express').Router();
const User = require('../models/user');

userRouter.post('/', async (request, response) => {
  const { body } = request;
  if (body.username === undefined || body.password === undefined || body.name === undefined) {
    response.status(404).send('a field is missing');
  }
  const saltRounds = 10;
  const passwordHash = await bcryptjs.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs');
  response.json(users);
});

module.exports = userRouter;
