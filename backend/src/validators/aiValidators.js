const { body } = require('express-validator');

const textValidation = [
  body('text')
    .isString()
    .withMessage('Text must be a string')
    .notEmpty()
    .withMessage('Text cannot be empty'),
];

const translateValidation = [
  ...textValidation,
  body('targetLanguage')
    .isString()
    .withMessage('targetLanguage must be a string')
    .notEmpty()
    .withMessage('targetLanguage cannot be empty'),
];

const chatValidation = [
  body('documentContext')
    .isString()
    .withMessage('documentContext must be a string')
    .notEmpty()
    .withMessage('documentContext cannot be empty'),
  body('question')
    .isString()
    .withMessage('question must be a string')
    .notEmpty()
    .withMessage('question cannot be empty'),
];

module.exports = {
  textValidation,
  translateValidation,
  chatValidation,
};
