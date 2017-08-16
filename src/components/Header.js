import React from 'react'
import { Link } from 'react-router-dom'
import { array } from 'prop-types'
import styled from 'styled-components'

const Header = ({ articles, search, updateSearch }) => {
  let filteredArticles = articles.filter(
    article => (
      article.title.indexOf(search) !== -1
    )
  )
  return (
    <Nav>
      <ul className="left">
        <li><Link to="/">Idiosync</Link></li>
        <li><Link to="/articles">Articles</Link></li>
        <li><Link to="/add">Add</Link></li>
      </ul>
      <div className="search">
        <input
          id="search"
          className="search__input"
          type="text"
          value={search}
          onChange={updateSearch}
        />
      </div>
      <ul className="right">
        <li><Link to="/about">About</Link></li>
        <li><Link to="/register">Sign Up</Link></li>
        <li><Link to="/login">Log In</Link></li>
      </ul>
      <div>
        <ul className="search__result">
          {filteredArticles.map(article => (
            <Link
              className="search__result--item"
              key={article.id}
              to={`/articles/${article.id}`}
              >
              <li>{ search === '' ? null : article.title }</li>
            </Link>
          ))}
        </ul>
      </div>
    </Nav>
  )
}

Header.propTypes = {
  articles: array.isRequired
}

const Nav = styled.nav `
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  padding: 1em 0;
  margin: 0 auto;
  a {
    text-decoration: none;
  }
  .left {
    justify-content: space-around;
    max-width: 20em;
  }
  .right {
    justify-content: space-around;
    max-width: 15em;
  }
  .search {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    &__result {
      position: absolute;
      top: 3em;
      left: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      &--item {
        background: white;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.05);
        padding: 0.5em;
        width: 90%;
      }
      &--active {
        background: #f1f1f1;
      }
    }
  }
  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    width: 100%;
    a {
      color: black;
      font-size: 1em;
    }
  }
`

export default Header
