import path from 'path';

module.exports = {
	target: 'web',
    entry: {
        libraries: './src/index.ts'
    },
    output: {
        path:          path.join(__dirname, 'remember-the-milk.widget', 'lib'),
        filename:      'libraries.bundle.js',
        library:       'Libraries',
        libraryTarget: 'umd'
    },
	resolve: {
		fallback:   {
			crypto: require.resolve('crypto-browserify'),
			stream: require.resolve('stream-browserify'),
			buffer: require.resolve('buffer/'),
		},
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [{
			test:    /\.ts$/,
			use: [{
				loader: 'ts-loader',
			}]
		}]
	},
};
