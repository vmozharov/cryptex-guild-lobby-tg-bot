import {history_of_subscription_price, user_subscription} from '@prisma/client'
import Service from 'services/Service'
import KnownError from 'KnownError'

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

  public async prolongSubscriptionOfUser(userID: number, months: number) {
    const userSubscription = await this.database.user_subscription.findFirst({where: {user: {id: userID}}})
    if (!userSubscription) throw new KnownError('Не удалось найти подписку пользователя.')
    if (!userSubscription.end_date && userSubscription.active) return

    const newEndDate = userSubscription.end_date || new Date()
    newEndDate.setDate(newEndDate.getDate() + months * 31)
    await this.database.user_subscription.updateMany({where: {user: {id: userID}}, data: {end_date: newEndDate}})
    if (!userSubscription.active) await this.turnSubscriptionOfUser(userID, true)
  }

  public async turnSubscriptionOfUser(userID: number, active: boolean) {
    await this.database.user_subscription.updateMany({
      where: {user: {id: userID}},
      data: {active}
    })
  }
}
