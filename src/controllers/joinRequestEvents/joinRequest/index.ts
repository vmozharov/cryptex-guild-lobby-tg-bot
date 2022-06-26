import {JoinRequestContext} from 'typings/bot'

export default async (ctx: JoinRequestContext) => {
  if (!ctx.user.subscription.active) return ctx.declineChatJoinRequest(ctx.user.telegram_user_id)
  return ctx.approveChatJoinRequest(ctx.user.telegram_user_id)
}
