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
    };
}
module.exports = Subscriptions