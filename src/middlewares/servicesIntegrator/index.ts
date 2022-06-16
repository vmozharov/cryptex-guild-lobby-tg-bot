import {BotContext} from 'typings/bot'
import {MiddlewareFn} from 'telegraf'
import {Services} from 'services'

const middleware = (services: Services): MiddlewareFn<BotContext> => {
  return (ctx, next) => {
    ctx.services = services
    return next()
  }
}

export default middleware
