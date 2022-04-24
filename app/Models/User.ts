import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class user extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public username: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: user) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}

export const getValidation = field => {
  switch(field) {
    case 'email':
      return schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })])

    case 'password':
      return schema.string({}, [rules.confirmed()])

    case 'username':
      return schema.string({}, [rules.unique({ table: 'users', column: 'username' })])

    default:
      return null
  }
}
