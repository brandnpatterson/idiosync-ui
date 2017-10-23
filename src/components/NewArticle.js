import React, { Component } from 'react'
import { array, bool, func } from 'prop-types'
import { Link } from 'react-router-dom'
import MdEdit from 'react-icons/lib/md/edit'
import axios from 'axios'
import styled from 'styled-components'

import NewArticleForm from './themes/Form'
import NotFound from './NotFound'

const req = 'http://localhost:3000/api/v1/articles'

class NewArticle extends Component {
  constructor () {
    super()
    this.state = {
      title: '',
      content: '',
      author_id: '',
      tag_list: '',
      new_article: false
    }
  }

  componentWillMount () {
    this.props.getRequest()
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  postArticle = (e) => {
    e.preventDefault()
    const articleObj = {
      title: this.state.title,
      content: this.state.content,
      author_id: this.state.author_id,
      tag_list: this.state.tag_list,
      new_article: this.state.new_article
    }
    axios.post(req, articleObj)
      .then(() => {
        this.setState({
          title: '',
          content: '',
          author_id: '',
          tag_list: '',
          new_article: true
        })
      })
      .then(() => {
        this.props.getRequest()
        window.scrollTo(0, 0)
      })
      .catch(err => console.log(err))
  }

  setActiveAuthor = (id) => {
    this.setState({
      author_id: id
    })
  }

  setActiveTags = (e) => {
    let data = e.target.dataset
    data.active === 'false' ? data.active = 'true' : data.active = 'false'
    e.target.classList.add('active')
    this.setState({
      tag_list: `${this.state.tag_list} ${e.target.value}, `
    })
  }

  render () {
    const {
      title,
      content,
      author_id,
      tag_list,
      new_article
    } = this.state
    const { authors, tags, deleted_author } = this.props

    const authorButtons = authors
      .sort((a, b) => {
        const aUpper = a.name.toUpperCase()
        const bUpper = b.name.toUpperCase()

        if (aUpper < bUpper) return -1
        if (aUpper > bUpper) return 1
        return 0
      })
      .map((a, index) => (
        <div className="author-button"
          key={index}
          >
          <button
            onClick={() => this.setActiveAuthor(a.id)}
            className={author_id === a.id ? 'active' : ''}
            name="author"
            value={a.name}
            type="button"
          >
            {a.name}
          </button>
          <Link to={`authors/edit/${a.id}`}>
            <MdEdit />
          </Link>
        </div>
    ))

    const tagsButtons = tags
      .sort((a, b) => {
        const aUpper = a.name.toUpperCase()
        const bUpper = b.name.toUpperCase()

        if (aUpper < bUpper) return -1
        if (aUpper > bUpper) return 1
        return 0
      })
      .map((t, index) => (
        <div className="tag-button"
          key={index}
          >
          <button
            data-active="false"
            onClick={this.setActiveTags}
            name="author"
            value={t.name}
            type="button"
          >
            {t.name}
          </button>
        </div>
    ))

    return (
      <NewArticleWrapper>
        {this.props.authenticated === true
        ? <NewArticleForm
            onSubmit={this.postArticle}
            method="post"
            autoComplete="off"
          >
            {new_article && (
              <div>Article created successfully!</div>
            )}
            {deleted_author && (
              <div>Author deleted successfully!</div>
            )}
            <div className="formgroup">
              <h2>New Article</h2>
            </div>
            <div className="formgroup">
              <label htmlFor="title"> Title:
                <input name="title" value={title} onChange={this.onChange} type="text" autoFocus />
              </label>
            </div>
            <div className="formgroup">
              <label htmlFor="content"> Content:
                <textarea name="content" value={content} onChange={this.onChange} />
              </label>
            </div>
            <div className="formgroup">
              <label htmlFor="chooseTags">
                <div>
                  <h2>Choose Tags:</h2>
                  <div className="tag-buttons-wrapper">
                    {tagsButtons}
                  </div>
                </div>
              </label>
            </div>
            <div className="tag_list formgroup">
              <label htmlFor="tag_list"> Tags: (Seperate with commas)
                <input name="tag_list" value={tag_list} onChange={this.onChange} type="text" />
              </label>
            </div>
            <div className="formgroup">
              <label htmlFor="chooseAuthor">
                <div>
                  <h2>Choose Author:</h2>
                  <div className="author-buttons-wrapper">
                    {authorButtons}
                  </div>
                </div>
              </label>
            </div>
            <div className="formgroup">
              <input className="post-data button" name="create-article" type="submit" value="Create Article" />
            </div>
          </NewArticleForm>
        : <NotFound />}
      </NewArticleWrapper>
    )
  }
}

NewArticle.propType = {
  articles: array.isRequired,
  authenticated: bool.isRequired,
  authors: array.isRequired,
  getRequest: func.isRequred
}

const NewArticleWrapper = styled.div `
  .hidden {
    display: none;
  }
  .visible {
    display: block;
  }
  textarea {
    height: 10em;
  }
  .form-group {
    margin: 20px 0;
  }
  .active {
    border-color: green;
  }
  .author-buttons-wrapper {
    .author-button {
      border: 1px solid whitesmoke;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20px 0;
      button {
        margin: 1em;
      }
      svg {
        color: gray;
        margin: 14px;
      }
    }
  }
  .tag-buttons-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    margin: 0 auto;
    .tag-button {
      margin: 1em 1.5em 0 0;
    }
  }
`

export default NewArticle
