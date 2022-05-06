const express = require('express');
const router = express.Router();
const controller = require('../controllers/appController.js');
const { login, verify } = require("../auth/auth");

//Main Page routing here.
router.get("/", controller.main_page);
router.get("/login", controller.show_login);
router.post("/logged", login, controller.handle_login);
router.get("/logout", controller.logout);
router.get("/staff", verify, controller.staff_page);
router.post("/new", verify, controller.post_new_entry);
router.get("/new", verify, controller.show_new_dishes);
router.get("/edit/:id", verify, controller.show_update_page);
router.post("/update", verify, controller.post_update);

router.use(function (req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not Found.');
});
router.use(function (req, res) {
    res.status(500);
    res.type('type/plain');
    res.send('Internal Server Error.');
});
module.exports = router;