import AppError from "./appError.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error("Unexpected Error:", err);
  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};

export default errorHandler;
