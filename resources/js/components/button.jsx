import React from 'react'
import * as icons from 'react-icons/fa'
import classNames from 'classnames'

export const Button =  ({
  action = e => e.preventDefault(),
  children,
  classes = '',
  disabled = false,
  iconPre,
  iconPost,
  size = 'm',
  tabIndex = ""
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
      disabled={ disabled }
      tabIndex={ tabIndex }
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
  'border-gray-700',
  'border-2',
  'hover:border-gray-500',
  'disabled:opacity-50',
  'disabled:hover:bg-gray-900',
  'disabled:hover:border-gray-700',
]
