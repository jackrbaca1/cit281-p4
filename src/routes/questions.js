const express = require('express');
const router = express.Router();
const {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion
} = require('../models/questionModel');

// Get all questions
router.get('/', (req, res) => {
  try {
    const questions = getQuestions();
    res.status(200).json({
      status: 'success',
      results: questions.length,
      data: {
        questions
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve questions'
    });
  }
});

// Get a specific question
router.get('/:id', (req, res) => {
  try {
    const question = getQuestion(req.params.id);
    if (!question) {
      return res.status(404).json({
        status: 'fail',
        message: 'Question not found'
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        question
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve question'
    });
  }
});

// Create a new question
router.post('/', (req, res) => {
  try {
    if (!req.body.question) {
      return res.status(400).json({
        status: 'fail',
        message: 'Question is required'
      });
    }
    
    const newQuestion = createQuestion(req.body.question);
    res.status(201).json({
      status: 'success',
      data: {
        question: newQuestion
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create question'
    });
  }
});

// Update a question
router.patch('/:id', (req, res) => {
  try {
    if (!req.body.question) {
      return res.status(400).json({
        status: 'fail',
        message: 'Question is required'
      });
    }
    
    const question = updateQuestion(req.params.id, req.body.question);
    if (!question) {
      return res.status(404).json({
        status: 'fail',
        message: 'Question not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        question
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to update question'
    });
  }
});

// Delete a question
router.delete('/:id', (req, res) => {
  try {
    const question = deleteQuestion(req.params.id);
    if (!question) {
      return res.status(404).json({
        status: 'fail',
        message: 'Question not found'
      });
    }
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete question'
    });
  }
});

module.exports = router;
