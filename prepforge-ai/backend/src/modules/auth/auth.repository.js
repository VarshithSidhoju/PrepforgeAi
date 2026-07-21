const prisma = require('../../config/db');

async function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

async function findUserById(id) {
  return prisma.user.findUnique({ where: { id } });
}

async function createUser({ name, email, password }) {
  return prisma.user.create({
    // password here is already the bcrypt hash by the time it reaches this function
    data: { name, email, password },
  });
}

async function saveRefreshToken(token, userId, expiresAt) {
  return prisma.refreshToken.create({
    data: { token, userId, expiresAt },
  });
}

async function findRefreshToken(token) {
  return prisma.refreshToken.findUnique({ where: { token } });
}

async function deleteRefreshToken(token) {
  return prisma.refreshToken.delete({ where: { token } });
}

async function deleteAllUserRefreshTokens(userId) {
  return prisma.refreshToken.deleteMany({ where: { userId } });
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  saveRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
  deleteAllUserRefreshTokens,
};