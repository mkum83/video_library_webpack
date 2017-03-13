module.exports = {
    entry: './src/js/index.js',
    output: {
        path: './public',
        filename: 'bundle.js'
    },
    devServer: {
        inline: true,
        port: 8080,
        contentBase: "./public"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude:'/node_modules',
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
      },
            {
                test: /\.handlebars$/,
                exclude:'/node_modules',
                loader: "handlebars-loader"
            },
            {
                test: /\.less$/,
                exclude:'/node_modules',
                loader:"style-loader!css-loader!less-loader"
        }
    ]
    }
};
