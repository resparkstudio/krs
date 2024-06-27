const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const path = require("path");

const devConfig = {
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		static: {
			directory: path.resolve(__dirname, "dist"),
		},
		hot: true,
		compress: true,
		historyApiFallback: true,
	},
};

module.exports = merge(commonConfig, devConfig);
