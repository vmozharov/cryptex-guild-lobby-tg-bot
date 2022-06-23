import servicesIntegrator from 'middlewares/servicesIntegrator'
import onlyScoreAdmin from 'middlewares/onlyScoreAdmin'
import onlySubscriber from 'middlewares/onlySubscriber'
import filterActions from 'middlewares/filterActions'
import errorHandler from 'middlewares/errorHandler'
import actionTriggers from './actionTriggers.json'
import userChecker from 'middlewares/userChecker'
import onlyPrivate from 'middlewares/onlyPrivate'
import manageScore from 'controllers/manageScore'
import joinRequest from 'controllers/joinRequest'
import buyAction from 'controllers/buyAction'
import onlyAdmin from 'middlewares/onlyAdmin'
import setPrice from 'controllers/setPrice'
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
import join from 'controllers/join'
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
bot.command('admin', admin)
bot.hears(/^\/set_price \d+$/, setPrice)

// TODO реализовать неизвестную команду и возврат в меню по любому сообщению

//TODO реализовать автоматическое исключение из чата тех, у кого нет или закончилась подписка
// (это должен быть, скорее всего, отдельный процесс или может даже отдельный скрипт)

//TODO реализовать все функции админа (смотреть ТЗ)

//TODO реализовать оплату (с использованием сторонних сервисов,
// а проверку оплаты может делать отдельный скрипт или процесс)

//TODO реализовать уменьшение баллов каждую неделю (можно через крон или скрипты)

//TODO !!!!!!! реализовать команду /setup <пароль из переменных окружения> <цена подписки>, которая проводит первичную настройку системы:
// устанавливает главного админа (главным админом становится тот, кто вызвал команду),
// указывает первичную цену на подписку. Бот не должен работать пока не запустится эта команда, а после запуска команда перестает работать
// (создается поле в настройках в бд с названием "setup_completed" и значением "true", это поле проверяется всегда при взаимодействии с ботом),
// а так же, создаются все другие необходимые строку в БД для работы бота (например, типы админов, минимальный пакет в настройках и т.д.)

export default bot
