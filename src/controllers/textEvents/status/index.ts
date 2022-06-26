import {BotContext} from 'typings/bot'
import {formatStatusText} from 'controllers/textEvents/status/helpers'

export default async (ctx: BotContext) => {
  const statusLocales = ctx.locales.scenes.status
  const text = formatStatusText(statusLocales.text, ctx.user.subscription.active, ctx.user.subscription.end_date)
  return ctx.replyWithHTML(text)
}
