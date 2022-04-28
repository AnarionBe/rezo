import { DateTime } from 'luxon'
import {
  column,
  BaseModel,
  belongsTo,
  type BelongsTo
} from '@ioc:Adonis/Lucid/Orm'

import User from 'App/Models/User'

export default class post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string

  @column()
  public likes: number

  @column()
  public userId: number

  @belongsTo(() => User)
  public author: BelongsTo<typeof User>

  // Comments

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true })
  public updatedAt: DateTime
}
