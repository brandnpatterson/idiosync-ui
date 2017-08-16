import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SinglePost = styled.div`
  margin: 0 auto;
  width: 70%;
  header {
    display: flex;
    justify-content: space-between;
  }
  button {
    margin: 1.5em 0 0 0.5em;
  }
`
const Post = ({ post }) => {
  return (
    <SinglePost>
      <header>
        <div>
          <h2>{post.title}</h2>
          <h3>{post.author}</h3>
        </div>
        <div>
          <Link to={
            post.id === 1
            ? `/posts/8`
            : `/posts/${post.id - 1}`}
          >
            <button>Prev</button>
          </Link>
          <Link to={
            post.id === 8
            ? `/posts/1`
            : `/posts/${post.id + 1}`}
          >
            <button>Next</button>
          </Link>
        </div>
      </header>
      <p>{post.content}</p>
    </SinglePost>
  )
}


export default Post
