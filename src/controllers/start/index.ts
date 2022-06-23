import {getInlineKeyboardBuySubscription} from 'shared/subscriptionInlineKeyboard'
import {getMainKeyboard} from './helpers'
import {BotContext} from 'typings/bot'
import {sleep} from 'utils/sleep'
import {Markup} from 'telegraf'

const msToSecondMessage = 1000

export default async (ctx: BotContext) => {
  if (!ctx.user.subscription.active) {
    await ctx.reply(ctx.locales.scenes.start.without_subscription, Markup.removeKeyboard())
    await ctx.replyWithChatAction('typing')
    sleep(msToSecondMessage).then(() => ctx.reply(ctx.locales.scenes.start.offer, getInlineKeyboardBuySubscription()))
    return
  }
  return ctx.reply(ctx.locales.scenes.start.with_subscription, getMainKeyboard(ctx))
}
