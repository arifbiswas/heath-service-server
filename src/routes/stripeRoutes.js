const express = require("express");
const { stripeOrderDocuments } = require("../controllers/stripeController");

const router = express.Router();

router.post("/",stripeOrderDocuments)

module.exports = router;