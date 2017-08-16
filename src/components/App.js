import React, { Component } from 'react'
import axios from 'axios'
import { Link, Switch, Route } from 'react-router-dom'
import Header from './Header'
import About from './About'
import Login from './Login'
import Article from './Article'
import NotFound from './NotFound'
import Register from './Register'
import TableOfContents from './TableOfContents'
import styled from 'styled-components'

const image = 'images/idiosync.jpg'

const Background = styled.img `
  width: 100%;
`
const Wrapper = styled.div `
  li {
    list-style-type: none;
    a {
      text-decoration: none;
    }
  }
`
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
      .then((res) => {
        let articles = res.data
        this.setState({ articles })
      })
      .catch(function (error) {
        console.log('an error has occured')
      })
  }

  render () {
    const { articles } = this.state
    return (
      <Wrapper>
        <Header />
        <Switch>
          <Route exact path="/" render={() => (
            <Link to="/articles">
              <Background src={image} alt="idiosync" />
            </Link>
          )}/>
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Switch>
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
          </Switch>
          <Route component={NotFound} />
        </Switch>
      </Wrapper>
    )
  }
}

export default App
