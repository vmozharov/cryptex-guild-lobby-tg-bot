import {BotContext} from 'typings/bot'
import {errors} from 'locales/ru.json'
import {MiddlewareFn} from 'telegraf'
import KnownError from 'KnownError'

const middleware: MiddlewareFn<BotContext> = async (ctx, next) => {
  try {
    return await next()
  } catch (error) {
    if (error instanceof KnownError) {
      if (error.show) return ctx.replyWithHTML('<b>[ОШИБКА]</b>\n' + error.message)
      return ctx.reply(errors.known.message)
    }
    console.error(error)
    return ctx.reply(errors.unknown.message)
  }
}

export default middleware
