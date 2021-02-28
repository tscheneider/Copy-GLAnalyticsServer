/**Uma biblioteca de datas JavaScript para analisar, validar, manipular e formatar datas. */
const moment = require('moment');
const { Op } = require("sequelize");
/**Valida o request no express */
const Joi = require('joi');
const { TimeStudyTopic, Topic, StudySession, StudySessionTopic } = require('../models');
/** Traz os modelos utilizados no controller*/
const db = require('../models');
/** Obtém um perfil através do email */
const { getProfile } = require('../helpers/user.helper');
/** Realiza a validação do objeto que será passado */
const { validate } = require('../tools');
const studySession = require('../models/studySession');

class TimeSessionTopicController {

  /** Cria construtor */
  constructor(idTopic = null) {
    this.idTopic = idTopic;
  }

  /** Cria um novo time para cada topico */
  static byTopic(idTopic) {
    return new TimeSessionTopicController(idTopic);
  }


  async create(payload) {

    try {

      await validate(payload, {
        status: Joi.string().required(),
        typePage: Joi.string().required(),
      });

      try {
        const test = await TimeStudyTopic.create({
          topicId: 3,
          times: moment(),
          ...payload,
        }, {
          returning: false,
          plain: true,
        });

        console.log("Teste");
        return test;
      } catch (error) {
        console.log('error :>> ', error);
      }


    } catch (err) {
      throw err;
    }
  }


  async getSession() {

    try {

      const studySessionTopic = await StudySessionTopic.findOne({ where: { topicId: this.idTopic } });
      let studySession = {};

      if (studySessionTopic) {
        studySession = await StudySession.findOne({ where: { id: studySessionTopic.studySessionId } });
      }

      return studySession;

    } catch (err) {
      throw err;
    }
  }

  async getAllTopicsByProfile(profileId) {

    try {
      let studySessionTopics = [];
      let topicIds = [];
      let topics = [];
      const studySessions = await StudySession.findAll({ where: { profileId } });
      const sessionIds = studySessions.map(({ id }) => id);

      if (sessionIds.length > 0) {
        studySessionTopics = await StudySessionTopic.findAll({ where: { id: { [Op.in]: sessionIds } } });

        if (studySessionTopics.length > 0) {
          topicIds = studySessionTopics.map(({ topicId }) => topicId);
        }
      }

      if (topicIds.length > 0) {
        topics = await TimeStudyTopic.findAll({ where: { topicId: { [Op.in]: topicIds } }, attributes: ['id', 'times', 'typePage', 'status'] });
      }

      return this.clean(topics);

    } catch (err) {
      throw err;
    }
  }

  async getAllTopicsBySession(sessionId) {

    try {
      let studySessionTopics = [];
      let topicIds = [];
      let topics = [];

      studySessionTopics = await StudySessionTopic.findAll({ where: { id: sessionId } });

      if (studySessionTopics.length > 0) {
        topicIds = studySessionTopics.map(({ topicId }) => topicId);
      }

      if (topicIds.length > 0) {
        topics = await TimeStudyTopic.findAll({ where: { topicId: { [Op.in]: topicIds } }, attributes: ['id', 'times', 'typePage', 'status'] });
      }

      return this.clean(topics);

    } catch (err) {
      throw err;
    }
  }

  clean(topics) {

    const lookForStatus = (text) => {
      if (text === "start") return "end";
      return "start";
    }

    let lookingFor = "start";
    const filteredTopics = [];
    topics.forEach(topic => {
      if (topic.status === lookingFor) {
        filteredTopics.push(topic);
        lookingFor = lookForStatus(lookingFor);
      }
    });

    return filteredTopics;
  }

}

module.exports = TimeSessionTopicController;