const http = require('http');
const { 
  getQuestions, 
  getAnswers, 
  getQuestionsAnswers, 
  getQuestion, 
  getAnswer, 
  getQuestionAnswer,
  addQuestionAnswer,
  updateQuestionAnswer,
  deleteQuestionAnswer
} = require('./p4-module.js');

const port = 3000;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  
  if (req.method === 'GET') {
    switch (url.pathname) {
      case '/cit/question':
        const questions = getQuestions();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          error: '',
          statusCode: 200,
          questions
        }));
        break;

      case '/cit/answer':
        const answers = getAnswers();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          error: '',
          statusCode: 200,
          answers
        }));
        break;

      case '/cit/questionanswer':
        const questionsAnswers = getQuestionsAnswers();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          error: '',
          statusCode: 200,
          questions_answers: questionsAnswers
        }));
        break;

      case '/cit/question/1':
      case '/cit/answer/1':
      case '/cit/questionanswer/1':
        const number = parseInt(url.pathname.split('/').pop());
        if (isNaN(number)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            error: 'Invalid number parameter',
            statusCode: 400
          }));
          return;
        }

        let result;
        if (url.pathname.includes('question')) {
          result = getQuestion(number);
        } else if (url.pathname.includes('answer')) {
          result = getAnswer(number);
        } else {
          result = getQuestionAnswer(number);
        }

        res.writeHead(result.error ? 400 : 200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          error: result.error,
          statusCode: result.error ? 400 : 200,
          question: result.question,
          answer: result.answer,
          number: result.number
        }));
        break;

      default:
        // Handle POST for adding a question
        if (url.pathname === '/cit/question' && req.method === 'POST') {
          parseBody(req, (body) => {
            const result = addQuestionAnswer(body);
            res.writeHead(result.error ? 400 : 201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              error: result.error,
              statusCode: result.error ? 400 : 201,
              number: result.number
            }));
          });
          return;
        }

        // Handle PUT for updating a question
        if (url.pathname === '/cit/question' && req.method === 'PUT') {
          parseBody(req, (body) => {
            const result = updateQuestionAnswer(body);
            res.writeHead(result.error ? 400 : 200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              error: result.error,
              statusCode: result.error ? 400 : 200,
              number: result.number
            }));
          });
          return;
        }

        // Handle DELETE for deleting a question
        if (url.pathname.includes('/cit/question/') && req.method === 'DELETE') {
          const number = parseInt(url.pathname.split('/').pop());
          if (isNaN(number)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              error: 'Invalid number parameter',
              statusCode: 400
            }));
            return;
          }
          
          const result = deleteQuestionAnswer(number);
          res.writeHead(result.error ? 400 : 200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            error: result.error,
            statusCode: result.error ? 400 : 200,
            number: result.number
          }));
          return;
        }

        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          error: 'Route not found',
          statusCode: 404
        }));
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Method not allowed',
      statusCode: 405
    }));
  }
});

const parseBody = (req, callback) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    callback(JSON.parse(body));
  });
};

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
