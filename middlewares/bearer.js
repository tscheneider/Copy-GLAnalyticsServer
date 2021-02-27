/** Middleware expresso para autenticação de token do portador com jwt. */
const bearerToken = require('express-bearer-token');
/** Define o modelo de tabela do User através do sequelize */
const { User } = require('../models');
/** crypto - Importa a criptografia e descriptografia das senha do usuário 
 *  errorHandle - Fornece erros de desenvolvimento
 *  jwt - exporta criação e vefificação dos tokens
*/
const { crypto, errorHandler, jwt } = require('../tools');
/**Apresenta o erro 404 */
const { notFound } = require('../exceptions');

/** Realiza a descriptografia do token  */
module.exports = function (req, res, next) {
  
  /** */
  bearerToken()(req, res, async () => {
    /*token requirido */
    const token = req.token;

    /* Se não houver token retorna erro de desenvolvimento */
    if (!token) {
      return errorHandler(new Error('token de autorização não encontrado'), res);
    }

    try {
      /* verifica o token */
      const { payload: jwtPayload } = await jwt.verify(token);
      /*  userId recebe a descriptografia do id do usuario */
      const userId = await crypto.decrypt(jwtPayload.id, 'Srmy2h6H2hWU5r3uqJq6LyRL4vq52Q4dKjs633jSWf');
      /** Busca usuario pelo userId */
      const user = await User.findOne({
        where: {
          id: userId,
        }
      });
      /** se não houver user retorna erro 404 */
      if (!user) {
        return next(new notFound('bearer user not found'));
      }

      /**req.user recebe user */
      req.user = user;

      /**chama o próximo usuario */
      next();
    } catch (err) { //caso não funcione o try entra no catch
      /**retorna o próximo com o erro  */
      return next(err);
    }
  });
};
