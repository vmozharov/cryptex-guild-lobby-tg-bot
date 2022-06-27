import {TextRegExContext} from 'typings/bot'
import {formatText} from './helpers'
import {sleep} from 'utils/sleep'

export default async (ctx: TextRegExContext) => {
  const days = Number(ctx.match[1])
  if (days < 1) {
    const messageErrorDays = await ctx.reply(ctx.locales.scenes.mute.error_days)
    sleep(30000).then(() => {
      ctx.deleteMessage()
      ctx.deleteMessage(messageErrorDays.message_id)
    })
    return
  }

  const replyMessage = ctx.message.reply_to_message
  if (!replyMessage) return
  const targetUserID = replyMessage.from?.id
  if (!replyMessage.from || !targetUserID) {
    const messageErrorID = await ctx.reply(ctx.locales.scenes.mute.error_id)
    sleep(30000).then(() => {
      ctx.deleteMessage()
      ctx.deleteMessage(messageErrorID.message_id)
    })
    return
  }

  await ctx.restrictChatMember(targetUserID, {
    permissions: {
      can_send_messages: false,
      can_send_media_messages: false,
      can_send_other_messages: false,
      can_send_polls: false
    },
    until_date: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * days
  })

  const text = ctx.locales.scenes.mute.success
  const username = replyMessage.from.username ? '@' + replyMessage.from.username : replyMessage.from.first_name
  const formattedText = formatText(text, username, days)
  const successMessage = await ctx.reply(formattedText)
  sleep(30000).then(() => {
    ctx.deleteMessage()
    ctx.deleteMessage(successMessage.message_id)
  })
}
