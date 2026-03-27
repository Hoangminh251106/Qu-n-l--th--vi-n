class HttpError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

function notFound(req, res) {
  res.status(404).json({ error: { message: "Not found" } });
}

function errorHandler(err, req, res, next) {
  const status = err && err.status ? err.status : 500;
  const message = err && err.message ? err.message : "Internal server error";

  if (status >= 500) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  const payload = { error: { message } };
  if (err && err.details) payload.error.details = err.details;

  res.status(status).json(payload);
}

module.exports = { HttpError, notFound, errorHandler };
