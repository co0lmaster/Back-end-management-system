<template>
    <div class="manage">

        <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">

            <el-form ref="form" :model="form" label-width="80px" :inline="true" :rules="rules">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="性别">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker v-model="form.birth" type="date" placeholder="选择日期" value-format="yyyy-MM-DD">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
                </el-form-item>
            </el-form>


            <span slot="footer" class="dialog-footer">
                <el-button @click="guanbi">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <div class="manege-header">
            <el-button type="primary" @click="handleAdd">
                + 新建
            </el-button>
            <!-- form的搜索区域 -->
            <el-form :model="userform">

            </el-form>
        </div>

        <div class="common-table">
            <el-table height="90%" :data="tableData" style="width: 100% ">
            <el-table-column prop="name" label="姓名">
            </el-table-column>
            <el-table-column prop="sex" label="性别">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.sex == 0 ? '女' : '男' }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="birth" label="出生日期">
            </el-table-column>
            <el-table-column prop="addr" label="地址">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page">
            <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePage">
            </el-pagination>
        </div>
        </div>
    </div>
</template>
<script>
import { Loading } from 'element-ui';
import { getUser, addUser, editUser, delUser } from '../api'
export default {
    data() {
        return {
            dialogVisible: false,
            form: {
                name: '',
                age: '',
                sex: '',
                birth: '',
                addr: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名' }
                ],
                age: [
                    { required: true, message: '请输入年龄' }
                ],
                sex: [
                    { required: true, message: '请输入性别' }
                ],
                birth: [
                    { required: true, message: '请选择出生日期' }
                ],
                addr: [
                    { required: true, message: '请输入出生地址' }
                ],
            },
            tableData: [],
            total:0,//当前的总条数
            modalType: 0,
            pageData:{
                page:1,
                limit:10
            },
            userform:{
                name:'',
                
            }
        };
    },
    methods: {
        handleClose(done) {
            this.$refs.form.resetFields()
            this.dialogVisible = false
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
            // qing

        },
        submit() {
            this.$refs.form.validate((valid) => {
                // console.log(valid);
                if (valid) {
                    if (this.modalType === 0) {
                        addUser(this.form).then(() => {
                            this.getListData()
                        })
                    } else {
                        editUser(this.form).then(() => {
                            this.getListData()
                        })
                    }
                    console.log(this.form, 'form');
                    this.dialogVisible = false
                }
            })
        },
        guanbi() {
            this.handleClose()
        },
        handleEdit(index, row) {
            this.modalType = 1
            this.dialogVisible = true
            // 注意对当前数据进行深拷贝
            this.form = JSON.parse(JSON.stringify(row))
        },
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delUser(row.id).then(() => {
                    console.log('+++++===');
                    console.log(row.id);
                    console.log('-------===');
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getListData()
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        handleAdd() {
            this.modalType = 0
            this.dialogVisible = true
        },
        getListData() {
            getUser({params:this.pageData}).then(({ data }) => {
                this.tableData = data.list
                this.total=data.count ? data.count  : 0
            })
        },
        // 选择页码的回调
        handlePage(val){
            // console.log(val,'val ');
            this.pageData.page=val
            this.getListData()
        }


    },
    mounted() {
        this.getListData()
    },
};
</script>
<style lang="less" scoped>
.manage {
    height: 95%;
    .common-table{
        height: 90%;
        position: relative;
        .page{
            position: absolute;
            right: 20px;
            bottom: 0;
        }
    }
}
</style>

<!-- value-format="yyyy-MM-DD"设置日期格式 -->