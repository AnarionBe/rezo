import React, { useState } from 'react'
import { basil } from '@spices/basil'
import classNames from 'classnames'
import { Button } from 'components/actions/button'

export const Input = ({
  children = '',
  error,
  name = basil.uniqId('input-'),
  placeholder = '',
  required = false,
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
    <div className="forms-input">
      { children !== '' &&
        <label
          className={classNames('forms-input__label', {
            '-is-required': required
          })}
          htmlFor={ name }
        >{ children }</label>
      }

      <div className="forms-input__field-container">
        <input
          onInput={ e => handleInput(e) }
          className={classNames('forms-input__field', {
            '-is-errored': error,
            '-has-action': type === 'password'
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
            iconPre={ showField ? 'FaEye' : 'FaEyeSlash' }
            size="s"
            tabIndex="-1"
          />
        }
      </div>

      { basil.get(error, 'message') &&
        <span className="forms-input__error">{ error.message }</span>
      }
    </div>
  )
}
