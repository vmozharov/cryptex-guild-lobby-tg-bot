import {PrismaClientKnownRequestError} from '@prisma/client/runtime'
import {TextRegExContext} from 'typings/bot'
import {TelegramError} from 'telegraf'
import KnownError from 'KnownError'

export default async (ctx: TextRegExContext) => {
  const id = String(ctx.match[1])

  let chat
  try {
    chat = await ctx.telegram.getChat(id)
  } catch (error) {
    if (!(error instanceof TelegramError) || error.response.error_code !== 400) throw error
    throw new KnownError('Не удалось найти чат.')
  }

  const botMember = await ctx.telegram.getChatMember(id, ctx.botInfo.id)
  if (botMember.status !== 'administrator') throw new KnownError('Бот не в админах чата!')
  if (!botMember.can_manage_chat || !botMember.can_delete_messages || !botMember.can_invite_users || !botMember.can_restrict_members) {
    throw new KnownError('У бота недостаточно прав для администрирования чата!')
  }

  const isChat = chat.type === 'supergroup' || chat.type === 'group'
  try {
    await ctx.services.Channels.create(id, isChat)
  } catch (error) {
    if (!(error instanceof PrismaClientKnownRequestError)) throw error
    if (error.code !== 'P2002') throw error
    throw new KnownError('Чат уже добавлен!')
  }

  return ctx.reply(ctx.locales.scenes.add_chat)
}
