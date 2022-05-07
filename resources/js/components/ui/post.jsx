import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import { Button } from 'components/actions/button'
import { Input } from 'components/forms/input'
import { Menu } from 'components/ui/menu'
import { StoreContext } from 'store'

export const Post = ({
  data,
  className,
  onClick
}) => {
  const [showMenu, setShowMenu] = useState(false)
  const { posts, user } = useContext(StoreContext)

  const options = [
    {
      label: 'Delete',
      action: async e => {
        e.preventDefault()

        posts.api.deletePost(data?.id)
      },
      appearance: 'subtle',
      size: 'xs',
      disabled: user.state.currentUser?.id !== data.author?.id,
    }
  ]

  const enabledOptions = options.filter(opt => !opt.disabled)

  const handleClick = e => {
    e.preventDefault()
    e.stopPropagation()

    setShowMenu(!showMenu)
  }

  const handleFormChange = (field, value) => {
    posts.setForm(field, value)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    e.stopPropagation()

    await posts.api.create({})
  }

  const renderForm = () => {
    return (
      <form
        className="mt-4 flex gap-4"
        onSubmit={ handleSubmit }
        onFocus={ () => handleFormChange('parentId', data.id) }
      >
        <Input
          className="flex-1"
          error={ posts.Errors.get('content') }
          name="content"
          placeholder="Write you answer"
          setValue={ val => handleFormChange('content', val) }
        />

        <Button
          action={ handleSubmit }
          disabled={ posts.state.isCreating }
        >Submit anwser</Button>
      </form>
    )
  }

  return (
    <article
      onClick={ onClick }
      className={ classNames(
        className,
        { 'cursor-pointer': onClick },
        'bg-gray-800 p-4 rounded-lg'
      )}
    >
      <header className="flex justify-between">
        <div className="flex items-center gap-2">
          <img
            className="rounded-full h-8 w-8"
            src={ data.author?.profile_picture }
          />
          <h4 className="text-lg font-semibold">{ data.author?.username || 'User deleted' }</h4>
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
      </header>

      <main className="mt-4">{ data.content }</main>

      <div className="flex mt-4 text-sm gap-2">
        { !data.post_id && <>
          <div>
            <span>Comments:</span>
            <span>{ data.commentsCount }</span>
          </div>

          <div>
            <Button
              appearance="subtle"
              size="s"
            >Answer</Button>
          </div>
        </>}
      </div>

      { !data.post_id && renderForm() }
    </article>
  )
}
