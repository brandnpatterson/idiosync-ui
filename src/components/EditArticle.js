import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { object } from 'prop-types'
import axios from 'axios'
import styled from 'styled-components'
import EditArticleForm from './themes/Form'
import DeleteArticleForm from './themes/Form'

const req = 'http://localhost:3000/api/v1/articles'

class EditArticle extends Component {
  constructor () {
    super()
    this.state = {
      id: '',
      name: '',
      content: '',
      fireRedirect: false
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentWillMount () {
    const { article } = this.props
    console.log(article)
    this.setState({
      id: article.id,
      name: article.title,
      content: article.content
    })
  }

  editAuthor = (e) => {
    e.preventDefault()

    const {
      id,
      name,
      content
    } = this.state

    const articleObj = {
      name,
      content
    }
    axios.put(`${req}/${id}`, articleObj)
      .then(() => {
        this.setState({
          fireRedirect: true
        })
      })
      .catch(err => console.log(err))
  }

  deleteAuthor = (e) => {
    e.preventDefault()

    this.props.deleteNotify()
    axios.delete(`${req}/${this.state.id}`)
      .then(() => {
        this.setState({
          fireRedirect: true
        })
      })
      .catch(err => console.log(err))
    setTimeout(() => {
      this.props.deleteNotify()
    }, 2000)
  }

  render () {
    const {
      name,
      content,
      fireRedirect
    } = this.state
    const { article, from } = this.props || '/'

    return (
      <EditArticleWrapper>
        <EditArticleForm
          onSubmit={this.editAuthor}
          method="get"
          autoComplete="off"
        >
          <div className="formgroup">
            <h2>Edit {article.title}</h2>
          </div>
          <div className="formgroup">
            <label htmlFor="create-article"> Title:
              <input name="name" value={name} onChange={this.onChange} type="text" />
            </label>
            <label htmlFor="content"> Content:
              <textarea name="content" value={content} onChange={this.onChange} />
            </label>
          </div>
          <div className="formgroup">
            <input className="button" name="create-article" type="submit" value="Submit Changes" />
          </div>
          {/* Redirect */}
          {fireRedirect && (
            <Redirect to={from || '/new-article'} />
          )}
        </EditArticleForm>
        {/* Delete Author */}
        <DeleteArticleForm
          onSubmit={this.deleteAuthor}
          method="delete"
        >
          <div className="formgroup">
            <input className="button button-delete" name="delete-article" type="submit" value="Delete" />
          </div>
        </DeleteArticleForm>
      </EditArticleWrapper>
    )
  }
}

EditArticle.propTypes = {
  article: object.isRequired
}

const EditArticleWrapper = styled.div`
  margin: 0 auto;
  width: 70%;
  header {
    display: flex;
    justify-content: space-between;
  }
  button {
    margin: 1.5em 0 0 0.5em;
  }
  .tags {
    color: blue;
  }
`

export default EditArticle
