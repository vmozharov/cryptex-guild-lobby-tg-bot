import {history_of_subscription_price, user_subscription} from '@prisma/client'
import Service from 'services/Service'

export default class SubscriptionsService extends Service {
  public async updatePriceWhereMoreThan(price: history_of_subscription_price) {
    const targetUserPrices = await this.database.history_of_subscription_price.findMany({
      where: {
        price: {
          gte: price.price
        }
      },
      select: {
        user_subscriptions: true
      }
    })

    const targetUserSubscriptions: user_subscription[] = []
    for (const targetUserPrice of targetUserPrices) {
      for (const userSubscription of targetUserPrice.user_subscriptions) {
        targetUserSubscriptions.push(userSubscription)
      }
    }
    for (const targetUserSubscription of targetUserSubscriptions) {
      await this.database.user_subscription.update({
        where: {
          id: targetUserSubscription.id
        },
        data: {
          price_id: price.id
        }
      })
    }
  }
}
