import {TextRegExContext} from 'typings/bot'

export default async (ctx: TextRegExContext) => {
  const months = Number(ctx.match[1])
  await ctx.services.Settings.setMinPackageMonths(months)
  return ctx.reply(ctx.locales.scenes.set_package_months)
}
