const {Model} = require('../index')

class Subscriptions extends Model {
    static get tableName() {
      return 'subscriptions';
    }
    static get modifiers() {
      return{
        onlyActive(builder) {
          builder.where('status', 'active');
        }
      }
    }
    static get relationMappings() {
      const {Offerings} = require('./')
      return {
          subscriptions: {
              relation: Model.HasManyRelation,
              modelClass: Offerings,
              join: {
                  from: 'subscriptions.id',
                  to: 'offerings.subscriptionId'
              }
          }
      }
  }
}
module.exports = Subscriptions