import React, { Component } from 'react'
import axios from 'axios'
import AddForm from './themes/Form'
import NotFound from './NotFound'

const reqArticles = 'http://localhost:3000/api/v1/articles'

class Add extends Component {
  constructor () {
    super()
    this.state = {
      title: '',
      author: '',
      content: ''
    }
  }

  onChange = (e) => {
    this.setState( {[e.target.name]: e.target.value} )
  }

  postRequest = (e) => {
    e.preventDefault()
    const {  title, author, content } = this.state
    const { getRequest } = this.props

    axios.post(reqArticles, {
        title, author, content
      })
      .then(res => {
        getRequest()
      })
      .catch(err => console.log(err))
    this.setState({
      title: '',
      author: '',
      content: ''
    })
  }

  render () {
    const { author, content, title } = this.state
    return (
      this.props.authenticated === true
      ? <AddForm onSubmit={this.postRequest} method="post" autoComplete="off">
          <div className="formgroup">
            <h2>Add Article</h2>
          </div>
          <div className="formgroup">
            <label htmlFor="title"> Title:
              <input value={title} onChange={this.onChange} name="title" type="text" id="title" autoFocus />
            </label>
          </div>
          <div className="formgroup">
            <label htmlFor="author"> Author:
              <input value={author} onChange={this.onChange} name="author" type="text" id="author" />
            </label>
          </div>
          <div className="formgroup">
            <label htmlFor="content"> Content:
              <textarea value={content} onChange={this.onChange} name="content" id="content" />
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

export default Add
