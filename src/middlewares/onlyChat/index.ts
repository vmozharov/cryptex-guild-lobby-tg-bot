import {BotContext} from 'typings/bot'
import {MiddlewareFn} from 'telegraf'

const middleware: MiddlewareFn<BotContext> = async (ctx, next) => {
  if (ctx.chat?.type !== 'group' && ctx.chat?.type !== 'supergroup') return
  return next()
}

export default middleware
