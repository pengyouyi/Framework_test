<template>
  <div class="news">
    <ul class="news-section waterfall">
      <li v-for="news in newses" class='item' refs='myItem'>
        <div class="item-content" v-for="item in news">
          <h2>{{item.title}}</h2>
          <img class="img-news" :src="item.image" alt="">
          <div>{{item.lead | html2text}}</div>
        </div>
      </li>
    </ul>
    <LoadingMore :disabled="disabled" :show="haveMore" @loading="getNews"></LoadingMore>
  </div>
</template>

<script>
import LoadingMore from '../base/loadingMore';
export default {
  components: {
    LoadingMore
  },
  data () {
    return {
      msg: 'Welcome to News',
      token:'',
      limit: 10,
      newses: [
        [],
        [],
        []
      ],
      defaultOrdering: '-publication_date',
      page:0,
      haveMore: true,
      disabled: false,
      loading: false,
    }
  },
  computed: {
    newsCols() {
      return document.getElementsByClassName('item')
    }
  },
  mounted() {
    this.getNews();
  },
  methods: {
    // 获取项目数据
    getNews() {
      this.disabled = true;
      this.page++;
      // 获取newses
      this.$axios.get('http://test.pandanc.com/api/v1/news/entry/', {
        params: {
          limit: this.newses.length * 2,
          offset: this.newses.length * 2 * (this.page - 1),
          ordering: this.defaultOrdering
        }
      }).then( res => {
        this.haveMore = res.data.next;
        this.pushNews(res.data.results)
      }).catch(err => {
        console.log(err)
        this.disabled = false;
      })
    },
    pushNews(results, index = 0) {
      if (results[index]) {
        // 向最短的列中追加数据
        this.newses[this.$utils.getMinCol(this.newsCols)].push(results[index]);
        this.$nextTick(() => {
          this.pushNews(results, index + 1);
        })
      } else {
        this.disabled = false;
      }
    }
  }
};
</script>

<style scoped>
ul,li {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.img-news {
  width: 200px;
  height: 300px;
}
.waterfall {
  border: 1px solid #333;
  width: 1000px;
  margin: 0 auto;
  overflow: hidden;
}
.item {
  width:300px;
  float: left;
  margin-left:20px;
}
.item-content {
  height: auto;
  box-sizing: border-box;
  border: 1px solid red;
  margin-bottom:20px;
}
</style>