/** Fornece erros de desenvolvimento */
module.exports = function (err, res) {
  // define locais, fornecendo apenas erros no desenvolvimento
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

  // renderizar a página de erro
  res.status(err.status || 500);
  res.send({ message: err.message });
}
