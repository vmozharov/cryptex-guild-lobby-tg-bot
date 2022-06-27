import {TextRegExContext} from 'typings/bot'
import KnownError from 'KnownError'

export default async (ctx: TextRegExContext) => {
  const userID = String(ctx.match[1])

  const user = await ctx.services.Users.getUserByTelegramID(userID)
  if (!user) throw new KnownError('Пользователь не найден.')
  await ctx.services.Subscriptions.removeEndDateSubscriptionOfUser(user.id)
  return ctx.reply(ctx.locales.scenes.remove_end_date)
}
