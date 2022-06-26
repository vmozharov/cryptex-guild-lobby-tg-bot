import {Context, NarrowedContext, Types} from 'telegraf'
import {FullUser} from 'typings/services/user'
import {Services} from 'services'
import ru from 'locales/ru.json'

export interface BotContext extends Context {
  locales: typeof ru,
  services: Services,
  user: FullUser,
  match?: unknown
}

export type TextContext = NarrowedContext<BotContext, Types.MountMap['text']>
export type TextRegExContext = NarrowedContext<BotContext & {match: RegExpExecArray}, Types.MountMap['text']>
