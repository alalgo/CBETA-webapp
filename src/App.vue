<template>
  <div id="app">
    <router-view />
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
          to="/setting"
          icon="setting-o"
        >
          设置
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
