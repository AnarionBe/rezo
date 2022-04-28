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
      console.log(e)
      if(e.messages) {
        return response.status(422).send(e.messages)
      }
      return response.status(500)
    }
  }

  public async delete({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params()

      const user = await User.findOrFail(id)

      return await user.delete()
    } catch(e) {
      return response.status(500)
    }
  }
}
