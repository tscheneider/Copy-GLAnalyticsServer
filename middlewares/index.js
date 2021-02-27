/** Realiza a descriptografia do token  */
const bearer = require('./bearer');
/**Obtém perfil dos usuarios dos professores */
const routeTeacher = require('./route-teacher');

module.exports = {
  bearer,
  routeTeacher,
}
