import React from 'react'
import { Link } from 'react-router-dom'
import { array, func, string } from 'prop-types'
import styled from 'styled-components'
import Search from './Search'

const Header = ({ articles, search, updateSearch }) => {
  return (
    <Nav>
      <ul className="left">
        <li><Link to="/">Idiosync</Link></li>
        <li><Link to="/articles">Articles</Link></li>
        <li><Link to="/add">Add</Link></li>
      </ul>
      <Search className="search" articles={articles} search={search} updateSearch={updateSearch} />
      <ul className="right">
        <li><Link to="/about">About</Link></li>
        <li><Link to="/register">Sign Up</Link></li>
        <li><Link to="/login">Log In</Link></li>
      </ul>
    </Nav>
  )
}

Header.propTypes = {
  articles: array.isRequired,
  search: string.isRequired,
  updateSearch: func.isRequired
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
  .left,
  .right {
    @media (max-width: 700px) {
      background: white;
      display: none;
    }
  }
  .left {
    justify-content: space-around;
    max-width: 20em;
  }
  .right {
    justify-content: space-around;
    max-width: 15em;
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
