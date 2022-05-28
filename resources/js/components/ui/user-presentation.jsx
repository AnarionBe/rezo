import React from 'react'
import classNames from 'classnames'

export const UserPresentation = ({
  user,
  inverted = false,
}) => {
  return (
    <div
      className={classNames('ui-user-presentation', {
        '-inverted': inverted,
      })}
    >
      { user.avatar && (
          <img
          className="ui-user-presentation__avatar"
          src={ user.avatar }
          alt={ `${ user.username }'s avatar` }
        />
      )}

      <h4 className="ui-user-presentation__username">{ user.username || `${ user.wallet.slice(0, 10) }...${ user.wallet.slice(user.wallet.length - 4) }` }</h4>
    </div>
  )
}
