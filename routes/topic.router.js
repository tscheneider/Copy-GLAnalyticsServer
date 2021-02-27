/** Fornece métodos para especificar qual função é chamada quando chega requisição HTTP (GET, POST, SET, etc.) */
const express = require('express');
/** Cria as rotas no express '/' */
const router = express.Router();
/** Importa  a árvore de tópicos com todos os filhos e seus atributos */
const TopicController = require('../controllers/topic.controller');
/** Fornece erros de desenvolvimento */
const { errorHandler } = require('../tools');
/** Realiza a descriptografia do token */
const { bearer } = require('../middlewares');

/** Obtem o topicController  */
router.get('/', bearer, async function (req, res) {
  try {
    const topicController = new TopicController(); //cria novo TopicController()
    res.send(await topicController.get()); //traz como resposta os topicController
  } catch (err) {
    errorHandler(err, res);//traz erro como resposta
  }
});

/** Obtém o topicController através do idTopic */
router.get('/:idTopic', bearer, async function (req, res) {
  try {
    const topicController = new TopicController();
    res.send(await topicController.getById(req.params.idTopic));
  } catch (err) {
    errorHandler(err, res);
  }
});

/** Obtém os todos os tópicos da árvore */
router.get('/:slugNode/tree', bearer, async function (req, res) {
  try {
    const topicController = new TopicController();
    res.send(await topicController.treeStructure(req.params.slugNode));
  } catch (err) {
    errorHandler(err, res);
  }
});

/** Obtém um tópico especifico */
router.get('/slug/:slug', bearer, async function (req, res) {
  try {
    const topicController = new TopicController();
    res.send(await topicController.getBySlug(req.params.slug));
  } catch (err) {
    errorHandler(err, res);
  }
});

/** exporta router */
module.exports = router;
