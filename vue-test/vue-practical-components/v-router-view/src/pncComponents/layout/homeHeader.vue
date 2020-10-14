<template>
  <div class="home-header">
    <router-link to="login">登录</router-link>
    <router-link to="login">注册</router-link>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',
  data () {
    return {
      msg: 'Welcome to layout'
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
