/** fornece funcionalidade criptográfica que inclui um conjunto de wrappers para funções de hash, HMAC, cifra, decifração, assinatura e verificação do OpenSSL  */
const crypto = require('crypto');

/** Realiza a criptografia e descriptografia das senha do usuário */
class Crypto {

  /** realiza a criptografia da senha */
  static encrypt(text, password) {
    const cipher = crypto.createCipher('aes-256-ctr', password);//
    let crypted = cipher.update(String(text), 'utf8', 'base64');

    crypted += cipher.final('base64');

    return crypted;
  }
 /** realiza a descriptografia da senha */
  static decrypt(text, password) {
    const decipher = crypto.createDecipher('aes-256-ctr', password);
    let dec = decipher.update(String(text), 'base64', 'utf8');

    dec += decipher.final('utf8');

    return dec;
  }

  /**obtem criptografia */
  static getCrypto() {
    return crypto;
  }
}

/** Exporta a criptografia e descriptografia das senha do usuário */
module.exports = Crypto;
