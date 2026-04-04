export const validation = (schema) => {
  return (req, res, next) => {
    const data={...req.body,...req.params,...req.query}
    const { error, value } = schema.validate(data, {
      abortEarly: false,
    });
    if (error) {
      return next(new Error(error.details.map((err) => err.message).join(', ')));
    }
    req.validatedData = value;
    next();
  };
};


