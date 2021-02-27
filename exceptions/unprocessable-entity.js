/**Apresenta erro individuo não processável */
class UnprocessableEntity extends Error {
    constructor(msg = 'unprocessable entity') {
      super(msg);
      this.status = 422;
    }
  }
  
  module.exports = UnprocessableEntity;
  