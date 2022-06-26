import Service from 'services/Service'
import config from 'config'

export default class SettingsService extends Service {
  public async setup() {
    return await this.database.settings.create({data: {name: 'setup', value: 'true'}})
  }

  public async hasSetup() {
    const setup = await this.database.settings.findUnique({where: {name: 'setup'}})
    return !!setup
  }

  public async setMinPackageMonths(_months: number | string) {
    const months = String(_months)

    const setting = await this.database.settings.findUnique({where: {name: 'min_package_months'}})
    if (setting) return await this.database.settings.update({where: {name: setting.name}, data: {value: months}})
    return await this.database.settings.create({data: {name: 'min_package_months', value: months}})
  }

  public async getMinPackageMonths() {
    const months = await this.database.settings.findUnique({where: {name: 'min_package_months'}})
    return months ? Number(months.value) : config.defaultMinPackageMonths
  }
}
