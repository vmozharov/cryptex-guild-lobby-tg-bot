import servicesIntegrator from 'middlewares/servicesIntegrator'
import filterActions from 'middlewares/filterActions'
import errorHandler from 'middlewares/errorHandler'
import userChecker from 'middlewares/userChecker'
import onlyPrivate from 'middlewares/onlyPrivate'
import onlyAdmin from 'middlewares/onlyAdmin'
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

// TODO реализовать управление баллами в чате (только для админов)
// bot.command('+', onlyAdmin, plusScore)
// bot.command('-', onlyAdmin, minusScore)

bot.use(onlyPrivate)

bot.start(start)
bot.help(help)
bot.hears(ru.main_buttons.help, help)

bot.command('admin', onlyAdmin, admin)
// bot.use(onlySubscriber)

bot.hears(ru.main_buttons.scores, score)
bot.hears(ru.main_buttons.status, status)
bot.hears(ru.main_buttons.buy, prolong)

bot.command('score', score)
bot.command('status', status)
bot.command('prolong', prolong)

export default bot
