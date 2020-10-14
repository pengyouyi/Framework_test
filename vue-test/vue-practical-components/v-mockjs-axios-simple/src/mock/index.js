import Mock from 'mockjs';

const vehicle = Mock.mock('/api/vehicle','get', (req, res) =>{
    return  {
        code:200,
        data:[{
            id:1,
            licNumber:'渝A79898',
            color:"red",
            buyTime:'2017-04-01'

        },{
            id:2,
            licNumber:'京A79898',
            color:"white",
            buyTime:'2018-04-01'

        }],
        message:'success'
    }
});


const user = Mock.mock('/api/user','get', (req, res) =>{
    return  {
        code:200,
        data:{
            id:1,
            sex:1,
            age:25,
            createTime:'2017-04-01'
        },
        message:'查询成功'
    }
})

export default { vehicle,user }
