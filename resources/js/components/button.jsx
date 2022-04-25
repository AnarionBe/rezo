import React from 'react'
import * as icons from 'react-icons/fa'
import classNames from 'classnames'

export default ({
  action = e => e.preventDefault(),
  children,
  classes = '',
  iconPre,
  iconPost,
  size = 'm'
}) => {
  const IconPre = icons[iconPre] || null
  const IconPost = icons[iconPost] || null

  return (
    <button
      onClick={ e => action(e) }
      className={ classNames(buttonClasses, classes, {
        'px-4 py-2': size === 'm',
        'px-2': size === 's',
      })}
    >
      { IconPre &&
        <IconPre />
      }
      { children }
      { IconPost &&
        <IconPost />
      }
    </button>
  )
}

const buttonClasses = [
  'bg-gray-900',
  'rounded-lg',
  'hover:bg-gray-700',
]
