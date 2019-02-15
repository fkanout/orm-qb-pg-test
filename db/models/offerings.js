const {Model} = require('../index')

class Offerings extends Model {
    static get tableName() {
      return 'offerings';
    }
    static get jsonSchema() {
      return {
        type: 'object',
        properties: {
          id: {type: 'string', format: 'uuid'},
          name: {type: 'string', nullable: 'false'},
          description: {type: 'string'},
          type: {type: 'string'},
          tier: {type: 'string'},
          category: {type: 'string'},
          governance: {type: 'string'},
          offeringTemplateId: {type: 'string', format: 'uuid'},
          offeringTemplateVersion: {type: 'integer'},
          modified: {type: 'boolean'},
          subscriptionId: {type: 'string', format: 'uuid'},
          startDate: {type: 'dateTime'},
          endDate: {type: 'dateTime'},
          lastModifiedVia: {type: 'string'},
          isComplete: {type: 'boolean'},
          hidden: {type: 'boolean'},
          creationDate: {type: 'dateTime'},
          modificationDate: {type: 'dateTime'},
        }
      };
    }
}
module.exports = Offerings