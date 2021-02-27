/**Uma biblioteca de datas JavaScript para analisar, validar, manipular e formatar datas. */
const moment = require('moment');
/**
 * StudySession - Define o modelo de tabelo de Sessão de estudos através do sequelize
 * ClassRoom - Define o modelo de tabelo ClassRoom através do sequelize
 */
const { StudySession, ClassRoom } = require('../models');
/** Apresenta o erro 404  */
const { notFound } = require('../exceptions');
/** Obtém um perfil através do email */
const { getProfile } = require('../helpers/user.helper');
/** Cria e atualiza as sessões de estudos  */
const StudySessionTopicController = require('./study-session-topic.controller');

/** Criação da sessão de estudos  com  o perfil e a classRoomId e Finaliza a sessão de estudos */
class StudySessionController {
  
  /** Cria construtor */
  constructor(idUser) {
    this.idUser = idUser;
  }

  /** Cria uma nova sessão de estudos do usuario */
  static byUser(idUser) {
    return new StudySessionController(idUser);
  }

  //Obter sessão de estudos
  async get() {
    return await StudySession.findAll();
  }

  /** Criação da sessão de estudos  com  o perfil e a classRoomId  */
  async create(payload) {

    try {
      
      /**Obtém perfil */
      const profile = await getProfile(this.idUser);

      /** studySession recebe a sessão de estudos   */
      const studySession = await StudySession.findOne({
        where: { //encontra o profile atraves de profile.id
          endAt: null, 
          profileId: profile.id,
        },
      });

      /**se tiver studySession retorna */
      if (studySession) {
        return studySession;
      }
      
      /**Se tiver classRoomId encontra a classRoomId */
      if (payload.classRoomId) {
        const classRoom = await ClassRoom.findOne({
          where: {
            id: payload.classRoomId,
          }
        });
        if (!classRoom) {
          throw new notFound('classroom not found'); //sala de aula não encontrada
        }
      }

      //Retorna a criação da sessão de estudos  com  o perfil e a classRoomId
      return await StudySession.create({
        profileId: profile.id,
        startAt: moment(),
        classRoomId: payload.classRoomId || null,
      });
    } catch (err) {
      throw err;
    }
  }


  /**Obtém todas sessão de estudos de um perfil   */
  async getStudiesSessionsByProfileId(profileId) {
    try {
      /**Obtém todas as classrooms de um perfil */
      const studiesSessions =  await StudySession.findAll({
        where: {
          profileId
        },
      });
      console.log(studiesSessions)
      /**Se não tiver sessão de estudos */
      if (!studiesSessions) {
        throw new notFound('Não há sessões de estudo para o aluno informado');//sessão de estudo inválida
      }
      return studiesSessions;
    } catch (err) {
      throw err;
    }
  }  

   /**Busca sessão de estudo atual */
   async getCurrentstudySession(){
    const currentstudySession = await StudySession.findAll({
      where:{
        endAt: null,
      }
    });
    if (!currentstudySession) {
      throw new notFound('Não há uma sessão de estudo ativa ');
    }
    return currentstudySession;
  }

  /** Finaliza a sessão de estudos */
  async finish() {
    try {
      /**Obtém perfil */
      const profile = await getProfile(this.idUser);
       /** studySession recebe a sessão de estudos   */
      const studySession = await StudySession.findOne({
        where: {
          endAt: null,
          profileId: profile.id,
        }
      });
      /**Se não tiver sessão de estudos */
      if (!studySession) {
        throw new notFound('invalid study session');//sessão de estudo inválida
      }

      const studySessionTopicController = StudySessionTopicController.byStudySession(studySession.id);
      studySessionTopicController.finishWithoutCode();

      return await studySession.update({
        endAt: moment(),
      });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = StudySessionController;
