const express = require('express');
const { createDsaProblem } = require('../dsa/dsa.controller');
const validate = require('../../utils/validate');
const { createDsaProblemSchema } = require('./dsa.validation');

const router = express.Router();

router.post('/', validate(createDsaProblemSchema), createDsaProblem);

module.exports = router;