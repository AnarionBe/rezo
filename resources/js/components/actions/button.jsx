import React from 'react'
import * as icons from 'react-icons/fa'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

export const Button =  ({
  action = e => e.preventDefault(),
  appearance = 'button',
  children,
  className = '',
  disabled = false,
  iconPre,
  iconPost,
  size = 'm',
  tabIndex = '',
  to = {},
  type = 'button',
}) => {
  const IconPre = icons[iconPre] || null
  const IconPost = icons[iconPost] || null

  const renderButton = () => {
    return (
      <button
        onClick={ e => action(e) }
        className={ classNames(appearanceClasses[appearance], className, {
          'px-4 py-2': size === 'm',
          'px-2': size === 's',
          'px-1 text-sm': size === 'xs',
        })}
        disabled={ disabled }
        tabIndex={ tabIndex }
        type={ type }
      >{ renderContent() }</button>
    )
  }

  const renderLink = () => {
    return (
      <Link
        to={ to }
        className={ classNames(appearanceClasses[appearance], className)}
        disabled={ disabled }
        tabIndex={ tabIndex }
        type={ type }
      >{ renderContent() }</Link>
    )
  }

  const renderContent = () => {
    return (
      <>
        { IconPre && <IconPre /> }
        { children }
        { IconPost && <IconPost /> }
      </>
    )
  }

  if(appearance === 'link') {
    return renderLink()
  }

  return renderButton()
}

const appearanceClasses = {
  button: [
    'bg-gray-900',
    'rounded-lg',
    'hover:bg-gray-700',
    'border-gray-700',
    'border-2',
    'hover:border-gray-500',
    'disabled:opacity-50',
    'disabled:hover:bg-gray-900',
    'disabled:hover:border-gray-700',
  ],

  icon: [
    'bg-transparent',
    'hover:bg-gray-700',
    'rounded-full',
    'w-8',
    'h-8',
    'flex',
    'justify-center',
    'items-center',
  ],

  subtle: [
    'bg-transparent',
    'p-0',
    'hover:underline',
  ],

  link: [
    'bg-transparent',
    'p-0',
    'hover:underline',
  ]
}
