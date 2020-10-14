
<template>
  <div class="router">
    <router-link to='/news' class="link">news</router-link>
    <router-link to='/project' class="link">project</router-link>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      msg: 'Welcome to NavBar'
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.router {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	width: 200px;
	border: 1px solid #999;
}
.link {
	display: block;
}
</style>
