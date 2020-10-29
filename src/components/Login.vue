<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="" />
            </div>
            <!-- 表单 -->
            <el-form ref="loginFormRef" :rules="loginFormRules" label-width="0px" class="login_form" :model="loginForm">
                <el-form-item  prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-s-custom"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <el-form-item class="btns" >
                    <el-button type="primary" @click="login">登入</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {request} from '../network/index.js'
export default {
    data(){
        return{
            //这是登入表单的数据绑定对象
            loginForm: {
                username:'123',
                password:'123456'
            },
            //表单验证规则对象
            loginFormRules:{
                //验证用户名是否合法
                username: [
                    { required: true, message: '请输入登入名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                //验证密码是否合法
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        //点击重置按钮，重置表单
        resetLoginForm(){
            this.$refs.loginFormRef.resetFields();
        },
        login(){
            this.$refs.loginFormRef.validate(async valid =>{
                // console.log(valid)
                if(!valid) return;
                const res = await request({
                    url:"./data/login/login.json",
                    //用 get 本地模拟
                    // method: "post",
                    // data: this.loginForm
                });
                if(res.meta.status !== 200) return this.$message.error("登入失败");
                this.$message.success("登入成功");
                //token 处理
                window.sessionStorage.setItem("token", res.data.token);
                //跳转到 /home
                this.$router.push("/home")
            })
        }
    }
};
</script>

<style lang="less" scoped>
.login_container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: #2b4b6b;
}
.login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;

    .avatar_box {
        width: 130px;
        height: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        margin: 0 auto;
        transform: translateY(-50%);
        background-color: #fff;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
}
.login_form{
    transform: translateY(-20%);
    padding: 0 20px;
    box-sizing: border-box;
}
.btns{
    display: flex;
    justify-content: flex-end;
}
</style>