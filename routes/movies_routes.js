const express = require("express");
const router = express.Router();
const controller = require("../controllers/movies_controllers");
const midd_error = require("../middleware/midd_error");

// Endpoint index
router.get("/", midd_error, controller.index);

// Endpoint show
router.get("/:id", midd_error, controller.show);

// Esporto oggetto router
module.exports = router;
