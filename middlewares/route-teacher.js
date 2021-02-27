/** Define o modelo de tabela do Profile através do sequelize */
const { Profile } = require('../models');
/** Apresenta erro 403 - user invalido */
const { invalidUser } = require('../exceptions');

/**Obtém perfil dos usuarios dos professores */
module.exports = async function (req, res, next) {
  try {
    /**Obtem um perfil através do email */
    const profile = await Profile.findOne({
      where: {
        email: req.user.email
      }
    });

    /**Se o profileType for tecaher passa para o próximo */
    if (profile.profileType === 'teacher') {
      return next();
    }

    return next(new invalidUser('unauthorized user')); //usuário não autorizado
  } catch (err) {
    return next(err);
  }
};
