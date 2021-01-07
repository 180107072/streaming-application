import "dotenv/config";

const SECRET = process.env.SECRET;
const FFMPEG = process.env.FFMPEG;

const config = {
	logType: 3,

	server: {
		secret: SECRET,
	},
	rtmp_server: {
		rtmp: {
			port: 1935,
			chunk_size: 30000,
			gop_cache: true,
			ping: 60,
			ping_timeout: 30,
		},
		http: {
			port: 8888,
			mediaroot: "./server/media",
			allow_origin: "*",
		},
		trans: {
			ffmpeg: FFMPEG,
			tasks: [
				{
					app: "live",
					hls: true,
					hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
					dash: true,
					dashFlags: "[f=dash:window_size=3:extra_window_size=5]",
				},
			],
		},
	},
};

export default config;
