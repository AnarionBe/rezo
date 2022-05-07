import { useEffect, useReducer, useState } from 'react'
import { useErrors } from 'helpers/use-errors'
import actions from './actions'
import reducer from './reducer'
import initialState from './defaults'

export const usePosts = ({ axios }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    get()
  }, [])

  const Errors = useErrors()

  const create = async ({ preserveForm }) => {
    const path = state.form.parentId ? `/posts/${ state.form.parentId }/comment` : '/posts'
    const type = state.form.parentId ? actions.ADD_COMMENT : actions.ADD_ONE

    try {
      setIsLoading(true)
      const { data } = await axios.post(path, state.form)

      dispatch({ type, payload: { post: data, preserveForm } })
    } catch(e) {
      Errors.set(e)
    } finally {
      setIsLoading(false)
    }
  }

  const get = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get('/posts')
      dispatch({ type: actions.SET_LIST, payload: { posts: data } })
    } catch(e) {
      Errors.set(e)
    } finally {
      setIsLoading(false)
    }
  }

  const deletePost = async id => {
    try {
      setIsLoading(true)
      const { data } = await axios.delete(`/posts/${id}`)
      dispatch({ type: actions.REMOVE_ONE, payload: { post: data } })
    } catch(e) {
      Errors.set(e)
    } finally {
      setIsLoading(false)
    }
  }

  const view = async id => {
    try {
      setIsLoading(true)
      const { data } = await axios.get(`/posts/${id}`)
      dispatch({ type: actions.SET_POST, payload: { post: data } })
    } catch(e) {
      dispatch({ type: actions.SET_POST, payload: { post: null } })
      Errors.set(e)
    } finally {
      setIsLoading(false)
    }
  }

  const setForm = (field, value) => {
    dispatch({ type: actions.SET_FORM, payload: { field, value } })
  }

  return {
    state: {
      ...state,
      isLoading
    },
    api: {
      create,
      get,
      deletePost,
      view
    },
    Errors,
    setForm
  }
}
