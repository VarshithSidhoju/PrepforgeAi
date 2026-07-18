const express = require('express');
const healthRoutes = require('./health.routes');
const dsaRoutes = require('../modules/dsa/dsa.routes');
const router = express.Router();

router.use('/health', healthRoutes);
router.use('/dsa', dsaRoutes);
module.exports = router;