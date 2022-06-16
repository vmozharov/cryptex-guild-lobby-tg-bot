import {PrismaClient} from '@prisma/client'
import UsersService from './Users'
import LevelsService from './Levels'

export interface Services {
  Users: UsersService,
  Levels: LevelsService
}

export function getServices(database: PrismaClient): Services {
  return {
    Users: new UsersService(database),
    Levels: new LevelsService(database),
  }
}
