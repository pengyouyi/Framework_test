import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Header from '../../components/Header/index'
import Info from './subpage/info.jsx'
import Buy from './subpage/buy.jsx'
import Comment from './subpage/Comment'

class Detail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        // 获取商户ID
        const id = this.props.params.id;
        return (
            <div>
                <Header title="商户详情" />
                <Info id={id}/>
                <Buy id={id}/>
                <Comment id ={id}/>
            </div>
        )
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
// export default Detail
module.exports = Detail