<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <page-header>
      <topbar :type="'back'" :hideShareBtn="true">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main :show="show">
        <div class="logo">
          <img :src="require('./img/honor/logo.png')">
        </div>
        <div class="honor">
            <img :src="honorImg">
        </div>
        <div class="title">
            <p>{{medalName}}</p>
        </div>
        <div class="per-info">
            <div class="head-img">
              <img :src="headImg" onerror="javascript:this.src='http://m.urwork.cn/assets/public/images/ui/headImg.png?imageMogr2/thumbnail/!140x140r/gravity/Center/crop/140x140';">
            </div>
            <p class="name">{{name}}</p>
            <p class="info">{{info}}</p>
        </div>
        <div class="footer">
            <button @click="openApp()">我要拿优鲜集勋章</button>
        </div>
    </page-main>

  </page-wrap>
</template>

<script>
  import apiGetMedal from 'api/user/apiGetMedal';
  import {isApp} from 'src/nativeFix/index';
  import {getScheme, setScheme} from 'nativeFix';
  export default {
    components: {

    },
    data: () => {
      return {
        show: false,
        title: '优鲜集勋章',
        userId:'',
        medalId:'',
        honorImg:require('./img/honor/honor.png'),
        medalName:'一见如故',
        headImg:require('./img/honor/honor.png'),
        name:'帅哥',
        info:''
      }
    },
    methods:{
       getData(res) {
         console.log(res,'xxxxxxx');

       },
       openApp(){
          if(isApp()){
            setScheme('homePage');
          }else{
            this.$openApp();
          }
       }
    },
    created() {
      apiGetMedal({
        "userId":this.$route.query.userId,"medalId":this.$route.query.medalId
      }).then(res => {
        this.honorImg = res.userMedal.icon;
        this.medalName = res.userMedal.medalName;
        this.headImg = 'https://image.urwork.cn/'+res.userInfo.headImage;
        this.name = res.userInfo.realName;
        this.info = res.userMedal.medalDescription;
        this.show = true;
      })
    },
    mounted() {
      this.userId =  this.$route.query.userId;
      this.medalId =  this.$route.query.medalId;
      console.log(this.userId,'123123',this.medalId)
    }
  }
</script>

<style lang="scss" scoped="">
  #main{
    width: 100%;
    height: 100vh;
    background: url("img/honor/bg.png") no-repeat;
    background-size: 100% 100%;
    padding-top: 45px;
    margin-top: -45px;
  }
  .logo{
    width: 66px;
    height: 30px;
    padding-top: 15px;
    margin-left: 15px;
  }
  .honor{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
  }
  .honor img{
    width: 4.28rem;
    height: 4.72rem;
    margin: 0 auto;
  }
  .title{
    margin-top: 15px;
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #E9CB82;
    letter-spacing: 0;
    text-align: center;
    font-weight: 600;
  }
  .per-info{
     margin-top: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #ffffff;
    .head-img{
      width: 0.6rem;
      height: 0.6rem;
      background: #2c67b2;
      border-radius: 50%;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .name{
      font-size: 14px;
      font-family: PingFangSC-Semibold;
      color: #E9CB82;
      letter-spacing: 0;
      text-align: center;
      margin-top: 10px;
    }
    .info{
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #E9CB82;
      opacity: 0.5;
      letter-spacing: 0;
      text-align: center;
      line-height: 20px;
    }
  }
  .footer{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    button{
      width: 3.6rem;
      height: 0.7rem;
      line-height: 0.7rem;
      color: #EACD87;
      border-radius: 0.35rem;
      border: 1px solid #EACD87;
    }
  }
</style>
