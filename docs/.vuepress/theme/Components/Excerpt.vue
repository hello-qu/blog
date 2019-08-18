<template>
  <div>
    <div class="excerpt">
      <div class="wrapper"  v-for="(item, key) in list" :key="key"
          @click="goDetail(item.path)">
          <div class="excerpt-head">
            <div class="excerpt-head-title">{{item.title}}</div>
            <div class="excerpt-head-date">{{item.frontmatter.Date | convertTime}}</div>
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
      return val.split(' ')[0].replace(/\./g,'-')
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
        background: url("../time.png") no-repeat center;
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
