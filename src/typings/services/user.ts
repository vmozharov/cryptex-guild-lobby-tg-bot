import {user, admin_type} from '@prisma/client'

export type QueryUser = user & {
  admin_type: admin_type | null,
  user_subscriptions: {
    end_date: Date | null,
    price: {price: number}
  }[]
}

export type FullUser = user & {
  admin_type: admin_type | null,
  has_subscription: boolean,
  subscription_end_date: Date | null,
  subscription_price: number
}
