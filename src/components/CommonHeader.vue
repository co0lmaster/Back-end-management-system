<template>
    <div class="header-content">
        <div class="l-content">
            <el-button icon="el-icon-menu" size="mini" @click="handleMenu"></el-button>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label  }}</el-breadcrumb-item>

            </el-breadcrumb>
        </div>

        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img src="../assets/images/userwanye.jpg" alt="" class="image">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>

                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {

        }
    },
    methods: {
        handleMenu() {
            this.$store.commit('CollapseMenu')
        }
    },
    computed:{
        ...mapState({
            tags:state => state.tab.tablist
        }),
    },
    mounted() {
        console.log(this.tags,'tags');
    },
    
}
</script>
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css"></link>
<style lang="less">
.header-content {
    padding: 0 20px;
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .text {
        font-size: 14px;
        color: #fff;
        margin-left: 10px;
    }
}
.l-content{
    display: flex;
    align-items: center;
    .el-breadcrumb{
    margin-left: 20px;
    .el-breadcrumb_item {
        color: #666 !important;//还是不生效
    }
}
}

.r-content {
    .image {
        width: 45px;
        border-radius: 50%;
    }
}
</style>