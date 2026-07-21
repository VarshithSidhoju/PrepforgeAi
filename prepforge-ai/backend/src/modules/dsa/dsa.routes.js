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
const { createDsaProblemSchema, updateDsaProblemSchema  } = require('./dsa.validation');

const router = express.Router();

router.post('/', validate(createDsaProblemSchema), createDsaProblem);
router.get('/', getDsaProblems);
router.get('/stats', getDsaStats);
router.get('/:id', getDsaProblemById);
router.put('/:id', validate(updateDsaProblemSchema), updateDsaProblem);
router.delete('/:id', deleteDsaProblem);
router.get('/revision-due', getRevisionDueProblems);
module.exports = router;