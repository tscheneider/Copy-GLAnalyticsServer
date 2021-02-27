/**Cria erros de HTTP para Express */
const createError = require('http-errors');
/**Express fornece métodos para especificar qual função é chamada quando chega requisição HTTP (GET, POST, SET, etc.) e de rotas e métodos para especificar o mecanismo de modelo ("view") usado, onde o modelo arquivos estão localizados e qual modelo usar para renderizar uma resposta. */
const express = require('express');
/**é uma forma de logar ou mostrar quais requisições estão chegando em nosso servidor HTTP */
const logger = require('morgan');
/**??? */
const cors = require('cors');
/**Fornece erros de desenvolvimento */
const errorHandler = require('./tools/error-handler');
/** Obtém um tópico, todos os tópicos, a arvore com todos os  slug e um único slug*/
const topicRouter = require('./routes/topic.router');
/**Realiza um login de um novo usuário e de um novo cadastro de usuário */
const signRouter = require('./routes/sign.router');
/** Cria e finaliza a sessão de estudo de um determinado estudante */
const studySessionRouter = require('./routes/study-session.router');
/** Exporta a Cria e finalização (especifico e todos) de uma sessão de estudo com o tópico estudado */
const studySessionTopicRouter = require('./routes/study-session-topic.router');
/**Traz como resposta o perfil do usuário e suas classrooms*/
const meRouter = require('./routes/me.router');
/**Aparentemente não está funcionando */
/**Traz como resposta o código de acesso as salas de aulas e os professores responsáveis */
const classRoomRouter = require('./routes/class-room.router');
/** Obtém o tópico buscado*/
const subjectRouter = require('./routes/subject.router');
/** */
const timesSessionTopicRouter = require('./routes/times-session-topic.router');

/**app recebe requisições do express */
const app = express();

app.use(cors());// ??
app.use(logger('dev'));// ??
app.use(express.urlencoded({ extended: false })); // é um método embutido no expresso para reconhecer o Objeto de Solicitação recebido como strings ou matrizes .
app.use(express.json()); //é um método embutido no expresso para reconhecer o objeto de solicitação recebido como um objeto JSON .

app.use('/sign', signRouter); //Realiza um login de um novo usuário e de um novo cadastro de usuário
app.use('/topics', topicRouter);//Obtém um tópico, todos os tópicos, a arvore com todos os  slug e um único slug
app.use('/sessions', studySessionRouter);//Cria e finaliza a sessão de estudo de um determinado estudante 
app.use('/sessions', studySessionTopicRouter);//Cria e finalização (especifico e todos) de uma sessão de estudo com o tópico estudado
app.use('/me', meRouter);//Traz como resposta o perfil do usuário e suas classrooms
app.use('/class-rooms', classRoomRouter);//Traz como resposta o código de acesso as salas de aulas e os professores responsáveis
app.use('/subjects', subjectRouter);//Obtém o tópico buscado
app.use('/times', timesSessionTopicRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use((err, req, res, next) => {
  errorHandler(err, res);
});

module.exports = app;
