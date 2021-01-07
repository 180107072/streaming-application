import express from "express";
import middleware from "connect-ensure-login";

const User = require("../database/index").User;
const router = express.Router();
router.get("/", middleware.ensureLoggedIn(), (req, res) => {
      if (req.query.username) {
            User.findOne(
                  {
                        username: req.query.username,
                  },
                  (err, user) => {
                        if (err) return;
                        if (user) {
                              res.json({
                                    stream_key: user.stream_key,
                              });
                        }
                  }
            );
      } else {
            res.json({});
      }
});

module.exports = router;
