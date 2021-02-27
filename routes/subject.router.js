/**Requisição HTTP (GET, POST, SET, etc.) e de rotas e métodos para especificar o mecanismo de modelo ("view") usado */
const express = require('express');
/** Cria as rotas no express '/' */
const router = express.Router();
/**Obtem todos os tópicos filhos a partir do parentId */
const SubjectController = require('../controllers/subject.controller');
/** Fornece erros de desenvolvimento */
const { errorHandler } = require('../tools');
/** Realiza a descriptografia do token  */
const { bearer } = require('../middlewares');

/** Obtém o tópico buscado*/
router.get('/', bearer, async function (req, res) {
  try {
    const subjectController = new SubjectController();
    res.send(await subjectController.get());
  } catch (err) {
    errorHandler(err, res);
  }
});

module.exports = router;
