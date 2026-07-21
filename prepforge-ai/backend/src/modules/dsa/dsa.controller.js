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

async function getDsaProblems(req, res, next) {
  try {
    const { userId, search, status, difficulty, topic, page, limit, sortBy, order } = req.query;

    const { problems, total } = await dsaService.getDsaProblems(
      userId,
      { search, status, difficulty, topic },
      { page: Number(page) || 1, limit: Number(limit) || 10 },
      { sortBy, order }
    );

    res.status(200).json({
      success: true,
      count: problems.length,
      total,
      page: Number(page) || 1,
      totalPages: Math.ceil(total / (Number(limit) || 10)),
      data: problems,
    });
  } catch (err) {
    next(err);
  }
}

async function getDsaProblemById(req, res, next) {
  try {
    const { id } = req.params;
    const problem = await dsaService.getDsaProblemById(id);

    res.status(200).json({
      success: true,
      data: problem,
    });
  } catch (err) {
    next(err);
  }
}

async function updateDsaProblem(req, res, next) {
  try {
    const { id } = req.params;
    const updatedProblem = await dsaService.updateDsaProblem(id, req.body);

    res.status(200).json({
      success: true,
      message: 'DSA problem updated',
      data: updatedProblem,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteDsaProblem(req, res, next) {
  try {
    const { id } = req.params;
    await dsaService.deleteDsaProblem(id);

    res.status(200).json({
      success: true,
      message: `DSA problem ${id} deleted`,
    });
  } catch (err) {
    next(err);
  }
}
async function getDsaStats(req, res, next) {
  try {
    const { userId } = req.query;
    const stats = await dsaService.getDsaStats(userId);

    res.status(200).json({ success: true, data: stats });
  } catch (err) {
    next(err);
  }
}
async function getRevisionDueProblems(req, res, next) {
  try {
    const { userId } = req.query;
    const problems = await dsaService.getRevisionDueProblems(userId);

    res.status(200).json({ success: true, count: problems.length, data: problems });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createDsaProblem,
  getDsaProblems,
  getDsaProblemById,
  updateDsaProblem,
  deleteDsaProblem,
  getDsaStats,
  getRevisionDueProblems,
};