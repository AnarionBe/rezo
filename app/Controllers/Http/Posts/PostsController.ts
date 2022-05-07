import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import CreatePostValidator from 'App/Validators/Posts/CreatePostValidator'

export default class PostsController {
  public async create({ request, response, auth }: HttpContextContract) {
    const { id } = request.params()

    try {
      const data = await request.validate(CreatePostValidator)
      const user = await auth.authenticate()
      const parentPost = id ? await Post.findOrFail(id) : null

      const post = await Post.create(data)

      await post.related('author').associate(user)

      if(parentPost) {
        await post.related('parentPost').associate(parentPost)
      }

      const res = await Post.find(post.id)

      return response.created(res)
    } catch(e) {
      if(e.message.includes('E_ROW_NOT_FOUND')) {
        const res = {
          errors: [{
            field: 'id',
            message: 'Post not found'
          }]
        }

        return response.notFound(res)
      }

      response.internalServerError(e)
    }
  }

  public async get({ response }: HttpContextContract) {
    try {
      const posts = await Post
        .query()
        .preload('author')
        .withCount('comments')
        .where('post_id', null)

      return response.send(posts)
    } catch(e) {
      response.internalServerError(e)
    }
  }

  public async view({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params()

      const res = await Post
        .query()
        .preload('author')
        .preload('comments', query => {
          query.preload('author').withCount('comments')
        })
        .withCount('comments')
        .where('id', id)

      return response.created(res[0])
    } catch(e) {
      const res = {
        errors: [{
          field: 'id',
          message: 'Post not found'
        }]
      }

      response.notFound(res)
    }
  }

  public async delete({ request, response, auth }: HttpContextContract) {
    try {
      const { id } = request.params()
      const user = await auth.authenticate()
      const post = await Post.findOrFail(id)

      if(user.id !== post.userId) return response.unauthorized()

      await post.delete()

      return response.send(post)
    } catch(e) {
      response.notFound(e)
    }
  }
}
