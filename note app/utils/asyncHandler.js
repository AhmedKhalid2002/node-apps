
const asyncHandler = (controller) => {
  return (req, res, next) => {
    controller(req, res, next).catch((error) => {
      return res.json({
        success: false,
        message: error.message,
      });
    });
  };
};
