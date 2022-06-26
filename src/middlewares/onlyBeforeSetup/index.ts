import {TextRegExContext} from 'typings/bot'
import {MiddlewareFn} from 'telegraf'
import KnownError from 'KnownError'

const middleware: MiddlewareFn<TextRegExContext> = async (ctx, next) => {
  const hasSetup = await ctx.services.Settings.hasSetup()
  if (hasSetup) throw new KnownError('Бот уже настроен!')
  return next()
}

export default middleware
