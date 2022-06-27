import servicesIntegrator from 'middlewares/servicesIntegrator'
import setPackageMonths from 'textEvents/setPackageMonths'
import onlyBeforeSetup from 'middlewares/onlyBeforeSetup'
import onlyScoreAdmin from 'middlewares/onlyScoreAdmin'
import onlySubscriber from 'middlewares/onlySubscriber'
import joinRequest from 'joinRequestEvents/joinRequest'
import onlyAfterSetup from 'middlewares/onlyAfterSetup'
import filterActions from 'middlewares/filterActions'
import errorHandler from 'middlewares/errorHandler'
import actionTriggers from './actionTriggers.json'
import userChecker from 'middlewares/userChecker'
import onlyPrivate from 'middlewares/onlyPrivate'
import manageScore from 'textEvents/manageScore'
import buyAction from 'callbackQueryEvents/buy'
import onlyAdmin from 'middlewares/onlyAdmin'
import onlyChat from 'middlewares/onlyChat'
import {PrismaClient} from '@prisma/client'
import setPrice from 'textEvents/setPrice'
import addLevel from 'textEvents/addLevel'
import locales from 'middlewares/locales'
import prolong from 'textEvents/prolong'
import addChat from 'textEvents/addChat'
import levels from 'textEvents/levels'
import status from 'textEvents/status'
import {BotContext} from 'typings/bot'
import start from 'textEvents/start'
import setup from 'textEvents/setup'
import score from 'textEvents/score'
import {getServices} from 'services'
import join from 'textEvents/join'
import help from 'textEvents/help'
import {Telegraf} from 'telegraf'
import ru from 'locales/ru.json'
import config from 'config'
import addAdmin from 'textEvents/addAdmin'
import removeAdmin from 'textEvents/removeAdmin'
import exclude from 'textEvents/exclude'
import unban from 'textEvents/unban'
import mute from 'textEvents/mute'

const databaseClient = new PrismaClient()
const services = getServices(databaseClient)

const bot = new Telegraf<BotContext>(config.telegram.bot.token)

bot.use(errorHandler)
bot.use(locales, servicesIntegrator(services))
bot.use(filterActions)

bot.hears(/^\/setup (\S+) (\d*)$/, onlyBeforeSetup, setup)

bot.use(onlyAfterSetup)

bot.use(userChecker)

bot.hears(/^\/([-+])(\d+)/, onlyChat, onlyScoreAdmin, manageScore)
bot.hears(/^\/mute (\d+)$/, onlyChat, onlyScoreAdmin, mute)

bot.on('chat_join_request', joinRequest)

bot.use(onlyPrivate)

bot.start(start)
bot.command('saveme', start)
bot.help(help)
bot.hears(ru.main_buttons.help, help)

bot.hears(ru.main_buttons.join, onlySubscriber, join)
bot.hears(ru.main_buttons.scores, onlySubscriber, score)
bot.hears(ru.main_buttons.status, status)
bot.hears(ru.main_buttons.buy, prolong)

bot.command('join', onlySubscriber, join)
bot.command('score', onlySubscriber, score)
bot.command('status', status)
bot.command('prolong', prolong)

bot.action(actionTriggers.buy_subscription, buyAction)

bot.hears(/^\/set_price (\d*)$/, onlyAdmin, setPrice)
bot.hears(/^\/add_level (\d+) ([\w|ЁёА-я]+) (\d+) (\d+)$/, onlyAdmin, addLevel)
bot.hears(/^\/set_package_months (\d+)$/, onlyAdmin, setPackageMonths)
bot.hears(/^\/add_chat (-\d+)$/, onlyAdmin, addChat)
bot.hears(/^\/add_admin (\d+)$/, onlyAdmin, addAdmin)
bot.hears(/^\/remove_admin (\d+)$/, onlyAdmin, removeAdmin)
bot.hears(/^\/exclude (\d+)$/, onlyAdmin, exclude)
bot.hears(/^\/unban (\d+)$/, onlyAdmin, unban)
bot.command('levels', onlyAdmin, levels)

bot.on('text', start)

//TODO реализовать автоматическое исключение из чата тех, у кого нет или закончилась подписка
// (это должен быть, скорее всего, отдельный процесс или может даже отдельный скрипт)
// Он должен очищать EndDate и убирать активную подписку

// TODO реализовать возможность главному админу забирать или выдавать пользователям месяцы доступа или вечный доступ

//TODO реализовать оплату (с использованием сторонних сервисов,
// а проверку оплаты может делать отдельный скрипт или процесс)

// TODO если возможно, то реализовать мут командой в чате (через restrictChatMember)
//  (должны использовать и не главные админы)

//TODO реализовать уменьшение баллов каждую неделю (можно через крон или скрипты)

export default bot
