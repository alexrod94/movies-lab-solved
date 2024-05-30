const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/", (req, res) => {
  Movie.find()
    .populate("cast")
    .then((data) => {
      res.render("movies/movies", { movies: data });
    });
});

router.get("/create", (req, res) => {
  Celebrity.find().then((data) => {
    res.render("movies/create", { celebrities: data });
  });
});

router.post("/create", (req, res) => {
  //   const newMovie = {
  //     title: req.body.title,
  //     genre: req.body.genre,
  //     cast: req.body.cast,
  //     plot: req.body.synopsis,
  //   };
  req.body.plot = req.body.synopsis;
  Movie.create(req.body).then((data) => res.redirect("/movie"));
});

router.get("/delete/:id", (req, res) => {
  Movie.findByIdAndDelete(req.params.id).then(() => res.redirect("/movie"));
});

router.get("/modify/:id", async (req, res) => {
  const celebrities = await Celebrity.find();
  const movie = await Movie.findById(req.params.id);
  res.render("movies/modify", { movie, celebrities });
});

module.exports = router;
