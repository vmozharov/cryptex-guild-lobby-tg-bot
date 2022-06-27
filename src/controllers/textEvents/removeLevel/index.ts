import {TextRegExContext} from 'typings/bot'
import KnownError from 'KnownError'

export default async (ctx: TextRegExContext) => {
  const levelNumber = Number(ctx.match[1])

  const level = await ctx.services.Levels.getLevel(levelNumber)
  if (!level) throw new KnownError('Уровень не найден.')
  await ctx.services.Levels.deleteLevel(level.level)
  return ctx.reply(ctx.locales.scenes.remove_level)
}
