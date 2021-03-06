module.exports = {
    mode: "development",

    entry: {
        app: "./frontend/src/index.tsx",
    },

    output: {
        filename: "bundle.js",
        path: __dirname + "/frontend/static/dist",
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: ["/node_modules/",
                    "/backend/"],
                loader: 'ts-loader',
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {},
    // watch: true

};