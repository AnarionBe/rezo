import React, { useContext } from 'react'
import classNames from 'classnames'
import { Button } from '@components/actions/button'
import { Menu } from '@components/ui/menu'
import { useDebugState as useState } from 'use-named-state'
import { StoreContext } from '@store'

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
    <div className={ classNames(className, 'bg-gray-900 p-4 rounded-lg') }>
      <div className="flex justify-between">
        <h4 className="text-lg font-semibold">{ data?.author.username || 'User deleted' }</h4>

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

      <div className="mt-2">{ data.content }</div>
    </div>
  )
}
