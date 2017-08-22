import React from 'react'
import { Link } from 'react-router-dom'
import { array, func, string } from 'prop-types'
import styled from 'styled-components'
import SearchBar from './SearchBar'

const Header = ({ authenticated, filteredArticles, search, updateSearch }) => {
  return (
    <Nav>
      <ul className="left">
        <li><Link to="/">Idiosync</Link></li>
        <li><Link to="/articles">Articles</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/login">Log In</Link></li>
      </ul>
      <ul className="right">
        <li><SearchBar
              filteredArticles={filteredArticles}
              search={search}
              updateSearch={updateSearch}
            />
        </li>
      </ul>
      {
        authenticated === true
        ? <ul className="right">
            <li><Link to="/add">Add</Link></li>
          </ul>
        : null
      }
    </Nav>
  )
}

Header.propTypes = {
  filteredArticles: array.isRequired,
  search: string.isRequired,
  updateSearch: func.isRequired,
}

const Nav = styled.nav `
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-around;
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
