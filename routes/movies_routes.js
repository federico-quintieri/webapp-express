const express = require("express");
const router = express.Router();
const controller = require("../controllers/movies_controllers");

// Endpoint index
router.get("/", controller.index);

// Endpoint show
router.get("/:slug", controller.show);

// Esporto oggetto router
module.exports = router;
