import {TextContext} from 'typings/bot'

export default async (ctx: TextContext) => {
  await ctx.reply(ctx.locales.scenes.help)
}
