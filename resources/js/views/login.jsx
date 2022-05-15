import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { Input } from 'components/forms/input'
import { Button } from 'components/actions/button'

import { StoreContext } from 'store'

export const Login = () => {
  const { user } = useContext(StoreContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    user.login({ email, password })
  }

  return (
    <section className="view-login">
      <form
        onSubmit={ e => handleSubmit(e) }
        className="view-login__form"
      >
        <h1 className="view-login__title">Create an account</h1>

        <Input
          error={ user.Errors.get('auth') }
          name="email"
          placeholder="eg. elon@spacex.com"
          required
          setValue={ setEmail }
          type="email"
          value={ email }
        >Email</Input>

        <Input
          error={ user.Errors.get('auth') }
          name="password"
          placeholder="******"
          required
          setValue={ setPassword }
          type="password"
          value={ password }
        >Password</Input>

        <Button
          action={ handleSubmit }
          className="mt-6 w-full"
          disabled={ !password || !email }
          type="submit"
        >Login</Button>

        <span className="view-login__register">Need an account? <Link className="view-login__register-link" to="/register">Register</Link></span>
      </form>
    </section>
  )
}
