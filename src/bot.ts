import servicesIntegrator from 'middlewares/servicesIntegrator'
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

const databaseClient = new PrismaClient()
const services = getServices(databaseClient)

const bot = new Telegraf<BotContext>(config.telegram.bot.token)

bot.use(errorHandler)
bot.use(locales, servicesIntegrator(services))
bot.use(filterActions)

bot.hears(/^\/setup (\S+) ([1-9]\d*)$/, onlyBeforeSetup, setup)

bot.use(onlyAfterSetup)

bot.use(userChecker)

bot.hears(/^\/([-+])(\d+)/, onlyChat, onlyScoreAdmin, manageScore)

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

bot.use(onlyAdmin)
bot.hears(/^\/set_price ([1-9]\d*)$/, setPrice)
bot.hears(/^\/add_level (\d+) ([\w|ЁёА-я]+) (\d+) (\d+)$/, addLevel)
bot.command('levels', levels)

// TODO реализовать неизвестную команду и возврат в меню по любому сообщению и обновление меню по другим сообщениям

//TODO реализовать автоматическое исключение из чата тех, у кого нет или закончилась подписка
// (это должен быть, скорее всего, отдельный процесс или может даже отдельный скрипт)

//TODO реализовать все функции админа (смотреть ТЗ)

//TODO реализовать оплату (с использованием сторонних сервисов,
// а проверку оплаты может делать отдельный скрипт или процесс)

//TODO реализовать уменьшение баллов каждую неделю (можно через крон или скрипты)

export default bot
