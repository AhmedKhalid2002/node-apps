export const asyncHandler = (controller) => {
  return (req, res, next) => {
    return controller(req, res, next).catch(new Error('Something went wrong'));
  };
};
