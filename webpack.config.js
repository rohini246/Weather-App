const path = require('path');
// const { EnvironmentPlugin } = require('webpack');
const Dotenv= require('dotenv-webpack');
module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, "./src")],
        use: 'ts-loader',
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'public'),
  },
  // plugins: [
  //   new EnvironmentPlugin({
  //     API_KEY : "4eaa52706c47734ce0b08f4fb3192c63"
  //   })
  // ]
  plugins:[

    new Dotenv({
      path: './.env', 
      safe: true,
    })
  ]
};