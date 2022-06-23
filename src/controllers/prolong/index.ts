import {getInlineKeyboardBuySubscription} from 'shared/subscriptionInlineKeyboard'
import {BotContext} from 'typings/bot'

export default async (ctx: BotContext) => {
  const inlineBuyKeyboard = getInlineKeyboardBuySubscription()
  return ctx.reply(ctx.locales.scenes.prolong, inlineBuyKeyboard)
}
