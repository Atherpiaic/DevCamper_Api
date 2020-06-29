const logger = (req, res, next) => {
  req.hello = `${req.method}  ${req.protocol}://${req.get("host")}${
    req.originalUrl
  }`;

  console.log(req.hello);
  console.log("-------------------middle_ware_running------------------");
  next();
};

module.exports = logger;
