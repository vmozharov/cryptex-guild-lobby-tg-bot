import {TextRegExContext} from 'typings/bot'
import KnownError from 'KnownError'

export default async (ctx: TextRegExContext) => {
  const userID = String(ctx.match[1])
  const months = Number(ctx.match[2])

  const user = await ctx.services.Users.getUserByTelegramID(userID)
  if (!user) throw new KnownError('Пользователь не найден.')
  if (months < 1) throw new KnownError('Количество месяцев должно быть больше 0.')

  await ctx.services.Subscriptions.takeMonthsOfSubscriptionUser(user.id, months)
  return ctx.reply(ctx.locales.scenes.take_months)
}
