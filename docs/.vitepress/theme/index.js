import DefaultTheme from 'vitepress/theme'
import DirIndex from './DirIndex.vue'
import './tailwind.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('DirIndex', DirIndex)
  }
} 