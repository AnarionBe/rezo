import React, { useContext, useEffect } from 'react'
import { useDebugState as useState } from 'use-named-state'
import { StoreContext } from '@store'
import { Input } from '@components/forms/input'
import { Button } from '@components/actions/button'
import { Post } from '@components/ui/post'
import { Header } from '@components/ui/header'

export const Home = () => {
  const { posts } = useContext(StoreContext)

  const [content, setContent] = useState('form', '')

  useEffect(() => {
    posts.get()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    await posts.create({ content })
    setContent('')
  }

  return (
    <>
      <Header />

      <div className="container mx-auto bg-gray-800 p-8 rounded-lg mt-8">
        <form
          className="flex mb-8"
          onSubmit={ e => handleSubmit(e) }
        >
          <Input
            className="flex-1"
            error={ posts.Errors.get('content') }
            name="content"
            placeholder="What's on your mind?"
            setValue={ setContent }
            value={ content }
          />

          <Button
            action={ handleSubmit }
            className="ml-4"
            disabled={ posts.state.isCreating }
          >Create post</Button>
        </form>

        { posts.state.posts.map((e, i) => (
          <Post
            className={ i !== 0 && 'mt-4' }
            key={ e.id }
            data={ e }
            posts={ posts }
          />
        )) }
      </div>
    </>
  )
}
