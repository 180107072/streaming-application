import NodeMediaServer from "node-media-server";
import config from "./config/default";
import helpers from "./helpers/helpers";

const User = require("./database/index").User;
const rmtp_server = config.rtmp_server;
const nms = new NodeMediaServer(rmtp_server);
nms.on("preConnect", (id, args) => {
	console.log("[NodeEvent on preConnect]", `id=${id} args=${JSON.stringify(args)}`);
});

nms.on("postConnect", (id, args) => {
	console.log("[NodeEvent on postConnect]", `id=${id} args=${JSON.stringify(args)}`);
});

nms.on("doneConnect", (id, args) => {
	console.log("[NodeEvent on doneConnect]", `id=${id} args=${JSON.stringify(args)}`);
});

nms.on("prePublish", (id, StreamPath, args) => {
	let stream_key = getStreamKeyFromStreamPath(StreamPath);
	console.log("[NodeEvent on prePublish]", `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

	User.findOne({ stream_key: stream_key }, (err, user) => {
		if (!err) {
			if (!user) {
				let session = nms.getSession(id);
				session.reject();
			} else {
				helpers.generateStreamThumbnail(stream_key);
			}
		}
	});
});
nms.on("postPublish", (id, StreamPath, args) => {
	console.log("[NodeEvent on postPublish]", `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on("donePublish", (id, StreamPath, args) => {
	console.log("[NodeEvent on donePublish]", `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on("prePlay", (id, StreamPath, args) => {
	console.log("[NodeEvent on prePlay]", `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on("postPlay", (id, StreamPath, args) => {
	console.log("[NodeEvent on postPlay]", `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on("donePlay", (id, StreamPath, args) => {
	console.log("[NodeEvent on donePlay]", `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

const getStreamKeyFromStreamPath = (path) => {
	let parts = path.split("/");
	return parts[parts.length - 1];
};

export default nms;
