import Service from 'services/Service'

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
    return await this.database.settings.create({data: {name: 'min_package_months', value: months}})
  }
}
