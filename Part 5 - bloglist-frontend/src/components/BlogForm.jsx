import React,{ useState } from 'react'

const BlogForm = ({ createBlog  }) => {
  const [title , setTitle] = useState('')
  const [author , setAuthor] = useState('')
  const [url , setUrl] = useState('')

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthor = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrl = (event) => {
    setUrl(event.target.value)
  }
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title:title,
      author:author,
      url:url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <h2>blogs</h2>
      <form onSubmit = {addBlog}>
        <label htmlFor ="title"> title </label>
        <input id = "title-field" type = "text" name = "title" value = {title} onChange = {handleTitle}/>
        <br></br>
        <label htmlFor ="author"> author </label>
        <input id = "author-field" type = "text" name = "author" value = {author} onChange = {handleAuthor}/>
        <br></br>
        <label htmlFor ="url"> url </label>
        <input id = "url-field" type = "text" name = "url" value = {url} onChange = {handleUrl}/>
        <br></br>
        <button type="submit"> create </button>
      </form>
    </div>
  )
}

export default BlogForm