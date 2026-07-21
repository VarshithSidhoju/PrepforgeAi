const authService = require('./auth.service');
const asyncHandler = require('../../utils/asyncHandler');

const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);
  res.status(201).json({ success: true, data: user });
});

const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.login(req.body);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ success: true, data: { user, accessToken } });
});

const refresh = asyncHandler(async (req, res) => {
  const oldRefreshToken = req.cookies.refreshToken;
  const { accessToken } = await authService.refresh(oldRefreshToken);
  res.status(200).json({ success: true, data: { accessToken } });
});

const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  await authService.logout(refreshToken);
  res.clearCookie('refreshToken');
  res.status(200).json({ success: true, message: 'Logged out' });
});

module.exports = { register, login, refresh, logout };