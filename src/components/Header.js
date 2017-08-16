import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Nav = styled.nav `
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  padding: 1em 0;
  margin: 0 auto;
  .left {
    justify-content: space-around;
    max-width: 20em;
  }
  .right {
    justify-content: space-around;
    max-width: 15em;
  }
  ul {
    display: flex;
    padding: 0;
    width: 100%;
    a {
      font-size: 1.25em;
    }
  }
`
const Header = () => (
  <Nav>
    <ul className="left">
      <li><Link to="/">Idiosync</Link></li>
      <li><Link to="/posts">Posts</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
    <ul className="right">
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  </Nav>
)

export default Header
