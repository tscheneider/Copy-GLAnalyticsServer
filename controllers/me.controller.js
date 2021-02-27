/**
 * Profile - Define o modelo de tabela do Profile através do sequelize
 * User - Define o modelo de tabela do User através do sequelize
 * ClassRoom - Define o modelo de tabela ClassRoom através do sequelize
 * ClassRoomStudent - Define o modelo de tabela ClassRoomStudent através do sequelize
 */
const { Profile, User, ClassRoom, ClassRoomStudent } = require('../models');
/** Obtém um perfil através do email */
const { getProfile } = require('../helpers/user.helper');

/** */
class MeController {
  /**cria o construtor  */
  constructor(idUser) {
    this.idUser = idUser;
  }
  /** Cria um novo MeController */
  static byUser(idUser) {
    return new MeController(idUser);
  }

  /**Obtém o perfil do usuário */
  async profile() {
    try {
      return getProfile(this.idUser);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  /**Obtém todas s classrooms de um perfil com o seu responsável  */
  async classRooms() {
    try {
      /**Obtém perfil */
      const profile = await getProfile(this.idUser);
      /**Obtém todas as classrooms de um perfil */
      const classRooms = await ClassRoomStudent.findAll({
        where: {
          profileId: profile.id,
        },
      });

      /**Obtém os responsavel pelo classrooms */
      const responsableClassRooms = await ClassRoom.findAll({
        where: {
          responsableId: profile.id,
        },
      });

      /**classRoomIds recebe  [classRoomId, responsavel pela classRooms] */
      const classRoomIds = [
        ...classRooms.map(item => item.classRoomId),
        ...responsableClassRooms.map(item => item.id),
      ];

      /** */
      return await ClassRoom.findAll({
        where: {
          id: classRoomIds,
        }
      });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = MeController;
