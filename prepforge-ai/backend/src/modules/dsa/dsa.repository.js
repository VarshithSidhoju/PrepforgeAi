const prisma = require('../../config/db');

// This is the ONLY file in the dsa module allowed to touch Prisma directly.
async function create(data) {
  return prisma.dsaProblem.create({
    data,
  });
}

module.exports = { create };