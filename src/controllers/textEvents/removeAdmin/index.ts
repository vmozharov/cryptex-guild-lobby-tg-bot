import {TextRegExContext} from 'typings/bot'
import KnownError from 'KnownError'

export default async (ctx: TextRegExContext) => {
  const userID = String(ctx.match[1])

  const user = await ctx.services.Users.getUserByTelegramID(userID)
  if (!user) throw new KnownError('Не удалось найти этого пользователя в базе.')

  const regularAdminType = await ctx.services.AdminTypes.getAdminType('regular')
  if (!regularAdminType) throw new KnownError('В базе отсуствует тип администратора "regular".')
  await ctx.services.AdminTypes.removeFromAdmin(user.id, regularAdminType.id)
  if (!user.subscription.end_date) await ctx.services.Subscriptions.turnSubscriptionOfUser(user.id, false)
  return ctx.reply(ctx.locales.scenes.remove_admin)
}
