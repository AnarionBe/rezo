import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { Input } from 'components/forms/input'
import { Button } from 'components/actions/button'

import { StoreContext } from 'store'

export const Register = () => {
  const { user } = useContext(StoreContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [username, setUsername] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    user.register({ email, password, passwordConfirm, username })
  }

  return (
    <section className="view-register">
      <form
        onSubmit={ e => handleSubmit(e) }
        className="view-register__form"
      >
        <h1 className="view-register__title">Create an account</h1>

        <Input
          error={ user.Errors.get('email') }
          name="email"
          placeholder="eg. elon@spacex.com"
          required
          setValue={ setEmail }
          type="email"
          value={ email }
        >Email</Input>

        <Input
          error={ user.Errors.get('username') }
          name="username"
          placeholder="eg. elonmusk"
          required
          setValue={ setUsername }
          value={ username }
        >Username</Input>

        <Input
          error={ user.Errors.get('password') }
          name="password"
          placeholder="******"
          required
          setValue={ setPassword }
          type="password"
          value={ password }
        >Password</Input>

        <Input
          error={ user.Errors.get('password_confirmation') }
          name="password_confirmation"
          placeholder="******"
          required
          setValue={ setPasswordConfirm }
          type="password"
          value={ passwordConfirm }
        >Confirm password</Input>

        <Button
          action={ handleSubmit }
          disabled={ !password || !passwordConfirm || !email || !username }
          type="submit"
        >Register</Button>

        <span className="view-register__login">Already an account? <Link className="view-register__login-link" to="/login">Sign in</Link></span>
      </form>
    </section>
  )
}
