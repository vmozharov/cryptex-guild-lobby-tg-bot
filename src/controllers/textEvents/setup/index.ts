import {TextRegExContext} from 'typings/bot'
import KnownError from 'KnownError'
import config from 'config'

export default async (ctx: TextRegExContext) => {
  const password = ctx.match[1]
  const price = Number(ctx.match[2])

  if (password !== config.password) throw new KnownError('Неверный пароль!')

  const historyPrice = await ctx.services.Price.setPrice(Number(price))
  const mainAdminType = await ctx.services.AdminTypes.create('main', true, true)
  await ctx.services.AdminTypes.create('regular', true, false)
  const user = await ctx.services.Users.createUser(ctx.from.id, historyPrice.id)
  await ctx.services.AdminTypes.addToAdmin(user.id, mainAdminType.id)
  await ctx.services.Subscriptions.turnSubscriptionOfUser(user.id, true)
  await ctx.services.Settings.setMinPackageMonths(config.defaultMinPackageMonths)
  await ctx.services.Settings.setup()
  console.info('Setup complete!')
  return ctx.reply(ctx.locales.scenes.setup)
}
