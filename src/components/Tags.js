import React from 'react'
import { Link } from 'react-router-dom'
import { array } from 'prop-types'
import styled from 'styled-components'

const Tags = ({ articles, tags }) => {

  // access articles.tags to be used in tags state
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
    <TagsDiv>
      <h2>Tags</h2>
      <ul>
        {
          tags.map(tag => (
            <li key={tag.id} className="title">
              <Link to={`/tags/${tag.id}`}>{tag.name}</Link>
            </li>
          ))
        }
      </ul>
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
    </TagsDiv>
  )
}

Tags.propTypes = {
  articles: array.isRequired,
  tags: array.isRequired
}

// style
const TagsDiv = styled.div `
  background: whitesmoke;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.05);
  margin: 5em auto;
  max-width: 50em;
  width: 80%;

  ul {
    display: flex;
    justify-content: center;

    li {
      margin: 0 15px;
    }
  }
`

export default Tags
