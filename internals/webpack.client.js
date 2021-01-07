const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const devMode = process.env.NODE_ENV !== "production";
const webpack = require("webpack");
const rules = require("./rules");

module.exports = {
	entry: "./client/index.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(process.cwd(), "build/public"),
	},
	module: {
		rules: rules,
	},
	devtool: false,

	plugins: [
		new ProgressBarPlugin(),
		new UglifyJsPlugin(),
		new MiniCssExtractPlugin({
			filename: "style.css",
		}),
	],
	mode: devMode ? "development" : "production",
	watch: devMode,
	performance: {
		maxAssetSize: 1000000,
		maxEntrypointSize: 1000000,
		hints: devMode ? "warning" : false,
	},
};
