import React, { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import Header from './Header'
import About from './About'
import Login from './Login'
import Post from './Post'
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
      lorem: [],
      prose: []
    }
  }

  componentDidMount () {
    fetch('lorem')
      .then(res => res.json())
      .then(lorem => this.setState({ lorem }))
    fetch('prose')
      .then(res => res.json())
      .then(prose => this.setState({ prose }))
  }

  render () {
    const { lorem } = this.state
    const { prose } = this.state
    const posts = lorem.concat(prose)
    return (
      <Wrapper>
        <Header />
        <Switch>
          <Route exact path="/" render={() => (
            <Link to="/posts">
              <Background src={image} alt="idiosync" />
            </Link>
          )}/>
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Switch>
            {lorem && prose && (
              <Route exact path="/posts" render={() => {
                return (
                  <TableOfContents lorem={lorem} prose={prose} />
                )
              }} />
            )}
            <Route path="/posts/:index" render={({ match }) => {
              return <Post post={posts.find(p => p.id === parseInt(match.params.index, 10))} />
            }} />
          </Switch>
          <Route component={NotFound} />
        </Switch>
      </Wrapper>
    )
  }
}

export default App
