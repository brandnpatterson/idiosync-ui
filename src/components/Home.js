import React from 'react'
import { Link } from 'react-router-dom'
import { array } from 'prop-types'
import styled from 'styled-components'

const Home = ({ articles }) => {
  return (
    <TableOfContents>
      <div className="outer">
        <h2 className="title">Idiosync</h2>
        <div className="inner">
          <h2>Articles</h2>
          <hr />
          {
            articles.map(article => (
              <ul key={article.id}>
                <li className="author">
                  {article.author}
                </li>
                <li className="title">
                  <Link to={`/articles/${article.id}`}>{article.title}</Link>
                </li>
              </ul>
            ))
          }
        </div>
      </div>
    </TableOfContents>
  )
}

Home.propTypes = {
  articles: array.isRequired
}

const TableOfContents = styled.div `
  background: whitesmoke;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.05);
  margin: 5em auto;
  max-width: 50em;
  width: 80%;
  .outer {
    padding: 2em 0;
    h2.title {
      font-size: 2.3em;
      text-align: center;
    }
    .inner {
      margin: 5em auto;
      max-width: 30em;
      width: 80%;
      h2,
      hr {
        margin: 0;
      }
      ul {
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding: 0;
        li {
          margin: 0 1em;
          width: 100%;
        }
        .author {
          text-align: right;
        }
        .title {
          font-style: italic;
          text-align: left;
        }
      }
    }
  }
`

export default Home