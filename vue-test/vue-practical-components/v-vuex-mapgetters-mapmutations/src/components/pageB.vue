<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{isShowNav}}</p>
    <button @click="changeNav">change isShowNav</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
export default {
  data () {
    return {
      msg: 'Welcome to Page B'
    }
  },
  computed: {
  	// isShowNav() {
  	// 	return this.$store.getters.isShowNav;
  	// }
    ...mapGetters([
      'isShowNav'
    ])
  },
  methods: {
    changeNav() {
    	// this.$store.dispatch('setNav', !this.$store.getters.isShowNav);
      this.setNav(!this.isShowNav);
    },
    ...mapMutations({
      setNav: 'SET_NAV'
    })
  }
}
</script>

<style scoped>

</style>
