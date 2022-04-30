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

  public async delete({ request, response, auth }: HttpContextContract) {
    try {
      const { id } = request.params()
      const user = await auth.authenticate()
      const post = await Post.findOrFail(id)

      if(user.id !== post.userId) return response.unauthorized()

      await post.delete()

      return response.send(post)
    } catch(e) {
      console.log(e)
      response.status(404).send(e)
    }
  }
}
