import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UpdateValidator from 'App/Validators/Users/UpdateValidator'

export default class UsersController {
  public async update({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(UpdateValidator)

      const { id } = request.params()
      const user = await User.findOrFail(id)

      return await user.merge(data).save()
    } catch(e) {
      if(e.messages) {
        return response.status(422).send(e.messages)
      }

      return response.internalServerError(e)
    }
  }

  public async delete({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params()

      const user = await User.findOrFail(id)

      return await user.delete()
    } catch(e) {
      return response.internalServerError(e)
    }
  }

  public async linkWallet({ request, response, auth }: HttpContextContract) {
    try {
      const { id } = await auth.authenticate()
      const wallet = request.input('wallet')
      const user = await User.findOrFail(id)

      return await user.merge({ wallet }).save()
    } catch(e) {
      return response.internalServerError(e)
    }
  }
}
