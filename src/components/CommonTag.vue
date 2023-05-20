<template>
<div class="tag">
    
    <el-tag
    v-for="item in tags"
    :key="item.label"
    effect="dark">
    {{ item.label }}
</el-tag>

</div>

</template>

<style scoped>
.tag{
    height: 10px;
}
</style>

<script>
import { mapState } from 'vuex'
export default {
    name:'CommonTag',
    data() {
        return {
            
        }
    },
    mounted() {
        console.log('============');
    },
    computed:{
        ...mapState({
            tags:state => state.tab.tabList
        })
    }
}
</script>
