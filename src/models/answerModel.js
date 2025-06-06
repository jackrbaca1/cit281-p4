// In-memory storage for answers
let answers = [
  { id: 1, answer: 'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine.' },
  { id: 2, answer: 'Express is a minimal and flexible Node.js web application framework.' },
  { id: 3, answer: 'REST (Representational State Transfer) is an architectural style for designing networked applications.' }
];

// Get all answers
const getAnswers = () => {
  return answers;
};

// Get a specific answer by ID
const getAnswer = (id) => {
  return answers.find(a => a.id === parseInt(id));
};

// Create a new answer
const createAnswer = (answer) => {
  const newAnswer = {
    id: answers.length > 0 ? Math.max(...answers.map(a => a.id)) + 1 : 1,
    answer: answer
  };
  answers.push(newAnswer);
  return newAnswer;
};

// Update an existing answer
const updateAnswer = (id, answer) => {
  const index = answers.findIndex(a => a.id === parseInt(id));
  if (index !== -1) {
    answers[index].answer = answer;
    return answers[index];
  }
  return null;
};

// Delete an answer
const deleteAnswer = (id) => {
  const index = answers.findIndex(a => a.id === parseInt(id));
  if (index !== -1) {
    return answers.splice(index, 1)[0];
  }
  return null;
};

module.exports = {
  getAnswers,
  getAnswer,
  createAnswer,
  updateAnswer,
  deleteAnswer
};
