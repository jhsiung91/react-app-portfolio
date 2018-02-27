const {resolve} = require('path')

module.exports = {
	entry: "./public/react.jsx",
	output: {
		filename: "bundle.js",
		path: resolve(__dirname, "public", "js")
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: "babel-loader",
			options: {presets: ["env","react","stage-2"]}
		}]
	}
}