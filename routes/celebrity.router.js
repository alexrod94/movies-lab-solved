const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/", (req, res) => {
  Celebrity.find().then((data) => {
    res.render("celebrities/celebrities", { celebrities: data });
  });
});

router.get("/create", (req, res) => {
  res.render("celebrities/create");
});

router.post("/create", (req, res) => {
  Celebrity.create(req.body).then((data) => res.redirect("/celebrity"));
});

module.exports = router;
