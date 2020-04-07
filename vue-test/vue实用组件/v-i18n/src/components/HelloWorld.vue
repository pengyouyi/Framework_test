<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <Language></Language> -->
    <button @click="changeLocale">中文/EN</button>
    <p>{{$t('common.hello')}}</p>
    <p>{{$t('common.language')}}</p>
  </div>
</template>

<script>
import Language from './Language'
export default {
  name: 'HelloWorld',
  components: {
    Language
  },
  data () {
    return {
      msg: 'Welcome to Your HelloWorld'
    }
  },
  methods: {
    changeLocale() {
      let locale = this.$i18n.locale;
      if (locale === 'english') {
        this.$i18n.locale = 'chinese';
      } else {
        this.$i18n.locale = 'english';
      }
    }
  },
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
