import React from 'react'
import styled from 'styled-components'

const Register = () => (
  <RegisterForm>
    <form action="">
      <h2>Register</h2>
      <input type="text" placeholder="email"/>
      <input type="password" placeholder="password"/>
      <button type="submit">Register</button>
    </form>
  </RegisterForm>
)

const RegisterForm = styled.div`
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

export default Register
