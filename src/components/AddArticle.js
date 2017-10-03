import React, { Component } from 'react'
import { array, bool, func } from 'prop-types'
import axios from 'axios'
import styled from 'styled-components'

import CreateArticle from './themes/Form'
import CreateAuthor from './themes/Form'
import DeleteAuthor from './themes/Form'
import EditAuthor from './themes/Form'
import NotFound from './NotFound'

const reqArticles = 'http://localhost:3000/api/v1/articles'
const reqAuthors = 'http://localhost:3000/api/v1/authors'

class AddArticle extends Component {
  constructor () {
    super()
    this.state = {
      title: '',
      id: '',
      author: '',
      bio: '',
      content: '',
      tag_list: '',
      doubleClicked: false,
      newAuthor: false
    }
  }

  onChange = (e) => {
    if (e.target.dataset.active === 'false') {
      this.handleActiveButton(e)
      e.target.dataset.active = 'true'
    }
    // this.shareActiveButtonWithInput(e)
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

  // shareActiveButtonWithInput = (e) => {
  //   const { authors } = this.props
  //
  //   if (e.target.type === 'button') {
  //     e.target.value = e.target.innerHTML
  //
  //     authors.map(author => {
  //       if (author.name === e.target.innerHTML) {
  //         return this.setState({
  //           id: author.id,
  //           bio: author.bio
  //         })
  //       } else {
  //         return null
  //       }
  //     })
  //   }
  // }

  handleDoubleClick = () => {
    if (this.state.doubleClicked === false) {
      this.setState({
        doubleClicked: true
      })
    } else {
      this.setState({
        doubleClicked: false
      })
    }
  }

  toggleNewAuthor = (e) => {
    this.setState({
      newAuthor: true,
      author: ''
    })

    this.handleActiveButton(e)
  }

  postArticle = (e) => {
    e.preventDefault()
    const {
      author,
      content,
      tag_list,
      title
    } = this.state

    const {
      getRequest
    } = this.props

    const articlesObj = {
      title,
      author,
      content,
      tag_list
    }

    axios.post(reqArticles, articlesObj)
      .then(() => {
        getRequest()
      })
      .catch(err => console.log(err))

    this.setState({
      title: '',
      author: '',
      bio: '',
      content: '',
      tag_list: ''
    })
  }

  postAuthor = (e) => {
    e.preventDefault()
    const {
      author,
      bio
    } = this.state

    const {
      getRequest
    } = this.props

    const authorsObj = {
      name: author,
      bio
    }

    axios.post(reqAuthors, authorsObj)
      .then(() => {
        getRequest()
      })
      .catch(err => console.log(err))

    this.setState({
      author: '',
      bio: ''
    })
  }

  editAuthor = () => {
    const {
      author,
      bio,
      getRequest,
      id
    } = this.state
    const authorsObj = {
      name: author,
      id,
      bio
    }
    axios.put(`${reqAuthors}/${id}`, authorsObj)
      .then(() => {
        getRequest()
      })
      .catch(err => console.log(err))
  }

  deleteAuthor = () => {
    const {
      getRequest,
      id
    } = this.state

    axios.delete(`${reqAuthors}/${id}`)
      .then(() => {
        getRequest()
      })
      .catch(err => console.log(err))
  }

  render () {
    let {
      author,
      bio,
      content,
      newAuthor,
      title,
      tag_list,
      doubleClicked
    } = this.state
    const { authors } = this.props
    console.log(authors)

    const authorButtons = authors.map(a => (
      <button
        data-active="false"
        name="author"
        value={author}
        type="button"
        onDoubleClick={this.handleDoubleClick}
        onClick={this.onChange} key={a.id}
      >
        {a.name}
      </button>
    ))

    return (
      <CreateArticleWrapper>
        {this.props.authenticated === true
          /* Create Article */
        ? <CreateArticle
            className={ doubleClicked === true ? 'hidden' : 'visible' && newAuthor === false ? 'visible' : 'hidden' }
            onSubmit={this.postArticle}
            method="post"
            autoComplete="off"
          >
            <div className="formgroup">
              <h2>Add Article</h2>
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
            <div className="tags formgroup">
              <label htmlFor="tag_list"> Tags: (Seperate with commas)
                <input name="tag_list" value={tag_list} onChange={this.onChange} type="text" id="tag_list" />
              </label>
            </div>
            <div className="chooseAuthor formgroup">
              <label htmlFor="chooseAuthor">
                <div>
                  <h2>Choose Author:</h2>
                  <button onClick={this.toggleNewAuthor} type="button">New Author</button>
                  {authorButtons}
                </div>
              </label>
            </div>
            <div className="formgroup">
              <input className="post-data button" name="submit" type="submit" value="Submit" />
            </div>
          </CreateArticle>
        : <NotFound />}

        {/* Create Author */}
        <CreateAuthor
          className={ newAuthor === false ? 'hidden' : 'visible' }
          onSubmit={this.postAuthor}
          method="post"
          autoComplete="off"
        >
          <div className="formgroup">
            <h2>New Author</h2>
          </div>
          <div className="formgroup">
            <label htmlFor="create-author"> Name:
              <input name="author" value={author} onChange={this.onChange} type="text" id="create-author" />
            </label>
            <label htmlFor="bio"> Bio:
              <textarea name="bio" value={bio} onChange={this.onChange} id="bio" />
            </label>
          </div>
          <div className="formgroup">
            <input className="button" name="submit" type="submit" value="Submit" />
          </div>
        </CreateAuthor>

        {/* Edit Author */}
        <EditAuthor
          className={doubleClicked === true ? 'visible edit-form' : 'hidden'}
          onSubmit={this.editAuthor}
          method="put"
          autoComplete="off"
        >
          <div className="formgroup edit-header">
            <h2>Edit {author}</h2>
            <div onClick={this.handleDoubleClick} className="close">X</div>
          </div>
          <div className="formgroup">
            <label htmlFor="edit-author"> Author:
              <input name="author" value={author} onChange={this.onChange} type="text" id="edit-author" />
            </label>
          </div>
          <div className="formgroup">
            <label htmlFor="edit-bio"> Bio:
              <textarea className="edit-bio" name="bio" value={bio} onChange={this.onChange} />
            </label>
          </div>
          <div className="formgroup">
            <input className="button" name="edit-submit" type="submit" value="Submit" />
          </div>
        </EditAuthor>

        {/* Delete Author */}
        <DeleteAuthor
          className={doubleClicked === true ? 'visible edit-form' : 'hidden'}
          onSubmit={this.deleteAuthor}
          method="delete"
        >
          <div className="formgroup">
            <input className="button button-delete" name="author-delete" type="submit" value="Delete" />
          </div>
        </DeleteAuthor>
      </CreateArticleWrapper>
    )
  }
}

const CreateArticleWrapper = styled.div `
  textarea {
    height: 10em;
  }
  .chooseAuthor,
  .tags {
    button {
      margin: 1%;
    }
  }
  .active {
    color: blue;
  }
  .hidden {
    display: none;
  }
  .visible {
    display: block;
  }
  .form-group {
    margin: 20px 0;
  }
  .edit-header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .close {
      cursor: pointer;
    }
  }
  .edit-bio {
    width: 100%;
    height: 10em;
  }
  button[data-active='true'] {
    border-color: green;
  }
`

AddArticle.propType = {
  authenticated: bool.isRequired,
  authors: array.isRequired,
  getRequest: func.isRequred
}

export default AddArticle
