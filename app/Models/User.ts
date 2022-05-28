import { DateTime } from 'luxon'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class user extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public avatar?: string

  @column()
  public wallet?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async generateAvatar(user: user) {
    if(!user.avatar) {
      user.avatar = `https://avatars.dicebear.com/v2/jdenticon/${user.wallet}.svg`
    }
  }
}
