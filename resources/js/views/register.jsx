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
    <section className="flex justify-center items-center h-full">
      <form
        onSubmit={ e => handleSubmit(e) }
        className="bg-gray-800 p-8 mx-4 rounded-xl"
      >
        <h1 className="text-3xl">Create an account</h1>

        <Input
          className="mt-6"
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
          className="mt-4"
          placeholder="eg. elonmusk"
          required
          setValue={ setUsername }
          value={ username }
        >Username</Input>

        <Input
          error={ user.Errors.get('password') }
          name="password"
          className="mt-4"
          placeholder="******"
          required
          setValue={ setPassword }
          type="password"
          value={ password }
        >Password</Input>

        <Input
          error={ user.Errors.get('password_confirmation') }
          name="password_confirmation"
          className="mt-4"
          placeholder="******"
          required
          setValue={ setPasswordConfirm }
          type="password"
          value={ passwordConfirm }
        >Confirm password</Input>

        <Button
          action={ handleSubmit }
          className="mt-8 w-full"
          disabled={ !password || !passwordConfirm || !email || !username }
          type="submit"
        >Register</Button>

        <span className="inline-block mt-4">Already an account? <Link className="underline text-blue-500" to="/login">Sign in</Link></span>
      </form>
    </section>
  )
}
