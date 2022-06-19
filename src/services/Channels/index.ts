import Service from '../Service'

export default class ChannelsService extends Service {
  public async getChannels(onlyChat = false) {
    const where = onlyChat ? {is_chat: true} : {}
    return await this.database.telegram_channel.findMany({where})
  }
}
