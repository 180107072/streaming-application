import express from "express";
import middleware from "connect-ensure-login";

const User = require("../database/index").User;
const router = express.Router();
router.get("/info", middleware.ensureLoggedIn(), (req, res) => {
      if (req.query.streams) {
            let streams = JSON.parse(req.query.streams);
            let query = { $or: [] };
            for (let stream in streams) {
                  if (!streams.hasOwnProperty(stream)) continue;
                  query.$or.push({ stream_key: stream });
            }

            User.find(query, (err, users) => {
                  if (err) return;
                  if (users) {
                        res.json(users);
                  }
            });
      }
});
module.exports = router;
