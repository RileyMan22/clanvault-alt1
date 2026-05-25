const path = require("path");

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: { index: "./index.ts" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: { type: "umd", name: "ClanVault" },
    clean: true,
  },
  mode: "production",
  devtool: false,
  resolve: { extensions: [".tsx", ".ts", ".mjs", ".jsx", ".js"] },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp|svg)$/,
        type: "asset/resource",
        generator: { filename: "[name][ext]" },
      },
      {
        // Copy index.html and appconfig.json to dist as-is
        test: /\.(html|json)$/,
        type: "asset/resource",
        generator: { filename: "[name][ext]" },
      },
    ],
  },
  externals: { sharp: "sharp", canvas: "canvas" },
};
