import React, { Component } from 'react'
import { array, bool, func } from 'prop-types'
import axios from 'axios'
import styled from 'styled-components'

import AddForm from './themes/Form'
import EditForm from './themes/Form'
import NotFound from './NotFound'

const reqArticles = 'http://localhost:3000/api/v1/articles'
const reqAuthors = 'http://localhost:3000/api/v1/authors'

class Add extends Component {
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
      newAuthorSelect: false
    }
  }

  onChange = (e) => {
    this.handleButtonSettings(e)

    this.setState( {[e.target.name]: e.target.value} )
  }

  handleButtonSettings = (e) => {
    const { authors } = this.props

    if (e.target.type === 'button') {
      e.target.value = e.target.innerHTML

      authors.map(author => {
        if (author.name === e.target.innerHTML) {
          return this.setState({
            id: author.id,
            bio: author.bio
          })
        } else {
          return null
        }
      })
    }
  }

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

  postRequest = (e) => {
    e.preventDefault()
    const {  title, author, bio, content, tag_list } = this.state
    const { authors, getRequest } = this.props
    const articlesObj = {
      title,
      author,
      content,
      tag_list
    }
    const authorsObj = {
      name: author,
      bio
    }

    axios.post(reqArticles, articlesObj)
      .then(() => {
        getRequest()
      })
      .catch(err => console.log(err))

    const found = authors.some(a => a.name === authorsObj.name)
    if (!found) {
      axios.post(reqAuthors, authorsObj)
        .then(() => {
          getRequest()
        })
        .catch(err => console.log(err))
    }
    this.setState({
      title: '',
      author: '',
      bio: '',
      content: '',
      tag_list: ''
    })
  }

  putRequest = () => {
    const { author, bio, getRequest, id } = this.state
    const authorsObj = {
      name: author,
      id,
      bio
    }
    axios.put(`${reqAuthors}/${id}`, authorsObj)
      .then(() => {
        getRequest()
        console.log(authorsObj)
      })
      .catch(err => console.log(err))
  }

  toggleAuthorSelect = (e) => {
    this.setState({
      author: '',
      bio: ''
    })

    if (this.state.newAuthorSelect === false) {
      this.setState({
        newAuthorSelect: true
      })
    } else {
      this.setState({
        newAuthorSelect: false
      })
    }
  }

  render () {
    let {
      author,
      bio,
      content,
      title,
      tag_list,
      doubleClicked,
      newAuthorSelect
    } = this.state
    const { authors } = this.props

    const authorButtons = authors.map(a => (
      <button
        data-active="false"
        name="author"
        value={author}
        type="button"
        onDoubleClick={this.handleDoubleClick}
        onClick={this.onChange} key={a.id}>{a.name}
      </button>
    ))

    return (
      <AddFormWrapper>
        {this.props.authenticated === true
          ? <AddForm
              className={doubleClicked === true ? 'hidden' : 'visible'}
              onSubmit={this.postRequest}
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
              <div className="formgroup">
                <label htmlFor="tag_list"> Tags:
                  <input name="tag_list" value={tag_list} onChange={this.onChange} type="text" id="tag_list" />
                </label>
              </div>
              <div className="author formgroup">
                <label htmlFor="author">
                  <div className={newAuthorSelect === false ? 'visible' : 'hidden'}>
                    <div className="author-selection">
                      <h2>Choose Author:</h2>
                      <button type="button" onClick={this.toggleAuthorSelect}>Create New Author</button>
                    </div>
                    {authorButtons}
                  </div>
                  <div className={newAuthorSelect === true ? 'visible' : 'hidden'}>
                    <div className="author-selection">
                      <h2>New Author:</h2>
                      <button type="button" onClick={this.toggleAuthorSelect}>Back to Authors</button>
                    </div>
                    Name:
                    <input name="author" value={author} onChange={this.onChange} type="text" id="author" />
                    Bio:
                    <textarea name="bio" value={bio} onChange={this.onChange} />
                    <input type="button" className="button create-new-author" name="create" value="Create" />
                  </div>
                </label>
              </div>
              <div className={newAuthorSelect === false ? 'visible formgroup' : 'hidden'}>
                <input className="post-data button" name="submit" type="submit" value="Submit" />
              </div>
            </AddForm>
          : <NotFound />}

          <EditForm
            className={doubleClicked === true ? 'visible edit-form' : 'hidden'}
            onSubmit={this.putRequest}
            method="put"
            autoComplete="off"
          >
            <div className="formgroup edit-header">
              <h2>Edit {author}</h2>
              <div onClick={this.handleDoubleClick} className="close">X</div>
            </div>
            <div className="formgroup">
              <label htmlFor="author"> Author:
                <input name="author" value={author} onChange={this.onChange} type="text" id="author" />
              </label>
            </div>
            <div className="formgroup">
              <label htmlFor="bio">Bio:
                <textarea className="edit-bio" name="bio" value={bio} onChange={this.onChange} />
              </label>
            </div>
            <div className="formgroup">
              <input className="button" name="submit" type="submit" value="Submit" />
            </div>
          </EditForm>
      </AddFormWrapper>
    )
  }
}

const AddFormWrapper = styled.div `
  textarea {
    height: 10em;
  }
  .author-selection {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .author {
    margin-top: 5em;
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
`

Add.propType = {
  authenticated: bool.isRequired,
  authors: array.isRequired,
  getRequest: func.isRequred
}

export default Add
