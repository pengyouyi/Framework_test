<template>
  <div class="login">
  	<div>{{msg}}</div>
  	<button @click="onLogin">登录</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to login'
    }
  },
  methods: {
  	onLogin() {
  		this.$router.push('/news')
  	}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
