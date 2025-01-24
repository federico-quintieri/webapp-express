const midd_noRoute = (req, res, next) => {
  res.status(404).send("Rotta non trovata");
};

module.exports = midd_noRoute;