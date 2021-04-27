const customErrorClasses = [
  "AuthenticationError",
  "RecordNotFoundError",
  "NotAuthorizedError",
  "ValidationError",
  "RouteNotFoundError",
  "RecordAlreadyExistError",
];

module.exports = function (err, req, res, next) {
  console.error("invoked with err - " + err.message, err);

  let status, cleanErr;

  // Disable any caching of this response and we'd like the client to try again
  res.set({
    "cache-control": "no-store",
  });

  if (customErrorClasses.includes(err.name)) {
    status = err.status;
    cleanErr = {
      status: "error",
      message: err.message,
      type: err.name,
      fields: err.fields,
    };
  } else {
    status = 500;
    cleanErr = {
      status: "error",
      message: err.message,
      type: err.name,
      stack:
        process.env.NODE_ENV === "development" && err.stack
          ? err.stack.toString()
          : {},
    };
  }

  res.status(status);

  if (req.headers.accept && ~req.headers.accept.indexOf("json")) {
    res.json(cleanErr);
  } else {
    res.type("txt").send(JSON.stringify(cleanErr));
  }
};
