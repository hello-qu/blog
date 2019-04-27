module.exports = {
    title: 'QuJun',
    description:'',
    plugins: {
      '@vuepress/pagination':{
        postsFilter:(({ type }) => type === 'post'),
        postsSorter:((prev, next) => {
          const prevTime = new Date(prev.frontmatter.date).getTime()
          const nextTime = new Date(next.frontmatter.date).getTime()
          return prevTime - nextTime > 0 ? -1 : 1
        })
      },
      '@vuepress/blog':{
        postsDir:'_posts',
        categoryIndexPageUrl:'/category/',
        tagIndexPageUrl:'/tag/'
      } 
    },
    themeConfig: {
        displayAllHeaders: true,
        // sidebar: 'auto', // 默认值：false\
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Javascript', link: '/Javascript/' },
          { text: '杂记', link:'/others/'},
        ],
      },
    
  }