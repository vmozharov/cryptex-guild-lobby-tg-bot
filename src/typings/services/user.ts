import {user, admin_type, user_subscription, history_of_subscription_price} from '@prisma/client'

export type FullUser = user & {
  admin_type: admin_type | null,
  subscription: user_subscription & {price: history_of_subscription_price}
}
