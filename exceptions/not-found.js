/** Apresenta o erro 404 */
class NotFound extends Error {
  constructor(msg = 'not found') {
    super(msg);
    this.status = 404;
  }
}

module.exports = NotFound;
