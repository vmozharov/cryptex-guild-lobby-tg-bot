import {getInlineBuyKeyboard} from './helper'
import {BotContext} from 'typings/bot'

export default async (ctx: BotContext) => {
  const inlineBuyKeyboard = getInlineBuyKeyboard(ctx)
  return ctx.reply(ctx.locales.scenes.prolong, inlineBuyKeyboard)
}
