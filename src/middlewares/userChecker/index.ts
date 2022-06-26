import {BotContext} from 'typings/bot'
import {MiddlewareFn} from 'telegraf'
import KnownError from 'KnownError'

const middleware: MiddlewareFn<BotContext> = async (ctx, next) => {
  if (!ctx.from) return
  let user = await ctx.services.Users.getUserByTelegramID(ctx.from.id.toString())
  if (!user) {
    const lastPrice = await ctx.services.Price.getLastPrice()
    if (!lastPrice) throw new KnownError('В базе отсутствует цена за подписку.')
    user = await ctx.services.Users.createUser(ctx.from.id.toString(), lastPrice.id)
  }
  ctx.user = user
  return next()
}

export default middleware
