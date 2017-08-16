import React from 'react'
import { Link } from 'react-router-dom'
import { array, object } from 'prop-types'
import styled from 'styled-components'

const Article = ({ article, articles }) => {
  const total = articles.length

  return (
    <Wrapper>
      <header>
        <div>
          <h2>{article.title}</h2>
          <h3>{article.author}</h3>
        </div>
        <div>
          <Link to={
            article.id === 1
            ? `/articles/${total}`
            : `/articles/${article.id - 1}`}
          >
            <button>Prev</button>
          </Link>
          <Link to={
            article.id === total
            ? `/articles/1`
            : `/articles/${article.id + 1}`}
          >
            <button>Next</button>
          </Link>
        </div>
      </header>
      <p>{article.content}</p>
    </Wrapper>
  )
}

Article.propTypes = {
  article: object.isRequired,
  articles: array.isRequired
}


const Wrapper = styled.div`
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

export default Article
