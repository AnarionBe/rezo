import React, { useContext } from 'react'
import classNames from 'classnames'
import { Button } from 'components/actions/button'
import { Menu } from 'components/ui/menu'
import { useDebugState as useState } from 'use-named-state'
import { StoreContext } from 'store'

export const Post = ({
  data,
  className,
}) => {
  const [showMenu, setShowMenu] = useState('showMenu', false)
  const { posts, auth } = useContext(StoreContext)

  const options = [
    {
      label: 'Delete',
      action: async e => {
        e.preventDefault()

        posts.deletePost(data.id)
      },
      appearance: 'subtle',
      size: 'xs',
      disabled: auth.state.currentUser.id !== data.author.id,
    }
  ]

  const enabledOptions = options.filter(opt => !opt.disabled)

  const handleClick = e => {
    e.preventDefault()

    setShowMenu(!showMenu)
  }

  return (
    <div className={ classNames(className, 'bg-gray-800 p-4 rounded-lg') }>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <img
            className="rounded-full h-8 w-8"
            src={ auth.state.currentUser.profile_picture }
          />
          <h4 className="text-lg font-semibold">{ data?.author.username || 'User deleted' }</h4>
        </div>

        { enabledOptions.length > 0 && (
          <div className="relative">
            <Button
              action={ e => handleClick(e) }
              appearance="icon"
              iconPost="FaEllipsisH"
              size="xs"
            />

            { showMenu &&
              <Menu
                className="absolute right-0"
                options={ options }
              />
            }
          </div>
        )}
      </div>

      <div className="mt-4">{ data.content }</div>
    </div>
  )
}
