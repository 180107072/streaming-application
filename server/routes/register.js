import express from "express";
import passport from "passport";
import middleware from "connect-ensure-login";

const router = express.Router();

router.get("/", middleware.ensureLoggedOut(), (req, res) => {
      res.render("register", {
            user: null,
            errors: {
                  username: req.flash("username"),
                  email: req.flash("email"),
            },
      });
});

router.post(
      "/",
      middleware.ensureLoggedOut(),
      passport.authenticate("localRegister", {
            successRedirect: "/",
            failureRedirect: "/register",
            failureFlash: true,
      })
);

module.exports = router;
