import {level} from '@prisma/client'

export function levelToText(level: level): string {
  return `Уровень: ${level.level}\nБаллы:${level.score}\nСкидка:${level.discount}%`
}
