const errorHandler = async (err, req, res, next) => {
  let code = 500;
  let message = "Internal server error";
  console.log(err);

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = err.errors[0].message;
  // } else if (err.name === "Empty email or password") {
  //   code = 400;
  //   message = "Email or password is required";
  // } else if (err.name === "Unauthorized") {
  //   code = 401;
  //   message = "Missing token";
  } else if (err.name === "JsonWebTokenError") {
    code = 401;
    message = "Invalid token";
  } else if (err.name === "Login failed") {
    code = 401;
    message = "Invalid email or password";
  } else if (err.name === "Email is required") {
    code = 401;
    message = "Email is required";
  } else if (err.name === "Password is required") {
    code = 401;
    message = "Password is required";
  } else if (err.name === "Forbidden") {
    code = 403;
    message = "You have no access";
  } else if (err.name === "Not found") {
    code = 404;
    message = "Id or data not found";
  } else if (err.name === "Top up first"){
    code = 400;
    message = err.name
  // } else if (err.name === "Out of stock"){
  //   code = 404;
  //   message = err.name
  }
  res.status(code).json({
    message: message,
  });
};

module.exports = errorHandler;
