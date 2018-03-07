const
  path     = require('path'),  
  webpack  = require('webpack'),

  nib      = require('nib'),
  jeet     = require('jeet'),
  rupture  = require('rupture'),
  kswiss   = require('kouto-swiss'),

  HtmlWebpackPlugin         = require('html-webpack-plugin'),
  HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin'),
  ExtractTextPlugin         = require('extract-text-webpack-plugin'),
  WebpackSpritesmith        = require('webpack-spritesmith'),
  SVGSpritemapPlugin        = require('svg-spritemap-webpack-plugin'),
  PurifyCSSPlugin           = require('purifycss-webpack'),

  paths = {
    html        : path.resolve(__dirname, 'public', 'index.html'),
    js          : path.resolve(__dirname, 'src', 'index.js'),
    styl        : path.resolve(__dirname, 'src', 'stylus/style.styl'),
    priorityCSS : path.resolve(__dirname, 'src', 'stylus/priority/priority.styl'),
    bundleCSS   : 'css/',
    bundleJS    : 'js/'
  },

  extractStyle    = new ExtractTextPlugin({
    filename: paths.bundleCSS + 'style.css'
  }),

  extractPriority    = new ExtractTextPlugin({
    filename: paths.bundleCSS + 'priority.css'
  });


const config = {

  entry: {
    'main': paths.js,
    'style': paths.styl,
    'priority': paths.priorityCSS
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${paths.bundleJS}[name].js`
  },
  performance: {
    hints: false
  },
  plugins: [

    extractStyle,
    extractPriority,

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
    }),

    new PurifyCSSPlugin({paths: [paths.html], minimize: true}),
    
    new SVGSpritemapPlugin({
      src: path.resolve(__dirname, 'src', 'images/svg/*.svg'),
      filename: 'src/images/svg-symbols.svg',
      prefix: '',
      svgo: true,
      chunk: 'svg-symbols'
    }),

    new WebpackSpritesmith({
      src: {
        cwd: path.resolve(__dirname, 'src', 'images/sprite/'),
        glob: '*'
      },
      target: {
        image: path.resolve(__dirname, 'src', 'images/sprite.png'),
        css: path.resolve(__dirname, 'src', 'stylus/sprite.styl')
      },
      apiOptions: {
        cssImageRef: '~sprite.png'
      }
    }),

    new HtmlWebpackPlugin({
      template: paths.html,
      filename: 'index.html',
      excludeAssets: [/style.*|priority.js/],
      minify:{ collapseWhitespace: true, conservativeCollapse: true, removeComments: true }
    }),

    new HtmlWebpackExcludeAssetsPlugin()

  ],

  module: {

    rules: [

      {
        test: /\.(html)$/,
        loader: 'html-loader'
      },

      {
        test: /\.js$/,
        exclude: ['/node_modules/'],
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },

      {
        test: /style\.styl$/,
        loader: extractStyle.extract({
          use: [
            {
              loader: 'css-loader',
              options: { minimize: true }
            },
            {
              loader: 'stylus-loader',
              options: {
                use: [jeet(), rupture(), kswiss(), nib()],
              }
            },
          ],
          fallback: 'style-loader',
          publicPath: '../../'
        }),

      },

      {
        test: /priority\.styl$/,
        loader: extractPriority.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'stylus-loader',
              options: {
                use: [jeet(), rupture(), kswiss(), nib()]
              }
            },
          ],
          fallback: 'style-loader',
          publicPath: '../../'
        }),
      },

      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpe?g)$/i,

        use: [
          {
            loader: 'url-loader',
            query: {
              limit: 500,
              name: '[path][name].[ext]'
            }
          },

          {
            loader: 'image-webpack-loader',
            query: {
              mozjpeg: {
                quality: 80
              }
            }
          }
        ]

      }

    ],
  },

  resolve: {
    extensions: [".js", ".json", ".styl"],
    modules: ["node_modules", "images"]
  }

};

module.exports = config;
