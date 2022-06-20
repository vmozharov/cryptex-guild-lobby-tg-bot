import {formatLinksText, getAndGenerateUserLinks, getRequiredChannels} from './helpers'
import {BotContext} from 'typings/bot'

export default async (ctx: BotContext) => {
  const channels = await ctx.services.Channels.getChannels()
  await ctx.services.Links.deleteExpiredUserLinks(ctx.user.id)
  const currentLinks = await ctx.services.Links.getUserLinks(ctx.user.id)
  const requiredChannels = await getRequiredChannels(ctx, channels)

  if (requiredChannels.length === 0) return ctx.replyWithHTML(ctx.locales.scenes.join_nothing)

  const channelLinks = await getAndGenerateUserLinks(ctx, requiredChannels, currentLinks)

  const linksList = channelLinks.map(({channelName, link}) => `${channelName} - ${link}`).join('\n')
  const resultText = formatLinksText(ctx.locales.scenes.join, linksList)
  return ctx.replyWithHTML(resultText)
}
