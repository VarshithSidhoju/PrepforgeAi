const dsaRepository = require('./dsa.repository');

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

  const savedProblem = await dsaRepository.create(problemToCreate);

  return savedProblem;
}

module.exports = { createDsaProblem };