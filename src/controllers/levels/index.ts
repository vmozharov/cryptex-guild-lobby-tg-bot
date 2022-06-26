import {TextContext} from 'typings/bot'
import {levelToText} from './helpers'

export default async (ctx: TextContext) => {
  const levels = await ctx.services.Levels.getAll()

  if (levels.length === 0) return ctx.reply(ctx.locales.scenes.levels.not_levels)

  const text = levels.map(levelToText).join('\n---\n')
  return ctx.reply(text)
}
