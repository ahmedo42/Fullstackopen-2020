import React, { useState, useEffect,useRef } from 'react'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Message from './components/Message'
import BlogService from './services/blogs'
import LoginService from './services/login'
import './App.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message , setMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const formRef = useRef()

  useEffect(() => {
    BlogService.getAll().then(initialBlogs =>
      setBlogs( initialBlogs.sort((a,b) => a.likes > b.likes) ))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      BlogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await LoginService.login({
        username , password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      BlogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('logged in!')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    } catch(exception){
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    setMessage('logged Out!')
    setTimeout(() => {
      setMessage('')
    }, 5000)
    setUser(null)
    window.localStorage.clear()
  }

  const addBlog = async (blogObject) => {
    formRef.current.toggleVisibility()
    try {
      const reutrnedBlog = await BlogService.create(blogObject)
      setBlogs(blogs.concat(reutrnedBlog))
      setMessage('created a Blog!')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }catch(exception){
      console.log(exception)
    }
  }

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleLikes = async (event) => {
    event.preventDefault()
    const id = event.target.title
    console.log(id)
    const toUpdate = blogs.find(blog => blog.id === id)
    const newBlog = {
      ...toUpdate,
      likes: toUpdate.likes + 1,
    }
    try{
      const returnedBlog = await BlogService.update(id,newBlog)
      setBlogs(blogs.map(blog => (blog.id !== id ? blog : returnedBlog)))

    }
    catch(exception){
      console.log(exception)
    }
  }
  const handleDelete = async (event) => {
    event.preventDefault()
    const id  = event.target.title
    const toDelete = blogs.find(blog => blog.id === id)
    try{
      // eslint-disable-next-line
      const done = await BlogService.remove(id,toDelete)
      setBlogs(blogs.filter(blog => (blog.id !== id)))
    }catch(exception){
      console.log(exception)
    }
  }
  if( user === null){
    return(
      <div>
        <Message message = {message}/>
        <Togglable buttonLabel = "login">
          <LoginForm username = {username} password = {password}
            handleUsername = {handleUsername} handlePassword = {handlePassword} handleLogin = {handleLogin}/>
        </Togglable>
      </div>
    )
  }
  else{
    return (
      <div>
        <Message message = {message}/>
        <h2>Create Blog</h2>
        <form onSubmit = {handleLogOut}>
          {user.username} is logged in
          <button type = "submit"> logout </button>
        </form>
        <Togglable buttonLabel = "new blog" ref = {formRef}>
          <BlogForm createBlog = {addBlog}/>
        </Togglable>
        {blogs.map((blog,index) =>
          <Blog key={index} blog={blog} handleLikes = {handleLikes} handleDelete = {handleDelete} user = {user.name}/>
        )}
      </div>
    )
  }
}

export default App