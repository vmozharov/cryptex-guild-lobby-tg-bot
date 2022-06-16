import {getInlineBuyKeyboard, getMainKeyboard} from './helpers'
import {BotContext} from 'typings/bot'
import {sleep} from 'utils/sleep'
import {Markup} from 'telegraf'

export default async (ctx: BotContext) => {
  if (!ctx.user.has_subscription) {
    await ctx.reply(ctx.locales.scenes.start.without_subscription, Markup.removeKeyboard())
    await ctx.replyWithChatAction('typing')
    sleep(2000).then(() => ctx.reply(ctx.locales.scenes.start.offer, getInlineBuyKeyboard(ctx)))
    return
  }
  return ctx.reply(ctx.locales.scenes.start.with_subscription, getMainKeyboard(ctx))
}
