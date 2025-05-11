import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  title: 'QuJun',
  description: '',
  base: '/',
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '前端', link: '/Javascript/' },
      { text: '杂记', link: '/others/' },
    ]
  },
  plugins: [
    tailwindcss(),
  ],
}) 