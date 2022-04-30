import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/Users/RegisterValidator'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(RegisterValidator)
      const user = await User.create(data)

      return response.created(user)
    } catch(e) {
      if(e.messages) {
        return response.status(422).send(e.messages)
      }

      return response.status(500)
    }
  }

  public async login({ auth, request, response }: HttpContextContract) {
    try {
      const email = request.input('email')
      const password = request.input('password')
      const rememberMe = request.input('rememberMe') || false

      const user = await auth.use('web').attempt(email, password, rememberMe)

      return response.status(200).send(user)
    } catch(e) {
      const res = {
        errors: [{
          field: 'auth',
          message: 'Invalid credentials'
        }]
      }
      return response.status(401).send(res)
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
