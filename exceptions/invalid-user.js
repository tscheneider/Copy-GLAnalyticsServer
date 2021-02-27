/** Apresenta erro 403 - user invalido */
class InvalidUser extends Error {
    constructor(msg = 'invalid user') {
      super(msg);
      this.status = 403;
    }
  }
  
  module.exports = InvalidUser;
  