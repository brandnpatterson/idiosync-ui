import React, { Component } from 'react'
import { object } from 'prop-types'
import axios from 'axios'
import styled from 'styled-components'
import EditAuthorForm from './themes/Form'
import DeleteAuthorForm from './themes/Form'

const req = 'http://localhost:3000/api/v1/authors'

class EditAuthor extends Component {
  constructor () {
    super()
    this.state = {
      id: '',
      name: '',
      bio: ''
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentWillMount () {
    const { author } = this.props
    this.setState({
      id: author.id,
      name: author.name,
      bio: author.bio
    })
  }

  editAuthor = () => {
    const {
      id,
      name,
      bio,
      getRequest
    } = this.state

    const authorObj = {
      name,
      bio
    }
    axios.put(`${req}/${id}`, authorObj)
      .then(() => {
        getRequest()
      })
      .catch(err => console.log(err))
  }

  deleteAuthor = () => {
    const {
      id,
      getRequest
    } = this.state

    axios.delete(`${req}/${id}`)
      .then(() => {
        getRequest()
      })
      .catch(err => console.log(err))
  }

  render () {
    const {
      name,
      bio
    } = this.state
    const { author } = this.props

    return (
      <EditAuthorWrapper>
        <EditAuthorForm
          onSubmit={this.editAuthor}
          method="get"
          autoComplete="off"
        >
          <div className="formgroup">
            <h2>Edit {author.name}</h2>
          </div>
          <div className="formgroup">
            <label htmlFor="create-author"> Name:
              <input name="name" value={name} onChange={this.onChange} type="text" />
            </label>
            <label htmlFor="bio"> Bio:
              <textarea name="bio" value={bio} onChange={this.onChange} />
            </label>
          </div>
          <div className="formgroup">
            <input className="button" name="create-author" type="submit" value="Submit" />
          </div>
        </EditAuthorForm>
        {/* Delete Author */}
        <DeleteAuthorForm
          onSubmit={this.deleteAuthor}
          method="delete"
        >
          <div className="formgroup">
            <input className="button button-delete" name="delete-author" type="submit" value="Delete" />
          </div>
        </DeleteAuthorForm>
      </EditAuthorWrapper>
    )
  }
}

EditAuthor.propTypes = {
  author: object.isRequired
}

const EditAuthorWrapper = styled.div`
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

export default EditAuthor
