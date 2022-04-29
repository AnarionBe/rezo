import { useDebugState as useState } from 'use-named-state'
import { useErrors } from '@helpers/useErrors'
import axios from 'axios'

export const usePosts = () => {
  const [posts, setPosts] = useState('posts', [])
  const Errors = useErrors()

  const create = async ({ content }) => {
    try {
      const { data } = await axios.post('/api/v1/posts', { content })
      return data
    } catch(e) {
      Errors.set(e)
    }
  }

  const get = async () => {
    try {

    } catch(e) {
      Errors.set(e)
    }
  }

  return {
    state: {
      posts,
    },
    Errors,
    create
  }
}
