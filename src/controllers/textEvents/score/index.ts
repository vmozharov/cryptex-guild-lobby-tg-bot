import {BotContext} from 'typings/bot'
import {formatText} from './helpers'
import KnownError from 'KnownError'

export default async (ctx: BotContext) => {
  const level = await ctx.services.Levels.getLevelByScore(ctx.user.scores)
  if (!level) throw new KnownError(ctx.locales.errors.levels_problem)

  const text = formatText(ctx.locales.scenes.score, ctx.user.scores, level)
  return ctx.replyWithHTML(text, {disable_web_page_preview: true})
}
