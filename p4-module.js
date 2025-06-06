const { data } = require('./p4-data.js');

// Function to get all questions
function getQuestions() {
  return data.map(item => item.question);
}

// Function to get all answers
function getAnswers() {
  return data.map(item => item.answer);
}

// Function to get all questions and answers
function getQuestionsAnswers() {
  // Clone the array to avoid mutable copies
  return JSON.parse(JSON.stringify(data));
}

// Function to get a specific question
function getQuestion(number = "") {
  if (typeof number !== 'number') {
    return { error: 'Question number must be an integer', question: '', number: '' };
  }
  if (number < 1) {
    return { error: 'Question number must be >= 1', question: '', number: '' };
  }
  if (number > data.length) {
    return { error: `Question number must be less than the number of questions (${data.length})`, question: '', number: '' };
  }
  return { error: '', question: data[number - 1].question, number };
}

// Function to get a specific answer
function getAnswer(number = "") {
  if (typeof number !== 'number') {
    return { error: 'Answer number must be an integer', answer: '', number: '' };
  }
  if (number < 1) {
    return { error: 'Answer number must be >= 1', answer: '', number: '' };
  }
  if (number > data.length) {
    return { error: `Answer number must be less than the number of questions (${data.length})`, answer: '', number: '' };
  }
  return { error: '', answer: data[number - 1].answer, number };
}

// Function to get a specific question and answer
function getQuestionAnswer(number = "") {
  if (typeof number !== 'number') {
    return { error: 'Question number must be an integer', question: '', number: '', answer: '' };
  }
  if (number < 1) {
    return { error: 'Question number must be >= 1', question: '', number: '', answer: '' };
  }
  if (number > data.length) {
    return { error: `Question number must be less than the number of questions (${data.length})`, question: '', number: '', answer: '' };
  }
  const item = data[number - 1];
  return { error: '', question: item.question, answer: item.answer, number };
}

// Function to add a new question and answer
function addQuestionAnswer(info = {}) {
  if (!info.question) {
    return { error: 'Object question property required', message: '', number: -1 };
  }
  if (!info.answer) {
    return { error: 'Object answer property required', message: '', number: -1 };
  }
  
  const newQuestion = {
    question: info.question,
    answer: info.answer
  };
  
  data.push(newQuestion);
  return { error: '', message: 'Question added', number: data.length };
}

// Function to update a question and answer
function updateQuestionAnswer(info = {}) {
  if (!info.question && !info.answer) {
    return { error: 'Object question property or answer property required', message: '', number: '' };
  }
  if (!info.number) {
    return { error: 'Object number property must be a valid integer', message: '', number: '' };
  }
  
  const index = info.number - 1;
  if (index < 0 || index >= data.length) {
    return { error: `Question number must be between 1 and ${data.length}`, message: '', number: info.number };
  }
  
  if (info.question) {
    data[index].question = info.question;
  }
  if (info.answer) {
    data[index].answer = info.answer;
  }
  
  return { error: '', message: `Question ${info.number} updated`, number: info.number };
}

// Function to delete a question and answer
function deleteQuestionAnswer(number = "") {
  if (typeof number !== 'number') {
    return { error: 'Question/answer number must be an integer', message: '', number: '' };
  }
  if (number < 1) {
    return { error: 'Question/answer number must be >= 1', message: '', number: '' };
  }
  if (number > data.length) {
    return { error: `Question/answer number must be less than the number of questions (${data.length})`, message: '', number: '' };
  }
  
  const index = number - 1;
  data.splice(index, 1);
  return { error: '', message: `Question ${number} deleted`, number };
}

// Export all functions
module.exports = {
  getQuestions,
  getAnswers,
  getQuestionsAnswers,
  getQuestion,
  getAnswer,
  getQuestionAnswer,
  addQuestionAnswer,
  updateQuestionAnswer,
  deleteQuestionAnswer
};

// Test functions
function testing(category, ...args) {
  console.log(`\n** Testing ${category} **`);
  console.log("-------------------------------");
  for (const o of args) {
    console.log(`-> ${category}${o.d}:`);
    console.log(o.f);
  }
}

// Test constants
const testGetQs = false;
const testGetAs = false;
const testGetQsAs = false;
const testGetQ = false;
const testGetA = false;
const testGetQA = false;

// Test cases
if (testGetQs) {
  testing("getQuestions", { d: "()", f: getQuestions() });
}

if (testGetAs) {
  testing("getAnswers", { d: "()", f: getAnswers() });
}

if (testGetQsAs) {
  testing("getQuestionsAnswers", { d: "()", f: getQuestionsAnswers() });
}

if (testGetQ) {
  testing(
    "getQuestion",
    { d: "()", f: getQuestion() },
    { d: "(0)", f: getQuestion(0) },
    { d: "(1)", f: getQuestion(1) },
    { d: "(4)", f: getQuestion(4) }
  );
}

if (testGetA) {
  testing(
    "getAnswer",
    { d: "()", f: getAnswer() },
    { d: "(0)", f: getAnswer(0) },
    { d: "(1)", f: getAnswer(1) },
    { d: "(4)", f: getAnswer(4) }
  );
}

if (testGetQA) {
  testing(
    "getQuestionAnswer",
    { d: "()", f: getQuestionAnswer() },
    { d: "(0)", f: getQuestionAnswer(0) },
    { d: "(1)", f: getQuestionAnswer(1) },
    { d: "(4)", f: getQuestionAnswer(4) }
  );
}
