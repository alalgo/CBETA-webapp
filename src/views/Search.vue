<template>
  <div>
    <!--搜索框 -->
    <div v-if="initSearch"  id="centerSearch">
      <van-search placeholder="经名 繁\简" v-model="value"
        show-action
        shape="round"
        left-icon=""
        @search="onSearch"
        @focus="changePosition"
      >
        <div slot="action"  @click="onSearch"><van-icon name="search" size="30" color="#be9567" /></div>
      </van-search>
      <div class="pic-wrap">
        <img src="../assets/buddha.jpg"  alt="buddha" />
      </div>
    </div>
    <div  v-else id="topSearch" >
      <van-search placeholder="经名 繁\简" v-model="value"
        show-action
        shape="round"
        left-icon=""
        @search="onSearch"
      >
        <div slot="action" @click="onSearch"><van-icon name="search" size="30" color="#be9567" /></div>
      </van-search>
    </div>
    <!--搜索时的加载提示-->
    <div class="prompt" v-if="loading">
      <van-loading size="24px" >加载中...</van-loading>
    </div>
    <!--搜索失败提示-->
    <div class="prompt" v-if="error">
      <span>搜索失败</span>
    </div>
    <!--搜索结果列表-->
    <div id="resultlist">
      <van-cell v-for="item in list" :key="item.title" :title="item.title"   center   @click="readbook(item)" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { TraditionToSimple_CN } from '../utils/TraditionToSimple_CN.js'
export default {
  /* eslint-disable */
  name: 'search',
  data: function () {
    return {
      value: '',
      list: [],
      isFirstEnter: false,
      initSearch:true,
      loading:false,
      error:false
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
      //搜索前先清空已有结果；清除已有错误提示
      this.list = []
      this.error=false

      //初始进入此页面，点击搜索，搜索框置顶
      if(this.initSearch){
        this.initSearch = false
      }

      //空查询予以忽略
      if(this.value == ''){
        return false;
      }

      //出现加载中提示
      this.loading=true

      //搜索内容翻译为繁体再搜索
      var t2s = new TraditionToSimple_CN()

      const axios = require('axios')
      axios.get('https://cbdata.dila.edu.tw/v1.2/toc?q=' + t2s.toTraditionalized(this.value))
        .then((response) => {
          //搜索结果为空，提示
          if(response.data.num_found == 0){
              this.error=true
          }
          //搜索结果不为空，显示搜索结果
          for (let i = 0; i < response.data.num_found; i++) {
            if (response.data.results[i].hasOwnProperty('title')) {
              this.list.push(response.data.results[i])
            }
          }
        })
        .catch((error) => {
          this.error=true
        })
        .finally(() => {
          this.loading=false
        })
    },
    changePosition () {
      this.initSearch = false
    },
    readbook (item) {
      this.$router.push({ name: 'reader', params: item })
    }
  }
}
</script>

<style>
#centerSearch{
  margin-top: 20%;
}
#topSearch{
  position:fixed;
  z-index:999;
  width: 100%;
}
#resultlist{
  padding-top: 12%;
}
.prompt{
  padding-top: 30%;
}
.van-search__content{
  background-color: #d8dfc9
}
.van-search__action{
  font-size: 43px;
}
.van-cell{
  color:#be9567;
  font-size:14px;
}
/*佛像图片自适应*/
.pic-wrap{position: relative; padding-top: 50%;}
.pic-wrap img{position: absolute; left: 20%; top: 10%;  width: 60%; }
</style>
