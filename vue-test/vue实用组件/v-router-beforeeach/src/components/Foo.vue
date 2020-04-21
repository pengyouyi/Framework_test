<template>
  <div class="foo">
    <h1>{{ msg }}</h1>
    <router-link :to="{name: 'FooDetail', params: {id: 1}}">to foo1</router-link>
    <router-link to='/foo/2'>to foo2</router-link>
    <span @click="setId(3)">to foo3</span>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Foo',
  data () {
    return {
      msg: 'Welcome to Foo'
    }
  },
  methods: {
    setId(id) {
    	this.$router.push(`${id}`)
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log('组件内 beforeRouteEnter')
    next()
  },
  beforeRouteUpdate(to, from, next) {
    console.log('组件内 beforeRouteUpdate')
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.log('组件内 beforeRouteLeave')
    next()
  }
};
</script>