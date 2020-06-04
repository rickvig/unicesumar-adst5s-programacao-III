const express = require("express");
const router = express.Router();
const controller = require('../controllers/clienteController')

router.get('/', controller.get)
router.get("/new", controller.new);
router.post("/save", controller.save);
router.get("/edit/:id", controller.edit);
router.get("/delete/:id", controller.delete);

module.exports = router;
