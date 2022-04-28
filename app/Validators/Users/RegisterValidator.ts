import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' })
    ]),

    password: schema.string({ trim: true }, [
      rules.confirmed()
    ]),

    username: schema.string({ trim: true }, [
      rules.unique({ table: 'users', column: 'username' })
    ])
  })

  public messages = {
    'email.email': 'Email is not valid',
    'email.unique': 'Email is already taken',
    'email.required': 'Email is required',
    'password.required': 'Password is required',
    'password_confirmation.confirmed': 'Password confirmation doesn\'t match',
    'username.required': 'Username is required',
  }
}
