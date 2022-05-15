import React, { useContext, useEffect } from 'react'
import { StoreContext } from 'store'
import { Header } from 'components/ui/header'
import { useParams } from 'react-router-dom'
import { Post as PostDetails } from 'components/ui/post'

export const Post = ({}) => {
  const { posts } = useContext(StoreContext)

  const { id } = useParams()

  useEffect(() => {
    posts.api.view(id)
  }, [])

  const renderComments = () => {
    return posts.state.post.comments.map(c => (
      <PostDetails
        className="ml-16 mt-4"
        data={ c }
        key={ c.id }
      />
    ))
  }

  if(posts.state.isLoading || !posts.state.post) {
    return (
      <>
        <Header />

        <h1>Loading post</h1>
      </>
    )
  }

  return (
    <>
      <Header />

      <div className="view-post">
        <PostDetails data={ posts.state.post } />

        { renderComments() }
      </div>
    </>
  )
}
