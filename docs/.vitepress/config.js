import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  title: 'QuJun',
  description: '',
  base: '/blog/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Javascript', link: '/Javascript/' },
      { text: '杂记', link: '/others/' },
    ]
  },
  plugins: [
    tailwindcss(),
  ],
}) 