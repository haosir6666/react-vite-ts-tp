import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import {visualizer} from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
import viteImagemin from 'vite-plugin-imagemin'

const __dirname = path.resolve()

export default defineConfig({
    plugins: [
        react(),
        visualizer({open: true}), // 打包分析插件
        viteCompression({
            verbose: true, // 是否在控制台中输出压缩结果
            disable: false, // 是否禁用压缩
            threshold: 10240, // 超过此大小的文件会被压缩（10KB）
            algorithm: 'gzip', // 使用的压缩算法
            ext: '.gz', // 输出文件的扩展名
            deleteOriginFile: true, // 压缩后是否删除原文件
        }),
        viteImagemin({
            gifsicle: {
                optimizationLevel: 7,
                interlaced: false
            },
            optipng: {
                optimizationLevel: 7
            },
            mozjpeg: {
                quality: 20
            },
            pngquant: {
                quality: [0.8, 0.9],
                speed: 4
            },
            svgo: {
                plugins: [
                    {
                        name: 'removeViewBox'
                    },
                    {
                        name: 'removeEmptyAttrs',
                        active: false
                    }
                ]
            }
        })
    ],
    base: './',
    build: {
        outDir: 'dist', // 输出目录
        target: 'modules',
        assetsDir: 'assets', // 静态资源目录
        cssCodeSplit: true,
        sourcemap: false,
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
        rollupOptions: {
            output: {
                chunkFileNames: 'js/[name].[hash].js', // JS 文件输出路径
                entryFileNames: 'js/[name].[hash].js', // 入口文件输出路径
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name) {
                        if (assetInfo.name.endsWith('.css')) {
                            return 'styles/[name].[hash].[ext]'; // 样式文件输出路径
                        }
                        if (/\.(gif|png|jpg|jpeg|svg)$/.test(assetInfo.name)) {
                            return 'images/[name].[hash].[ext]'; // 图片文件输出路径
                        }
                    }
                    return 'assets/[name].[hash].[ext]'; // 默认输出路径
                }
            }
        }
    },
    publicDir: 'public',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    server: {
        host: 'localhost',
        port: 3000,
        open: true,
        cors: true,
        strictPort: false,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
})
