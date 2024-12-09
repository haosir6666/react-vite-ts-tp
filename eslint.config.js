import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] }, // 忽略 dist 目录
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020, // 指定 ECMAScript 版本为 2020
      globals: globals.browser, // 启用浏览器环境
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // 禁止使用分号
      semi: 'off',
      // 强制使用单引号
      quotes: ['error', 'single'],
      // 不强制在箭头函数体周围使用大括号
      'arrow-body-style': 'off',
      // 警告变量声明未按字母顺序排序
      'sort-vars': 'warn',
      // 警告对象键未按字母顺序排序
      'sort-keys': 'warn',
      // 警告使用 `console` 方法
      'no-console': 'off',
      // 允许使用未声明的变量
      'no-undef': 'off',
      // 关闭禁止重复声明变量的规则
      'no-redeclare': 'off',
      // 关闭禁止重赋值函数参数的规则
      'no-param-reassign': 'off',
      // 关闭要求函数明确返回类型的规则
      '@typescript-eslint/explicit-function-return-type': 'off',
      // 警告使用 `any` 类型
      '@typescript-eslint/no-explicit-any': 'warn',
      // 关闭禁止未处理的 Promise 的规则
      '@typescript-eslint/no-floating-promises': 'off',
      // 关闭禁止错误使用 Promise 的规则
      '@typescript-eslint/no-misused-promises': 'off',
      // 关闭禁止使用非 null 断言运算符的规则
      '@typescript-eslint/no-non-null-assertion': 'off',
      // 强制禁止重复声明类型
      '@typescript-eslint/no-redeclare': 'error',
      // 关闭禁止使用与外部变量同名的变量的规则
      '@typescript-eslint/no-shadow': 'off',
      // 关闭禁止默认导出的规则
      'import/no-default-export': 'off',
      // 关闭禁止使用命名导入作为默认成员的规则
      'import/no-named-as-default-member': 'off',
      // 无须在组件中显式 import React
      'react/jsx-uses-react': 'off',
      // 关闭禁止在 JSX 中使用未转义的实体的规则
      'react/no-unescaped-entities': 'off',
      // 关闭强制要求在 JSX 文件中使用 `<React>` 命名空间的规则
      'react/react-in-jsx-scope': 'off',
    },
  },
)
