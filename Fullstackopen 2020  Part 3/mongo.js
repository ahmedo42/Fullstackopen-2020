const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const url =
  `mongodb+srv://ahmed42:${password}@cluster0.ke6jo.mongodb.net/phonebook?retryWrites=true&w=majority  `

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const phoneBook = mongoose.model('phoneBook', phoneBookSchema)

if(process.argv.length == 3){
  phoneBook.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}
const person = new phoneBook({
  name: process.argv[3],
  number: process.argv[4],
})

person
  .save()
  .then((result) => {
    console.log(`added ${result.name} to phonebook`);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error(err);
  });