import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User, { getValidation } from 'App/Models/User'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class UsersController {
  public async update({ request, response }: HttpContextContract) {
    try {
      const validatorSchema = {}

      for(const field in request.body()) {
        const validation = getValidation(field)

        if(validation) {
          validatorSchema[field] = validation
        }
      }

      const data = await request.validate({ schema: await schema.create(validatorSchema) })

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
