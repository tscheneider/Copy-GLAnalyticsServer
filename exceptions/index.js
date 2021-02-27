/** Apresenta o erro 404  */
const notFound = require('./not-found');
/** Apresenta erro individuo não processável */
const unprocessableEntity = require('./unprocessable-entity');
/** Apresenta erro 403 - user invalido */
const invalidUser = require('./invalid-user');

/**Exporta erro 404, 403 e indivisuo não processavel */
module.exports = {
  notFound,
  unprocessableEntity,
  invalidUser,
};
