export default{
    state:{
        isCollapse:false,
        // 用来控制开启和关闭
        tablist:[
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            },
        ]//面包屑
    },
    mutations:{
        CollapseMenu(state){
            state.isCollapse=!state.isCollapse//点击取反
        },
        selectMenu(state,val){
            console.log(val,'val');
            const index= state.tablist.findIndex(item => item.name===val.name)
            if (index===-1) {
                state.tablist.push(val)
            }
        }
    }
}