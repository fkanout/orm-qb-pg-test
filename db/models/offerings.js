const {Model} = require('../index')

class Offerings extends Model {
    static get tableName() {
      return 'offerings';
    }

}
module.exports = Offerings