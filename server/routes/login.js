import express from "express";
import passport from "passport";
import middleware from "connect-ensure-login";

const router = express.Router();

router.get("/", middleware.ensureLoggedOut(), (req, res) => {
      res.render("login", {
            user: null,
            errors: {
                  email: req.flash("email"),
                  password: req.flash("password"),
            },
      });
});

router.post(
      "/",
      passport.authenticate("localLogin", {
            successRedirect: "/",
            failureRedirect: "/login",
            failureFlash: true,
      })
);

module.exports = router;
