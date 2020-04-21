<template>
  <div class="foo-detail">
    <h1>{{ msg }} {{ $route.params.id}}</h1>
  </div>
</template>

<script>
export default {
  name: 'FooDetail',
  data () {
    return {
      msg: 'Welcome to FooDetail',
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log('组件内 FooDetail beforeRouteEnter')
    next()
  },
  beforeRouteUpdate(to, from, next) {
    console.log('组件内 FooDetail beforeRouteUpdate')
    next()
  },
  beforeRouteLeave(to, from, next) {
    alert('组件内 FooDetail beforeRouteLeave')
    console.log('组件内 FooDetail beforeRouteLeave')
    // next()
  }
};
</script>