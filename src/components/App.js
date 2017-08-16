import React, { Component } from 'react'
import axios from 'axios'
import { Link, Switch, Route } from 'react-router-dom'
import Header from './Header'
import About from './About'
import Add from './Add'
import Login from './Login'
import Article from './Article'
import NotFound from './NotFound'
import Register from './Register'
import TableOfContents from './TableOfContents'
import styled from 'styled-components'

const image = 'images/landing.jpg'

class App extends Component {
  constructor () {
    super()
    this.state = {
      articles: []
    }
  }

  componentDidMount () {
    const url = 'http://localhost:3000/api/v1/articles'
    axios.get(url)
      .then(res => {
        const articles = res.data
        this.setState({ articles })
      })
      .catch(err => console.log(err))
  }

  render () {
    const { articles } = this.state
    return (
      <Wrapper>
        <Header />
        <Switch>
          <Route exact path="/" render={() => (
            <Link to="/articles">
              <Background src={image} alt="landing" />
            </Link>
          )}/>
          { /* Articles -- Articles/:id */ }
          {articles && (
            <Route exact path="/articles" render={() => {
              return (
                <TableOfContents articles={articles} />
              )
            }} />
          )}
          <Route path="/articles/:index" render={({ match }) => {
            return <Article articles={articles} article={articles.find(p => p.id === parseInt(match.params.index, 10))} />
          }} />
          { /* Static Routes */ }
          <Route path="/about" component={About} />
          <Route path="/add" component={Add} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Wrapper>
    )
  }
}

const Background = styled.img `
  width: 100%;
`
const Wrapper = styled.div `
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
