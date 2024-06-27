const path = require("path");

module.exports = {
	mode: "production",
	entry: path.resolve(__dirname, "src/index.js"),
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
	},

	module: {
		rules: [
			{
				test: /\.css$/, // Targets all CSS files
				use: [
					"style-loader", // Injects styles into the DOM
					"css-loader", // Handles CSS imports
				],
			},
		],
	},
};
