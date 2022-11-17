/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: path.join(__dirname, "dist")
  },
  target: "web",
  devServer: {
    host: "0.0.0.0",
    allowedHosts: "all",
    watchFiles: ["src/**/*"],
    client: {
      logging: "verbose"
    },
    port: 3456
  },
  watchOptions: {
    ignored: "/node_modules/",
    aggregateTimeout: 500,
    poll: 1000
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html")
    }),
    new webpack.DefinePlugin({
      "process.env.BACKEND_URL": JSON.stringify(process.env.BACKEND_URL)
    }),
    new webpack.DefinePlugin({
      "process.env.BACKEND_PORT": JSON.stringify(process.env.BACKEND_PORT)
    })
  ]
}
