/**Define o modelo de tabelo de Topic através do sequelize */
const { Topic } = require('../models');
/** */
const { notFound } = require('../exceptions');
const { topicWithChildrens } = require('../helpers/topic.helper');

/**Obtem todoso os tópicos filhos a partir do parentId */
class SubjectController {
  async get() {
    return await Topic.findAll({
      where: {
        parentId: null,
      }
    });
  }
}

module.exports = SubjectController;
