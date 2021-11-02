const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')


let mode = "development";
// let target = "web";

if(process.env.NODE_ENV === "production") {
    mode = "production";
    // target = "browserslist";
}

module.exports = {
    mode: mode,
    // target: target,

    output: {
        assetModuleFilename: "images/[hash][ext][query]",
        clean: true, // We no longer need the clean web pack plugin in webpack 5
    },

    module: {
        rules: [
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

    plugins: [
        new MiniCssExtractPlugin(), 
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
    ],

    resolve: {
        extensions: [".js", ".jsx"],
    },

    devtool: "source-map",
    devServer: {
        static: "./dist",
        hot: true,
    },
};



// How to set up an inline svg with webpack