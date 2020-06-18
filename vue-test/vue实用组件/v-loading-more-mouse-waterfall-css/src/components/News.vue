<template>
  <div class="news">
    <ul class="news-section waterfall">
      <li v-for="item in newses" class='item'>
        <div class="item-content">
          <h2>{{item.title}}</h2>
          <img class="img-news" :src="item.image" alt="">
          <div>{{item.content}}</div>
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
      limit: 3,
      newses: [],
      defaultOrdering: '-publication_date',
      page:0,
      haveMore: true,
      disabled: false,
      offset: 100,
      loading: false
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
          limit: this.limit,
          offset: this.limit * (this.page - 1),
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
        this.newses.push(results[index]);
        this.$nextTick(() => {
          this.pushNews(results, index + 1)
        })
      } else {
        this.disabled = false;
      }
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
}
.img-news {
  width: 300px;
  height: 300px;
}
.waterfall {
  column-count: 3; /* 设置列数 */
  column-gap: 0; /* 设置列与列之间的间距 */
  /* column-width: 200px; //设置每列的宽度 */
}
.item {
  box-sizing: border-box;
  break-inside: avoid; /* 避免在元素内部插入分页符 */
  padding: 10px;
}
.item-content {
  padding: 10px;
  height: auto;
  box-sizing: border-box;
  border: 1px solid red;
}
</style>