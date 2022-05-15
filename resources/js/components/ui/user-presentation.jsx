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
      { user.profile_picture && (
          <img
          className="ui-user-presentation__avatar"
          src={ user.profile_picture }
          alt={ `${ user.username }'s avatar` }
        />
      )}

      <h4 className="ui-user-presentation__username">{ user.username || 'Anonymous user' }</h4>
    </div>
  )
}
