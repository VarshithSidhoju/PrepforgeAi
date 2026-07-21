const authRepository = require('./auth.repository');
const { hashPassword, comparePassword } = require('../../utils/password.utils');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../../utils/jwt.utils');
const { AppError } = require('../../middleware/errorHandler');

async function register({ name, email, password }) {
  const existingUser = await authRepository.findUserByEmail(email);
  if (existingUser) {
    throw new AppError('Email already registered', 409);
  }

  const hashedPassword = await hashPassword(password);
  const user = await authRepository.createUser({ name, email, password: hashedPassword });

  const { password: _, ...safeUser } = user;
  return safeUser;
}

async function login({ email, password }) {
  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new AppError('Invalid email or password', 401);
  }

  const payload = { id: user.id, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);
  await authRepository.saveRefreshToken(refreshToken, user.id, expiresAt);

  const { password: _, ...safeUser } = user;
  return { user: safeUser, accessToken, refreshToken };
}

async function refresh(oldRefreshToken) {
  if (!oldRefreshToken) {
    throw new AppError('Refresh token required', 401);
  }

  let decoded;
  try {
    decoded = verifyRefreshToken(oldRefreshToken);
  } catch (err) {
    throw new AppError('Invalid or expired refresh token', 401);
  }

  const storedToken = await authRepository.findRefreshToken(oldRefreshToken);
  if (!storedToken) {
    throw new AppError('Refresh token not recognized', 401);
  }

  const payload = { id: decoded.id, role: decoded.role };
  const newAccessToken = generateAccessToken(payload);

  return { accessToken: newAccessToken };
}

async function logout(refreshToken) {
  if (!refreshToken) return;
  await authRepository.deleteRefreshToken(refreshToken).catch(() => {});
}

module.exports = { register, login, refresh, logout };