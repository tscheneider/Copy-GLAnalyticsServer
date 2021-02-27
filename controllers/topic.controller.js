/** Define o modelo de tabelo de Topic através do siquelize */
const { Topic } = require('../models');
/**Apresenta o erro 404 */
const { notFound } = require('../exceptions');
/** Importa topicWithChildrens que recebe os atributos de todos os filhos e dos filhos dos filhos   */
const { topicWithChildrens } = require('../helpers/topic.helper');

/**Traz a árvore de tópicos com todos os filhos e seus atributos */
class TopicController {

  /** Obtem todos os tópicos */
  async get() {
    return await Topic.findAll();
  }

  /** Obtem um tópico através de seu idTopic */
  async getById(idTopic) {
    return await Topic.findOne({
      where: {
        id: idTopic
      }
    });
  }
  
  /** Obtem um Slug através de seu slug */
  async getBySlug(slug) {
    return await Topic.findOne({
      where: {
        slug
      }
    });
  }
  /**Obtem a estrutura da arvore   */
  async treeStructure(slugNode) {
    //mainNode recebe o nó raiz da arvore
    const mainNode = await Topic.findOne({
      where: {
        slug: slugNode
      }
    });

    /** Se não tiver um nó raiz  apresenta erro 404*/
    if (!mainNode) {
      throw new notFound();
    }

    /** retorna todos os filhos da arvore e seus atributos */
    return topicWithChildrens(mainNode);
  }
}

/**Exporta  a árvore de tópicos com todos os filhos e seus atributos */
module.exports = TopicController;
