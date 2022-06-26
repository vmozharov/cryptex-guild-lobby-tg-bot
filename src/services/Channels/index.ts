import Service from '../Service'

export default class ChannelsService extends Service {
  public async getChannels(onlyChat = false) {
    const where = onlyChat ? {is_chat: true} : {}
    return await this.database.telegram_channel.findMany({where})
  }

  public async create(telegram_id: string, is_chat: boolean) {
    return await this.database.telegram_channel.create({data: {is_chat, telegram_id}})
  }
}
