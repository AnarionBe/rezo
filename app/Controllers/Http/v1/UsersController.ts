import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UpdateValidator from 'App/Validators/Users/UpdateValidator'
import LoginNoWalletException from 'App/Exceptions/LoginNoWalletException'

export default class UsersController {
  public async login({ request, response }: HttpContextContract) {
    const wallet = request.input('wallet')

    if(!wallet) throw new LoginNoWalletException('rezo_001')

    let user = await User.findBy('wallet', wallet)

    if(!user) {
      user = await User.create({ wallet })
    }

    return response.status(200).json(user)
  }

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
