import {FullUser} from 'typings/services/user'
import {Services} from 'services'
import {Context} from 'telegraf'
import ru from 'locales/ru.json'

export interface BotContext extends Context {
  locales: typeof ru,
  services: Services,
  user: FullUser
}
