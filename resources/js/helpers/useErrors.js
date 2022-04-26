import { useDebugState } from "use-named-state"
import { basil } from '@spices/basil'

export const useErrors = () => {
  const [errors, setErrors] = useDebugState('errors', [])
  const [status, setStatus] = useDebugState('status', null)

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
