import {BotContext} from 'typings/bot'
import {MiddlewareFn} from 'telegraf'
import KnownError from 'KnownError'

const middleware: MiddlewareFn<BotContext> = async (ctx, next) => {
  const hasSetup = await ctx.services.Settings.hasSetup()
  if (!hasSetup) throw new KnownError('Бот не настроен!\n\nВыполните команду "/setup [пароль] [цена месяца доступа в $]".')
  return next()
}

export default middleware
