# CIT 281 Project 4: RESTful API with Node.js

## Project Overview
This project is a RESTful API built with Node.js that provides endpoints for managing questions and answers. The API follows RESTful conventions and returns JSON responses.

## Features
- Get all questions
- Get all answers
- Get all questions and answers
- Get a specific question by ID
- Get a specific answer by ID
- Get a specific question-answer pair by ID
- Add a new question-answer pair
- Update an existing question-answer pair
- Delete a question-answer pair

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/jackrbaca1/cit281-p4.git
   cd cit281-p4
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node p4-server.js
   ```

The server will start on `http://localhost:3000`

## API Endpoints

### Get All Questions
```
GET /cit/question
```

### Get All Answers
```
GET /cit/answer
```

### Get All Questions and Answers
```
GET /cit/questionanswer
```

### Get a Specific Question by ID
```
GET /cit/question/:id
```

### Get a Specific Answer by ID
```
GET /cit/answer/:id
```

### Get a Specific Question-Answer Pair by ID
```
GET /cit/questionanswer/:id
```

### Add a New Question-Answer Pair
```
POST /cit/questionanswer
Content-Type: application/json

{
  "question": "Your question here",
  "answer": "Your answer here"
}
```

### Update a Question-Answer Pair
```
PUT /cit/questionanswer/:id
Content-Type: application/json

{
  "question": "Updated question",
  "answer": "Updated answer"
}
```

### Delete a Question-Answer Pair
```
DELETE /cit/questionanswer/:id
```

## Error Handling
The API returns appropriate HTTP status codes and error messages in the following format:
```json
{
  "error": "Error message",
  "statusCode": 400
}
```

## Technologies Used
- Node.js
- JavaScript (ES6+)
- HTTP module (built-in)

## License
This project is licensed under the MIT License.
