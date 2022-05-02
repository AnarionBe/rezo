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
    <section className="flex justify-center items-center h-full">
      <form
        onSubmit={ e => handleSubmit(e) }
        className="bg-gray-800 p-8 mx-4 rounded-xl"
      >
        <h1 className="text-3xl">Create an account</h1>

        <Input
          className="mt-6"
          error={ user.Errors.get('auth') }
          name="email"
          placeholder="eg. elon@spacex.com"
          required
          setValue={ setEmail }
          type="email"
          value={ email }
        >Email</Input>

        <Input
          className="mt-4"
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

        <span className="inline-block mt-2">Need an account? <Link className="underline text-blue-500" to="/register">Register</Link></span>
      </form>
    </section>
  )
}
