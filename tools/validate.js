/**Valida o request no express */
const Joi = require('joi');

/** Realiza a validação do objeto que será passado */
module.exports = async function (data, schema) {
  const sch = Joi.object(schema);

  try {
    await sch.validateAsync(data);
  } catch (err) {
    throw err;
  }
}
