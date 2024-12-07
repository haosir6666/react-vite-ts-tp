//公共配置
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
require('dotenv').config(); // 加载 .env 文件
const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式
console.log('NODE_ENV', process.env.NODE_ENV)
console.log('BASE_ENV', process.env.BASE_ENV)
module.exports = {
    plugins: [
        new HtmlWebpackPlugin({//webpack需要把最终构建好的静态资源都引入到一个html文件中,这样才能在浏览器中运行,html-webpack-plugin就是来做这件事情的
            title: '重写标题', // 页面标题
            template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
            inject: true, // 自动注入静态资源
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV),
            'process.env.REACT_APP_API_URL': JSON.stringify(process.env.REACT_APP_API_URL),
            'process.env.REACT_APP_PROXY_API_URL': JSON.stringify(process.env.REACT_APP_PROXY_API_URL),
            'process.env.REACT_APP_APP_NAME': JSON.stringify(process.env.REACT_APP_APP_NAME),
        }),
    ],
    entry: path.join(__dirname, '../src/index.tsx'), // 入口文件
    output: {// 输出配置
        filename:  'static/js/[name].[chunkhash:8].js', // 每个输出js的名称  加上hash值 防止缓存 可以提高性能
        path: path.join(__dirname, '../dist'), // 打包结果输出路径
        clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
        publicPath: '/' // 打包后文件的公共前缀路径
    },
    resolve: {
        //extensions是webpack的resolve解析配置下的选项，在引入模块时不带文件后缀时，
        // 会来该配置数组里面依次添加后缀查找文件，因为ts不支持引入以 .ts, tsx为后缀的文件，
        // 所以要在extensions中配置，而第三方库里面很多引入js文件没有带后缀，所以也要配置下js
        extensions: ['.js', '.tsx', '.ts'],//这里只配置js, tsx和ts，其他文件引入都要求带后缀，可以提升构建速度。
        alias: {
            '@': path.resolve(__dirname, '../src'), // 别名配置
        },
        // 如果用的是pnpm 就暂时不要配置这个，会有幽灵依赖的问题，访问不到很多模块。
        // modules: [path.resolve(__dirname, '../node_modules')], // 查找第三方模块只在本项目的node_modules中查找
    },
    module: {
        rules: [
            {
                include: [path.resolve(__dirname, '../src')],//只处理src目录下的资源
                test: /\.(ts|tsx)$/, // 匹配.ts, tsx文件
                use: ['thread-loader', 'babel-loader'] // 使用cache-loader缓存loader的执行结果，加速构建
            },
            {
                test: /.(ts|tsx)$/,
                use: ['thread-loader', 'babel-loader'] // 使用thread-loader开启多线程编译加速
            },
            {
                test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
                use: 'babel-loader'
            },
            {
                test: /\.(css|less)$/, //匹配 css 文件
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ]
            },
            {
                test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename:'static/images/[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
            },
            {
                test:/.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator:{
                    filename:'static/fonts/[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
            },
            {
                test:/.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator:{
                    filename:'static/media/[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
            },
        ]
    },
    cache: {// 缓存配置
        type: 'filesystem', // 使用文件缓存 可以缓存编译后的文件 加快下次编译速度
    },
}