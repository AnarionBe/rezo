import React from 'react'
import { useDebugState as useState } from 'use-named-state'
import { basil } from '@spices/basil'
import classNames from 'classnames'
import { Button } from '@components/actions/button'

export const Input = ({
  children = '',
  classes = '',
  error,
  name = basil.uniqId('input-'),
  placeholder = '',
  required = false,
  setValue,
  type = 'text',
  value,
}) => {
  const [showField, setShowField] = useState('showField', false)

  const handleInput = e => {
    setValue(e.target.value)
  }

  const handleShowField = e => {
    e.preventDefault()

    setShowField(!showField)
  }

  return (
    <div className={ classNames('input', classes) }>
      { children !== '' &&
        <label
          className="inline-block mb-1 relative"
          htmlFor={ name }
        >
          { children }
          { required &&
            <span className="pl-1 text-red-600 text-lg">*</span>
          }
        </label>
      }

      <div className="relative">
        <input
          onInput={ e => handleInput(e) }
          className={classNames(fieldClasses, {
            '-is-errored': error
          })}
          id={ name }
          name={ name }
          placeholder={ placeholder }
          required={ required }
          type={ type === 'password' && showField ? 'text' : type }
          value={ value }
        />

        { type === 'password' &&
          <Button
            action={ e => handleShowField(e) }
            classes="absolute right-0 top-0 bottom-0 my-2 mr-2 border-0"
            iconPre={ showField ? 'FaEye' : 'FaEyeSlash' }
            size="s"
            tabIndex="-1"
          />
        }
      </div>

      { basil.get(error, 'message') &&
        <span className="text-red-500">{ error.message }</span>
      }
    </div>
  )
}

const fieldClasses = [
  'bg-gray-900',
  'rounded-lg',
  'border-2',
  'border-gray-700',
  'w-full',
  'p-2',
  'err:border-red-500',
]
