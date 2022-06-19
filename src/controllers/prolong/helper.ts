import {BotContext} from 'typings/bot'
import {Markup} from 'telegraf'

export function getInlineBuyKeyboard(ctx: BotContext) {
  return Markup.inlineKeyboard([
    {text: ctx.locales.shared.buy_subscription, callback_data: 'buy_subscription'},
  ])
}
