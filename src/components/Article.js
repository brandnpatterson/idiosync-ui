import React from 'react'
import { Link } from 'react-router-dom'
import { array, object } from 'prop-types'
import styled from 'styled-components'

const Article = ({ article, articles }) => {
  const total = articles.length

  const tags = article.tags

  return (
    <ArticleWrapper>
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
      <ul>
        {
          tags.map(tag => {
            return <Link className="tags" key={tag.id} to={`/tags/${tag.name}`}><li>{tag.name}</li></Link>
          })
        }
      </ul>
    </ArticleWrapper>
  )
}

Article.propTypes = {
  article: object,
  articles: array.isRequired
}

// style
const ArticleWrapper = styled.div`
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

export default Article
