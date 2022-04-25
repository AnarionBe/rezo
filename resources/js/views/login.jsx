import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

import Input from '../components/input'
import Button from '../components/button'

export default () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    try {
      e.preventDefault()

      await axios.post('http://127.0.0.1:3333/api/v1/login', {
        email,
        password
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
          placeholder="******"
          setValue={ setPassword }
          type="password"
          value={ password }
        >Password</Input>

        <Button
          action={ handleSubmit }
          classes="mt-6 w-full"
        >Login</Button>

        <span className="inline-block mt-2">Need an account? <Link className="underline text-blue-500" to="/register">Register</Link></span>
      </form>
    </section>
  )
}
