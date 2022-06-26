import {TextRegExContext} from 'typings/bot'
import {formatPriceText} from './helpers'

export default async (ctx: TextRegExContext) => {
  const match = ctx.match as Array<unknown>
  const command = match[0] as string
  const price = Number(command.slice(11))

  const newPrice = await ctx.services.Price.setPrice(price)
  await ctx.services.Subscriptions.updatePriceWhereMoreThan(newPrice)

  const text = formatPriceText(ctx.locales.scenes.set_price, price)
  return ctx.replyWithHTML(text)
}
