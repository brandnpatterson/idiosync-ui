import React, { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

import About from './About'
import EditArticle from './EditArticle'
import EditAuthor from './EditAuthor'
import NewArticle from './NewArticle'
import NewAuthor from './NewAuthor'
import FilterByTag from './FilterByTag'
import Home from './Home'
import Header from './Header'
import Login from './Login'
import Article from './Article'
import NotFound from './NotFound'
import Tags from './Tags'

const landingImg = 'images/landing.jpg'

const reqArticles = 'http://localhost:3000/api/v1/articles'
const reqAuthors = 'http://localhost:3000/api/v1/authors'
const reqSession = 'http://localhost:3000/api/v1/sessions'

class App extends Component {
  constructor () {
    super()
    this.state = {
      articles: null,
      authenticated: true,
      authors: null,
      flash_create: false,
      flash_delete: false,
      flash_update: false,
      email: '',
      password: '',
      search: '',
      tags: []
    }
  }

  componentWillMount () {
    this.getRequest()
    let localAuth = localStorage.getItem('authenticated')
    if (localAuth === 'true') {
      this.setState({
        authenticated: true
      })
    }
  }

  getRequest = () => {
    axios.get(reqArticles)
      .then(res => {
        const articles = res.data
        this.setState({ articles })
      })
      .catch(err => console.log(err))
    axios.get(reqAuthors)
      .then(res => {
        const authors = res.data
        this.setState({ authors })
        setTimeout(() => {
          this.setTags()
        }, 200)
      })
      .catch(err => console.log(err))
  }

  setTags = () => {
    const { articles, tags } = this.state
    // access each article.tags to be used in tags state
    setTimeout(() => {
      articles.forEach(article => {
        article.tags.forEach(tag => {
          // article.tag => tags
          tags.push(tag)
          // reduce any duplicates
          const reducedTags = tags.reduce((first, second) => {
            // if the next object's id is not found in the output array
            if (!first.some((el) => {
              return el.id === second.id;
            }))
            // push the object into the output array
            first.push(second)
            return first
          }, [])
          this.setState({
            tags: reducedTags
          })
        })
      })
    }, 200)
  }

  setReactIds = () => {
    const { articles, authors } = this.state
    articles.forEach((article, index) => {
      article.id_react = index + 1
    })
    authors.forEach((author, index) => {
      author.id_react = index + 1
    })
  }

  // authentication
  login = (e) => {
    e.preventDefault()
    const { email, password } = this.state
    axios.post(reqSession, {
      email: email,
      password: password
    })
    .then(res => {
      if (res) {
        localStorage.setItem('email', this.state.email)
        this.setState({
          authenticated: true,
          email: '',
          password: ''
        })
        localStorage.setItem('authenticated', this.state.authenticated)
      }
    })
    .catch(err => console.log(err))
  }

  logout = () => {
    localStorage.setItem('authenticated', false)
    localStorage.setItem('email', '')

    this.setState({
      authenticated: false
    })
  }

  // search
  resetSearch = () => {
    if (this.state.search !== '') {
      this.setState({
        search: ''
      })
    }
  }

  updateSearch = (e) => {
    this.setState({
      search: e.target.value.substr(0, 20)
    })
  }

  // email -- password
  updateEmail = (e) => {
    this.setState({
      email: e.target.value.substr(0, 50)
    })
  }

  updatePassword = (e) => {
    this.setState({
      password: e.target.value.substr(0, 50)
    })
  }

  // flash
  createFlashConfirmation = () => {
    if (this.state.flash_create === false) {
      this.setState({
        flash_create: true
      })
    } else {
      this.setState({
        flash_create: false
      })
    }
  }

  deleteFlashConfirmation = () => {
    if (this.state.flash_delete === false) {
      this.setState({
        flash_delete: true
      })
    } else {
      this.setState({
        flash_delete: false
      })
    }
  }

  updateFlashConfirmation = () => {
    if (this.state.flash_update === false) {
      this.setState({
        flash_update: true
      })
    } else {
      this.setState({
        flash_update: false
      })
    }
  }

  render () {
    const {
      articles,
      authenticated,
      authors,
      flash_create,
      flash_delete,
      flash_update,
      search,
      tags
    } = this.state

    let filteredArticles = []

    if (search !== '') {
      filteredArticles = articles.filter(article => {
        return article.title.toLowerCase()
          .indexOf(search.toLowerCase()) !== -1
      })
    }

    filteredArticles.length = 3

    if (articles && authors) {
      this.setReactIds()
    }

    return (
      <AppWrapper>
        <div onClick={this.resetSearch}>
          <Header
            authenticated={authenticated}
            filteredArticles={filteredArticles}
            logout={this.logout}
            search={search}
            updateSearch={this.updateSearch}
          />
        </div>
        <Switch>
          <Route exact path="/" render={() => (
            <Link to="/articles">
              <Background src={landingImg} alt="landing" />
            </Link>
          )} />
          { /* Articles */ }
          {articles && (
            <Route exact path="/articles" render={() => {
              return <Home
                articles={articles}
                authors={authors}
                flash_delete={flash_delete}
                flash_update={flash_update}
              />
            }} />
          )}
          { /* New Article */ }
          {articles && authors && tags && (
            <Route exact path="/new-article" render={() => {
              return <NewArticle
                articles={articles}
                authenticated={authenticated}
                authors={authors}
                tags={tags}
                flash_create={flash_create}
                flash_delete={flash_delete}
                flash_update={flash_update}
                getRequest={this.getRequest}
              />
            }} />
          )}
          { /* Edit Article by :id */ }
          {articles && (
            <Route path="/articles/edit/:id" render={({ match }) => {
              return (
                <EditArticle
                  article={articles.find(a => a.id_react === parseInt(match.params.id, 10))}
                  deleteFlashConfirmation={this.deleteFlashConfirmation}
                  updateFlashConfirmation={this.updateFlashConfirmation}
                  getRequest={this.getRequest}
                />
              )
            }} />
          )}
          { /* Articles/:id */ }
          {articles && (
            <Route path="/articles/:index" render={({ match }) => {
              return (
                <Article
                  article={articles.find(a => a.id_react === parseInt(match.params.index, 10))}
                  articles={articles}
                  authors={authors}
                />
              )
            }} />
          )}
          { /* New Author */ }
          {authors && (
            <Route exact path="/new-author" render={() => {
              return <NewAuthor
                articles={articles}
                authenticated={authenticated}
                authors={authors}
                createFlashConfirmation={this.createFlashConfirmation}
                getRequest={this.getRequest}
              />
            }} />
          )}
          { /* Edit Author by :id */ }
          {authors && (
            <Route path="/authors/edit/:id" render={({ match }) => {
              return (
                <EditAuthor
                  author={authors.find(a => a.id_react === parseInt(match.params.id, 10))}
                  deleteFlashConfirmation={this.deleteFlashConfirmation}
                  updateFlashConfirmation={this.updateFlashConfirmation}
                  getRequest={this.getRequest}
                />
              )
            }} />
          )}
          { /* Tags */ }
          {articles && (
            <Route exact path="/tags" render={() => {
              return <Tags articles={articles} tags={tags} />
            }} />
          )}
          { /* Tags/:tagName */ }
          {articles && (
            <Route path="/tags/:tagName" render={({ match }) => {
              return (
                <FilterByTag
                  authors={authors}
                  match={match}
                  tags={tags}
                  filterByTag={
                    articles.map(article => {
                      return article.tags.map(tag => {
                        if (tag.name === match.params.tagName) {
                          return article
                        } else {
                          return null
                        }
                      })
                    })
                  }
                />
              )
            }} />
          )}
          { /* Log In */ }
          <Route exact path="/login" render={() => {
            return <Login
              email={this.state.email}
              login={this.login}
              password={this.state.password}
              updateEmail={this.updateEmail}
              updatePassword={this.updatePassword}
            />
          }} />
          <Route exact path="/about" component={About} />
          {articles && authors && (
            <Route component={NotFound} />
          )}
        </Switch>
      </AppWrapper>
    )
  }
}

const Background = styled.img `
  width: 100%;
`
const AppWrapper = styled.div `
  font-family: serif;
  li {
    list-style-type: none;
    a {
      text-decoration: none;
    }
  }
  .button {
    appearance: none;
    background: green;
    border: none;
    border-radius: 0.25em;
    color: white;
    cursor: pointer;
    font-size: 1em;
    height: 2em;
    width: 100%;
  }
  .button.button-delete {
    background: red;
    margin: 2em auto;
    width: 25%;
  }
`

export default App
