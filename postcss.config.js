module.exports = {
    plugins: [
        'autoprefixer',
        require('tailwindcss'),
        require('autoprefixer')
    ],//自动读取浏览器前缀并添加到css文件中
    tailwindcss: {},
    autoprefixer: {},
}
