import React, { useState } from 'react'
import { basil } from '@spices/basil'
import classNames from 'classnames'
import Button from './button'

export default ({
  children = '',
  classes = '',
  name = basil.uniqId('input-'),
  placeholder = '',
  setValue,
  type = 'text',
  value,
}) => {
  const [showField, setShowField] = useState(false)

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
        >{ children }</label>
      }

      <div className="relative">
        <input
          onInput={ e => handleInput(e) }
          className={classNames(fieldClasses)}
          id={ name }
          name={ name }
          placeholder={ placeholder }
          type={ type === 'password' && showField ? 'text' : type }
          value={ value }
        />

        { type === 'password' &&
          <Button
            action={ e => handleShowField(e) }
            classes="absolute right-0 top-0 bottom-0 my-2 mr-2 border-0"
            iconPre={ showField ? 'FaEye' : 'FaEyeSlash' }
            size="s"
          />
        }
      </div>
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
]
