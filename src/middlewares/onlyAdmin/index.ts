import {BotContext} from 'typings/bot'
import {MiddlewareFn} from 'telegraf'

const middleware: MiddlewareFn<BotContext> = async (ctx, next) => {
  if (!ctx.user.admin_type?.full_access) return
  return next()
}

export default middleware
