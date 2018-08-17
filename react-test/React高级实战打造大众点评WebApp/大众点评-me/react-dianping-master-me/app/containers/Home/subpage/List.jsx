import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getListData } from '../../../fetch/home/home.js'
import ListComponent from '../../../components/List/index'
import LoadMore from '../../../components/LoadMore/index'

import './style.less'

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: [], // 存储列表信息
            hasMore: true, // 记录当前状态下，还有没有更多的数据可供加载
            isLoadingMore: false, // 记录当前状态下，是“加载中。。”还是“点击加载更多”
            page: 1 // 下一页的页码
        }
    }
    render() {
        return (
            <div>
                <h2 className='home-list-title'>猜你喜欢</h2>
                {/* 列表 */}
                {
                    this.state.data.length ?
                    <ListComponent data={this.state.data}/> :
                    <div>加载中。。。</div>
                }
                {/* loadmore */}
                {
                    this.state.hasMore ?
                    <LoadMore isLoadMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/> :
                    <div></div>
                }
                
            </div>
        )
    }
    componentDidMount() {
        // 获取首页数据
        this.loadFirstPageData()
    }
    // 获取首屏数据
    loadFirstPageData() {
      const cityName = this.props.cityName;
      const result = getListData(cityName, 0);
      this.resultHandle(result);
    }
    // 加载更多数据
    loadMoreData() {
        // 用到 this.resultHandle
        // 记录状态
        this.setState({
            isLoadingMore: true
        });
        const cityName = this.props.cityName;
        const page = this.state.page; // 下一页的页码
        const result = getListData(cityName, page);
        this.resultHandle(result);

        // 增加page的计数
        this.setState({
          page: page + 1,
          isLoadingMore: false
        })
    }
    // 数据处理
    resultHandle(result) {
      result.then(res => {
          return res.json();
      }).then(json => {
          const hasMore = json.hasMore;
          const data = json.data;

          // 存储
          this.setState({
              data: this.state.data.concat(data),
              hasMore: hasMore
            })
      })
    }
}

module.exports = List