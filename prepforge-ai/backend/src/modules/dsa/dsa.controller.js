const dsaService = require('./dsa.service');

async function createDsaProblem(req, res, next) {
  try {
    const createdProblem = await dsaService.createDsaProblem(req.body);

    res.status(201).json({
      success: true,
      message: 'DSA problem created',
      data: createdProblem,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { createDsaProblem };