import React from 'react'
import { Link } from 'react-router-dom'
import { array, func, string } from 'prop-types'
import MdSearch from 'react-icons/lib/md/search'
import styled from 'styled-components'

const Search = ({ articles, search, updateSearch }) => {
  let filteredArticles = articles.filter(article => {
    return article.title.toLowerCase().indexOf(
      search.toLowerCase()) !== -1
    }
  )

  // max search results === filteredArticles.length
  filteredArticles.length = 20

  return (
    <SearchForm autoComplete="off">
      <input
        className="search__input"
        type="text"
        onChange={updateSearch}
        placeholder={search}
        search={search}
      />
      <ul className="search__result">
        {filteredArticles.map(article => (
          <Link
            className="search__result--item"
            key={article.id}
            to={`/articles/${article.id}`}
            >
            <li>{ article.title }</li>
          </Link>
        ))}
      </ul>
      <MdSearch />
    </SearchForm>
  )
}

Search.propTypes = {
  articles: array.isRequired,
  search: string.isRequired,
  updateSearch: func.isRequired
}

const SearchForm = styled.form `
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  @media (max-width: 700px) {
    margin-left: 3.2em;
  }
  .search {
    &__input {
      color: gray;
      font-size: 14px;
      height: 28px;
      border: 1px solid #eee;
    }
    &__result {
      position: absolute;
      top: 3em;
      left: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      &--item {
        background: white !important;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.05);
        padding: 0.5em;
        width: 90%;
      }
      &--active {
        background: #f1f1f1;
      }
    }
  }
`

export default Search
