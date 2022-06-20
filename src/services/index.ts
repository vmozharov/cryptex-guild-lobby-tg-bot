import SubscriptionsService from './Subscriotions'
import {PrismaClient} from '@prisma/client'
import ChannelsService from './Channels'
import LevelsService from './Levels'
import LinksService from './Links'
import PriceService from './Price'
import UsersService from './Users'


export interface Services {
  Users: UsersService,
  Levels: LevelsService,
  Channels: ChannelsService,
  Links: LinksService,
  Price: PriceService,
  Subscriptions: SubscriptionsService,
}

export function getServices(database: PrismaClient): Services {
  return {
    Users: new UsersService(database),
    Levels: new LevelsService(database),
    Channels: new ChannelsService(database),
    Links: new LinksService(database),
    Price: new PriceService(database),
    Subscriptions: new SubscriptionsService(database)
  }
}
