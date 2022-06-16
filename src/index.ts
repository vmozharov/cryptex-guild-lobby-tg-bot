import bot from 'bot'

bot.launch()
  .then(_ => console.info('Bot launched!'))
  .catch(e => console.error(e))

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
