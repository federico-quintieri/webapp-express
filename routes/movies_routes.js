const express = require("express");
const router = express.Router();
const controller = require("../controllers/movies_controllers");

// Endpoint index
router.get("/", controller.index);

// Endpoint show
router.get("/:slug", controller.show);

// Endpoint salvo libro
// router.post("/", controller.bookStore);

// Endpoint salvo review di un libro
router.post("/:id/reviews", controller.reviewStore);

// Endpoint mostro tutte le reviews
router.get("/get/reviews", controller.indexReviews);

// Esporto oggetto router
module.exports = router;
