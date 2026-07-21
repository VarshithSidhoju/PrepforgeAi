const prisma = require('../../config/db');

async function create(data) {
  return prisma.dsaProblem.create({
    data,
  });
}

async function findAllByUser(userId, filters = {}, pagination = {}, sort = {}) {
  const { search, status, difficulty, topic } = filters;
  const { page = 1, limit = 10 } = pagination;
  const { sortBy = 'createdAt', order = 'desc' } = sort;

  const where = {
    userId,
    ...(status && { status }),
    ...(difficulty && { difficulty }),
    ...(topic && { topic }),
    ...(search && {
      title: { contains: search, mode: 'insensitive' },
    }),
  };

  const skip = (page - 1) * limit;

  const [problems, total] = await Promise.all([
    prisma.dsaProblem.findMany({
      where,
      orderBy: { [sortBy]: order },
      skip,
      take: limit,
    }),
    prisma.dsaProblem.count({ where }),
  ]);

  return { problems, total };
}

async function findById(id) {
  return prisma.dsaProblem.findUnique({
    where: { id },
  });
}

async function update(id, data) {
  return prisma.dsaProblem.update({
    where: { id },
    data,
  });
}
async function remove(id) {
  return prisma.dsaProblem.delete({
    where: { id },
  });
}
async function getStats(userId) {
  const total = await prisma.dsaProblem.count({ where: { userId } });

  const byStatus = await prisma.dsaProblem.groupBy({
    by: ['status'],
    where: { userId },
    _count: true,
  });

  const byDifficulty = await prisma.dsaProblem.groupBy({
    by: ['difficulty'],
    where: { userId },
    _count: true,
  });

  return { total, byStatus, byDifficulty };
}
async function findDueForRevision(userId) {
  return prisma.dsaProblem.findMany({
    where: {
      userId,
      revisionDate: { lte: new Date() },
    },
    orderBy: { revisionDate: 'asc' },
  });
} 

module.exports = { create, findAllByUser, findById, update, remove, getStats, findDueForRevision };