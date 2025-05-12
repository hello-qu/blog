import DefaultTheme from 'vitepress/theme'
import DirIndex from './DirIndex.vue'
import TagList from './TagList.vue'
import './tailwind.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app
    .component('DirIndex', DirIndex)
    .component('TagList', TagList)
  }
} 