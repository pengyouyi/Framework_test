<template>
  <div class="app-wrapper">
    <NavBar v-if="showNavbar"></NavBar>
    <div class="main-container">
        <HomeHeader v-if="$route.meta.isShowHomeHeader"></HomeHeader>
    	<div id="headerBar" v-else>主体头部</div>
    	<router-view></router-view>
    </div>
  </div>
</template>

<script>
import HomeHeader from './homeHeader'
import NavBar from './navBar'
export default {
  name: 'Home',
  components: {
    HomeHeader,
    NavBar
  },
  data () {
    return {
      msg: 'Welcome to layout'
    }
  },
  computed: {
    showNavbar() {
    	return !this.$route.meta.hideNavBar
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app-wrapper {
	position: relative;
	width: 100%;
	height: 100%;
}
.app-wrapper:after {
    visibility: hidden;
    display: block;
    content: " ";
    clear: both;
    height: 0;
}
.main-container {
	float: right;
	height: 100%;
	height: 100vh;
	width: calc(100% - 200px);
}
#headerBar {
	height: 80px;
	position: relative;
	border: 1px solid #ececec;
}
</style>
