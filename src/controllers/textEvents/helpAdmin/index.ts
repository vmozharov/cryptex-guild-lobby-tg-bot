import {TextContext} from 'typings/bot'

export default async (ctx: TextContext) => {
  return ctx.replyWithHTML(ctx.locales.scenes.help_admin)
}
