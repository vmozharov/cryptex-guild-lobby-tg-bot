import {getIncludeQueryForFullUser, transformQueryUserToFullUser} from './helpers'
import {FullUser} from 'typings/services/user'
import Service from '../Service'

export default class UsersService extends Service {
  public async getUserByTelegramID(telegramID: number): Promise<FullUser | null> {
    const queryUser = await this.database.user.findUnique({
      where: {telegram_user_id: String(telegramID)},
      include: getIncludeQueryForFullUser()
    })
    if (!queryUser) return null
    return transformQueryUserToFullUser(queryUser)
  }

  public async createUser(telegramID: number): Promise<FullUser> {
    const formattedID = String(telegramID)
    const queryUser = await this.database.user.create({
      data: {
        telegram_user: {
          connectOrCreate: {
            where: {telegram_id: formattedID},
            create: {telegram_id: formattedID}
          }
        }
      },
      include: getIncludeQueryForFullUser()
    })
    return transformQueryUserToFullUser(queryUser)
  }
}
