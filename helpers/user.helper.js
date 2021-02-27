/**
 * User - Define o modelo de tabela do User através do sequelize
 * Profile - Define o modelo de tabela do Profile através do sequelize
 */
const { User, Profile } = require('../models');

/** Obtém um perfil através do email */
async function getProfile(userId) {
  /** retorna um usuário através do userId */
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });
  
  /** retorna o email do perfil  */
  return await Profile.findOne({
    where: {
      email: user.email,
    },
  });
}

module.exports = {
  getProfile,
}
