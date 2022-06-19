import {BotContext} from 'typings/bot'
import {MiddlewareFn} from 'telegraf'

const middleware: MiddlewareFn<BotContext> = async (ctx, next) => {
  const chatType = ctx.chat?.type ?? 'unknown'
  if (chatType !== 'private' && chatType !== 'group' && chatType !== 'supergroup') return
  if (!ctx.from || ctx.from.is_bot) return

  if (chatType !== 'private') {
    const chats = await ctx.services.Channels.getChannels(true)
    let isValidChat = false
    for (const chat of chats) {
      if (Number(chat.telegram_id) === ctx.chat?.id) {
        isValidChat = true
        break
      }
    }
    if (!isValidChat) return
  }
  return next()
}

export default middleware
