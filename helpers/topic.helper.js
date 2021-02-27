/** Define o modelo de tabelo de Topic através do siquelize */
const { Topic } = require('../models');

/**Retorna todos os filhos com seus atributos */
const getChildrens = async parentId => {

  /** childrens recebe todos os parentId (que são os filhos tópicos)*/
  const childrens = await Topic.findAll({
    where: {
      parentId,
    }
  });

  /** Se não houver filhos retorna null*/
  if (childrens.length == 0) {
    return null;
  }

  const result = [];
  /**Enquano tiver filhos executa o for */
  for (let i = 0; i < childrens.length; i++) {
    //coloca na pilha de resultado todos os filhos 
    result.push(await topicWithChildrens(childrens[i]));
  };

  //retorna todos os filhos com suas informações
  return result;
};

/** topicWithChildrens recebe os atributos de todos os filhos e dos filhos dos filhos   */
const topicWithChildrens = async topic => ({
  id: topic.id,
  courseId: topic.courseId,
  name: topic.name,
  slug: topic.slug,
  description: topic.description,
  babylon: topic.babylon,
  time: 0,
  childrens: await getChildrens(topic.id),
});

/**Exporta  todos os filhos com seus atributos */
/** Exporta topicWithChildrens que recebe os atributos de todos os filhos e dos filhos dos filhos   */
module.exports = {
  getChildrens,
  topicWithChildrens,
};
