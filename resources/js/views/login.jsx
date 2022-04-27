import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

import { Input } from '@components/input'
import { Button } from '@components/button'

import { useErrors } from '@helpers/useErrors'

export const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const Errors = useErrors()

  const handleSubmit = async e => {
    try {
      e.preventDefault()

      await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        email,
        password
      })

      navigate('/')
    } catch(e) {
      Errors.set(e)
    }
  }

  return (
    <section className="flex justify-center items-center h-full">
      <form
        onSubmit={ e => handleSubmit(e) }
        className="bg-gray-800 p-4 mx-4 rounded-xl"
      >
        <Input
          error={ Errors.get('auth') }
          name="email"
          placeholder="eg. elon@spacex.com"
          required
          setValue={ setEmail }
          type="email"
          value={ email }
        >Email</Input>

        <Input
          classes="mt-4"
          error={ Errors.get('auth') }
          name="password"
          placeholder="******"
          required
          setValue={ setPassword }
          type="password"
          value={ password }
        >Password</Input>

        <Button
          action={ handleSubmit }
          classes="mt-6 w-full"
          disabled={ !password || !email }
        >Login</Button>

        <span className="inline-block mt-2">Need an account? <Link className="underline text-blue-500" to="/register">Register</Link></span>
      </form>
    </section>
  )
}
