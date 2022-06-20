import {PrismaClient} from '@prisma/client'
import ChannelsService from './Channels'
import LevelsService from './Levels'
import UsersService from './Users'
import LinksService from 'services/Links'

export interface Services {
  Users: UsersService,
  Levels: LevelsService,
  Channels: ChannelsService,
  Links: LinksService
}

export function getServices(database: PrismaClient): Services {
  return {
    Users: new UsersService(database),
    Levels: new LevelsService(database),
    Channels: new ChannelsService(database),
    Links: new LinksService(database)
  }
}
