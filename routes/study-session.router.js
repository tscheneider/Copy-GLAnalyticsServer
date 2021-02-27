/**Express fornece métodos para especificar qual função é chamada quando chega requisição HTTP (GET, POST, SET, etc.) e de rotas e métodos para especificar o mecanismo de modelo ("view") usado, onde o modelo arquivos estão localizados e qual modelo usar para renderizar uma resposta. */
const express = require('express');
/** Cria as rotas no express '/' */
const router = express.Router();
/** Criação da sessão de estudos  com  o perfil e a classRoomId e Finaliza a sessão de estudos */
const StudySessionController = require('../controllers/study-session.controller');
/** Fornece erros de desenvolvimento */
const { errorHandler } = require('../tools');
/** Realiza a descriptografia do token   */
const { bearer } = require('../middlewares');

/** Cria a sessão de estudo de um determinado estudante */
router.post('/study', bearer, async function (req, res) {
  try {
    res.send(await StudySessionController.byUser(req.user.id).create(req.body));//Busca o usuario 
  } catch (err) {
    errorHandler(err, res); //apresenta erro de desenvolvimento
  }
});

/** Finaliza a sessão de estudo de um determinado estudante */
router.put('/study/finish', bearer, async function (req, res) {
  try {
    res.send(await StudySessionController.byUser(req.user.id).finish());
  } catch (err) {
    errorHandler(err, res);
  }
});

/**Obtém todas as sessões de estudos */
router.get('/study/all', bearer, async function (req, res) {
  try {
    res.send(await StudySessionController.byUser(req.user.id).get());
  } catch (err) {
    errorHandler(err, res);
  }
});

/** Obter uma sessão de estudos  */
router.get('/study/:profileId', bearer, async function (req, res) {
  console.log(req.params)
  const { profileId } = req.params
  try {
    res.send(await StudySessionController.byUser(req.user.id).getStudiesSessionsByProfileId(profileId));
  } catch (err) {
    errorHandler(err, res);
  }
}); 

/** Cria e finaliza a sessão de estudo de um determinado estudante */
module.exports = router;
