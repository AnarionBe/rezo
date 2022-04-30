import React from 'react'
import classNames from 'classnames'
import { Button } from '@components/actions/button'

export const Menu = ({
  className = '',
  options = []
}) => {
  const enabledOptions = options.filter(opt => !opt.disabled)

  const renderOption = (opt, idx) => {
    return (
      <Button
        action={ e => opt.action(e) }
        appearance={ opt.appearance }
        className={ idx !== 0 && 'mt-2' }
        key={ idx }
        size={ opt.size }
      >{ opt.label }</Button>
    )
  }

  return (
    <div className={ classNames(classes, className) }>
      { enabledOptions.map(renderOption) }
    </div>
  )
}

const classes = [
  'bg-gray-800',
  'p-2',
  'border-2',
  'border-gray-700',
  'rounded-lg',
  'z-10',
]
