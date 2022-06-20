import {BotContext} from 'typings/bot'

export default async (ctx: BotContext) => {
  const userID = ctx.from!.id
  if (!ctx.user.has_subscription) return ctx.declineChatJoinRequest(userID)
  return ctx.approveChatJoinRequest(userID)
}
