import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { array, bool, func } from 'prop-types'
import axios from 'axios'
import styled from 'styled-components'

import NewAuthorForm from './themes/Form'

const req = 'http://localhost:3000/api/v1/authors'

class NewAuthor extends Component {
  constructor () {
    super()
    this.state = {
      id: '',
      name: '',
      bio: '',
      fireRedirect: false
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  postAuthor = (e) => {
    e.preventDefault();
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
      bio: '',
      fireRedirect: true
    })
  }

  render () {
    const { from } = this.props.location || '/'
    const { name, bio, fireRedirect } = this.state

    return (
      <NewAuthorFormWrapper>
        {/* Create Author */}
        <NewAuthorForm
          onSubmit={this.postAuthor}
          method="get"
          autoComplete="off"
        >
          {fireRedirect && (
            <div className="flash-success">New author created successfully!</div>
          )}
          <div className="formgroup">
            <h2>New Author</h2>
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
            {fireRedirect && (
              <Redirect to={from || '/new-article'}/>
            )}
          </div>
        </NewAuthorForm>
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
