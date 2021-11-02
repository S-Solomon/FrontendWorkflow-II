// const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')


let mode = "development";
// let target = "web";
const plugins = [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
        template: "./src/index.html",
    }),
];

if (process.env.NODE_ENV === "production") {
    mode = "production";
    // Temporary workaround for 'browserslist' bug that is being patched in the near future
    // target = "browserslist";
} 
if (process.env.SERVE){
    plugins.push(new ReactRefreshWebpackPlugin())
}

module.exports = {
    mode: mode,
    // target: target,

    entry: "./src/index.js", // output seems to be the only one that requires an absolute path

    output: {
        // path: path.resolve(__dirname, "dist"), 
        assetModuleFilename: "images/[hash][ext][query]",
        clean: true, // We no longer need the clean web pack plugin in webpack 5
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset",
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: "" },
                    },
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },

    plugins: plugins,

    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },

    devtool: "source-map",
    devServer: {
        static: "./dist",
        hot: true,
    },
};



// How to set up an inline svg with webpack