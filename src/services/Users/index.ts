import {getIncludeQueryForFullUser} from './helpers'
import {FullUser} from 'typings/services/user'
import Service from '../Service'

export default class UsersService extends Service {
  public async getUserByTelegramID(telegram_user_id: number): Promise<FullUser | null> {
    const queryUser = await this.database.user.findUnique({
      where: {telegram_user_id},
      include: getIncludeQueryForFullUser()
    })
    if (!queryUser) return null
    return queryUser
  }

  public async createUser(telegram_id: number, price_id: number): Promise<FullUser> {
    return await this.database.user.create({
      data: {
        telegram_user: {create: {telegram_id}},
        subscription: {create: {price_id}}
      },
      include: getIncludeQueryForFullUser()
    })
  }

  public async updateScoreUser(targetID: number, score: number, fromID: number): Promise<FullUser> {
    await this.database.history_scores.create({
      data: {
        scores: score,
        admin_id: fromID,
        target_user_id: targetID
      }
    })
    return await this.database.user.update({
      where: {id: targetID},
      data: {
        scores: {
          increment: score
        }
      },
      include: getIncludeQueryForFullUser()
    })
  }
}
