/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 扫描 src 文件夹下所有 TypeScript 和 JavaScript 文件
    "./public/index.html" // 如果需要扫描 HTML 文件
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
