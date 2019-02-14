const {Model} = require('../index')
class Organizations extends Model {

    static get tableName() {
      return 'organizations';
    }
    
    static get relationMappings() {
        const {Subscriptions} = require('./')
        return {
            subscriptions: {
                relation: Model.HasManyRelation,
                modelClass: Subscriptions,
                join: {
                    from: 'organizations.id',
                    to: 'subscriptions.organizationId'
                }
            }
        }
    }
}
module.exports = Organizations