import { DateTime } from 'luxon'
import {
  column,
  BaseModel,
  belongsTo,
  type BelongsTo,
  hasMany,
  type HasMany,
  computed
} from '@ioc:Adonis/Lucid/Orm'

import User from 'App/Models/User'
import Post from 'App/Models/Post'

export default class post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string

  @column()
  public likes: number

  @column()
  public userId: number

  @column()
  public postId?: number

  @computed()
  public get commentsCount(): number {
    return this.$extras.comments_count
  }

  @belongsTo(() => User)
  public author: BelongsTo<typeof User>

  @belongsTo(() => Post)
  public parentPost: BelongsTo<typeof Post>

  @hasMany(() => Post)
  public comments: HasMany<typeof Post>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true })
  public updatedAt: DateTime
}
