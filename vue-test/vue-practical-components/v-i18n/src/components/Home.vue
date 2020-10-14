<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <Language></Language>
    <p>{{$t('common.hello')}}</p>
    <p>{{$t('common.language')}}</p>
    <p>{{i18n[$lang].love}}</p>
  </div>
</template>

<script>
import Language from './Language'
export default {
  name: 'Home',
  components: {
    Language
  },
  data () {
    return {
      msg: 'Welcome to Your home',
      i18n: {
      	english: {
            love: 'I Love You'
      	},
      	chinese: {
            love: '我爱你'
      	}
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
