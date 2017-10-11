import React, { Component } from 'react'
import { array, bool, func } from 'prop-types'
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
      author: '',
      author_id: '',
      tag_list: ''
    }
  }

  onChange = (e) => {
    if (e.target.dataset.active === 'false') {
      this.handleActiveButton(e)
      e.target.dataset.active = 'true'
    }
    this.handleAuthors(e)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleActiveButton = (e) => {
    const buttonContainer = e.target.parentNode
    const buttonChildren = buttonContainer.children

    for (let i = 0; i < buttonChildren.length; i++) {
      if (buttonChildren[i].dataset.active === 'true') {
        buttonChildren[i].dataset.active = 'false'
      }
    }
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

  handleAuthors = (e) => {
    const { authors } = this.props

    if (e.target.type === 'button') {
      e.target.value = e.target.innerHTML

      authors.map(author => {
        if (author.name === e.target.innerHTML) {
          return this.setState({
            author_id: author.id,
            bio: author.bio
          })
        } else {
          return null
        }
      })
    }
  }

  render () {
    let {
      title,
      content,
      author,
      tag_list
    } = this.state
    const { authors } = this.props

    const authorButtons = authors.map(a => (
      <div className="author-button"
        onClick={this.onChange}
        key={a.id}
        >
        <button
          data-active="false"
          name="author"
          value={author}
          type="button"
        >
          {a.name}
        </button>
        <MdEdit />
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
                <input name="title" value={title} onChange={this.onChange} type="text" id="title" autoFocus />
              </label>
            </div>
            <div className="formgroup">
              <label htmlFor="content"> Content:
                <textarea name="content" value={content} onChange={this.onChange} id="content" />
              </label>
            </div>
            <div className="tag_list formgroup">
              <label htmlFor="tag_list"> Tags: (Seperate with commas)
                <input name="tag_list" value={tag_list} onChange={this.onChange} type="text" id="tag_list" />
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
              <input className="post-data button" name="create-article" type="submit" value="Submit" />
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
  textarea {
    height: 10em;
  }
  .form-group {
    margin: 20px 0;
  }
  button[data-active='true'] {
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
        cursor: pointer;
        margin: 14px;
      }
    }
  }
`

export default NewArticle
