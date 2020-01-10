<template>
  <div>
    <div v-if="initSearch"  id="centerSearch">
      <van-search placeholder="经名 繁\简" v-model="value"
        show-action
        @search="onSearch"
        shape="round"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
    </div>
    <div  v-else id="topSearch" >
      <van-search placeholder="经名 繁\简" v-model="value"  @search="onSearch"
        shape="round"
      />
    </div>
    <div>
    <van-cell v-for="item in list" :key="item.title" :title="item.title"  center   @click="readbook(item)" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'search',
  data: function () {
    return {
      value: '',
      list: [],
      error: false,
      isFirstEnter: false,
      initSearch:true
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == 'reader') { // 这个name是下一级页面的路由name
      to.meta.isBack = true; // 设置为true说明你是返回到这个页面，而不是通过跳转从其他页面进入到这个页面
    }
    next()
  },
  mounted() {
    this.isFirstEnter = true
  },
  activated() {
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      this.initSearch = true
      this.list = []
      this.value=''
    }
    this.$route.meta.isBack = false //请求完后进行初始化
    this.isFirstEnter = false;//请求完后进行初始化
  },
  methods: {
    onSearch () {
      //搜索前先清空已有结果
      this.list = []

      //初始进入此页面，点击搜索，搜索框置顶
      if(this.initSearch){
        this.initSearch = false
      }

      const axios = require('axios')
      axios.get('https://cbdata.dila.edu.tw/v1.2/toc?q=' + this.value)
        .then((response) => {
          for (let i = 0; i < response.data.num_found; i++) {
            if (response.data.results[i].hasOwnProperty('title')) {
              this.list.push(response.data.results[i])
            }
          }
        })
        .catch((error) => {
          // handle error
          this.error = true
        })
        .finally(() => {
        // always executed
        })
    },
    readbook (item) {
      this.$router.push({ name: 'reader', params: item })
    }
  }
}
</script>

<style>
#centerSearch{
  margin-top: 35%
}
#topSearch{
  position:fixed;
  z-index:999;
  width: 100%;
}
.van-search__content{
  background-color: #d8dfc9
}

</style>
