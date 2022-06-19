import servicesIntegrator from 'middlewares/servicesIntegrator'
import onlyScoreAdmin from 'middlewares/onlyScoreAdmin'
import filterActions from 'middlewares/filterActions'
import errorHandler from 'middlewares/errorHandler'
import userChecker from 'middlewares/userChecker'
import onlyPrivate from 'middlewares/onlyPrivate'
import manageScore from 'controllers/manageScore'
import onlyAdmin from 'middlewares/onlyAdmin'
import onlyChat from 'middlewares/onlyChat'
import {PrismaClient} from '@prisma/client'
import locales from 'middlewares/locales'
import prolong from 'controllers/prolong'
import status from 'controllers/status'
import {BotContext} from 'typings/bot'
import start from 'controllers/start'
import admin from 'controllers/admin'
import score from 'controllers/score'
import {getServices} from 'services'
import help from 'controllers/help'
import {Telegraf} from 'telegraf'
import ru from 'locales/ru.json'
import settings from 'settings'

const databaseClient = new PrismaClient()
const services = getServices(databaseClient)

const bot = new Telegraf<BotContext>(settings.telegram.bot.token)

bot.use(errorHandler)
bot.use(locales, servicesIntegrator(services), filterActions, userChecker)

bot.hears(/^\/[-+]\d+/, onlyChat, onlyScoreAdmin, manageScore)

bot.use(onlyPrivate)

bot.start(start)
bot.help(help)
bot.hears(ru.main_buttons.help, help)

bot.command('admin', onlyAdmin, admin)
// bot.use(onlySubscriber)

//TODO реализовать получение ссылок для входа в канал если есть подписки
// и только на те каналы, в которых пользователь еще не состоит
// (чтобы нельзя было плодить много ссылок и рассылать друзьям)
bot.hears(ru.main_buttons.scores, score)
bot.hears(ru.main_buttons.status, status)
bot.hears(ru.main_buttons.buy, prolong)

bot.command('score', score)
bot.command('status', status)
bot.command('prolong', prolong)

//TODO реализовать автоматическое исключение из чата тех, у кого нет или закончилась подписка
// (это должен быть, скорее всего, отдельный процесс или может даже отдельный скрипт)

//TODO реализовать проверку тех, кто присоединяется к каналам или чатам и если у этого пользователя нет подписки,
// то автоматически исключать его

//TODO реализовать админ-панель с требуемым функционалом (смотреть ТЗ)

//TODO реализовать оплату (с использованием сторонних сервисов,
// а проверку оплаты может делать отдельный скрипт или процесс)

export default bot
