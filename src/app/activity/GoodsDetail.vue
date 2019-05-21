<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>
    <page-header>
      <topbar :type="'back'" :hideShareBtn="true">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>
    <page-main :show="show">
      <div class="banner">
        <template v-if="bannerList.length>0">
          <Swiper :bannerList="bannerList" :showDot="false" :paddingTop="80.4" :wrapperPadding="0"
                  :setInterval="0" :column="1" :transformScale="true" :autoPlay="false" :slideRadius="0"
          :loop="false">
          </Swiper>
        </template>
        <div class="price-time">
            <div class="price">
              <p>￥<span>{{(""+detail.price).split('.')[0]}}</span><i v-if="(''+detail.price).split('.')[1]">.</i>{{(""+detail.price).split('.')[1]}}</p>
              <p>
                <del>￥{{detail.marketPrice}}</del>
                <span>已抢{{detail.stock-detail.stockLeft}}件</span>
              </p>
            </div>
            <div v-if="detail.djs!='00:00:00'" class="time">
                <p>距离开始仅剩</p>
                <p v-if="detail.djs" class="limt-time"><span class="t_h">{{detail.djs.split(':')[0]}}</span>:<span class="t_m">{{detail.djs.split(':')[1]}}</span>:<span class="t_s">{{detail.djs.split(':')[2]}}</span></p>
            </div>
            <div v-else="" class="time">
              <p>距离结束仅剩</p>
              <p v-if="detail.jsdjs" class="limt-time"><span class="t_h">{{detail.jsdjs.split(':')[0]}}</span>:<span class="t_m">{{detail.jsdjs.split(':')[1]}}</span>:<span class="t_s">{{detail.jsdjs.split(':')[2]}}</span></p>
            </div>
        </div>
        <div class="name">
            <p v-if="detail.name" class="main-name">{{detail.name}}</p>
            <p v-if="detail.sellingPoint" class="sup-name">{{detail.sellingPoint}}</p>
        </div>
      </div>
      <div class="info">
        <ul>
          <li>
            <p>
              <span>编号</span>{{detail.skuId}}
            </p>
          </li>
          <li v-if="detail.deliveryName">
            <p>
              <span>发货地</span>{{detail.deliveryName}}
            </p>
          </li>
          <li>
            <p>
              <span>库存</span>仅剩{{detail.stockLeft}}件
            </p>
          </li>
        </ul>
      </div>
      <div class="img-txt">
          <h3>商品介绍</h3>
          <div class="description" v-html="detail.description">

          </div>
      </div>
      <div class="kong"></div>
      <div class="buy" @click="buy()">
          <span>
            立即购买
          </span>
      </div>
    </page-main>
  </page-wrap>
</template>

<script>
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import {passport} from 'src/globalData';
  import {getScheme, setScheme} from 'nativeFix';
  import store from 'store';
  import Swiper from 'lib/swiper/Swiper';
  import DetailBanner from 'src/app/activity/modules/DetailBanner';
  import apiGetseckillDetail from 'api/activity/apiGetseckillDetail';
  import apiCheckSeckill from 'api/activity/apiCheckSeckill';
  export default {
    components: {
      Swiper,
      DetailBanner
    },
    data: () => {
      return {
        show: false,
        title: '商品详情',
        banners:[{}],
        detail:'',
        currentTime:'',
        skuId:''
      }
    },
    methods:{
      linkto(router) {
        this.$router.push(router);
      },
      getDetail() {
        let _this = this;
        apiGetseckillDetail({
          "id":this.$route.query.id
        }).then(res => {
          this.detail = res.seckillGoods;
          let arr = res.seckillGoods.image.split(',');
          arr.pop();
          this.banners = arr;
          this.skuId = res.seckillGoods.skuId;
          this.currentTime = res.currentTime;
          this.$set(
            _this.detail,"djs",_this.initTime(_this.detail.startTime)
          );
          this.$set(
            _this.detail,"jsdjs",_this.initTime(_this.detail.endTime)
          );
          this.show = true;
        })
      },
      initTime(t){
        let date = new Date(this.currentTime.replace(/\-/g, '/'));
        let now = date.getTime(); //当前时间
        let endDate = new Date(t.replace(/\-/g, '/'));//截止时间
        let end = endDate.getTime();
        let leftTime = end - now; //时间差
        var h, m, s;
        if(leftTime >= 0) {
          h = Math.floor(leftTime / 1000 / 60 / 60);
          m = Math.floor(leftTime / 1000 / 60 % 60);
          s = Math.floor(leftTime / 1000 % 60);
          if(s < 10) {
            s = "0" + s;
          }
          if(m < 10) {
            m = "0" + m;
          }
          if(h < 10) {
            h = "0" + h;
          }
          h = h;
          m = m;
          s = s;
        } else {
          h = '00';
          m = '00';
          s = '00';
        }
        return h+':'+m+':'+s
      },
      buy() {
         if (this.detail.stockLeft == 0){
           this.$toast('库存不足');
          }else{
             if(this.currentTime < this.detail.startTime){
               this.$toast('活动未开始');
             }else{
               isLogin({
                 success: (res) => {
                     console.log(res,'333');
                     let userid = res.data.userId;
                     let enterType = res.data.enterType;
                   apiCheckSeckill({
                     "id":this.$route.query.id,
                     "userId":userid,
                     "enterType":enterType
                   }).then(res => {
                     console.log(res,'check');
                     if(res.retCode == 0){
                       if (isApp()){
                         let version = this.$DANativeApi.apiVersionNumber;
                         if(version >= 333){
                           let url = 'productBuyNow?id='+this.skuId+'&count=1';
                           setScheme(url);
                         }else {
                           this.$updateApp('3.3.3');
                         }
                       }else{
                         let url = getLocation().origin + window.location.pathname+window.location.search;
                         this.$openApp(url);
                       }
                     }else{
                       this.$toast(res.retMsg);
                     }
                   })
                 },
                 fail: () => {
                   if (isApp()){
                     toLogin();
                   }else{
                     passport.toLogin();
                   }
                 }
               })
             }
          }
      }
    },
    computed: {
      bannerList() {
        if(!this.banners) return;
        let list = [];
        let n = 0;
        this.banners.forEach(item => {
            if(item){
                n++
              list.push({
                linkUrl: 'javascript:void(0);',
//                image:item.image,
                image: 'http://image.urwork.cn/'+item,
                id: n
              })
            }
        });
        console.log(list,'lllllll');
        return list;
      }
    },
    created() {
      this.getDetail();
      console.log(this.$route.query.id)
//      isLogin({
//        success: () => {
//          this.getinfo();
//        },
//        fail: () => {
//          if(this.isApp) {
//            toLogin();
//          }else{
//            window.location.href = 'https://passport2.urwork.cn/passport/login?retUrl='+location.href;
//          }
//        }
//      })
    },
    mounted() {
      let _this = this;
      console.log(_this.detail.djs,'333333333333333')
      setInterval( ()=> {
          let xh = _this.detail.djs.split(':')[0];
          let xm = _this.detail.djs.split(':')[1];
          let xs = _this.detail.djs.split(':')[2];
          let ts = 3600*xh*1000+xm*60*1000+xs*1000;
          let leftTime = ts-1000;
          var h, m, s;
          if(leftTime >= 0) {
            h = Math.floor(leftTime / 1000 / 60 / 60);
            m = Math.floor(leftTime / 1000 / 60 % 60);
            s = Math.floor(leftTime / 1000 % 60);
            if(s < 10) {
              s = "0" + s;
            }
            if(m < 10) {
              m = "0" + m;
            }
            if(h < 10) {
              h = "0" + h;
            }
            h = h;
            m = m;
            s = s;
          } else {
            h = '00';
            m = '00';
            s = '00';
          }
          this.detail.djs = h+':'+m+':'+s
      }, 1000);

      setInterval( ()=> {
      let jsxh = _this.detail.jsdjs.split(':')[0];
      let jsxm = _this.detail.jsdjs.split(':')[1];
      let jsxs = _this.detail.jsdjs.split(':')[2];
      let jsts = 3600*jsxh*1000+jsxm*60*1000+jsxs*1000;
      let jsleftTime = jsts-1000;
      var jsh, jsm, jss;
      if(jsleftTime >= 0) {
        jsh = Math.floor(jsleftTime / 1000 / 60 / 60);
        jsm = Math.floor(jsleftTime / 1000 / 60 % 60);
        jss = Math.floor(jsleftTime / 1000 % 60);
        if(jss < 10) {
          jss = "0" + jss;
        }
        if(jsm < 10) {
          jsm = "0" + jsm;
        }
        if(jsh < 10) {
          jsh = "0" + jsh;
        }
        jsh = jsh;
        jsm = jsm;
        jss = jss;
      } else {
        jsh = '00';
        jsm = '00';
        jss = '00';
      }
      this.detail.jsdjs = jsh+':'+jsm+':'+jss
      }, 1000);

    }
  }
</script>

<style lang="scss" scoped="">
  #main{
    .banner{
      .price-time{
        width: auto;
        height: 50px;
        overflow: hidden;
        .price{
          width: 68%;
          height: 100%;
          background: #e83324;
          float: left;
          padding: 0 21px;
          display: flex;
          align-items: center;
          color: #ffffff;
          p{
            &:nth-of-type(1){
              font-size: 16px;
              margin-right: 15px;
              span{
                font-size: 33px;
                font-weight: 600;
              }
            }
            &:nth-of-type(2){
              display: flex;
              flex-direction: column;
              font-size: 0;
              del{
                opacity: 0.5;
                font-size: 12px;
              }
              span{
                font-size: 12px;
              }
            }
          }
        }
        .time{
          width: 32%;
          height: 100%;
          background: #ffce97;
          float: left;
          text-align: center;
          p{
            font-size: 12px;
            &:nth-of-type(1){
              color: #998976;
              margin-top: 6px;
            }
            &:nth-of-type(2){
              color: #262627;
              font-size: 12px;
              margin-top: -1px;
              span{
                background: #262627;
                border-radius: 4px;
                color: #ffce97;
                padding: 0 3px;
                margin: 0 3px;
              }
            }
          }
        }
      }
      .name{
        padding: 15px 20px;
        font-size: 0;
        .main-name{
          font-size: 16px;
          font-weight: 600;
          line-height: 1;
          word-wrap:break-word;
          line-height: 1.5;
        }
        .sup-name{
          padding-top: 10px;
          color: #cccccc;
          font-size: 12px;
          line-height: 1;
          word-wrap:break-word;
        }
        border-bottom: 8px solid #f5f5f5;
      }
    }
    .info{
      padding: 0 20px;
      border-bottom: 8px solid #f5f5f5;
      ul{
        li{
          border-bottom: 1px solid #ebebeb;
          &:last-child{
            border-bottom: none;
          }
          p{
            height: 50px;
            line-height: 50px;
            font-size: 14px;
            color: #333333;
            span{
              width: 50px;
              height: 50px;
              display: inline-block;
              color: #bbbbbb;
            }
          }
        }
      }
    }
    .img-txt{
      padding: 17px 20px;
      h3{
        font-size: 16px;
        font-weight: 700;
      }
      .description{
        margin-top: 15px;
      }
    }
    .kong{
      height: 60px;
    }
    .buy{
      width: 100%;
      height: 59px;
      position: fixed;
      bottom: 0;
      padding: 9px 12px;
      background: #f8f8f8;
      span{
        width: 100%;
        height: 100%;
        background: #e83324;
        border-radius: 2px;
        color: #ffffff;
        font-size: 15px;
        display: block;
        text-align: center;
        line-height: 41px;
      }
    }
  }
</style>

