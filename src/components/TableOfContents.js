import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Contents = styled.div `
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
const TableOfContents = ({ lorem, prose }) => {
  return (
    <Contents>
      <div className="outer">
        <h2 className="title">Idiosync</h2>
        <div className="inner">
          <h2>Prose</h2>
          <hr />
          {
            prose.map(item => (
              <ul key={item.id}>
                <li className="author">
                  {item.username}
                </li>
                <li className="title">
                  <Link to={`/posts/${item.id}`}>{item.title}</Link>
                </li>
              </ul>
            ))
          }
        </div>
        <div className="inner">
          <h2>Lorem</h2>
          <hr />
          {
            lorem.map(item => (
              <ul key={item.id}>
                <li className="author">
                  {item.username}
                </li>
                <li className="title">
                  <Link to={`/posts/${item.id}`}>{item.title}</Link>
                </li>
              </ul>
            ))
          }
        </div>
      </div>
    </Contents>
  )
}

export default TableOfContents
