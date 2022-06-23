import {BotContext} from 'typings/bot'

export default async (ctx: BotContext) => {
  const userID = ctx.from!.id
  if (!ctx.user.subscription.active) return ctx.declineChatJoinRequest(userID)
  return ctx.approveChatJoinRequest(userID)
}
