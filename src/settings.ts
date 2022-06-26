export default {
  telegram: {
    bot: {
      token: String(process.env['APP_TG_BOT_TOKEN']),
    }
  },
  password: String(process.env['APP_SETUP_PASSWORD']),
}
