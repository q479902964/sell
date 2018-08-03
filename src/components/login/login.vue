<template>
  <div class="login">
    <div class="content">
      <p class="login_title"><img src="./box-headline.png"></p>
      <form>
        <input class="username" type="text" placeholder="账号/邮箱" style="border: 0px;outline:none;cursor: pointer;" v-model="username">
        <input class="password" type="password" placeholder="密码" style="border: 0px;outline:none;cursor: pointer;" v-model="password">
        <!--<div class="login_box">-->
          <!--<input type="radio" name="login_type" value="0" class="login_type" checked><label>用户登录</label>-->
          <!--<input type="radio" name="login_type" value="1" class="login_type"><label>商家登录</label>-->
        <!--</div>-->
        <input class="submit" @click="login" type="button" value="点击登录" style="border: 0px;outline:none;cursor: pointer;"/>
        <img class="remember" :src=flag?check:not_check @click="remember"></img>
      </form>
      <p class="forget">忘记密码了？ <span>找回密码</span></p>
      <div class="line"></div>
      <p class="register">还没有注册？ <span @click="register">现在来注册</span></p>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        username:"",
        password:"",
        check:"static/rem.png",
        not_check:"static/rem2.png",
        flag:false
      }
    },
   methods:{
     remember(){
       this.flag = !this.flag
     },
     register(){
       this.$router.push("register");
     },
     login(){
       var login_index= $("input[name='login_type']:checked").val();
       if(this.username==""||this.password==""){
         alert("账号或密码不能为空");
         return;
       }
       // this.$router.push({name:'myfile',params:{username:this.username}});
       let data = {userid:this.username,password:this.password,index:0}
       var self = this;
       //接口请求
       $.ajax({
         type:'POST',
         url:'http://172.20.10.2:8080/Login',
         data:data,
         success:function(res){
           console.log(res.code)
           if(res.code == 1){
             alert("登陆成功!")
             var storage = window.localStorage;
             if(self.flag){
               console.log("flag");
               storage.setItem("username",self.username);
               storage.setItem("password",self.password);
               console.log("flag:"+storage.getItem("username"))
             }else {
               console.log("not flag");
               storage.setItem("username","");
               storage.setItem("password","");
             }
             console.log(storage.getItem("username")+"123")
             var obj = { username:self.username };
             var str = JSON.stringify(obj);
             sessionStorage.username = str;
             console.log("login:"+self.username)
             // this.$emit('LoginIn',this.username);
             // setCookie('username',this.username,1000*60);
             self.$router.push({name:'shop_list',params:{username:self.username}});
           }else{
             alert("用户不存在或密码错误!")
           }
         },
         error:function(err){
           console.log(err);
         }
       });

     }
   },
    mounted(){
      var storage = window.localStorage;
      console.log(storage.getItem("username"));
      if(storage.getItem("username")){
        this.username = storage.getItem("username");
       this.password = storage.getItem("password");
        this.flag = true;
       }
    }
  }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .login{
    background-image:url("./bg.jpg") ;
    background-size:cover;
    background-repeat: no-repeat;
    width: 100%;
    height:100%;
  }
  .login .login_title{
    margin: 112px auto;
    width: 44.5%;
    height: 26px;
    margin-top: -30px;
    margin-left: 27%;
    padding-top: 50px;
  }
  .login .content{
    margin: 28px auto;
  }
  .login .content .login_title{
    font-family: STHeitiSC-Medium;
    font-size: 18px;
    color: #333333;
    text-align: center;
  }
  .login .content form{
    margin-top: 14px;
    position: relative;
    width: 100%;
    text-align: center;
  }
  .login .content form input{
    width: 70%;
    height: 50px;
    /*margin-left: 10%;*/
    margin-left: auto;
    margin-right: auto;
    background: #f5f5f5;
    border-radius: 3px;
    font-size: 18px;
  }
  .login .content form input::-webkit-input-placeholder{
    color:#999;
  }
  .username,.password{
    padding-left: 4%;
    padding-right: 10%;
  }
  .login .content .password{
    margin-top:10px;
  }
  .login .content .submit{
    background:#13ac8c;
    margin-top: 50px;
    color: #fff;
  }
  .remember{
    width:6.25% ;
    height: 20px;
    position: absolute;
    top: 75px;
    right: 40px;
    cursor: pointer;
  }
  .forget{
    font-family: STHeitiSC-Light;
    font-size: 12px;
    color: #07111b;
    text-align: center;
    margin-top: 10px;
  }
  .forget span{
    color:#3f87ff;
    cursor: pointer;
  }
  .line{
    width: 100%;
    height: 3px;
    background: #eeeeee;
    margin-top: 20px;
  }
  .register{
    font-size: 16px;
    font-family: STHeitiSC-Light;
    color: #07111b;
    text-align: center;
    margin-top: 8px;
  }
  .register span{
    color:#3f87ff;
    cursor: pointer;
  }
  .login_box{
   padding-top: 20px;
  }
  .login .content form .login_type{
    width: 15px;
    height: 15px;
    display: inline-block;
    margin-left: 20px;
  }
</style>
