const express = require('express');
const {
  createDsaProblem,
  getDsaProblems,
  getDsaProblemById,
  updateDsaProblem,
  deleteDsaProblem,
  getDsaStats,
  getRevisionDueProblems,
} = require('../dsa/dsa.controller');
const validate = require('../../utils/validate');
const { createDsaProblemSchema, updateDsaProblemSchema } = require('./dsa.validation');
const authenticate = require('../../middleware/auth.middleware');

const router = express.Router();

// All routes below require a logged-in user, but no specific role.
router.post('/', authenticate, validate(createDsaProblemSchema), createDsaProblem);
router.get('/', authenticate, getDsaProblems);

// Specific paths BEFORE dynamic :id
router.get('/stats', authenticate, getDsaStats);
router.get('/revision-due', authenticate, getRevisionDueProblems);

router.get('/:id', authenticate, getDsaProblemById);
router.put('/:id', authenticate, validate(updateDsaProblemSchema), updateDsaProblem);
router.delete('/:id', authenticate, deleteDsaProblem);

module.exports = router;