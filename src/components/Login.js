import React from 'react'
import styled from 'styled-components'

const LoginForm = styled.div`
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: whitesmoke;
    margin: 2em auto;
    padding-bottom: 2em;
    button,
    input {
      margin: 10px 0;
    }
  }
`
const Login = () => (
  <LoginForm>
    <form action="">
      <h2>Login</h2>
      <input type="text" placeholder="email"/>
      <input type="password" placeholder="password"/>
      <button type="submit">Login</button>
    </form>
  </LoginForm>
)

export default Login
