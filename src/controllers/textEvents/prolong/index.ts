import {getInlineKeyboardBuySubscription} from 'shared/subscriptionInlineKeyboard'
import {TextContext} from 'typings/bot'

export default async (ctx: TextContext) => {
  const inlineBuyKeyboard = getInlineKeyboardBuySubscription()
  return ctx.reply(ctx.locales.scenes.prolong, inlineBuyKeyboard)
}
