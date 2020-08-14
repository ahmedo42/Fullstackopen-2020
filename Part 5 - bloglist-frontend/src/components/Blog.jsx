import React ,{ useState }  from 'react'
const Blog  = ({ blog , handleLikes, handleDelete , user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [showDetails , setShowDetails] = useState(false)

  const handleView = () => {
    setShowDetails(!showDetails)
  }
  if (!showDetails){
    return(
      <div className='blog' style = {blogStyle}>
        {blog.title} {blog.author}
        <button onClick={handleView}>view</button>
      </div>
    )
  }
  else{
    return (
      <div className='blog' style = {blogStyle}>
        {blog.title} {blog.author}
        <button onClick={handleView}>hide</button>
        <p>{blog.url}</p>
        <span className = "likes">likes: {blog.likes} </span>
        <button onClick = {handleLikes} title = {blog.id}>Like Blog</button>
        <br></br>
        <p>{user}</p>
        <button onClick = {handleDelete} title = {blog.id}>Delete</button>
      </div>
    )
  }
}
export default Blog
