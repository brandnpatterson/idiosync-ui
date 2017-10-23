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
      tag_list: ''
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
      tag_list: this.state.tag_list
    }
    axios.post(req, articleObj)
      .then(() => {
        this.props.getRequest()
      })
      .catch(err => console.log(err))
    this.setState({
      title: '',
      content: '',
      author_id: '',
      tag_list: ''
    })
  }

  setActiveTab = (id) => {
    this.setState({
      author_id: id
    })
  }

  render () {
    const {
      title,
      content,
      author_id,
      tag_list
    } = this.state
    const { authors } = this.props

    const authorButtons = authors.map((a, index) => (
      <div className="author-button"
        data-active="false"
        key={index}
        >
        <button
          onClick={() => this.setActiveTab(a.id)}
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

    return (
      <NewArticleWrapper>
        {this.props.authenticated === true
        ? <NewArticleForm
            onSubmit={this.postArticle}
            method="post"
            autoComplete="off"
          >
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
            <div className="tag_list formgroup">
              <label htmlFor="tag_list"> Tags: (Seperate with commas)
                <input name="tag_list" value={tag_list} onChange={this.onChange} type="text" />
              </label>
            </div>
            <div className="formgroup">
              <label htmlFor="chooseAuthor">
                <div>
                  <h2>Choose Author:</h2>
                  <div className="authors-button-wrapper">
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
  .authors-button-wrapper {
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
`

export default NewArticle
