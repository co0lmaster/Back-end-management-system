<template>
    <div>
        <el-container>
                <el-aside width="auto">
                    <common-aside></common-aside>
                </el-aside>
                <el-container>
                    <el-header>
                        <common-header></common-header>
                    </el-header>

                    <common-tag></common-tag>
                    
                    <el-main>
                        <router-view></router-view>
                        <!-- 导入home等的地方 -->
                    </el-main>
                </el-container>
        </el-container>
    </div>
</template>

<script>
import CommonHeader from '../components/CommonHeader.vue';
import CommonAside from '../components/CommonAside.vue';
import CommonTag from '../components/CommonTag.vue';
export default {
    data() {
        return {

        }
    },
    components: {
        CommonAside,
        CommonHeader,
        CommonTag
    }
}
</script>
<style scoped>
.el-header{
    padding: 0;
}

</style>
