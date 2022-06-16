import {BotContext} from 'typings/bot'

export default async (ctx: BotContext) => {
  await ctx.reply(ctx.locales.scenes.help)
}
