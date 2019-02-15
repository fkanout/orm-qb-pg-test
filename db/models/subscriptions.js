const {Model} = require('../index')
const Validator = require('objection').Validator;
const ValidationError = require('objection').ValidationError;

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
          offerings: {
              relation: Model.HasManyRelation,
              modelClass: Offerings,
              join: {
                  from: 'subscriptions.id',
                  to: 'offerings.subscriptionId'
              }
          }
      }
  }
  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: {type: 'string', format: 'uuid'},
        name: {type: 'string', nullable: 'false'},
        status: {type: 'string'},
        autoRenew: {type: 'boolean'},
        lastModifiedVia: {type: 'string'},
        organizationId: {type: 'string', format: 'uuid'},
        startDate: {type: 'string', format: 'date-time'},
        endDate: {type: 'string', format: 'date-time'},
        isComplete: {type: 'boolean'},
        creationDate: {type: 'string', format: 'date-time'},
        modificationDate: {type: 'string', format: 'date-time'},
      }
    };
  }
}
module.exports = Subscriptions
