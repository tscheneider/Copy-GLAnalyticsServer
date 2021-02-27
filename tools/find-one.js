/**Montagem das tabelas através do sequilize */
const models = require('../models');
/** Apresenta o erro 404  */
const { notFound } = require('../exceptions');

/** Recebe os modelos das tabelas sequilize */
module.exports = async (entity, where) => {
    /**result recebe modelos das tabelas sequilize */
    const result = await models[entity].findOne({
        where,
    });

    /**se não houver result apresenta erro 404 not found */
    if (!result) {
        throw new notFound(`${entity} not found`);
    }

    return result;
}
