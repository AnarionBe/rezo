import React, { useContext, useEffect } from 'react'
import { useDebugState as useState } from 'use-named-state'
import { StoreContext } from 'store'
import { Input } from 'components/forms/input'
import { Button } from 'components/actions/button'
import { Post } from 'components/ui/post'
import { Header } from 'components/ui/header'

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

      <div className="container mx-auto mt-8">
        <form
          className="flex mb-8 gap-4 px-4"
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
            disabled={ posts.state.isCreating }
          >Create post</Button>
        </form>

        <section className="flex flex-col gap-4 p-4 rounded-lg">
          { posts.state.posts.map((e, i) => (
            <Post
              key={ e.id }
              data={ e }
              posts={ posts }
            />
          )) }
        </section>
      </div>
    </>
  )
}
