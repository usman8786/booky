  module.exports = (req, res, next) => {
    res.locals = {
      port: process.env.PORT
  }
  res.header("Access-Control-Allow-Origin", "*", "http://localhost:8100");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
};

