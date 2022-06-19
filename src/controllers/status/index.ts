import {BotContext} from 'typings/bot'
import {formatStatusText} from 'controllers/status/helpers'

export default async (ctx: BotContext) => {
  const statusLocales = ctx.locales.scenes.status
  const text = formatStatusText(statusLocales.text, ctx.user.has_subscription, ctx.user.subscription_end_date)
  return ctx.replyWithHTML(text)
}
