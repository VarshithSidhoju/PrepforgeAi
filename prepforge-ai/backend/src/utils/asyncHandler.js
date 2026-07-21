// Wraps an async controller so any thrown error / rejected promise
// automatically goes to next(err) — removes the need for try/catch
// in every single controller function.
function asyncHandler(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
  
  module.exports = asyncHandler;