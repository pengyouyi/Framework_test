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
      msg: 'Welcome to Page A'
    }
  },
  computed: {
    isShowNav() {
    	return this.$store.getters.isShowNav;
    },
    // isShowNav: {
    // 	get() {
    // 		return this.$store.getters.isShowNav;
    // 	},
    // 	set(value) {
    // 		this.$store.dispatch('setNav', this.$store.getters.isShowNav)
    // 	}
    // }
  },
  created() {
  	console.log('isShowNav', this.$store.getters.isShowNav)
  },
  methods: {
    changeNav() {
    	this.$store.dispatch('setNav', !this.$store.getters.isShowNav)
    }
  }
}
</script>

<style scoped>

</style>
