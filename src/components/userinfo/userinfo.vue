<template>
    <div class="userinfo">
      <div class="user_icon" id="user_icon"><input  @change="updateImg()"  type="file" style="width: 80px;height: 80px;" enctype=”multipart/form-data” id="file" accept = 'image/gif,image/jpeg,image/jpg,image/png'></input></div>
      <input type="text" class="user_name" value="" placeholder="昵称" v-model="nickname"></input>
      <div class="user_text">
        <span>账号</span>&nbsp;&nbsp;&nbsp;<span>{{username}}</span>
      </div>
      <div class="user_text">
        <span>手机</span>&nbsp;&nbsp;&nbsp;<input type="text" class="phone" value="" placeholder="手机号码" v-model="phone"></input>
      </div>
      <div class="user_text">
        <span>地址</span>&nbsp;&nbsp;&nbsp;<input type="text" class="address" value="" placeholder="地址" v-model="address"></input>
      </div>
      <div class="btn btn_yes" @click="update">确认</div>
      <div class="btn btn_Cancellation" @click="cancellation">注销</div>
    </div>
</template>

<script>
  export default {
    data(){
      return {
        username:"",
        avater:"static/icon.png",
        nickname:"屁桃",
        phone:"",
        address:"",
        userinfo:{}
      }
    },
    methods:{
      cancellation(){
        sessionStorage.clear();
        this.$router.push("/login");
      },
      updateImg(){
        var file = document.getElementById("file").files;
        for(var i = 0; i< file.length; i++) {
          var reader  = new FileReader();
          reader.readAsDataURL(file[i]);
          reader.onload=function(e){
            $(".user_icon").css("background-image","url(\""+ this.result+"\")");
          }
        }
        console.log($('#file')[0].files[0])
      },
      update(){
        if($(".user_name").eq(0).val()==""||$(".phone").eq(0).val()==""||$(".address").eq(0).val()==""){
          alert("请输入完整信息");
          return;
        }
        var self = this;
        // var data = {userid:this.username,username:this.nickname,location:this.address,profile:"",cellPhoneNumber:this.phone}
        var formData = new FormData();
        formData.append("imgFile", $('#file')[0].files[0]);
        formData.append("userid", this.username);
        formData.append("username", this.nickname);
        formData.append("location", this.address);
        formData.append("cellPhoneNumber", this.phone);
        formData.append("profile", "");
        $.ajax({
          type:'POST',
          url:'http://172.20.10.2:8080/ChangeUserInfo',
          data:formData,
          // datatype: 'json',
          cache:false,
          traditional: true,
          contentType: false,
          processData: false,
          success:function(res){
           console.log(res);
            if(res.avater){
              this.avater = res.avater;
            }
            console.log(this.avater)
            // this.$emit('avater',this.avater);
            $(".user_icon").css("background-image","url(\""+this.avater+"\")");
            // this.$router.push({name:'myfile',params:{username:this.username}});
            alert("信息修改成功")
            self.$router.push({name:'shop_list',params:{avater:this.avater}});
          },
          error:function(err){
            console.log(err);
          }
        });
        // $.ajax({
        //   type:'POST',
        //   url:'http://192.168.164.117:8080/ChangeUserInfo',
        //   data:data,
        //   success:function(res){
        //     console.log(res);
        //     if(res.code == 1){
        //       alert("修改信息成功")
        //       // this.$emit('LoginIn',this.username)
        //       // setCookie('username',this.username,1000*60);
        //       self.$router.push({name:'shop_list',params:{username:this.username}});
        //     }else {
        //       alert("修改信息失败")
        //     }
        //   },
        //   error:function(err){
        //     console.log(err);
        //   }
        // });
        // this.$router.push("./shop_list");
      }
    },
    mounted(){
        var str = sessionStorage.username;
        var str1 = sessionStorage.userinfo;
        this.username = JSON.parse(str).username;
        this.userinfo = JSON.parse(str1).userinfo;
        this.nickname = this.userinfo.username;
        this.address = this.userinfo.location;
        this.phone = this.userinfo.cellPhoneNumber;
        this.avater = this.userinfo.avater;
        console.log(this.avater)
        $(".user_icon").css("background-image","url(\""+this.avater+"\")");
        if(this.nickname){
          $(".user_name").attr('placeholder',this.nickname);
        }
      // // this.username = this.$route.params.username;
      // console.log("userinfo:"+this.username);
      // this.$http.get("/api/userinfo?username="+this.username).then((response) => {
      //   response = response.body;
      //   console.log(response)
      //   if(response.avater){
      //     this.avater = response.avater;
      //   }
      //   this.nickname = response.nickname;
      //   this.email = response.email;
      //   $(".user_icon").css("background-image","url(\""+this.avater+"\")");
      //   $(".user_name").val(this.nickname);
      //   $(".user_name").attr('placeholder',this.nickname);
      //   $("#email").text(this.email);
      //   // this.$router.push({name:'myfile',params:{username:this.username}});
      // }).catch(error => {
      //   alert("用户信息失败")
      // });
      // this.avater = this.$route.params.avater;
      // this.nickname = this.$route.params.nickname;
      // this.email = this.$route.params.email;
    }
  }
</script>

<style scoped>
  .userinfo{
    background-image:url("./bg.jpg");
    background-size: cover;
    width:100%;
    height: 100%;
    position: fixed;
    border-radius: 3px;
  }
  .phone,.address{
    width: 60%;
    background: transparent;
  }
  .user_icon{
    width: 80px;
    height: 80px;
    background-image: url("./icon.png");
    background-size: 80px 80px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    border-radius: 50%;
  }
  input[type="file"] {
    opacity:0;
    filter:alpha(opacity=0);
    cursor: pointer;
  }
  .user_name{
    width: 100%;
    text-align: center;
    margin-top: 12px;
    margin-left: auto;
    border: 0;
    outline:none;
    background: transparent;
  }
  .user_text,.user_text{
    margin-left: 25%;
    margin-top: 15px;
    font-family:STHeitiSC-Light;
    font-size: 18px;
    color: #333;

  }
  .btn_yes{
    /*background-image: url("./yes.png");*/
    /*background-size: 100px 40px;*/
    margin-top: 80px;
  }
  .btn{
    width: 100px;
    height: 40px;
    background:#29ba9c;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
    color:#fff;
    border-radius: 3px;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
  }
  .btn_Cancellation{
    margin-top: 20px;
  }
</style>
