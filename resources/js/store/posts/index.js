import { useDebugState as useState } from 'use-named-state'
import { useErrors } from '@helpers/useErrors'
import axios from 'axios'

export const usePosts = () => {
  const [posts, setPosts] = useState('posts', [])
  const [isCreating, setIsCreating] = useState('isCreating', false)
  const [isFetchingList, setIsFetchingList] = useState('isFetchingList', false)
  const [isDeleting, setIsDeleting] = useState('isDeleting', false)

  const Errors = useErrors()

  const create = async ({ content }) => {
    try {
      setIsCreating(true)
      const { data } = await axios.post('/api/v1/posts', { content })
      setPosts([data, ...posts])
      return data
    } catch(e) {
      Errors.set(e)
    } finally {
      setIsCreating(false)
    }
  }

  const get = async () => {
    try {
      setIsFetchingList(true)
      const { data } = await axios.get('/api/v1/posts')
      setPosts(data)
      return data
    } catch(e) {
      Errors.set(e)
    } finally {
      setIsFetchingList(false)
    }
  }

  const deletePost = async id => {
    try {
      setIsDeleting(true)
      const { data } = await axios.delete(`/api/v1/posts/${id}`)
      setPosts(posts.filter(post => post.id !== id))
      return data
    } catch(e) {
      Errors.set(e)
    } finally {
      setIsDeleting(false)
    }
  }

  return {
    state: {
      posts,
      isCreating,
      isFetchingList,
      isDeleting
    },
    Errors,
    create,
    get,
    deletePost
  }
}
