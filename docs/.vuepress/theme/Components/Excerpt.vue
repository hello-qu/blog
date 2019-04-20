<template>
  <div>
    <div class="excerpt">
      <div class="wrapper"  v-for="(item, key) in list" :key="key"
          @click="goDetail(item.path)">
          <div class="excerpt-head">
            <div class="excerpt-head-title">{{item.title}}</div>
            <div class="excerpt-head-date">{{item.frontmatter.Date}}</div>
          </div>
          <br>
          <div class="excerpt-content" v-html="item.excerpt"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },

  props: {},
  mounted() {
    this.getList()
    console.log(this.$route.path);
  },
  methods: {
    getList() {
      const { $page, $site } = this;
      let excerptList = $site.pages;
      this.list = excerptList.filter(item => {
        let condition = item.path !== $page.path
                      && item.path.indexOf($page.path) == 0
                      && $page.path !== '/'

        if ( condition ) {
          return item;
        }
      });
    },
    goDetail(url){
      location.href = url;
      console.log(url)
    }
  },
  watch: {
    $route(to, from) {
      this.getList();
    }
  }
};
</script>

<style lang="less" scoped>
.excerpt{
  width: 60%;
  margin: 0 auto;
  .wrapper{
    border: 1px solid #666;
    border-radius: 10px;
    margin:1rem 0;
    padding: .8rem;
  }
  &-head{
    &-title{
      font-size: 1.8rem;

    }
  }
  
  
}

</style>
