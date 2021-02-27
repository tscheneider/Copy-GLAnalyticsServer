/** Uma biblioteca de datas JavaScript para analisar, validar, manipular e formatar datas. */
const moment = require('moment');
/**Valida o request no express */
const Joi = require('joi');
/**Operação de  busca no bd no sequelize */
const { Op } = require("sequelize");
/**Define o modelo de tabelo StudySessionTopic através do sequelize  */
const { StudySessionTopic, Topic } = require('../models');
/**
 *  notFound - Apresenta o erro 404 
 *  unprocessableEntity - Apresenta erro individuo não processável
 */
const { notFound, unprocessableEntity } = require('../exceptions');
/** validate - Realiza a validação do objeto que será passado
 *  findOne -  Recebe os modelos das tabelas sequilize 
 */
const { validate, findOne } = require('../tools');
/** Importa topicWithChildrens que recebe os atributos de todos os filhos e dos filhos dos filhos   */
const { topicWithChildrens } = require('../helpers/topic.helper');
/**Importa a função responsavel por armazenar os tempos de estudos na árvores */
const { timeNote, timesAndTopics, topicStudyAndTempo } = require('../helpers/study-session-topic.helper');
/** */
const db = require('../models');
 

/** Cria e atualiza as sessões de estudos  */
class StudySessionTopicController {

  /** cria o construtor da sessão de estudos */
  constructor(idStudySession) {
    this.idStudySession = idStudySession;
    this.StudySessionTopic = StudySessionTopic.scope({
      method: ['bystudysession', idStudySession]
    });
  }
  
  /**Cria uma nova StudySessionTopicController a cada sessão de estudos */
  static byStudySession(idStudySession) {
    return new StudySessionTopicController(idStudySession);
  }

  /**Busca todas as Sessões de estudo através do studySessionId */
  async getAllStudysession(studySessionTopicId){
    const studySessionTopic = await this.StudySessionTopic.findAll({
      where: {
        studySessionId: studySessionTopicId,
      },
    });
    if (!studySessionTopic) {
      throw new notFound('Nenhum tópico foi estudado');
    }
    return studySessionTopic;
  } 

  /**Busca todas as sessões de estudos de um aluno e traz uma arvore com todos os tópicos estudados */
  async getAllStudysessionTree(slugNode, idsStudySession){

    //mainNode recebe o nó raiz da arvore
    const mainNode = await Topic.findOne({
      where: {
        slug: slugNode
      }
    });

    /** Se não tiver um nó raiz  apresenta erro 404*/
    if (!mainNode) {
      throw new notFound();
    }

    /**Busca as sessões de estudos com os ids das sessões do usuario */
     const studySessionTopic = await StudySessionTopic
    .findAll({
      where: {
        studySessionId: { [Op.in]: idsStudySession }
      },
      include: [
        "topic"
      ]
    });  

    /**Monta a arvore e salva em treemap */
    var treeMap = await topicWithChildrens(mainNode);
    
    if (!studySessionTopic) {
      throw new notFound('Nenhum tópico foi estudado');
    }
    /**Retorna a arvore já com os tempos de estudos */
    return await timeNote(treeMap, studySessionTopic);
  }

  /**Busca todos os tópicos estudados de todas as sessões de estudo */
  async getAllTopicsStudied(idsStudySession){
    
    const studySessionTopic = await StudySessionTopic
    .findAll({
      where: {
        studySessionId: { [Op.in]: idsStudySession }
      },
      include: [
        "topic"
      ]
    });

    if (!studySessionTopic) {
      throw new notFound('Nenhum tópico foi estudado');
    }
    /**Traz o tempo de estudo, nomde do topico e iddo Topic */
    return await topicStudyAndTempo(studySessionTopic)

  } 

  /**cria uma nova sessão de estudos */
  async create(payload) {

    try {
      validate(payload, {
        topicId: Joi.number().integer().required()
      }); //realiza a validação de topicId

      await findOne('Topic', { id: payload.topicId });
      
      /** studySessionTopic recebe o tempo final ta tabela StudySessionTopic */
      const studySessionTopic = await this.StudySessionTopic.findOne({
        where: {
          endAt: null,
        },
      });

      /**se houver studySessionTopic */
      if (studySessionTopic) {

        /**Apresenta erro "você tem outra sessão ativa, feche e inicie uma nova" */
        throw new unprocessableEntity('you have another active session, close then start a new');
      }

      /** Cria uma nova sessão de estudos com tópicos */
      return await this.StudySessionTopic.create({
        studySessionId: this.idStudySession, // recebe idStudySession
        topicId: payload.topicId, //recebe topicId
        startAt: moment() //recebe tempo inicial 
      });

    } catch (err) {
      throw err; //erro
    }
  }

  /** Finaliza sessão de estudos */
  async finish(studySessionTopicId) {

    try {

      const studySessionTopic = await this.StudySessionTopic.findOne({
        where: {
          endAt: null,
          id: studySessionTopicId
        },
      });

      if (!studySessionTopic) {
        throw new notFound('invalid topic session');
      }

      return await studySessionTopic.update({
        endAt: moment(),
      });
    } catch (err) {
      throw err;
    }
  }

  /** termina o código */
  async finishWithoutCode() {

    try {
      const studySessionTopic = await this.StudySessionTopic.findOne({
        where: {
          endAt: null,
        },
      });

      if (!studySessionTopic) {
        return;
      }

      return await studySessionTopic.update({
        endAt: moment(),
      });

    } catch (err) {
      throw err;
    }
  }
}

module.exports = StudySessionTopicController;
