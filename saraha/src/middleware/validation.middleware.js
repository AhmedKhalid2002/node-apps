export const validation = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return next(new Error(error.details.map((err) => err.message).join(', ')));
    }
    req.validatedData = value;
    next();
  };
};


