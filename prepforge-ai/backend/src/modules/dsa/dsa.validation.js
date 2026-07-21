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
const updateDsaProblemSchema = z
  .object({
    title: z.string().min(1),
    difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
    topic: z.string().min(1),
    platform: z.string().min(1),
    status: z.enum(['TODO', 'SOLVED', 'REVISIT']),
    timeTaken: z.number().int().positive().optional(),
    notes: z.string().optional(),
    revisionDate: z.string().datetime().optional(),
  })
  .partial();

module.exports = { createDsaProblemSchema, updateDsaProblemSchema };