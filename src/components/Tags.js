import React from 'react'
import { Link } from 'react-router-dom'
import { array } from 'prop-types'
import styled from 'styled-components'

const Tags = ({ articles, tags }) => {

  articles.map(article => {
    return article.tags.filter(tag => {

      // article.tag => tags
      tags.push(tag)

      // reduce
      const reducedTags = tags.reduce((first, second) => {
        // if the next object's id is not found in the output array
        if (!first.some((el) => {
          return el.id === second.id;
        }))
        // push the object into the output array
        first.push(second)
        return first
      }, [])
      tags = reducedTags
      return tags
    })
  })

  return (
    <TableOfContents>
      <div className="outer">
        <h2 className="title">Idiosync</h2>
        <div className="inner">
          <h2>Articles</h2>
          <hr />
          {
            tags.map(tag => (
              <ul key={tag.id}>
                <li className="title">
                  <Link to={`/tags/${tag.id}`}>{tag.name}</Link>
                </li>
              </ul>
            ))
          }
        </div>
      </div>
    </TableOfContents>
  )
}

Tags.propTypes = {
  articles: array.isRequired
}

// style
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

export default Tags
