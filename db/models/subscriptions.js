const {Model} = require('../index')

class Subscriptions extends Model {
    static get tableName() {
      return 'subscriptions';
    }
  }
module.exports = Subscriptions