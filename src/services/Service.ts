import {PrismaClient} from '@prisma/client'

export default class Service {
  protected readonly database: PrismaClient
  public constructor(database: PrismaClient) {
    this.database = database
  }
}
