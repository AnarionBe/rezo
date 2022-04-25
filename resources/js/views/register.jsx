import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

import Input from '../components/input'
import Button from '../components/button'

export default () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [username, setUsername] = useState('')

  const handleSubmit = async e => {
    try {
      e.preventDefault()

      await axios.post('http://127.0.0.1:3333/api/v1/register', {
        email,
        password,
        password_confirmation: passwordConfirm,
        username
      })

      navigate('/')
    } catch(e) {
      console.error(e)
    }
  }

  return (
    <section className="flex justify-center items-center h-full">
      <form
        onSubmit={ e => handleSubmit(e) }
        className="bg-gray-800 p-4 mx-4 rounded-xl"
      >
        <Input
          placeholder="eg. elon@spacex.com"
          setValue={ setEmail }
          type="email"
          value={ email }
        >Email</Input>

        <Input
          classes="mt-4"
          placeholder="eg. elonmusk"
          setValue={ setUsername }
          type="text"
          value={ username }
        >Username</Input>

        <Input
          classes="mt-4"
          placeholder="******"
          setValue={ setPassword }
          type="password"
          value={ password }
        >Password</Input>

        <Input
          classes="mt-4"
          placeholder="******"
          setValue={ setPasswordConfirm }
          type="password"
          value={ passwordConfirm }
        >Confirm password</Input>

        <Button
          action={ handleSubmit }
          classes="mt-6 w-full"
        >Register</Button>

        <span className="inline-block mt-2">Already an account? <Link className="underline text-blue-500" to="/login">Sign in</Link></span>
      </form>
    </section>
  )
}
