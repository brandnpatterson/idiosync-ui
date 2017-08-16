import React from 'react'
import SignUpForm from './themes/Form'

const SignUp = () => (
  <SignUpForm>
    <div className="formgroup">
      <h2>Sign Up</h2>
    </div>
    <div className="formgroup">
      <label htmlFor="email"> Email:
        <input type="text" data-error="true" id="email" name="email" autoFocus />
      </label>
    </div>
    <div className="formgroup">
      <label htmlFor="password"> Password:
        <input type="password" data-error="true" id="password" name="password" />
      </label>
    </div>
    <div className="formgroup">
      <input className="post-data button" type="submit" name="submit" value="SignUp" />
    </div>
  </SignUpForm>
)

export default SignUp
