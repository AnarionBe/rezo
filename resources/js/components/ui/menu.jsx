import React from 'react'
import classNames from 'classnames'
import { Button } from '@components/actions/button'

export const Menu = ({
  className = '',
  options = []
}) => {
  return (
    <div className={ classNames(classes, className) }>
      { options.map((o, i) => (
        <Button
          action={ e => o.action(e) }
          appearance={ o.appearance }
          className={ i !== 0 && 'mt-2' }
          key={ i }
          size={ o.size }
        >{ o.label }</Button>
      )) }
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
