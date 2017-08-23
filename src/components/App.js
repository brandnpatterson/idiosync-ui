import React, { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import axios from 'axios'

import About from './About'
import Add from './Add'
import Home from './Home'
import Header from './Header'
import Login from './Login'
import Article from './Article'
import NotFound from './NotFound'
import SignUp from './SignUp'
import styled from 'styled-components'

const image = 'images/landing.jpg'

const reqArticles = 'http://localhost:3000/api/v1/articles'
const reqSession = 'http://localhost:3000/api/v1/sessions'

class App extends Component {
  constructor () {
    super()
    this.state = {
      articles: [],
      authenticated: false,
      email: '',
      password: '',
      localEmail: '',
      localPassword: '',
      search: ''
    }
  }

  componentDidMount () {
    axios.get(reqArticles)
      .then(res => {
        const articles = res.data
        this.setState({ articles })
      })
      .catch(err => console.log(err))
  }

  componentWillMount () {
    const localAuth = localStorage.getItem('authenticated')
    const localEmail = localStorage.getItem('email')

    if (localAuth === 'true') {
      this.setState({
        authenticated: true,
        localEmail: localEmail
      })
    }
    setTimeout(() =>{
      console.log(this.state.authenticated, localStorage)
    }, 0)
  }

  logout = () => {
    localStorage.setItem('authenticated', false)
    localStorage.setItem('email', '')

    const localAuth = localStorage.getItem('authenticated')

    this.setState({
      authenticated: localAuth
    })
    setTimeout(() =>{
      console.log(this.state.authenticated, localStorage)
    }, 0)
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
        this.setState({
          localEmail: this.state.email,
          localPassword: this.state.password
        })
        this.setState({
          authenticated: true,
          email: '',
          password: ''
        })
        localStorage.setItem('authenticated', this.state.authenticated)
        localStorage.setItem('email', this.state.localEmail)
      }
      console.log(this.state.authenticated, localStorage)
    })
    .catch(err => console.log(err))
  }

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
    const { authenticated, articles, search } = this.state
    let filteredArticles = []

    if (search !== '') {
      filteredArticles = articles.filter(article => {
        return article.title.toLowerCase().indexOf(
          search.toLowerCase()) !== -1
        }
      )
    }

    filteredArticles.length = 3

    return (
      <Div>
        <div onClick={this.resetSearch}>
          <Header
            articles={articles}
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
              <Background src={image} alt="landing" />
            </Link>
          )} />
          { /* Articles */ }
          {articles && (
            <Route exact path="/articles" render={() => {
              return <Home articles={articles} />
            }} />
          )}
          { /* Articles/:id */ }
          <Route path="/articles/:index" render={({ match }) => {
            return <Article
                    articles={articles}
                    article={articles.find(p => p.id === parseInt(match.params.index, 10))}
                  />
          }} />
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
          { /* Static Routes */ }
          <Route exact path="/about" component={About} />
          <Route exact path="/add" render={() => {
            return <Add authenticated={authenticated} />
          }} />
          <Route exact path="/register" component={SignUp} />
          <Route component={NotFound} />
        </Switch>
      </Div>
    )
  }
}

const Background = styled.img `
  width: 100%;
`
const Div = styled.div `
  font-family: sans-serif;
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
`

export default App
