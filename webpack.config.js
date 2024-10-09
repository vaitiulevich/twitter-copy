const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: isProduction ? './twitter-copy/' : '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      process: 'process/browser',
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
      '@constants': path.resolve(__dirname, 'src/constants/'),
      '@store': path.resolve(__dirname, 'src/store/'),
    },
    modules: ['.', 'node_modules'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.svg',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, 'build/assets'),
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(__dirname, 'src/assets/icons/**/*'),
          to: path.resolve(__dirname, 'build/assets/icons'),
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },
};
