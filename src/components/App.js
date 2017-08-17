import React, { Component } from 'react'
import axios from 'axios'
import { Link, Switch, Route } from 'react-router-dom'
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

const devURL = 'http://localhost:3000/api/v1/articles'
// const prodURL = ''
const currentURL = devURL

class App extends Component {
  constructor () {
    super()
    this.state = {
      articles: [],
      search: 'Search'
    }
  }

  componentDidMount () {
    const url = currentURL
    axios.get(url)
      .then(res => {
        const articles = res.data
        this.setState({ articles })
      })
      .catch(err => console.log(err))
  }

  updateSearch = (e) => {
    this.setState({
      search: e.target.value.substr(0, 20)
    })
  }

  resetSearch = () => {
    this.setState({
      search: 'Search'
    })
  }

  render () {
    const { articles } = this.state
    const { search } = this.state

    return (
      <Div onClick={this.resetSearch}>
        <Header articles={articles} search={search} updateSearch={this.updateSearch} />
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
          { /* Static Routes */ }
          <Route path="/about" component={About} />
          <Route path="/add" render={() => {
            return <Add />
          }} />
          <Route path="/register" component={SignUp} />
          <Route path="/login" component={Login} />
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
