const express = require('express');
const router = express.Router();
const {
  getAnswers,
  getAnswer,
  createAnswer,
  updateAnswer,
  deleteAnswer
} = require('../models/answerModel');

// Get all answers
router.get('/', (req, res) => {
  try {
    const answers = getAnswers();
    res.status(200).json({
      status: 'success',
      results: answers.length,
      data: {
        answers
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve answers'
    });
  }
});

// Get a specific answer
router.get('/:id', (req, res) => {
  try {
    const answer = getAnswer(req.params.id);
    if (!answer) {
      return res.status(404).json({
        status: 'fail',
        message: 'Answer not found'
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        answer
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve answer'
    });
  }
});

// Create a new answer
router.post('/', (req, res) => {
  try {
    if (!req.body.answer) {
      return res.status(400).json({
        status: 'fail',
        message: 'Answer is required'
      });
    }
    
    const newAnswer = createAnswer(req.body.answer);
    res.status(201).json({
      status: 'success',
      data: {
        answer: newAnswer
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create answer'
    });
  }
});

// Update an answer
router.patch('/:id', (req, res) => {
  try {
    if (!req.body.answer) {
      return res.status(400).json({
        status: 'fail',
        message: 'Answer is required'
      });
    }
    
    const answer = updateAnswer(req.params.id, req.body.answer);
    if (!answer) {
      return res.status(404).json({
        status: 'fail',
        message: 'Answer not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        answer
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to update answer'
    });
  }
});

// Delete an answer
router.delete('/:id', (req, res) => {
  try {
    const answer = deleteAnswer(req.params.id);
    if (!answer) {
      return res.status(404).json({
        status: 'fail',
        message: 'Answer not found'
      });
    }
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete answer'
    });
  }
});

module.exports = router;
