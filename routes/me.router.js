/**Requisição HTTP (GET, POST, SET, etc.) e de rotas e métodos para especificar o mecanismo de modelo ("view") usado */
const express = require('express');
/** Cria as rotas no express '/' */
const router = express.Router();
/**Obtém todas s classrooms de um perfil com o seu responsável  */
const MeController = require('../controllers/me.controller');
/** Fornece erros de desenvolvimento */
const { errorHandler } = require('../tools');
/** Realiza a descriptografia do token  */
const { bearer } = require('../middlewares');

/**Traz como resposta o perfil do usuário*/
router.get('/profile', bearer, async function (req, res) {
  try {
    res.send(await MeController.byUser(req.user.id).profile());
  } catch (err) {
    errorHandler(err, res);//Fornece erros de desenvolvimento
  }
});
/**Traz como resposta o class-rooms do usuário */
router.get('/class-rooms', bearer, async function (req, res) {
  try {
    res.send(await MeController.byUser(req.user.id).classRooms());
  } catch (err) {
    errorHandler(err, res);//Fornece erros de desenvolvimento
  }
});

module.exports = router;
