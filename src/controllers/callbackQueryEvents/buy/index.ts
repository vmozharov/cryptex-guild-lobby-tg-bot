import {BotContext} from 'typings/bot'

export default async (ctx: BotContext) => {
  const packageMonths = await ctx.services.Settings.getMinPackageMonths()
  await ctx.services.Subscriptions.prolongSubscriptionOfUser(ctx.user.id, packageMonths)
  return ctx.reply(ctx.locales.scenes.buy_action)
}
