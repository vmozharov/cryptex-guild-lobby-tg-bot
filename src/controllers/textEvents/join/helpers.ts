import {generated_link, telegram_channel} from '@prisma/client'
import {BotContext} from 'typings/bot'
import KnownError from 'KnownError'

export function formatLinksText(text: string, linksText: string) {
  return text.replace('%links%', linksText)
}

export async function getAndGenerateUserLinks(ctx: BotContext, channels: telegram_channel[], currentLinks: generated_link[]) {
  const findChannelInCurrentLinks = (channelID: string) => {
    return currentLinks.find(link => link.telegram_channel_id === channelID)
  }

  const channelLinks: ChannelLinks[] = []
  for (const channel of channels) {
    const chat = await ctx.telegram.getChat(channel.telegram_id)
    const currentLink = findChannelInCurrentLinks(channel.telegram_id)
    const chatTitle = ('title' in chat) ? chat.title : 'Unknown'

    if (currentLink) {
      channelLinks.push({channelName: chatTitle, link: currentLink.link})
      continue
    }
    const expire_date = Math.floor(Date.now() / 1000) + 60 * 60 * 24
    const link = await ctx.telegram.createChatInviteLink(channel.telegram_id, {
      // member_limit: 1,
      expire_date,
      creates_join_request: true
    })
    if (!link.expire_date) throw new KnownError('Link\'s expire date is not defined')
    await ctx.services.Links.addLink(ctx.user.id, channel.telegram_id, link.invite_link, link.expire_date)
    channelLinks.push({channelName: chatTitle, link: link.invite_link})
  }
  return channelLinks
}

export async function getRequiredChannels(ctx: BotContext, channels: telegram_channel[]) {
  const requiredChannels: telegram_channel[] = []
  for (const channel of channels) {
    const member = await ctx.telegram.getChatMember(Number(channel.telegram_id), Number(ctx.user.telegram_user_id))
    if (member.status === 'left' || member.status === 'kicked') requiredChannels.push(channel)
  }
  return requiredChannels
}

type ChannelLinks = {
  channelName: string,
  link: string
}
