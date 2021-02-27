/**  é uma string de caracteres codificados que, permite que somente o servidor que conhece o ‘segredo’ possa ler o conteúdo do token, e assim confirmar a autenticidade do cliente.*/
const jwt = require('jsonwebtoken');
const fs = require('fs');

/**Configuração padrão pra jwt */
const jwtConfig = { audience: 'id', algorithm: 'RS256', expiresIn: '15 days' };

/**Chave secreta do webtoken */
const secret = fs.readFileSync('./certs/secret.key');
/**Chave publica do webtoken */
const public = fs.readFileSync('./certs/public.key.pub');

/** cria token */
function create(payload) {
  return new Promise((resolve, reject) => {
    const token = jwt.sign(payload, secret, jwtConfig);
    resolve(token);
  });
}
/**verifica token */
function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, public, jwtConfig, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });
}

/** exporta  cria token */
/** exporta verifica token */
module.exports = {
  create,
  verify
};
