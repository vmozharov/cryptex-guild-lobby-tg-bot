import {PrismaClient} from '@prisma/client'
import ChannelsService from './Channels'
import LevelsService from './Levels'
import UsersService from './Users'

export interface Services {
  Users: UsersService,
  Levels: LevelsService,
  Channels: ChannelsService,
}

export function getServices(database: PrismaClient): Services {
  return {
    Users: new UsersService(database),
    Levels: new LevelsService(database),
    Channels: new ChannelsService(database)
  }
}
