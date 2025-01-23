function no_route(err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("Something broke!");
}

module.exports = no_route;
