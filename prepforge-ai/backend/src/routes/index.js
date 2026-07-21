const express = require('express');
const healthRoutes = require('./health.routes');
const dsaRoutes = require('../modules/dsa/dsa.routes');
const authRoutes = require('../modules/auth/auth.routes');
const router = express.Router();

router.use('/health', healthRoutes);    
router.use('/dsa', dsaRoutes);
router.use('/auth', authRoutes);
module.exports = router;