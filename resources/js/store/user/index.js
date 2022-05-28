import { useReducer, useState } from 'react'
import reducer from './reducer'
import actions from './actions'
import { useErrors } from 'helpers/use-errors'

const initialState = {
  currentUser: null,
  isAuthenticated: false
}

export const useUser = ({ axios, navigate }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState(false)
  const Errors = useErrors()

  const login = async ({ wallet }) => {
    try {
      setIsLoading(true)
      const { data } = await axios.post('/login', { wallet })
      dispatch({ type: actions.LOGIN, payload: { user: data } })
      navigate('/profile')
    } catch(e) {
      Errors.set(e)
      dispatch({ type: actions.LOGOUT })
    } finally {
      setIsLoading(false)
    }
  }
  return {
    state: {
      ...state,
      isLoading
    },
    Errors,
    login,
  }
}
