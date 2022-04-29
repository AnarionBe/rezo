import React, { useContext } from 'react'
import { useDebugState as useState } from 'use-named-state'
import { StoreContext } from '@store'
import { Input } from '@components/forms/input'
import { Button } from '@components/actions/button'

export const Home = () => {
  const { posts } = useContext(StoreContext)

  const [content, setContent] = useState('form', '')

  const handleSubmit = async e => {
    e.preventDefault()
    await posts.create({ content })
  }

  return (
    <div>
      <form
        onSubmit={ e => handleSubmit(e) }
      >
        <Input
          error={ posts.Errors.get('content') }
          name="content"
          placeholder="What's on your mind?"
          setValue={ setContent }
          value={ content }
        />

        <Button action={ handleSubmit }>Create post</Button>
      </form>
    </div>
  )
}
