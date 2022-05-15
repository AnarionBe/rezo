import React from 'react'
import classNames from 'classnames'
import { Button } from 'components/actions/button'

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
        className="ui-menu__option"
        key={ idx }
        size={ opt.size }
      >{ opt.label }</Button>
    )
  }

  return (
    <div className="ui-menu">
      { enabledOptions.map(renderOption) }
    </div>
  )
}
