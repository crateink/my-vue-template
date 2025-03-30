import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// 读取自动生成的全局变量配置
// import { readFile } from 'node:fs/promises'
// const autoImportConfig = JSON.parse(await readFile('./.eslintrc-auto-import.json', 'utf-8'))

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup
export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  // 将自动导入的全局变量转换为 Flat Config 格式
  // {
  //   languageOptions: {
  //     globals: {
  //       ...autoImportConfig.globals,
  //       process: 'readonly',
  //     },
  //   },
  // },

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,

  {
    rules: {
      'vue/multi-word-component-names': ['error', { ignores: ['index', '404'] }], // 允许组件名称为单词
    },
  },
)
