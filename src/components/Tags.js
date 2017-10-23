import React from 'react'
import { Link } from 'react-router-dom'
import { array } from 'prop-types'
import styled from 'styled-components'

const Tags = ({ articles, tags }) => {
  return (
    <TagsDiv>
      <h2>Tags</h2>
      <ul>
        {
          tags.map((tag, index) => (
            <li key={index} className="title">
              <Link to={`/tags/${tag.name}`}>{tag.name}</Link>
            </li>
          ))
        }
      </ul>
    </TagsDiv>
  )
}

Tags.propTypes = {
  articles: array.isRequired,
  tags: array.isRequired
}

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
