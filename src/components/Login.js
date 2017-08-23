import React from 'react'
import LoginForm from './themes/Form'

const Login = ({ email, login, password, updateEmail, updatePassword }) => {
  return (
    <LoginForm action="/articles" onSubmit={login} method="post">
      <div className="formgroup">
        <h2>Log In</h2>
      </div>
      <div className="formgroup">
        <label htmlFor="email"> Email:
          <input type="text" data-error="true" id="email" name="email"
            onChange={updateEmail}
            value={email}
            autoFocus
          />
        </label>
      </div>
      <div className="formgroup">
        <label htmlFor="password"> Password:
          <input type="password" data-error="true" id="password" name="password"
            onChange={updatePassword}
            value={password}
          />
        </label>
      </div>
      <div className="formgroup">
        <input
          className="post-data button"
          type="submit"
          name="submit"
          value="Log In"
        />
      </div>
    </LoginForm>
  )
}

export default Login
