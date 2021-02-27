/**Requisição HTTP (GET, POST, SET, etc.) e de rotas e métodos para especificar o mecanismo de modelo ("view") usado */
const express = require('express');
/**Cria as rotas no express '/' */
const router = express.Router();
/** Cria e atualiza as sessões de estudos  */
const StudySessionTopicController = require('../controllers/study-session-topic.controller');
/** Importa  a árvore de tópicos com todos os filhos e seus atributos */
const TopicController = require('../controllers/topic.controller');
/** 
 * errorHandler - Fornece erros de desenvolvimento 
 * findOne - Recebe os modelos das tabelas sequilize
*/
const { errorHandler, findOne, findAll  } = require('../tools');
/** Realiza a descriptografia do token  */
const { bearer } = require('../middlewares');
/** Obtém um perfil através do email */
const { getProfile } = require('../helpers/user.helper');

/**Montagem das tabelas através do sequilize */
const models = require('../models');

const db = require('../models');

/** Cria uma sessão de estudo com o tópico estudado */
router.post('/topic', bearer, async function (req, res) {
  try {
    /**Obtém perfil */
    const profile = await getProfile(req.user.id);
    /**Obtem sessão de estudos */
    const studySession = await findOne('StudySession', {
      profileId: profile.id,
      endAt: null,
    });
    /**traz como resposta a criação de uma nova sessão de estudos */
    res.send(await StudySessionTopicController.byStudySession(studySession.id).create(req.body));
  } catch (err) {
    errorHandler(err, res); //apresenta erro de desenvolvimento
  }
});

/**Finaliza uma sessão de estudo com os tópicos especifico estudado estudados */
router.put('/topic/:sessionStudyTopicId/finish', bearer, async function (req, res) {
  try {
    /**Obtém perfil */
    const profile = await getProfile(req.user.id);

    /** studySession recebe o perfil */
    const studySession = await findOne('StudySession', {
      profileId: profile.id,
      endAt: null,
    });    
    /**traz como resposta a finalização de uma sessão de estudos */
    res.send(await StudySessionTopicController.byStudySession(studySession.id).finish(req.params.sessionStudyTopicId));
  } catch (err) {
    errorHandler(err, res);//apresenta erro de desenvolvimento
  }
});

/**Finaliza todas as sessões de estudos dos tópicos  */
router.put('/topic/finish', bearer, async function (req, res) {
  try {
    const profile = await getProfile(req.user.id);

    const studySession = await findOne('StudySession', {
      profileId: profile.id,
      endAt: null,
    });    

    res.send(await StudySessionTopicController.byStudySession(studySession.id).finishWithoutCode());
  } catch (err) {
    errorHandler(err, res);
  }
});

/** Obtém os tópicos estudados através de uma sessão de estudos do usuario */
router.get('/topic/:sessionStudyTopicId', bearer, async function (req, res) {
  //console.log(req.params.sessionStudyTopicId)//45 sessão de estudos 
  //console.log(req.user.id)// 8 id do usuario
  try {
    /**Busca o usuario e todas as suas sessões de estudo */
    res.send(await StudySessionTopicController.byStudySession(req.user.id).getAllStudysession(req.params.sessionStudyTopicId));
  } catch (err) {
    errorHandler(err, res);//apresenta erro de desenvolvimento
  }
});

/*Obtém todos os tópicos estudados durante todas as sessões de estudos de um aluno */
router.get('/topic/:profileId/all', bearer, async function (req, res) {

  try {
    const profile = await getProfile(req.params.profileId);
    /**Traz todas as sessões de estudo do usuário */
    const studySession = await findAll('StudySession', {
      profileId: profile.id,
    });    
    
    /**Coloca todos os ids da sessão de estudos do usuário em idsStudySession */
    idsStudySession = studySession.map(session_object => session_object.id)

    /**Traz como resposta os topicos estudados do usuario e o tempo estudado  */
    res.send(await StudySessionTopicController.byStudySession(studySession).getAllTopicsStudied(idsStudySession));

  } catch (err) {
    errorHandler(err, res);//apresenta erro de desenvolvimento
  }
});

/*Obtém todos os tópicos estudados durante todas as sessões de estudos de um aluno em formato de arvore*/
router.get('/topic/:slugNode/:profileId/tree', bearer, async function (req, res) {
  //console.log(req.params.slugNode)
  try {
    /**Obtém o perfil */
    const profile = await getProfile(req.params.profileId);
    /**Traz todas as sessões de estudo do usuário */
    const studySession = await findAll('StudySession', {
      profileId: profile.id
    });    

    /**Coloca todos os ids da sessão de estudos do usuário em idsStudySession */
    idsStudySession = studySession.map(session_object => session_object.id)

    
     res.send(await StudySessionTopicController.byStudySession(studySession).getAllStudysessionTree(req.params.slugNode, idsStudySession))  
    /* res.send(await StudySessionTopicController.byStudySession(studySession).getTest(req.params.slugNode, idsStudySession)) */
    
  } catch (err) {
    errorHandler(err, res);//apresenta erro de desenvolvimento
  }
});

/**Rota para testes */
router.get('/teste/:slugNode', bearer, async function (req, res) {
   try {
    const studySession = await findAll('StudySession', {
      profileId: '8',
    });    
    res.send(await StudySessionTopicController.byStudySession(studySession).getAllStudysessionTree(req.params.slugNode))
  } catch (err) {
    errorHandler(err, res);//apresenta erro de desenvolvimento
  } 

});

/** Exporta a Cria e finalização (especifico e todos) de uma sessão de estudo com o tópico estudado */
module.exports = router;
