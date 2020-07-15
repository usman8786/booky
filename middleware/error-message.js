module.exports = (error, req, res, next) => {
  if (!error.status) {
    error.status = 500;
    res.send({
      message: "middleware",
    });
  }
  res.status(error.status || 500).send(error);
  next();
};
