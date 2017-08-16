import React from 'react'
import LoginForm from './themes/Form'

const Login = () => (
  <LoginForm>
    <form action="">
      <div className="formgroup">
        <h2>Log In</h2>
      </div>
      <div className="formgroup">
        <label htmlFor="email"> Email:
          <input type="text" data-error="true" id="email" email="email" autoFocus />
        </label>
      </div>
      <div className="formgroup">
        <label htmlFor="password"> Password:
          <input type="password" data-error="true" id="password" password="password" autoFocus />
        </label>
      </div>
      <div className="formgroup">
        <input className="post-data button" type="submit" name="submit" value="Log In" />
      </div>
    </form>
  </LoginForm>
)

export default Login
