import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { func, object } from 'prop-types'
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
      title: '',
      content: '',
      fireRedirect: false
    }
  }
  //
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentWillMount () {
    const { article } = this.props
    this.setState({
      id: article.id,
      title: article.title,
      content: article.content
    })
  }

  setStateAndProps = () => {
    this.setState({
      fireRedirect: true
    })
    this.props.getRequest()
  }

  editArticle = (e) => {
    e.preventDefault()
    const {
      id,
      title,
      content
    } = this.state

    const articleObj = {
      title,
      content
    }
    axios.put(`${req}/${id}`, articleObj)
      .then(() => {
        this.setStateAndProps()
        this.props.updateFlashConfirmation()
      })
      .catch(err => console.log(err))
    setTimeout(() => {
      this.props.updateFlashConfirmation()
    }, 2000)
  }

  deleteArticle = (e) => {
    e.preventDefault()

    this.props.deleteFlashConfirmation()
    axios.delete(`${req}/${this.state.id}`)
      .then(() => {
        this.setStateAndProps()
      })
      .catch(err => console.log(err))
    setTimeout(() => {
      this.props.deleteFlashConfirmation()
    }, 2000)
  }

  render () {
    const {
      title,
      content,
      fireRedirect
    } = this.state
    const { article, from } = this.props || '/'

    return (
      <EditArticleWrapper>
        <EditArticleForm
          onSubmit={this.editArticle}
          method="get"
          autoComplete="off"
        >
          <div className="formgroup">
            <h2>Edit {article.title}</h2>
          </div>
          <div className="formgroup">
            <label htmlFor="create-article"> Title:
              <input name="title" value={title} onChange={this.onChange} type="text" autoFocus />
            </label>
            <label htmlFor="content"> Content:
              <textarea name="content" value={content} onChange={this.onChange} rows="20" />
            </label>
          </div>
          <div className="formgroup">
            <input className="button" name="create-article" type="submit" value="Submit Changes" />
          </div>
          {/* Redirect */}
          {fireRedirect && (
            <Redirect to={from || '/articles'} />
          )}
        </EditArticleForm>
        {/* Delete Article */}
        <DeleteArticleForm
          onSubmit={this.deleteArticle}
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
  article: object.isRequired,
  deleteFlashConfirmation: func.isRequired,
  updateFlashConfirmation: func.isRequired,
  getRequest: func.isRequired
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
