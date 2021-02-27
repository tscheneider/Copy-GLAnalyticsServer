/**Express fornece métodos para especificar qual função é chamada quando chega requisição HTTP (GET, POST, SET, etc.) e de rotas e métodos para especificar o mecanismo de modelo ("view") usado, onde o modelo arquivos estão localizados e qual modelo usar para renderizar uma resposta. */
const express = require('express');
/** Cria as rotas no express '/' */
const router = express.Router();
/** Realiza a validação de login no sistema */
const SignController = require('../controllers/sign.controller');
/** Fornece erros de desenvolvimento */
const { errorHandler } = require('../tools');

/**acessa em um novo login */
router.post('/in', async function (req, res) {
  try {
    res.send(await SignController.on().signin(req.body)); //valida novo login
  } catch (err) {
    errorHandler(err, res); //erro de desenvolvimento
  }
});

/**Realiza login através do cadastro de novos usuários  */
router.post('/up', async function (req, res) {
  try {
    res.send(await SignController.on().signup(req.body)); // valida cadastro 
  } catch (err) {
    errorHandler(err, res); //erro de desenvolvimento
  }
});

/**Realiza um login de um novo usuário e de um novo cadastro de usuário */
module.exports = router;
