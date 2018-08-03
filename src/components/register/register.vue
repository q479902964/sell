<template>
<div class="register">
  <!--<img class="title" src="../../assets/logo3.png">-->
  <div class="content">
    <p class="register_title"><img src="./registration.png"></p>
    <form>
      <input class="phone" type="text" placeholder="手机" style="border: 0px;outline:none;cursor: pointer;" v-model="phone">
      <input class="username" type="text" placeholder="账号" style="border: 0px;outline:none;cursor: pointer;" v-model="username">
      <input class="password" type="password" placeholder="密码" style="border: 0px;outline:none;cursor: pointer;" v-model="password">
      <input class="password" type="password" placeholder="再次输入密码" style="border: 0px;outline:none;cursor: pointer;" v-model="password_again">
      <!--<div class="login_box">-->
        <!--<input type="radio" name="register_type" value="0" class="login_type" checked><label>用户注册</label>-->
        <!--<input type="radio" name="register_type" value="1" class="login_type"><label>商家注册</label>-->
      <!--</div>-->
      <input @click="register" class="submit" type="button" value="点击注册" style="border: 0px;outline:none;cursor: pointer;"/>
    </form>
    <div class="line"></div>
    <p class="jump_register">已经有账号？ <span @click="login">现在登录</span></p>
  </div>
</div>
</template>

<script>
  export default {
    data(){
      return {
        username:"",
        phone:"",
        password:"",
        password_again:""
      }
    },
    methods:{
      login(){
        this.$router.push('/login');
      },
      register(){
        // var myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
        var register_index= $("input[name='register_type']:checked").val();
        if(this.username==""||this.password==""||this.phone==""||this.password_again==""){
          alert("账号或密码或手机不能为空");
          return;
        }
        if(!this.password==this.password_again){
          alert("两次输入密码不正确");
          return;
        }
        // if(!myReg.test(this.email)){
        //   alert("邮箱格式不对");
        //   return;
        // }
        let data = {'userid':this.username,'password':this.password,'cell':this.phone,index:0}
        var self = this;
        $.ajax({
          type:'POST',
          url:'http://172.20.10.2:8080/Regist',
          data:data,
          success:function(res){
            console.log(res);
            if(res.code == 1){
              alert("注册成功")
              // // this.$emit('LoginIn',this.username)
              // var obj = { username:this.username };
              // var str = JSON.stringify(obj);
              // sessionStorage.username = str;
              // // setCookie('username',this.username,1000*60);
              // self.$router.push({name:'shop_list',params:{username:this.username}});
              self.$router.push("/login");
            }else {
              alert("注册失败")
            }
          },
          error:function(err){
            console.log(err);
          }
        });
      }
    }
  }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .register{
    width: 100%;
    height: 100%;
    background-image:url("./bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .register .title{
    width: 44.5%;
    height: 26px;
    padding-top: 30px;
    margin-left: 27%;
  }
  .register .content{
    margin: 0px auto;
    padding-top: 68px;
  }
  .register .content .register_title{
    font-family: STHeitiSC-Medium;
    font-size: 18px;
    color: #333333;
    text-align: center;
  }
  .register .content form{
    margin: 55px 0;
    width: 100%;
    text-align: center;
    position: relative;
  }
  .register .content form input{
    width: 70%;
    height: 50px;
    background: #f5f5f5;
    border-radius: 3px;
    font-size: 18px;
  }
  .register .content form input::-webkit-input-placeholder{
    color:#999;
  }
  .username,.password,.phone{
    padding-left: 4%;
    padding-right: 10%;
  }
  .register .content .username{
    margin-top:10px;
  }
  .register .content .password{
    margin-top:10px;
  }
  .register .content .submit{
    background:#13ac8c;
    margin-top: 50px;
    color: #fff;
  }
  .line{
    width: 100%;
    height: 3px;
    background: #eeeeee;
    margin-top: 28px;
  }
  .jump_register{
    font-size: 16px;
    font-family: STHeitiSC-Light;
    color: #666;
    text-align: center;
    margin-top: 14px;
  }
  .jump_register span{
    color:#3f87ff;
    cursor: pointer;
  }
  .login_box{
    padding-top: 20px;
  }
  .register .content form .login_type{
    width: 15px;
    height: 15px;
    display: inline-block;
    margin-left: 20px;
  }
</style>
