<template>
  <div>
    <div class="excerpt">
      <div class="wrapper"  v-for="(item, key) in list" :key="key"
          @click="goDetail(item.path)">
          <div class="excerpt-head">
            <div class="excerpt-head-title">{{item.title}}</div>
            <div class="excerpt-head-date">{{(item.frontmatter.Date || item.frontmatter.date)  | convertTime}}</div>
          </div>
          <div class="excerpt-cutting-line"></div>
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
  },
  filters:{
    convertTime(val){
      return val.split('T')[0].split(' ')[0].replace(/(\.|-)/g,'-')
    },
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
  width: 50%;
  margin: 0 auto;
  .wrapper{
    background: #f4f5f682;
    border-radius: .5rem;
    margin:2rem 0;
    padding: .8rem;
    &:first-child{
      margin-top: 0
    }
  }
  &-head{
    display: flex;
    align-items: center;
    height: 3rem;
    cursor: pointer;
    justify-content: space-between;
    &-title{
      font-size: 1.2rem;
      font-weight: 700;
      margin-right: 2rem;
    }
    &-date{
      letter-spacing: .1rem;
      font-size: .9rem;
      position: relative;
      &::before{
        content: '';
        background: url(data:image/png;base64,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) no-repeat center;
        position: absolute;
        background-size: 100%; 
        width: 20px;
        height: 20px;
        left: -1.5rem;
     }
    }
  }
  &-content{
    overflow: hidden;
  }
  &-cutting-line{
    width: 100%;
    height: 1px;
    background-color:#3eaf7c38
  }
  
  
}

</style>
