/**Valida o request no express */
const Joi = require('joi');
/**
 * User - Define o modelo de tabela do User através do sequelize 
 * Profile - Define o modelo de tabela do Profile através do sequelize
 */
const { User, Profile } = require('../models');
/** crypto - Importa a criptografia e descriptografia das senha do usuário 
 *  jwt - exporta criação e vefificação dos tokens
 * validate - Realiza a validação do objeto que será passado 
*/
const { crypto, jwt, validate } = require('../tools');
/**
 *  notFound - Apresenta o erro 404 
 *  unprocessableEntity - Apresenta erro individuo não processável
 */
const { notFound, unprocessableEntity } = require('../exceptions');

/** Realiza a validação de login no sistema */
class SignController {
  /** on cria um novo objeto SignController */
  static on() {
    return new SignController();
  }

  /** Realiza a validação de login (email e senha) */
  async signin(payload = {}) {
    try {
      /**realiza a validação */
      await validate(payload, {
        email: Joi.string().email().required(), //valida  o email
        password: Joi.string().required() //valida senha
      });

      /** Busca email do usuario */
      const user = await User.findOne({
        where: {
          email: payload.email,
        }
      });

      /**Se não existir o usuario apresenta erro 404 */
      if (!user) {
        throw new notFound('user not found');
      }

      if (crypto.encrypt(payload.password, user.salt) !== user.password) {
        throw new notFound('user not found');
      }

      /* _id recebe a cripiografia de user.id */
      const _id = crypto.encrypt(user.id, 'Srmy2h6H2hWU5r3uqJq6LyRL4vq52Q4dKjs633jSWf');

      /** retorna id e email do usuario e o token de criprografia */
      return {
        user: {
          id: user.id,
          email: user.email,
        },
        token: await jwt.create({ payload: { id: _id } }), //cria token de id
      };
    } catch (err) {
      throw err; //apresenta erro
    }
  }

  /** realiza a validação através do cadastro */
  async signup(payload) {
    try {
      /** Valida email, senha, instituição, nome, genero, ano, cidade, pais */
      await validate(payload, {
        
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        institution: Joi.string().required(),
        name: Joi.string().required(),
        genre: Joi.string().required(),
        age: Joi.string().required(),
        underGradProgram: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string().required(),
      });

      /** encontra o usuario através do email  */
      let user = await User.findOne({
        where: {
          email: payload.email,
        }
      });
      
      /** Se o user já existir emitir a mensagem "email já em uso" */
      if (user) {
        throw new unprocessableEntity('email already in use');
      }

      /** sald recebe como obter a criptografia  */
      const salt = crypto.getCrypto().randomBytes(32).toString('hex');

      /** user recebe a criação do usuario de forma criptografada */
      user = await User.create({
        ...payload,
        password: crypto.encrypt(payload.password, salt),
        salt,
      });

      /** Cria peerfil com cidade e pais e o tipo de usuário */
      await Profile.create({
        city: 'Araranguá',
        country: 'Brasil',
        ...payload,
        userType: 'student',
      });

      /** realiza o login */
      return await this.signin({
        email: payload.email,
        password: payload.password,
      });

    } catch (err) {
      throw err; //erro
    }
  }
}

module.exports = SignController;
