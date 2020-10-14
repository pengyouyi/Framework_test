<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{isShowNav}}</p>
    <button @click="changeNav">change isShowNav</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Page B'
    }
  },
  computed: {
  	isShowNav() {
  		return this.$store.getters.isShowNav;
  	}
  },
  methods: {
    changeNav() {
    	this.$store.dispatch('setNav', !this.$store.getters.isShowNav);
    	// this.$store.state.isShowNav = 'test';
    	// this.$store.commit('SET_NAV', !this.$store.getters.isShowNav);
    }
  }
}
</script>

<style scoped>

</style>
