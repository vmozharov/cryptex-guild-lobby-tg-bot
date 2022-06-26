import {BotContext} from 'typings/bot'
import {Markup} from 'telegraf'

export function getMainKeyboard(ctx: BotContext) {
  const buttonsText = ctx.locales.main_buttons
  return Markup.keyboard([
    [buttonsText.status, buttonsText.buy],
    [buttonsText.scores, buttonsText.help],
    [buttonsText.join]
  ]).resize()
}
