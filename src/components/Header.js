import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { array } from 'prop-types'
import styled from 'styled-components'

class Header extends Component {
  constructor () {
    super()
    this.updateSearch = this.updateSearch.bind(this)
    this.state = {
      search: 'Search'
    }
  }

  updateSearch (e) {
    this.setState({
      search: e.target.value.substr(0, 20)
    })
  }

  render () {
    const { search } = this.state

    let filteredArticles = this.props.articles.filter(
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
          <ul>
            {filteredArticles.map(article => (
              <li className="search__results" key={article.id}>
                {
                  search === ''
                  ? null
                  : article.title
                }
              </li>
            ))}
          </ul>
          <input
            id="search"
            className="search__input"
            type="text"
            value={search}
            onChange={this.updateSearch}
          />
        </div>
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
  .search {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    &__results {
      display: block;
      flex-direction: column;
      width: 200px;
      background: white;
      position: relative;
      top: 3em;
      box-shadow: 0 0 10px rgba(0,0,0,0.2);
      z-index: 5;
      left: 0;
    }
    &__result {
      padding: 10px;
      display: block;
      border-bottom: 1px solid #ececec;
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
