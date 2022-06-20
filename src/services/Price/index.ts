import Service from 'services/Service'

export default class PriceService extends Service {
  public async setPrice(price: number) {
    const lastPrice = await this.getLastPrice()
    if (lastPrice?.price === price) return lastPrice
    return await this.database.history_of_subscription_price.create({
      data: {
        price
      }
    })
  }

  public async getLastPrice() {
    return await this.database.history_of_subscription_price.findFirst({
      orderBy: {
        created_at: 'desc'
      }
    })
  }
}
