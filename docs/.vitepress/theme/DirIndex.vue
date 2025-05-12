<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'
import { data as posts} from './posts.data.js'
import './tailwind.css'

const { page } = useData()

// 获取当前目录路径（相对 docs 目录）
const basePath = computed(() => {
  const path = page.value.relativePath
  return path.split('/').slice(0, -1).join('/') + '/'
})

// 过滤当前目录下的文章和当前子目录
const list = computed(() => {
  return posts
    .filter(post => {
      return post.url.includes(basePath.value) 
        && !post.url.endsWith('README.html')
        && !post.url.endsWith('index.html')
        && post.url !== ('/' + basePath.value)
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
})
</script>

<template>
  <div class="max-w-3xl mx-auto p-12">
    <div class="text-3xl font-bold mb-5">文章列表</div>
    <ul class="space-y-3">
      <li v-for="item in list" :key="item.url" class="list-disc">
        <a :href="item.url" style="color:#3451b2; text-decoration: underline;" class="hover:text-green-600 font-medium">
          {{ item.title }}
        </a>
        <span class="text-gray-500 ml-2">{{ new Date(item.date).toLocaleDateString() }}</span>
      </li>
    </ul>
  </div>
</template>
