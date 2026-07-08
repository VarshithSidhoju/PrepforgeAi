const { AppError } = require('../middleware/errorHandler');

function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const details = result.error.flatten().fieldErrors;
      return next(new AppError(`Validation failed: ${JSON.stringify(details)}`, 400));
    }

    req.body = result.data;
    next();
  };
}

module.exports = validate;