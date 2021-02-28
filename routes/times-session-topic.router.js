/** Fornece métodos para especificar qual função é chamada quando chega requisição HTTP (GET, POST, SET, etc.) */
const express = require('express');
/** Cria as rotas no express '/' */
const router = express.Router();
/** Fornece erros de desenvolvimento */
const { errorHandler } = require('../tools');
/**  */
const TimeSessionTopicController = require('../controllers/times-session-topic.controller');

/**  */
router.post('/:idTopic', async function (req, res) {
    try {
     // console.log('req.body', req.body)
     // console.log('req.params.idTopic', req.params.idTopic)
      res.send(await TimeSessionTopicController.byTopic(req.params.idTopic).create(req.body));

    } catch (err) {
      errorHandler(err, res); //erro de desenvolvimento
    }
});

router.get('/:idTopic/session', async function (req, res) {
  try {

    res.send(await TimeSessionTopicController.byTopic(req.params.idTopic).getSession());

  } catch (err) {
    errorHandler(err, res); //erro de desenvolvimento
  }
});

router.get('/profile/:profileId', async function (req, res) {
  try {

    res.send(await new TimeSessionTopicController().getAllTopicsByProfile(req.params.profileId));

  } catch (err) {
    errorHandler(err, res);
  }
});

router.get('/session/:sessionId', async function (req, res) {
  try {

    res.send(await new TimeSessionTopicController().getAllTopicsBySession(req.params.sessionId));

  } catch (err) {
    errorHandler(err, res);
  }
});
  
module.exports = router;