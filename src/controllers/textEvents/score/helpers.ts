import {level} from '@prisma/client'

export function formatText(text: string, score: number, level: level): string {
  return text
    .replaceAll('%score%', score.toString())
    .replaceAll('%level%', level.level.toString())
    .replaceAll('%name%', level.name.toString())
}
