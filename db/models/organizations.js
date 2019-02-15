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
    static get jsonSchema() {
        return {
          type: 'object',
          properties: {
            id: {type: 'string', format: 'uuid'},
            referenceId: {type: 'string', nullable: 'true'},
            sourceName: {type: 'string'},
            sourceOrganizationId: {type: 'string'},
            migrated: {type: 'boolean'},
            manuallyTerminated: {type: 'boolean'},
            region: {type: 'string'},
            domain: {type: 'string'},
            lastModifiedVia: {type: 'string'},
            isComplete: {type: 'boolean'},
            creationDate: {type: 'string', format: 'date-time'},
            modificationDate: {type: 'string', format: 'date-time'},
          }
        };
      }
}
module.exports = Organizations