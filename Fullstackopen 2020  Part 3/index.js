/* eslint-disable no-unused-vars */

require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const phoneBook = require('./models/phoneBook')
const { request, response } = require('express')
app.use(express.json())


morgan.token('data', (request, response) => {
  const { body } = request
  
  return JSON.stringify(body)
})

app.use(
  morgan(':method :url :status :res[content-length]  :response-time ms :data'),
)


app.use(express.static('build'))
app.use(cors())

app.get('/api/persons', (request, response) => {
  phoneBook.find({}).then(persons => {
    response.json(persons)})
})



app.get('/api/persons/:id', (request, response,next) => {
  phoneBook.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
  phoneBook.estimatedDocumentCount({})
    .then((count) => {
      const message =
        `<p>Phonebook has info for ${count} people</p>` +
        `<p>${new Date()}</p>`
      response.send(message)
    })
})

app.delete('/api/persons/:id', (request, response,next) => {
  phoneBook.findByIdAndDelete(request.params.id)
    .then((deletedPerson) => {
      if(deletedPerson){
        response.status(204).end()
      }
      else{
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response , next) => {
  const body = request.body
  if(!body.name){
    return response.status(400).json({ 
      error: 'name is missing' 
    })
  }
  if(!body.number){
    return response.status(400).json({ 
      error: 'number is missing' 
    })
  }
  const person = new phoneBook ({
    name: body.name,
    number: body.number,
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error) )
})
  
app.put('/api/persons/:id',(request,response,next) =>{
  const body = request.body
  const person = {
    name : body.name,
    number : body.number
  }
  phoneBook.findByIdAndUpdate(request.params.id , person)
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownRoute = (request, response) => {
  response.status(404).end()
}
  
app.use(unknownRoute)
const PORT = process.env.PORT || 3001

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } 
  next(error)
}

app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})