import React from 'react'
import { Link } from 'react-router-dom'

export const Home = (props) => {
  console.log(props)
  return (
    <div>
      <h1>Hello Home</h1>
      <Link to="/about">About</Link>
    </div>
  )
}
