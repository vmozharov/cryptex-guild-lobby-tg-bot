import {FullUser, QueryUser} from 'typings/services/user'
import {cloneDeep} from 'lodash'

export function getIncludeQueryForFullUser() {
  return {
    admin_type: true,
    user_subscriptions: {
      where: {
        active: true
      },
      select: {
        end_date: true,
        price: {
          select: {
            price: true
          }
        }
      }
    }
  }
}

export function transformQueryUserToFullUser(_queryUser: QueryUser): FullUser {
  const fullUser = cloneDeep(_queryUser)
  if (!fullUser.user_subscriptions[0]) {
    return Object.assign(fullUser, {
      subscription_end_date: null,
      subscription_price: 0,
      has_subscription: false
    })
  }
  const subscription = fullUser.user_subscriptions[0]
  return Object.assign(fullUser, {
    subscription_end_date: subscription.end_date,
    subscription_price: subscription.price.price,
    has_subscription: true
  })
}
