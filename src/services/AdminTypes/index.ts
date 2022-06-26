import Service from 'services/Service'

export default class AdminTypesService extends Service {
  public async create(name: string, access_to_scores: boolean, full_access: boolean) {
    return await this.database.admin_type.create({data: {name, access_to_scores, full_access}})
  }

  public async addToAdmin(user_id: number, admin_type: string | number) {
    const where = typeof admin_type === 'string' ? {name: admin_type} : {id: admin_type}
    return await this.database.admin_type.update({where, data: {users: {connect: {id: user_id}}}})
  }
}
