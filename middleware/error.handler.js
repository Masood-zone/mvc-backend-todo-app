function errorHandler(err, req, res, next) {
  console.error(err.stack);

  // Check if the error is a Prisma error
  if (err.name === "PrismaClientKnownRequestError") {
    // Handle Prisma-specific errors
    return res.status(400).render("partials/error", {
      message: "Database error occurred",
      error: process.env.NODE_ENV === "development" ? err : {},
    });
  }

  // For all other errors
  res.status(err.status || 500);
  res.render("partials/error", {
    message: err.message,
    error: process.env.NODE_ENV === "development" ? err : {},
  });
}

module.exports = errorHandler;
