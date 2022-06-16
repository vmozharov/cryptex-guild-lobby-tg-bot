import {level} from '@prisma/client'
import Service from '../Service'

export default class LevelsService extends Service {
  public async getLevelByScore(score: number): Promise<level | null> {
    return this.database.level.findFirst({
      where: {
        score: {
          lte: score
        }
      }
    })
  }
}
