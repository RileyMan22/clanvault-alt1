const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

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
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "index.html" },
        { from: "appconfig.json" },
      ],
    }),
  ],
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
    ],
  },
  externals: { sharp: "sharp", canvas: "canvas" },
};
