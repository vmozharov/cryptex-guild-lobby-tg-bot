import {BotContext} from 'typings/bot'
import {MiddlewareFn} from 'telegraf'

const middleware: MiddlewareFn<BotContext> = async (ctx, next) => {
  if (!ctx.user.subscription.active) return ctx.reply(ctx.locales.shared.only_subscribers)
  return next()
}

export default middleware
