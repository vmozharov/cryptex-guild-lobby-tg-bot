import {TextRegExContext} from 'typings/bot'
import {PrismaClientKnownRequestError} from '@prisma/client/runtime'
import KnownError from 'KnownError'

export default async (ctx: TextRegExContext) => {
  const level = Number(ctx.match[1])
  const name = String(ctx.match[2])
  const score = Number(ctx.match[3])
  const discount = Number(ctx.match[4])

  try {
    await ctx.services.Levels.create(name, level, score, discount)
  } catch (error) {
    if (!(error instanceof PrismaClientKnownRequestError) || error.code !== 'P2002') throw error
    throw new KnownError(ctx.locales.scenes.add_level.error)
  }
  return ctx.reply(ctx.locales.scenes.add_level.success)
}
