# CIT 281 Project 4: RESTful API with Node.js and Express

## Overview
This project implements a RESTful API for managing questions and answers using Node.js and Express. The API provides endpoints to create, read, update, and delete questions and answers.

## Learning Objectives
- Implement RESTful API endpoints
- Handle HTTP methods (GET, POST, PUT, DELETE)
- Work with route parameters and query strings
- Implement error handling and status codes
- Test API endpoints using tools like Postman or curl

## Project Structure
```
cit281-p4/
├── src/
│   ├── data/              # Data files
│   ├── models/            # Data models
│   ├── routes/            # API routes
│   ├── app.js             # Express application setup
│   └── server.js          # Server entry point
├── public/                # Static files for documentation
├── .gitignore             # Git ignore file
└── README.md              # This file
```

## API Endpoints

### Questions
- `GET /api/questions` - Get all questions
- `GET /api/questions/:id` - Get a specific question
- `POST /api/questions` - Create a new question
- `PUT /api/questions/:id` - Update a question
- `DELETE /api/questions/:id` - Delete a question

### Answers
- `GET /api/answers` - Get all answers
- `GET /api/answers/:id` - Get a specific answer
- `POST /api/answers` - Create a new answer
- `PUT /api/answers/:id` - Update an answer
- `DELETE /api/answers/:id` - Delete an answer

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jackrbaca1/cit281-p4.git
   cd cit281-p4
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. The API will be available at `http://localhost:3000`

## Testing

You can test the API using tools like [Postman](https://www.postman.com/) or `curl`:

```bash
# Get all questions
curl http://localhost:3000/api/questions

# Create a new question
curl -X POST -H "Content-Type: application/json" -d '{"question":"What is Node.js?"}' http://localhost:3000/api/questions

# Update a question
curl -X PUT -H "Content-Type: application/json" -d '{"question":"What is Express?"}' http://localhost:3000/api/questions/1

# Delete a question
curl -X DELETE http://localhost:3000/api/questions/1
```

## Technologies Used
- Node.js
- Express.js
- JavaScript (ES6+)
- RESTful API principles

## License
This project is licensed under the MIT License.
