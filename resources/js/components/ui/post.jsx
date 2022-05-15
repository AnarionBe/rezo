import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import { Button } from 'components/actions/button'
import { Input } from 'components/forms/input'
import { Menu } from 'components/ui/menu'
import { UserPresentation } from 'components/ui/user-presentation'
import { StoreContext } from 'store'

export const Post = ({
  data,
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
      className={classNames('ui-post', {
        'cursor-pointer': onClick
      })}
    >
      <header className="ui-post__header">
        <UserPresentation user={ data.author } />

        { enabledOptions.length > 0 && (
          <div className="ui-post__actions">
            <Button
              action={ e => handleClick(e) }
              appearance="icon"
              iconPost="FaEllipsisH"
              size="xs"
            />

            { showMenu &&
              <Menu options={ options } />
            }
          </div>
        )}
      </header>

      <main className="ui-post__content">{ data.content }</main>

      <div className="ui-post__footer">
        { !data.post_id && <>
          <div>
            <span>Comments: </span>
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
