import Service from 'services/Service'

export default class LinksService extends Service {
  public async getUserLinks(userID: number) {
    return await this.database.generated_link.findMany({
      where: {
        user_id: userID
      }
    })
  }

  public async deleteExpiredUserLinks(userID: number) {
    await this.database.generated_link.deleteMany({
      where: {
        user_id: userID,
        expired_date: {
          lte: Math.floor(new Date().getTime() / 1000)
        }
      }
    })
  }

  public async addLink(userID: number, channelID: string, link: string, expiredDate: number) {
    await this.database.generated_link.create({
      data: {
        user_id: userID,
        telegram_channel_id: channelID,
        link,
        expired_date: expiredDate
      }
    })
  }
}
