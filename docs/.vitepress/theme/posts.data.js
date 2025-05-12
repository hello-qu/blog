import { createContentLoader } from 'vitepress'

export default createContentLoader('**/*.md', {
  transform(raw) {
    return raw
      .filter(page => !page.url.endsWith('index.html') && !page.url.endsWith('README.html'))
      .map(page => ({
        title: page.frontmatter?.title || page.url.split('/').pop().replace('.html', ''),
        url: page.url,
        date: page.frontmatter?.date || new Date(0),
        tags: page.frontmatter?.tags || []
      }))
  }
})