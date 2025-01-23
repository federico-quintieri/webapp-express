const midd_error = (err, req, res, next) => {
  console.error("Errore:", err.stack);
  const status = err.status || 500;
  res
    .status(status)
    .json({ message: err.message || "Qualcosa è andato storto!" });
};

module.exports = midd_error;
