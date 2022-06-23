import actionTriggers from 'actionTriggers.json'
import ru from 'locales/ru.json'
import {Markup} from 'telegraf'

export function getInlineKeyboardBuySubscription() {
  return Markup.inlineKeyboard([{
    text: ru.shared.buy_subscription,
    callback_data: actionTriggers.buy_subscription
  }])
}
