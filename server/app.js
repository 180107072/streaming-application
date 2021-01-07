import express from "express";
import Session from "express-session";
import bodyParse from "body-parser";
import mongoose from "mongoose";
import path from "path";
import middleware from "connect-ensure-login";
import SessionFileStore from "session-file-store";
import flash from "connect-flash";
import job from "./cron/thumbnails";
import cookieParser from "cookie-parser";
import fs from "fs";
import config from "./config/default";
import "dotenv/config";
import passport from "./auth/passport";
import nms from "./media-server";

nms.run();
job.start();

const app = express();
const FileStore = SessionFileStore(Session);
const PORT = process.env.PORT;
const CLUSTER = process.env.CLUSTER;
mongoose.connect(CLUSTER, { useNewUrlParser: true, useUnifiedTopology: true });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static("build/public"));
app.use(cookieParser());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json({ extended: true }));

app.use(
	Session({
		store: new FileStore({
			path: "./sessions",
		}),
		secret: config.server.secret,
		maxAge: Date.now() + (60 + 1000 + 30),
		resave: true,
		saveUninitialized: true,
	})
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use("/login", require("./routes/login"));
app.use("/register", require("./routes/register"));
app.use("/user", require("./routes/user"));
app.use("/streams", require("./routes/streams"));

app.get("/logout", (req, res) => {
	req.logout();
	return res.redirect("/login");
});

app.get("*", middleware.ensureLoggedIn(), (req, res) => {
	res.render("index");
});

app.listen(PORT, () => {
	console.log(`App listening on ${PORT}`);
});
