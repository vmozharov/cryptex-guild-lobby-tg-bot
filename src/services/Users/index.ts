import {getIncludeQueryForFullUser, transformQueryUserToFullUser} from './helpers'
import {FullUser} from 'typings/services/user'
import Service from '../Service'

export default class UsersService extends Service {
  public async getUserByTelegramID(telegramID: number): Promise<FullUser | null> {
    const queryUser = await this.database.user.findUnique({
      where: {telegram_user_id: telegramID},
      include: getIncludeQueryForFullUser()
    })
    if (!queryUser) return null
    return transformQueryUserToFullUser(queryUser)
  }

  public async createUser(telegramID: number): Promise<FullUser> {
    const queryUser = await this.database.user.create({
      data: {
        telegram_user: {
          connectOrCreate: {
            where: {telegram_id: telegramID},
            create: {telegram_id: telegramID}
          }
        }
      },
      include: getIncludeQueryForFullUser()
    })
    return transformQueryUserToFullUser(queryUser)
  }
}
