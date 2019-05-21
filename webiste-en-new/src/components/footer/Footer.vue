<template>
<div id="footer-off" class="footer-box">
  <div class="footer">
    <div class="left">
      <a href="javascript:void(0)" ><router-link :to="{name: 'about'}">About UCOMMUNE</router-link></a>
      <a href="javascript:void(0)" ><router-link :to="{name: 'cont'}">Contact Us</router-link></a>
      <a href="javascript:void(0)" ><router-link :to="{name: 'join'}">Join Us</router-link></a><br>
      <a href="javascript:void(0)" ><router-link :to="{name: 'legal'}">Legal Notices</router-link></a>
      <a href="javascript:void(0)" ><router-link :to="{name: 'policy'}">Privacy Policy</router-link></a>
    </div>
    <div class="right">
      <div class="div">
        <span>Language</span><br>
        <select class="lanuage" v-model="goto">
          <option :value="1">English</option>
          <option :value="2">中文</option>
          <option :value="3">香港站</option>
        </select>
      </div>
    </div>
  </div>
  <p>©2015-2018 UCommune  All Rights Reserved 京ICP备15021969号-1</p>
</div>
</template>

<script>
/**
   * 页面尾部footer
   */
export default {
  components: {},

  data () {
    return {
      goto:1,
    }
  },
  computed: {},
  watch: {
    goto(val){
      if(val==1){return}
      if(val==2){location.href="https://www.ucommune.com/"}
      if(val==3){location.href="https://ucommune.com.hk/"}
      var a=document.createElement("a");
      a.href=url;
      a.target="_blank";
    }
  },
  methods: {
    navigateTo(name){
      this.$router.push({
        name: name
      })
    }
  },
  mounted () {}
}
</script>

<style lang="scss" scoped>
  .footer-box{
    background: #333333;
    width: 100%;
    height: 197px;
    margin-top: 128px;
  .footer{
    width: 1200px;
    height: 130px;
    border-bottom: 1px solid #474747;
    margin: 0 auto;
  .left{
    width: 50%;
    height: 100%;
    float: left;
    padding-left: 58px;
    padding-top:25px ;
  a{
    width: 135px;
    display: inline-block;
    font-family: Avenir-Book;
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 40px;
    margin-right: 40px;
  }
  }
  .right{
    width: 50%;
    height: 100%;
    float: right;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  .div{
  span{
    font-family: Avenir-Black;
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 0;
  }
  select{
    width: 250px;
    height: 45px;
   // border: 1px solid #FFFFFF;
    border-radius: 2px;
    color: #ffffff;
    background: #333333;
    margin-top: 10px;
    font-family: Avenir-Book;
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 0;
  }
  }
  }
  }
  p{
    text-align: center;
    line-height: 65px;
    font-family: Avenir-Book;
    font-size: 12px;
    color: #C8C8C8;
    letter-spacing: 0;
  }
  }
</style>
