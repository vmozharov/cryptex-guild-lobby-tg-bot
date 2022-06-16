import {BotContext} from 'typings/bot'
import {MiddlewareFn} from 'telegraf'

const middleware: MiddlewareFn<BotContext> = (ctx, next) => {
  if (ctx.chat?.type !== 'private' || ctx.from?.is_bot) return
  // TODO проверяем, сообщение отправлено в один из наших чатов или нет.
  //  Если нет, то игнорируем. Если да, то позволяем выполнять только команду по начислению баллов
  return next()
}

export default middleware
