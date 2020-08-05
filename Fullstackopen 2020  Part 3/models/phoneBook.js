require('dotenv').config()
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI
console.log(url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phoneBookSchema = new mongoose.Schema({
  name: {
    type:String,
    unique : true,
    minlength : 3
  },
  number: {
    type:String,
    minlength : 8
  },
})

phoneBookSchema.plugin(uniqueValidator);

phoneBookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('phoneBook', phoneBookSchema)
