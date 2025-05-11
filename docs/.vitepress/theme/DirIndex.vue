<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'
import './tailwind.css'
const { page } = useData()

// 获取当前目录路径（相对 docs 目录）
const basePath = computed(() => {
  const path = page.value.relativePath
  // 只取目录部分
  return path.split('/').slice(0, -1).join('/') + '/'
})

// 动态导入 docs 下所有 md 文件
const modules = import.meta.glob('../../**/*.md', { eager: true })

// 过滤出当前目录下的 md 文件
const list = computed(() => {
  return Object.entries(modules)
    .filter(([path]) => {
      // 只保留当前目录下的 md 文件，且不是 README.md 或 index.md
      return path.includes(basePath.value)
        && !/README\.md$/.test(path)
        && !/index\.md$/.test(path)
    })
    .map(([path, mod]) => {
      const articleDate = mod["__pageData"]['frontmatter'].date;
      console.log(articleDate)
      return  {
          title: mod.frontmatter?.title || path.split('/').pop().replace('.md', ''),
          link: path.replace('.md', '').replace('../../', '../../blog/'),
          date: articleDate || new Date(0)
        }
})
    .sort((b,a) => new Date(a.date) - new Date(b.date))
})
</script>

<template>
  <div class="max-w-3xl mx-auto p-12">
    <div class="text-3xl font-bold mb-5">文章列表</div>
    <ul class="space-y-3">
      <li v-for="item in list" :key="item.link" class="list-disc">
        <a :href="item.link" class="hover:text-green-600">{{ item.title }}</a>
        <span class="text-gray-500 ml-2">{{ new Date(item.date).toLocaleDateString() }}</span>
      </li>
    </ul>
  </div>
</template>