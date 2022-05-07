import { useState } from 'react'
import { basil } from '@spices/basil'

export const useErrors = () => {
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

  const set = e => {
    setErrors(basil.get(e, 'response.data.errors', []))
    setStatus(basil.get(e, 'response.status', null))
  }

  const get = field => {
    return errors.find(e => e.field === field)
  }

  return {
    errors,
    status,
    set,
    get
  }
}
