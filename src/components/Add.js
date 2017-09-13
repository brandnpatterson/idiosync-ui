import React, { Component } from 'react'
import { array, bool, func } from 'prop-types'
import axios from 'axios'

import AddForm from './themes/Form'
import NotFound from './NotFound'

const reqArticles = 'http://localhost:3000/api/v1/articles'
const reqAuthors = 'http://localhost:3000/api/v1/authors'

class Add extends Component {
  constructor () {
    super()
    this.state = {
      title: '',
      author: '',
      bio: '',
      content: '',
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
            bio: author.bio
          })
        } else {
          return null
        }
      })
    }
    this.setState( {[e.target.name]: e.target.value} )

    setTimeout(() => {
      console.log(this.state)
    }, 0)
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

  render () {
    let { author, bio, content, title, tag_list } = this.state
    const { authors } = this.props

    console.log(authors)

    return (
      this.props.authenticated === true
      ? <AddForm onSubmit={this.postRequest} method="post" autoComplete="off">
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
                  <button name="author" value={author} type="button" onClick={this.onChange} key={a.id}>{a.name}</button>
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
      : <NotFound />
    )
  }
}

Add.propType = {
  authenticated: bool.isRequired,
  authors: array.isRequired,
  getRequest: func.isRequred
}

export default Add
