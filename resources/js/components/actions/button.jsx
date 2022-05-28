import React from 'react'
import * as icons from 'react-icons/fa'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

export const Button =  ({
  action = e => e.preventDefault(),
  appearance = 'button',
  children,
  klass = '',
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

  const classes = {
    '-button': appearance === 'button',
    '-link': appearance === 'link',
    '-subtle': appearance === 'subtle',
    '-link': appearance === 'link',
    '-xs': size === 'xs',
    '-s': size === 's',
    '-m': size === 'm',
  }

  const renderButton = () => {
    return (
      <button
        onClick={ e => action(e) }
        className={ classNames('actions-button', classes, klass) }
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
        className={ classNames('actions-button', classes, klass) }
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
