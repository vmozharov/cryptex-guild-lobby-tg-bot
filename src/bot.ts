import servicesIntegrator from 'middlewares/servicesIntegrator'
import filterActions from 'middlewares/filterActions'
import errorHandler from 'middlewares/errorHandler'
import userChecker from 'middlewares/userChecker'
import onlyAdmin from 'middlewares/onlyAdmin'
import {PrismaClient} from '@prisma/client'
import locales from 'middlewares/locales'
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
bot.use(filterActions)
bot.use(locales, servicesIntegrator(services), userChecker)

bot.start(start)
bot.hears(ru.main_buttons.help, help)
bot.hears(ru.main_buttons.scores, score)
bot.help(help)
bot.command('admin', onlyAdmin, admin)

export default bot
