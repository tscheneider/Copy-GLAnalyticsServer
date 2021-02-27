/**Uma biblioteca de datas JavaScript para analisar, validar, manipular e formatar datas. */
const moment = require('moment');
/**Valida o request no express */
const Joi = require('joi');
const { TimeStudyTopic, Topic } = require('../models');
/** Traz os modelos utilizados no controller*/
const db = require('../models');
/** Obtém um perfil através do email */
const { getProfile } = require('../helpers/user.helper');
/** Realiza a validação do objeto que será passado */
const { validate } = require('../tools');

class TimeSessionTopicController{

 /** Cria construtor */
  constructor(idTopic) {
    this.idTopic = idTopic;
  }

  /** Cria um novo time para cada topico */
  static byTopic(idTopic) {
    return new TimeSessionTopicController(idTopic);
  }


  async create(payload){

    console.log('payload', payload)

    try {

      await validate(payload, { 
        status: Joi.string().required(),
        //topicId: Joi.number().integer().required(),
        typePage: Joi.string().required(),
      });


      return await TimeStudyTopic.create({
        topicId: payload.topicId,
        time: moment(),
        ...payload,
      });

    } catch (err) {
      throw err;
    }
  }

}

module.exports = TimeSessionTopicController;