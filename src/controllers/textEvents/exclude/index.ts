import {TextRegExContext} from 'typings/bot'
import KnownError from 'KnownError'

export default async (ctx: TextRegExContext) => {
  const userID = String(ctx.match[1])
  const user = await ctx.services.Users.getUserByTelegramID(userID)
  if (!user) throw new KnownError('Пользователь не найден!')
  await ctx.services.Subscriptions.removeEndDateSubscriptionOfUser(user.id)
  await ctx.services.Subscriptions.turnSubscriptionOfUser(user.id, false)
  await ctx.services.Users.turnExcludeUser(user.id, true)
  return ctx.reply(ctx.locales.scenes.exclude)
}
