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
      { text: '标签', link: '/tags/'},
    ]
  },
  plugins: [
    tailwindcss(),
  ],
  async buildEnd() {
    // 🔥 自动创建 tags/[tag].html 路径
    const tags = Object.keys(tagsMap)
    this.siteConfig.pages = [
      ...this.siteConfig.pages,
      ...tags.map(tag => ({
        path: `/tags/${tag}.html`
      }))
    ]
  }
})