import React, { Component } from 'react'
import { array, bool, func } from 'prop-types'
import axios from 'axios'
import styled from 'styled-components'

import NewAuthorForm from './themes/Form'
import EditAuthorForm from './themes/Form'
// import DeleteAuthorForm from './themes/Form'

const req = 'http://localhost:3000/api/v1/authors'

class NewAuthor extends Component {
  constructor () {
    super()
    this.state = {
      name: '',
      bio: ''
    }
  }

  onChange = (e) => {
    console.log(this.state)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleAuthors = (e) => {
    const { authors } = this.props

    if (e.target.type === 'button') {
      e.target.value = e.target.innerHTML

      authors.map(author => {
        if (author.name === e.target.value) {
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

  postAuthor = () => {
    const authorObj = {
      name: this.state.name,
      bio: this.state.bio
    }

    axios.post(req, authorObj)
      .then(() => {
        this.props.getRequest()
      })
      .catch(err => console.log(err))
    this.setState({
      name: '',
      bio: ''
    })
  }

  editAuthor = () => {
    const {
      id,
      name,
      bio
    } = this.state

    const authorObj = {
      id,
      name,
      bio
    }
    axios.put(`${req}/${id}`, authorObj)
      .then(() => {
        this.props.getRequest()
      })
      .catch(err => console.log(err))
  }

  // deleteAuthor = () => {
  //   const {
  //     id,
  //     getRequest
  //   } = this.state
  //
  //   axios.delete(`${req}/${id}`)
  //     .then(() => {
  //       getRequest()
  //     })
  //     .catch(err => console.log(err))
  // }

  render () {
    const { name, bio } = this.state

    return (
      <NewAuthorFormWrapper>
        {/* Create Author */}
        <NewAuthorForm
          onSubmit={this.postAuthor}
          method="get"
          autoComplete="off"
        >
          <div className="formgroup">
            <h2>New Author</h2>
          </div>
          <div className="formgroup">
            <label htmlFor="create-author"> Name:
              <input name="name" value={name} onChange={this.onChange} type="text" id="create-author" />
            </label>
            <label htmlFor="bio"> Bio:
              <textarea name="bio" value={bio} onChange={this.onChange} id="bio" />
            </label>
          </div>
          <div className="formgroup">
            <input className="button" name="create-author" type="submit" value="Submit" />
          </div>
        </NewAuthorForm>

        {/* Edit Author */}
        <EditAuthorForm
          onSubmit={this.editAuthor}
          method="put"
          autoComplete="off"
        >
          <div className="formgroup edit-header">
            <h2>Edit {name}</h2>
          </div>
          <div className="formgroup">
            <label htmlFor="edit-author"> Author:
              <input name="name" value={name} onChange={this.onChange} type="text" id="edit-author" />
            </label>
          </div>
          <div className="formgroup">
            <label htmlFor="edit-bio"> Bio:
              <textarea name="bio" value={bio} onChange={this.onChange} />
            </label>
          </div>
          <div className="formgroup">
            <input className="button" name="edit-name" type="submit" value="Submit" />
          </div>
        </EditAuthorForm>
        {/* Delete Author */}
        {/* <DeleteAuthorForm
          onSubmit={this.deleteAuthor}
          method="delete"
        >
          <div className="formgroup">
            <input className="button button-delete" name="delete-author" type="submit" value="Delete" />
          </div>
        </DeleteAuthorForm> */}
      </NewAuthorFormWrapper>
    )
  }
}

NewAuthor.propType = {
  authenticated: bool.isRequired,
  authors: array.isRequired,
  getRequest: func.isRequred
}

const NewAuthorFormWrapper = styled.div `
  textarea {
    height: 10em;
  }
  .form-group {
    margin: 20px 0;
  }
`

export default NewAuthor
