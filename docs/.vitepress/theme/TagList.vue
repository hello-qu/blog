<script setup>
import { useData, useRoute } from 'vitepress'
import { computed } from 'vue'
import {data as posts} from './posts.data.js'

const route = useRoute()

// 从路径中获取标签名
const currentTag = computed(() => {
  const path = route.path
  if (!path.startsWith('/tags/')) return ''
  const tag = path.slice(6, -5) // 移除 '/tags/' 前缀和 '.html' 后缀
  return decodeURIComponent(tag)
})

function getAllTags (posts) {
  const tags = new Set()
  posts.forEach(post => {
    if (Array.isArray(post.tags)) {
      post.tags.forEach(tag => tags.add(tag))
    }
  })
  return Array.from(tags)
}

const tags = computed(() => getAllTags(posts))

const filteredPosts = computed(() => {
  if (!currentTag.value) return []
  return posts.filter(post => 
    Array.isArray(post.tags) && post.tags.includes(currentTag.value)
  ).sort((a, b) => new Date(b.date) - new Date(a.date))
})
</script>

<template>
  <div class="max-w-3xl mx-auto p-12">
    <div class="mb-8">
      <div class="text-3xl font-bold mb-6">标签列表</div>
      <div class="flex flex-wrap gap-2">
        <a 
          v-for="tag in tags" 
          :key="tag"
          :href="`/tags/${encodeURIComponent(tag)}.html`" 
          :class="[
            'px-3 py-1 rounded-full text-sm font-medium',
            currentTag === tag 
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          ]"
        >
          {{ tag }}
        </a>
      </div>
    </div>

    <template v-if="currentTag">
      <div class="mt-8">
        <h2 class="text-2xl font-bold mb-4">"{{ currentTag }}" 的文章</h2>
        <ul class="space-y-3">
          <li v-for="post in filteredPosts" :key="post.url" class="list-disc">
            <a 
              :href="post.url" 
              class="text-blue-600 hover:text-green-600 font-medium underline"
            >
              {{ post.title }}
            </a>
            <span class="text-gray-500 ml-2">
              {{ new Date(post.date).toLocaleDateString() }}
            </span>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>
