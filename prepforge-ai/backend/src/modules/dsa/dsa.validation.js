const { z } = require('zod');

const createDsaProblemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
  topic: z.string().min(1, 'Topic is required'),
  platform: z.string().min(1, 'Platform is required'),
  notes: z.string().optional(),
  // TODO: remove once auth middleware provides req.user.id instead
  userId: z.string().uuid('userId must be a valid UUID'),
});

module.exports = { createDsaProblemSchema };