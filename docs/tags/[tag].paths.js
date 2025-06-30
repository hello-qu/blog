import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default {
  // 动态生成所有标签的路由
  paths() {
    // 递归获取目录下所有 md 文件
    function getAllMarkdownFiles(dir, fileList = []) {
      const files = fs.readdirSync(dir)
      files.forEach(file => {
        const filePath = path.join(dir, file)
        const stat = fs.statSync(filePath)
        if (stat.isDirectory()) {
          getAllMarkdownFiles(filePath, fileList)
        } else if (file.endsWith('.md')) {
          fileList.push(filePath)
        }
      })
      return fileList
    }

    // docs 目录路径
    const docsDir = path.resolve(__dirname, '..')
    // 获取所有 md 文件
    const files = getAllMarkdownFiles(docsDir)
    const tags = new Set()

    // 遍历所有 md 文件，收集标签
    files.forEach(file => {
      const content = fs.readFileSync(file, 'utf-8')
      const fm = matter(content)
      if (Array.isArray(fm.data.tags)) {
        fm.data.tags.forEach(tag => tags.add(tag))
      } else if (typeof fm.data.tags === 'string') {
        tags.add(fm.data.tags)
      }
    })

    // 返回所有标签的动态路由参数
    return Array.from(tags).map(tag => ({ params: { tag } }))
  }
}
