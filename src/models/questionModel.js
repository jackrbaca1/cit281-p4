// In-memory storage for questions
let questions = [
  { id: 1, question: 'What is Node.js?' },
  { id: 2, question: 'What is Express?' },
  { id: 3, question: 'What is REST?' }
];

// Get all questions
const getQuestions = () => {
  return questions;
};

// Get a specific question by ID
const getQuestion = (id) => {
  return questions.find(q => q.id === parseInt(id));
};

// Create a new question
const createQuestion = (question) => {
  const newQuestion = {
    id: questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1,
    question: question
  };
  questions.push(newQuestion);
  return newQuestion;
};

// Update an existing question
const updateQuestion = (id, question) => {
  const index = questions.findIndex(q => q.id === parseInt(id));
  if (index !== -1) {
    questions[index].question = question;
    return questions[index];
  }
  return null;
};

// Delete a question
const deleteQuestion = (id) => {
  const index = questions.findIndex(q => q.id === parseInt(id));
  if (index !== -1) {
    return questions.splice(index, 1)[0];
  }
  return null;
};

module.exports = {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion
};
