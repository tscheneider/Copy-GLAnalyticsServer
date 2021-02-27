/**Valida o request no express */
const Joi = require('joi');
/**
 * ClassRoom - Define o modelo de tabela ClassRoom através do sequelize
 * ClassRoomStudent - Define o modelo de tabela ClassRoomStudent através do sequelize
 */
const { ClassRoom, ClassRoomStudent } = require('../models');
/** Realiza a validação do objeto que será passado */
const { validate } = require('../tools');
/** 
 * unprocessableEntity - Apresenta erro individuo não processável
 * notFound - Apresenta o erro 404 
 */
const { unprocessableEntity, notFound } = require('../exceptions');
/** Obtém um perfil através do email */
const { getProfile } = require('../helpers/user.helper');

/** Cria código de acesso para se inscrever na classroom e escreve usuários nas classrooms*/ 
class ClassRoomController {
  /**cria o construtor */
  constructor(idUser) {
    this.idUser = idUser;
  }

  /**Cria um novo ClassRoomController */
  static byUser(idUser) {
    return new ClassRoomController(idUser);
  }

  /**Cria código de acesso para se inscrever na classroom */
  async create(payload = {}) {

    try {

      await validate(payload, { //valida o nome e o código fr acesso
        name: Joi.string().required(),
        accessCode: Joi.string().required(),
      });

      const accessCode = ClassRoom.encodeAccessCode(payload.accessCode);// cria código de acesso  da classroom

      /** Encontra a classRoom através de sua chave de acesso*/
      const classRoom = await ClassRoom.findOne({
        where: {
          accessCode: accessCode
        },
      });

      /*Se existir uma classRoom */
      if (classRoom) {
        throw new unprocessableEntity('access code already in use');//código de acesso já em uso
      }

      return await ClassRoom.create({
        ...payload,
        accessCode,
        responsableId: this.idUser,
      });
    } catch (err) {
      throw err;
    }
  }
  
  /**Adiciona o Usuário na classRoom */
  async addUser(payload = {}) {

    try {
      
      await validate(payload, {//valida o nome e o código fr acesso
        accessCode: Joi.string().required(),
      });

      const accessCode = ClassRoom.encodeAccessCode(payload.accessCode);// cria código de acesso  da classroom

      /** Encontra a classRoom através de sua chave de acesso*/
      const classRoom = await ClassRoom.findOne({
        where: {
          accessCode,
        }
      });
      //se não houver uma classRoom
      if (!classRoom) {
        throw new notFound('class room not found');//sala de aula não encontrada
      }

      const profile = await getProfile(this.idUser);

      const classRoomStudent = await ClassRoomStudent.findOne({
        where: {
          profileId: profile.id,
          classRoomId: classRoom.id,
        },
      });

      if (classRoomStudent) {
        return classRoomStudent;
      }

      return await ClassRoomStudent.create({
        ...payload,
        profileId: profile.id,
        classRoomId: classRoom.id,
      });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ClassRoomController;
