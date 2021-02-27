/**Requisição HTTP (GET, POST, SET, etc.) e de rotas e métodos para especificar o mecanismo de modelo ("view") usado */
const express = require('express');
/** Cria as rotas no express '/' */
const router = express.Router();
/** Cria código de acesso para se inscrever na classroom e escreve usuários nas classrooms*/ 
const ClassRoomController = require('../controllers/class-room.controller');
/** Fornece erros de desenvolvimento */
const { errorHandler } = require('../tools');
/**
 * Bearer - Realiza a descriptografia do token 
 * routeTeacher - Obtém perfil dos usuarios professores 
 */
const { bearer, routeTeacher } = require('../middlewares');

/**Traz como resposta o usuario do tipo professor */
/**Ao testar no postman obtemos a mensagem "unauthorized user" */
router.post('/', bearer, routeTeacher, async function (req, res) {
  try {
    res.send(await ClassRoomController.byUser(req.user.id).create(req.body));
  } catch (err) {
    errorHandler(err, res);
  }
});

/**Edita o código de acesso  */
/**Ao testar no postman e no site apresenta "sala de aula não encontrada" */
router.put('/access', bearer, async function (req, res) {
  try {
    res.send(await ClassRoomController.byUser(req.user.id).addUser({...req.body}));
  } catch (err) {
    errorHandler(err, res);
  }
});

module.exports = router;
