import {BotContext} from 'typings/bot'
import {MiddlewareFn} from 'telegraf'
import ru from 'locales/ru.json'

const middleware: MiddlewareFn<BotContext> = (ctx, next) => {
  ctx.locales = ru
  return next()
}

export default middleware
