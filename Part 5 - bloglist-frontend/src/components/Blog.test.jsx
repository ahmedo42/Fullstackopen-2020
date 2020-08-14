import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render , fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'Capital in the 21st Century',
  author: 'Thomas Piketty',
  url: 'http://xyz.com',
  likes : 99,
  user: 'ahmed omar',
}

test('renders title and author only', () => {

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Capital in the 21st Century Thomas Piketty'
  )
})

test('displays full details when clicked', () => {

  const handleLikes = jest.fn()
  const handleDelete = jest.fn()
  const component = render(
    <Blog blog={blog} handleLikes = {handleLikes} handleDelete = {handleDelete} />
  )

  const showButton = component.getByText('view')

  fireEvent.click(showButton)

  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
  expect(component.container).toHaveTextContent(blog.url)
  expect(component.container).toHaveTextContent(`likes: ${blog.likes}`)

})

test('The like button is pressed twice' , () => {
  const mockHandler = jest.fn()
  const handleDelete = jest.fn()
  const component = render(
    <Blog blog={blog} handleLikes = {mockHandler} handleDelete = {handleDelete} />
  )
  const showButton = component.getByText('view')
  fireEvent.click(showButton)
  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})