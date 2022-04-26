import React from 'react'
import { useDebugState as useState } from 'use-named-state'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

import { Input } from '@components/input'
import { Button } from '@components/button'

import { useErrors } from '@helpers/useErrors'

export const Register = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('email', '')
  const [password, setPassword] = useState('password', '')
  const [passwordConfirm, setPasswordConfirm] = useState('passwordConfirm', '')
  const [username, setUsername] = useState('username', '')

  const Errors = useErrors()

  const handleSubmit = async e => {
    try {
      e.preventDefault()

      await axios.post(`${process.env.REACT_APP_API_URL}/register`, {
        email,
        password,
        password_confirmation: passwordConfirm,
        username
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
          error={ Errors.get('email') }
          name="email"
          placeholder="eg. elon@spacex.com"
          required
          setValue={ setEmail }
          type="email"
          value={ email }
        >Email</Input>

        <Input
          error={ Errors.get('username') }
          name="username"
          classes="mt-4"
          placeholder="eg. elonmusk"
          required
          setValue={ setUsername }
          type="text"
          value={ username }
        >Username</Input>

        <Input
          error={ Errors.get('password') }
          name="password"
          classes="mt-4"
          placeholder="******"
          required
          setValue={ setPassword }
          type="password"
          value={ password }
        >Password</Input>

        <Input
          error={ Errors.get('password_confirmation') }
          name="password_confirmation"
          classes="mt-4"
          placeholder="******"
          required
          setValue={ setPasswordConfirm }
          type="password"
          value={ passwordConfirm }
        >Confirm password</Input>

        <Button
          action={ handleSubmit }
          classes="mt-8 w-full"
          disabled={ !password || !passwordConfirm || !email || !username }
        >Register</Button>

        <span className="inline-block mt-4">Already an account? <Link className="underline text-blue-500" to="/login">Sign in</Link></span>
      </form>
    </section>
  )
}
