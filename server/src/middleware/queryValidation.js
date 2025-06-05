const { query } = require('express-validator');

const paginationRules = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('sort')
    .optional()
    .isString()
    .matches(/^[-]?(createdAt|title|difficulty)$/)
    .withMessage('Sort must be one of: createdAt, title, difficulty with optional -'),
];

const projectSearchRules = [
  ...paginationRules,
  query('search')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Search term must be at least 2 characters'),
  query('category')
    .optional()
    .isMongoId()
    .withMessage('Invalid category ID'),
  query('difficulty')
    .optional()
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('Difficulty must be one of: beginner, intermediate, advanced'),
];

module.exports = {
  paginationRules,
  projectSearchRules,
};
