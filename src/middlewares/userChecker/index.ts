import {BotContext} from 'typings/bot'
import {MiddlewareFn} from 'telegraf'

const middleware: MiddlewareFn<BotContext> = async (ctx, next) => {
  if (!ctx.from) return
  let user = await ctx.services.Users.getUserByTelegramID(ctx.from.id)
  if (!user) user = await ctx.services.Users.createUser(ctx.from.id)
  ctx.user = user
  return next()
}

export default middleware
