import child_proc from "child_process";
import config from "../config/default";
import path from "path";
import fs from "fs";

const dir = path.join(__dirname, "/../public/thumbnails/");
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir);
}

const spawn = child_proc.spawn;
const cmd = config.rtmp_server.trans.ffmpeg;

const generateStreamThumbnail = (stream_key) => {
	const args = [
		"-y",
		"-i",
		"http://127.0.0.1:8888/live/" + stream_key + "/index.m3u8",
		"-ss",
		"00:00:01",
		"-vframes",
		"1",
		"-vf",
		"scale=-2:300",
		path.join(dir + stream_key + ".png"),
	];

	spawn(cmd, args, {
		detached: true,
		stdio: "ignore",
	}).unref();
};

export default {
	generateStreamThumbnail: generateStreamThumbnail,
};
