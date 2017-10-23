import React, { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

import About from './About'
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
      })
      .then(() => {
        setTimeout(() => {
          this.setTags()
        }, 0)
      })
      .catch(err => console.log(err))
  }

  setTags = () => {
    const { articles, tags } = this.state
    // access each article.tags to be used in tags state
    if (articles) {
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
    }
  }

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

  render () {
    const {
      articles,
      authenticated,
      authors,
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
              return <Home articles={articles} authors={authors} />
            }} />
          )}
          { /* Articles/:id */ }
          {articles && (
            <Route path="/articles/:index" render={({ match }) => {
              return (
                <Article
                  articles={articles}
                  article={articles.find(a => a.id === parseInt(match.params.index, 10))}
                  authors={authors}
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
          { /* Tags/:id */ }
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
          {articles && authors && tags && (
            <Route exact path="/new-article" render={() => {
              return <NewArticle
                authenticated={authenticated}
                authors={authors}
                articles={articles}
                getRequest={this.getRequest}
                tags={tags}
              />
            }} />
          )}
          {authors && (
            <Route exact path="/new-author" render={() => {
              return <NewAuthor
                authenticated={authenticated}
                authors={authors}
                articles={articles}
                getRequest={this.getRequest}
              />
            }} />
          )}
          {authors && (
            <Route path="/authors/edit/:id" render={({ match }) => {
              return (
                <EditAuthor author={authors.find(a => a.id === parseInt(match.params.id, 10))} />
              )
            }} />
          )}
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
