import React from 'react'
// import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Tag = ({ articles }) => {

  console.log(articles)

  return (
    <Div>
      {
        articles.map(article => {
          return <h2>{article.id}</h2>
        })
      }
    </Div>
  )
}

// style
const Div = styled.div`
  margin: 0 auto;
  width: 70%;
  header {
    display: flex;
    justify-content: space-between;
  }
  button {
    margin: 1.5em 0 0 0.5em;
  }
  .tags {
    color: blue;
  }
`

export default Tag
