import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import CreatePostValidator from 'App/Validators/Posts/CreatePostValidator'

export default class PostsController {
  public async create({ request, response, auth }: HttpContextContract) {
    try {
      const data = await request.validate(CreatePostValidator)
      const user = await auth.authenticate()
      const post = await Post.create(data)

      await post.related('author').associate(user)

      return response.created(post)
    } catch(e) {
      response.status(500).send(e)
    }
  }

  public async get({ response }: HttpContextContract) {
    try {
      const posts = await Post.query().preload('author')

      return response.send(posts)
    } catch(e) {
      response.status(500).send(e)
    }
  }

  public async delete({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params()
      const post = await Post.find(id)

      if(!post) return response.notFound(id)

      await post.delete()

      return response.send(post)
    } catch(e) {
      response.status(500).send(e)
    }
  }
}
