/** Uma biblioteca de datas JavaScript para analisar, validar, manipular e formatar datas. */
const { add } = require('lodash');
const { duration } = require('moment');
const moment = require('moment');

/**Cria um array com o tempo de estudo e o id de cada tópico estudado  */
const timesAndTopics = (studySessionTopic) => {
  
  var topicAndTime = [];

  for (let i = 0; i < studySessionTopic.length; i++) {

    /**Realiza o calculo do tempo que o aluno passou em cada tópico*/
    var hours = moment.utc(moment(studySessionTopic[i].endAt, "DD/MM/YYYY HH:mm:ss")
      .diff(moment(studySessionTopic[i].startAt, "DD/MM/YYYY HH:mm:ss")))
      .format("HH:mm:ss")

    /**Coloca no array o tempo de estudo e o topicid */
    topicAndTime.push({
      time: hours,
      topicId: studySessionTopic[i].dataValues.topicId
    });   

  }; 

  return topicAndTime;
}

/** Acumula o valores de tempo*/
function addTimes(startTime, endTime) {
   
  var times = [0, 0, 0]
  var max = times.length

  var a = (startTime || '').split(':')
  var b = (endTime || '').split(':')

  // normaliza valores de tempo
  for (var i = 0; i < max; i++) {
      a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i])
      b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
  }

  // valores de tempo armazenado 
  for (var i = 0; i < max; i++) {
      times[i] = a[i] + b[i]
  }

  var hours = times[0]
  var minutes = times[1]
  var seconds = times[2]

  if (seconds >= 60) {
      var m = (seconds / 60) << 0
      minutes += m
      seconds -= 60 * m
  }

  if (minutes >= 60) {
      var h = (minutes / 60) << 0
      hours += h
      minutes -= 60 * h
  }

  return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2)
}

/**Percorre a árvore realizando a somatoria de horas entre os tópico e seus filhos (Utilizado no Sunburst ) */
const treeAccumulativeTime = (node) => {

  let sum = node.time;

  //caso base
  if (!node.childrens || node.childrens.length < 1) { 
      node.accumulativeTime = sum || '00:00:00';
      return sum || '00:00:00';
  }

  // Para cada @children chame usando essa mesma função
  for (const child of node.childrens) {
      sum = addTimes(sum, treeAccumulativeTime(child));
  }

  node.accumulativeTime = sum;

  return sum;
}


// Adiciona o tempo na árvore
function timeNote(node, studySessionTopic) {

  // Recebe os tempos pelo topicId
  const times = (timesAndTopics(studySessionTopic)).filter(topic => node.id === topic.topicId); 

  if (times && times.length > 0) {
      node.time = times.map(obj => obj.time).reduce((acc, cur) => addTimes(acc, cur), '00:00:00');

      /**Transforma minutos node.time em minutos (usado no treemap)*/
      node.value = moment.duration(node.time).asMinutes()  
  }  

  /**A biblioteca Treemap pede que seja passado children e não cheldrens. Por isso essa atribuição */
  if(node.childrens){
    node.children = node.childrens
  }

  // Avaliação do caso base, se node não tem filhos então retorna 0 
  if (!node.childrens || node.childrens.length < 1) {
      return 0;
  }

  // Para cada children chamado usando essa mesma função
  node.childrens.forEach(child => {
      timeNote(child, studySessionTopic);
  });

  node.sum = treeAccumulativeTime(node);  
  return node;

}


/**Cria um array com o tempo de estudo e o id de cada tópico estudado e nome do tópico estudado */
function topicStudyAndTempo(studySessionTopic) {

    /**Colocar todos os tópicos estudados e os tempos iniciais e finais do estudo dentro de um array de objetos  */
    var topicAndTime = [];

    for (let i = 0; i < studySessionTopic.length; i++) {

      /**Realiza o calculo do tempo que o aluno passou em cada tópico*/
      var hours = moment.utc(moment(studySessionTopic[i].endAt,"DD/MM/YYYY HH:mm:ss")
            .diff(moment(studySessionTopic[i].startAt,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
      topicAndTime.push({
        id: studySessionTopic[i].id, 
        startAt: studySessionTopic[i].startAt, 
        endAt: studySessionTopic[i].endAt, 
        time: hours,
        topicId: studySessionTopic[i].topicId, 
        name: studySessionTopic[i].topic.name, 
        slug: studySessionTopic[i].topic.slug,
      });

    };  

    return topicAndTime;
}

module.exports = {
  timeNote,
  timesAndTopics,
  topicStudyAndTempo
};