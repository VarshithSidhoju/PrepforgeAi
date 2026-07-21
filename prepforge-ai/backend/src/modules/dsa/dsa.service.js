const dsaRepository = require('./dsa.repository');
const { AppError } = require('../../middleware/errorHandler');

// Now async, since it awaits a real database call.
async function createDsaProblem(data) {
  const problemToCreate = {
    title: data.title,
    difficulty: data.difficulty,
    topic: data.topic,
    platform: data.platform,
    status: 'TODO',
    notes: data.notes || null,
    // TODO: remove this once auth middleware provides req.user.id —
    // for now we accept userId directly from the request body for testing.
    userId: data.userId,
  };

  return dsaRepository.create(problemToCreate); 
}
const ALLOWED_SORT_FIELDS = ['createdAt', 'updatedAt', 'title', 'difficulty', 'status', 'timeTaken'];

async function getDsaProblems(userId, filters, pagination, sort = {}) {
  const sortBy = ALLOWED_SORT_FIELDS.includes(sort.sortBy) ? sort.sortBy : 'createdAt';
  const order = sort.order === 'asc' ? 'asc' : 'desc';

  return dsaRepository.findAllByUser(userId, filters, pagination, { sortBy, order });
}

async function getDsaProblemById(id) {
  const problem = await dsaRepository.findById(id);

  if (!problem) {
    throw new AppError(`DSA problem with id ${id} not found`, 404);
  }

  return problem;
} 
async function updateDsaProblem(id, data) {
  // Reuse getDsaProblemById — it already throws a 404 AppError
  // if nothing exists. This confirms the row exists BEFORE we
  // attempt the update, so we control the error message/status
  // instead of letting a raw Prisma error leak through.
  await getDsaProblemById(id);

  return dsaRepository.update(id, data);
}
async function deleteDsaProblem(id) {
  // Same existence check pattern - confirm it exists (throws 404 if not)
  // before attempting the delete.
  await getDsaProblemById(id);
  await dsaRepository.remove(id);
}
async function getDsaStats(userId) {
  return dsaRepository.getStats(userId);
}
async function getRevisionDueProblems(userId) {
  return dsaRepository.findDueForRevision(userId);
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
