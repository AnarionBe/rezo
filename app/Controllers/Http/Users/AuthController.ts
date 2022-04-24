import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    try {
      const validator = await schema.create({
        email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
        password: schema.string({}, [rules.confirmed()]),
        // username: schema.string({}, [rules.unique({ table: 'users', column: 'username' })])
      })

      const data = await request.validate({ schema: validator })
      const user = await User.create(data)

      return response.created(user)
    } catch(e) {
      return response.status(422).send(e.messages)
    }
  }

  public async login({ auth, request, response }: HttpContextContract) {
    try {
      const email = request.input('email')
      const password = request.input('password')
      const rememberMe = request.input('remember_me') || false

      await auth.use('web').attempt(email, password, rememberMe)
      return response.status(200)
    } catch(e) {
      return response.send(e)
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    try {
      await auth.use('web').logout()
      return response.status(200)
    } catch(e) {
      return response.send(e)
    }
  }
}
