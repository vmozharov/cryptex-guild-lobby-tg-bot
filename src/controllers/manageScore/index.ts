import {formatTextChangeScore, formatTextNewLevel, getScoreFromCommand, getUserIDOfForwardMessage} from './helpers'
import {BotContext} from 'typings/bot'
import KnownError from 'KnownError'
import {sleep} from 'utils/sleep'
import {Message} from 'typegram'

export default async (ctx: BotContext) => {
  const targetTelegramUser = getUserIDOfForwardMessage(ctx)
  const score = getScoreFromCommand(ctx)
  if (!targetTelegramUser || !score || targetTelegramUser.is_bot) {
    throw new KnownError(ctx.locales.errors.scores.not_user_or_score)
  }

  let targetUser = await ctx.services.Users.getUserByTelegramID(targetTelegramUser.id)
  if (!targetUser) throw new KnownError(ctx.locales.errors.scores.not_user)
  const prevLevelOfUser = await ctx.services.Levels.getLevelByScore(targetUser.scores)
  if (!prevLevelOfUser) throw new KnownError(ctx.locales.errors.levels_problem)

  targetUser = await ctx.services.Users.updateScoreUser(targetUser.id, score, ctx.user.id)

  const levelOfUser = await ctx.services.Levels.getLevelByScore(targetUser.scores)
  if (!levelOfUser) throw new KnownError(ctx.locales.errors.levels_problem)
  const username = targetTelegramUser.username ? '@'+targetTelegramUser.username : targetTelegramUser.first_name
  const text = ctx.locales.scenes.change_score

  const formattedText = formatTextChangeScore(text, score, username, targetUser.scores, levelOfUser)
  const messageChangeScore = await ctx.replyWithHTML(formattedText)

  let messageNewLevel: Message.TextMessage | undefined
  if (prevLevelOfUser.level < levelOfUser.level) {
    const newLevelText = ctx.locales.scenes.new_level
    const formattedNewLevelText = formatTextNewLevel(newLevelText, username, levelOfUser.level)
    messageNewLevel = await ctx.replyWithHTML(formattedNewLevelText)
  }

  sleep(1000 * 60 * 5).then(async () => {
    try {
      if (ctx.message) await ctx.deleteMessage(ctx.message?.message_id)
      await ctx.deleteMessage(messageChangeScore.message_id)
      if (messageNewLevel) await ctx.deleteMessage(messageNewLevel?.message_id)
    } catch {}
  }).catch()
  return
}
