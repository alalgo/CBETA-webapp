<template>
  <div id="app">
    <!--只有组件路由的router.meta keepAlive为true的组件才会被缓存-->
    <keep-alive >
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <div v-if="isshow">
      <van-tabbar route>
        <van-tabbar-item
          replace
          to="/home"
          icon="home-o"
        >
          主页
        </van-tabbar-item>
        <van-tabbar-item
          replace
          to="/search"
          icon="search"
        >
          搜索
        </van-tabbar-item>
        <van-tabbar-item
          replace
          to="/homePage"
          icon="manager-o"
        >
          我的
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      isshow: true
    }
  },
  methods: {
    hiddentabar () {
      this.isshow = false
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
