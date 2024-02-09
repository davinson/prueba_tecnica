export const catchErrors = (requestController) => {
  return async (req, res, next) => {
    try {
      return await requestController(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
