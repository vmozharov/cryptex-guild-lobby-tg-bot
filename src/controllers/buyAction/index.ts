import {BotContext} from 'typings/bot'

export default async (ctx: BotContext) => {
  // TODO когда добавим настройку пакетов, нужно заменить количество месяцев здесь на переменную этой настройка
  await ctx.services.Subscriptions.prolongSubscriptionOfUser(ctx.user.id, 3)
  return ctx.reply(ctx.locales.scenes.buy_action)
}
