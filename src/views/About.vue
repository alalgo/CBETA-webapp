<template>
  <div class="about">
    <h1>This is an about page</h1>
    <van-button type="default">Default</van-button>
  </div>
</template>

<script>
import { Button } from 'vant'
export default {
  name: 'about',
  // 注意不能漏掉这一步
  components: {
    [Button.name]: Button
  }
}
</script>
