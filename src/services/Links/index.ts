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

  public async addLink(user_id: number, telegram_channel_id: string, link: string, expired_date: number) {
    await this.database.generated_link.create({data: {user_id, telegram_channel_id, link, expired_date}})
  }
}
