import {TextRegExContext} from 'typings/bot'
import {level} from '@prisma/client'

export function getUserIDOfForwardMessage(ctx: TextRegExContext) {
  if (!('message' in ctx.update && 'reply_to_message' in ctx.update.message)) return null
  const forwardMessage = ctx.update.message.reply_to_message
  if (!forwardMessage) return null
  if (!('from' in forwardMessage)) return null
  return forwardMessage.from ?? null
}

export function getScoreFromCommand(ctx: TextRegExContext) {
  const command = ctx.match[0] as string
  return Number(command.slice(1))
}

export function formatTextChangeScore(text: string, score: number, user: string, totalScore: number, level: level) {
  let textScore = score.toString()
  if (score > 0) textScore = `+${textScore}`
  return text
    .replace('%score%', textScore)
    .replace('%user%', user)
    .replace('%total_score%', totalScore.toString())
    .replace('%level%', level.level.toString())
    .replace('%level_name%', level.name)
}

export function formatTextNewLevel(text: string, user: string, level: number) {
  return text
    .replace('%user%', user)
    .replace('%level%', level.toString())
}
