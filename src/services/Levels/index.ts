import {level} from '@prisma/client'
import Service from '../Service'

export default class LevelsService extends Service {
  public async getLevelByScore(score: number): Promise<level | null> {
    if (score <= 0) return await this.database.level.findFirst({where: {level: 0}})
    return await this.database.level.findFirst({
      where: {score: {lte: score}},
      orderBy: {score: 'desc'}
    })
  }

  public async getAll() {
    return await this.database.level.findMany()
  }
}
