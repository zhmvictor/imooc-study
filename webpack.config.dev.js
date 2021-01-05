const path = require('path');
// 自动生成模板插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 打包前自动清理 dist 文件夹
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'development',
  devServer: {
    // 服务器根路径
    contentBase: path.resolve(__dirname, 'dist'),
    // 服务器启动后自动打开浏览器
    open: true,
    port: 9000,
  },
  resolve: {
    // 当文件后缀省略时，webpack 默认会依次匹配 .js、.json 文件
    // 若未匹配到以上两种类型的文件，就会报错：Error: Can't resolve './xx' in 'D:\myStudy\code\player\src'
    // extensions 属性的作用就是修改 webpack 匹配文件的默认行为
    // 此时，当文件后缀省略时，会依次匹配 .ts、.js、.json 文件
    // 因为 .ts 的文件引入是不允许带后缀的，配置 extensions 属性可以兼容 webpack 文件匹配行为
    extensions: ['.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        // 打包全局文件
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: [path.resolve(__dirname, 'src/components')],
      },
      {
        // 打包局部文件
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // 表示实现 css 模块化
              modules: {
                compileType: 'module',
                // 配置样式名称，不配置的话，默认会是看不懂的字符编码格式
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              }
            },
          },
        ],
        include: [path.resolve(__dirname, 'src/components')],
      },
      {
        test: /\.(eot|svg|woff2|woff|ttf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.ts$/,
        use: ['ts-loader'],
        // 排除 /node_modules/ 的影响
        exclude: path.resolve(__dirname, 'node_modules'),
      },
    ],
  },
  plugins: [
    // ./src/index.html 为参考模板
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new CleanWebpackPlugin(),
  ],
};