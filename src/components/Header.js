import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { array } from 'prop-types'
import styled from 'styled-components'

class Header extends Component {
  constructor () {
    super()
    this.updateSearch = this.updateSearch.bind(this)
    this.state = {
      search: ''
    }
  }

  updateSearch (e) {
    this.setState({
      search: e.target.value.substr(0, 20)
    })
  }

  render () {
    console.log(this.props.articles)

    const { search } = this.state

    return (
      <Nav>
        <ul className="left">
          <li><Link to="/">Idiosync</Link></li>
          <li><Link to="/articles">Articles</Link></li>
          <li><Link to="/add">Add</Link></li>
        </ul>
        <ul className="search">
          <li>
            <label className="search-title" htmlFor="search">Search</label>
            <input
              id="search"
              type="text"
              value={search}
              onChange={this.updateSearch}
            />
        </li>
        </ul>
        <ul className="right">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/register">Sign Up</Link></li>
          <li><Link to="/login">Log In</Link></li>
        </ul>
      </Nav>
    )
  }
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
  .left {
    justify-content: space-around;
    max-width: 20em;
  }
  .right {
    justify-content: space-around;
    max-width: 15em;
  }
  .search-title {
    margin-right: 0.5em;
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
