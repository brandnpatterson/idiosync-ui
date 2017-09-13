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
      doubleClicked: false,
      tag_list: ''
    }
  }

  onChange = (e) => {
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
    this.setState( {[e.target.name]: e.target.value} )
  }

  toggleDoubleClick = () => {
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

  render () {
    let { author, bio, content, title, tag_list, doubleClicked } = this.state
    const { authors } = this.props

    console.log(this.state)

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
                <label htmlFor="author"> Author:
                  {
                    authors.map(a => (
                      <button name="author" value={author} type="button" onDoubleClick={this.toggleDoubleClick} onClick={this.onChange} key={a.id}>{a.name}</button>
                    ))
                  }
                  <h2>New Author:</h2>
                  Name:
                  <input name="author" value={author} onChange={this.onChange} type="text" id="author" />
                  Bio:
                  <textarea name="bio" value={bio} onChange={this.onChange} />
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
              <div className="formgroup">
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
              <div onClick={this.toggleDoubleClick} className="close">X</div>
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
