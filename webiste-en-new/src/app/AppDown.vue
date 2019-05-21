<template>
  <div id="main">
    <top-bar></top-bar>
    <div class="swiper-box" v-bind:style="{ height: height + 'px'}">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="../assets/images/web1.png">
            <div class="div">
              <img src="../assets/images/web1-phone.png">
            </div>
            <div class="content">
                <h3>Ucommune App</h3>
                <p>To Bring those in the Paralleled World Together</p>
                <a class="andriod" href="https://m.urwork.cn/android/urwork_urwork.apk?source=en">
                  <img src="../assets/images/andriod-down.png">
                </a>
                <br>
                <a class="ios" href="https://itunes.apple.com/cn/app/you-ke-gong-chang/id1034170822?mt=8">
                  <img src="../assets/images/ios-down.png">
                </a>
            </div>
            <div class="qrcode">
                <img src='../assets/images/urwork-qrcode.jpg'>
            </div>
          </div>
          <div class="swiper-slide">
            <img src="../assets/images/web2.png" alt="b">
            <div class="div">
              <img src="../assets/images/web2-phone.png">
            </div>
            <div class="content">
              <h3>Convenient<br>
                Online System </h3>
              <p>Reserve work desk, meeting room, zone<br> door lock and your private office by<br> pressing one key</p>
            </div>
          </div>
          <div class="swiper-slide">
            <img src="../assets/images/web3.png" alt="c">
            <div class="div">
              <img src="../assets/images/web3-phone.png">
            </div>
            <div class="content">
              <h3>Ecological<br>
                Community </h3>
              <p>Share your daily work life to the community</p>
            </div>
          </div>
          <div class="swiper-slide">
            <img src="../assets/images/web4.png" alt="d">
            <div class="div">
              <img src="../assets/images/web4-phone.png">
            </div>
            <div class="content">
              <h3>Enterprise<br>
                Services</h3>
              <p>Bespoke services to meet your needs in everyway</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer style="margin-top: 0px"></Footer>
  </div>
</template>
<script>
  import TopBar from '@/components/topbar/TopBar';
  import Footer from '@/components/footer/Footer';
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  export default {
    components: {
      TopBar,
      Footer
    },

    data() {
      return {
        height:'500',
        mapflag:''
      }
    },
    computed: {
    },
    watch: {

    },
    methods: {

    },
    mounted() {
        let a = document.documentElement.clientHeight || document.body.clientHeight;
        this.height = a;
        var swiper = new Swiper('.swiper-container', {
          mousewheelControl : true,
          mousewheelReleaseOnEdges : true,
          direction: 'vertical',
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,//修改swiper的父元素时，自动初始化swiper
        });

      window.addEventListener('scroll', function () {
        this.mapflag = ($(window).scrollTop()>$("#footer-off").offset().top-$(window).height()+30);
        if(this.mapflag){
          swiper.disableMousewheelControl();
        }else{
          swiper.enableMousewheelControl();
        }
      });
    }
  }
</script>
<style lang="scss" scoped>
  .swiper-box {
    width: 100%;
    height: 100vh;
    padding-top: 80px;
  }
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    position: relative;
    img{
      width: 100%;
      height: 100%;
    }
    .content{
      color: #ffffff;
      padding-top: 1.9rem;
      .andriod{
        margin-top: 0.93rem;
      }
      .ios{
        margin-top: 0.02rem;
      }
      a{
        width: 1.98rem;
        height: 0.59rem;
        display: inline-block;
        img{
          width: 1.98rem;
          height: 0.59rem;
        }
      }
      h3{
        font-family: PingFangSC-Semibold;
        font-size: 45px;
        color: #FFFFFF;
        letter-spacing: 0;
        line-height: 50px;
        font-weight: 600;
      }
      p{
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #FFFFFF;
        letter-spacing: 0;
        margin-top: 15px;
      }
    }
    &:nth-of-type(1){
      .div{
        width: 4rem;
        height: 4rem;
        position: absolute;
        bottom: 0;
        right: 1.5rem;
        vertical-align:bottom;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .content{
        position: absolute;
        top: 0;
        left: 2.3rem;
        padding-top: 1.4rem;
      }
      .qrcode{
        width: 1.25rem;
        height: 1.25rem;
        position: absolute;
        top: 3.25rem;
        left:4.5rem;
        img{
          width: 1.25rem;
          height: 1.25rem;
        }
      }
    }
    &:nth-of-type(2){
      .div{
        width: 3rem;
        height: 5rem;
        position: absolute;
        bottom: 0;
        left: 2.5rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .content{
        position: absolute;
        top: 0;
        right: 2.3rem;
      }
    }
    &:nth-of-type(3){
      .div{
        width: 3rem;
        height: 5rem;
        position: absolute;
        bottom: 0;
        right: 2.5rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .content{
        position: absolute;
        top: 0;
        left: 2.3rem;
      }
    }
    &:nth-of-type(4){
      .div{
        width: 3rem;
        height: 4.38rem;
        position: absolute;
        bottom: 0;
        left: 2.1rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .content{
        position: absolute;
        top: 0;
        right: 2.3rem;
      }
    }
  }
</style>
