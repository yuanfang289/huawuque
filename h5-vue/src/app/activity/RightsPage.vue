<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>
    <page-header>
      <topbar :type="'back'">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>
    <page-main :show="show">
      <div class="banner">
        <img style="display: none" src="https://assets.urwork.cn/image/activity/yx-share.png">
        <article style="display: none">欢天喜气闹元宵  澳洲红酒免费领</article>
         <div class="free"></div>
         <div class="drink" @click="threeGo('http://t.cn/EV7irLB','澳洲原装葡萄酒')"></div>
      </div>
      <div class="commonweal">
      </div>
      <div class="list">
        <div class="item" @click="threeGo('/v2/membership/ikang','爱康')">
            <div class="free"></div>
        </div>
        <div class="item" @click="adopt(2)">
            <div v-if="yaduo" class="nofree"></div>
            <div v-else class="received"></div>
        </div>
        <div class="item" @click="threeGo('https://saas.taihuoniao.com/promote/youke?from=2','太火鸟')">
            <div class="free"></div>
        </div>
        <div class="item" @click="threeGo('https://h5.youzan.com/v2/promocardfetch/15krpf0zs?redirect_count=1','星库')">
            <div class="free"></div>
        </div>
      </div>
      <div id="member-enter">
          <img @click="rightsDetail()" src="https://assets.urwork.cn/image/activity/member-enter.png">
      </div>

      <div id="mask" v-show="dialog">
        <div class="dialog">
          <div class="content"  @click="tipsClick()">
            <p>提示</p>
            <div class="txt">
              本服务由第三方平台提供。相关服务和责任将由该第三方承担。如有问题请咨询该平台客服。
            </div>
            <div class="tips">
              <span :class="{'no-select':checkTips,'select':!checkTips}"></span><span class="p">不再提示</span>
            </div>
          </div>
          <div class="bot" @click="dialogClick(0)">
            我知道了
          </div>
        </div>
      </div>

    </page-main>
  </page-wrap>
</template>

<script>
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import {getScheme, setScheme} from 'nativeFix';
  import store from 'store';
  import apiTicket from 'api/user/apiTicket';
  import apiGetCards from 'api/user/apiGetCards';
  export default {
    components: {

    },
    data: () => {
      return {
        show: false,
        title: '优客工场企业会员狂欢日',
        rights:[],
        checkTips:true,
        dialog:false,
        dialogName:'第三方',
        dialogUrl:'',
        yaduo:true
      }
    },
    methods:{
      tipsClick() {
        this.checkTips = !this.checkTips;
      },
      closeDialog() {
        this.checkTips ?  localStorage.setItem(`${this.dialogName}`, '0') : localStorage.setItem(`${this.dialogName}`, '1');
        this.dialog = false;
        if(isApp()) {
          if(this.dialogUrl == 'https://act.you.163.com/act/static/3wEFM7OLOa.html?from=out_bd_youkugongchang_0'){
            window.location.href = this.dialogUrl;
          }else{
            let url1 = this.dialogUrl;
            if(url1.indexOf("/v2/membership") > -1){
              url1 = getLocation().origin+this.dialogUrl;
            }
            this.$DANativeApi.navigateTo({
              url:url1
            })
          }
        } else {
          window.location.href = this.dialogUrl;
        }
      },
      dialogClick(n) {
        n == 1 ? this.dialog = true:this.closeDialog();
      },
      threeGo(url,name) {
        this.dialogName = name;
        this.dialogUrl = url;
        if(localStorage.getItem(this.dialogName) == 1){
          if(isApp()) {
            if(this.dialogUrl == 'https://act.you.163.com/act/static/3wEFM7OLOa.html?from=out_bd_youkugongchang_0'){
              window.location.href = this.dialogUrl;
            }else{
              let url1 = this.dialogUrl;
              if(url1.indexOf("/v2/membership") > -1){
                url1 = getLocation().origin+this.dialogUrl;
              }
              this.$DANativeApi.navigateTo({
                url:url1
              })
            }
          } else {
            window.location.href = this.dialogUrl;
          }
        }else{
          this.dialogClick(1);
        }
      },
      linkto(n) {
        isLogin({
          success: () => {
            if(n==1){
                this.threeGo('http://openweb.liangzibao.cn/redirect/to?p=9972206',"right-insurance");
                //this.gotoUrl('http://openweb.liangzibao.cn/redirect/to?p=9972206')
            }
            if(n==2){
              this.threeGo('https://act.you.163.com/act/static/3wEFM7OLOa.html?from=out_bd_youkugongchang_0',"right-grill");
              //this.gotoUrl('https://act.you.163.com/act/static/3wEFM7OLOa.html?from=out_bd_youkugongchang_0')
            }
            if(n==3){
              this.getInfo(5);
            }
          },
          fail: () => {
            if(isApp()) {
              toLogin();
            }else{
              window.location.href = 'https://passport2.urwork.cn/passport/login?retUrl='+location.href;
            }
          }
        })
      },

      gotoUrl(url){
        if(isApp()) {
                   this.$DANativeApi.navigateTo({
            url
          })
        } else {
         location.href=url;
        }
      },
      mylinkto(router) {
        if(isApp()) {
          let url = getLocation().origin + router;
          this.$DANativeApi.navigateTo({
            url
          })
        } else {
          this.$router.push(router);
        }
      },
      rightsDetail(){
        let url =getLocation().origin +`/v2/membership/card`;
        if(isApp()) {
          this.$DANativeApi.navigateTo({
            url
          })
        } else {
          this.$router.push('/v2/membership/Card');
        }
      },
      getInfo(type) {
        apiGetCards({
          "userId": this.$store.state.userInfo.userId,
          "pn": 1,
          "ps": 1
        }).then(res => {
          let item=null;
          let path="/v2/membership/yaduo";
          let couponTypeCode=8;
          this.rights = res.rights[0].rightsList;
          this.rights.map(obj=>{
              if(obj.couponTypeCode==couponTypeCode){
                item=obj;
              }
          })
          if(type == 0){
            item.obtained == 1 ? this.yaduo = false:this.yaduo = true;
          }else{
            if(item.obtained == 1){
                  router = path+'?code='+item.couponTypeCode+'&first=1';
                  this.mylinkto(router);
                }else{
                  if(item.remainderQuantity > 0){
                    var router = path+'?code='+item.couponTypeCode+'&first='+item.obtained;
                    apiTicket({
                      "couponType":item.couponTypeCode,
                    }).then(res => {
                      this.$hideLoading();
                      if(res.retCode == 0){
                        this.mylinkto(router);
                      }else{
                        this.$toast(res.retMsg)
                      }
                    })
                  }else{
                    this.$hideLoading();
                    this.$toast('已领完！')
                  }
                }
          }
    

        });
      },
      adopt(){
        isLogin({
          success: () => {
            this.getInfo(7);
          },
          fail: () => {
            if(isApp()) {
              toLogin();
            }else{
              window.location.href = 'https://passport2.urwork.cn/passport/login?retUrl='+location.href;
            }
          }
        })
      },

    },
    created() {
      isLogin({
        success: () => {
          this.getInfo(0);
        },
        fail: () => {
          if(isApp()) {
            toLogin();
          }else{
            window.location.href = 'https://passport2.urwork.cn/passport/login?retUrl='+location.href;
          }
        }
      })
    },
    mounted() {
      this.show = true;
    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  .banner{
    width: 100vw;
    height: 166.66vw;
    background: url("https://assets.urwork.cn/image/activity/yx-banner.jpg") no-repeat;
    background-size: 100%;
    //height: 327px;
    position: relative;
        .free{
         position: absolute;
         right: 15.466vw;
         bottom: 8.8vw;
         width: 26.66vw;
         height: 7.2vw;
         background: url("https://assets.urwork.cn/image/activity/yx-free.png") no-repeat;
         background-size: 100%;
       }
       .drink{
         width: 100vw;
         height: 47.6vw;
         position: absolute;
         bottom: 1vw;
       }
  }
   .commonweal{
     width: 100vw;
     height: 15.866vw;
     background: url("https://assets.urwork.cn/image/activity/yx-title.jpg")  no-repeat;
     background-size: 100%;
     margin-top: -1px;
  }

  .list{
     width: 100%;
     height: 100%;
     margin-top: -2px;
     .item{
       width: 100vw;
       height: 47.6vw;
       position: relative;
       &:nth-of-type(1){
          background: url("https://assets.urwork.cn/image/activity/yx-item1.jpg") no-repeat;
          background-size: 100%;
          margin-top: -1px;
       }
       &:nth-of-type(2){
          background: url("https://assets.urwork.cn/image/activity/yx-item2.jpg") no-repeat;
          background-size: 100%;
          margin-top: -1px;
       }
       &:nth-of-type(3){
          background: url("https://assets.urwork.cn/image/activity/yx-item3.jpg") no-repeat;
          background-size: 100%;
          margin-top: -1px;
       }
       &:nth-of-type(4){
          background: url("https://assets.urwork.cn/image/activity/yx-item4.jpg") no-repeat;
          background-size: 100%;
          margin-top: -1px;
       }
       .free{
         position: absolute;
         right: 15.466vw;
         bottom: 8.8vw;
         width: 26.66vw;
         height: 7.2vw;
         background: url("https://assets.urwork.cn/image/activity/yx-free.png") no-repeat;
         background-size: 100%;
       }
       .nofree{
         position: absolute;
         right: 15.466vw;
         bottom: 8.8vw;
         width: 26.66vw;
         height: 7.2vw;
         background: url("https://assets.urwork.cn/image/activity/yx-once.png") no-repeat;
         background-size: 100%;
       }
        .received{
         position: absolute;
         right: 15.466vw;
         bottom: 8.8vw;
         width: 26.66vw;
         height: 7.2vw;
         background: url("https://assets.urwork.cn/image/activity/yx-received.png") no-repeat;
         background-size: 100%;
       }
     }
  
  }
 #member-enter{
   background: #de5a55;
   padding: 21px;
   margin-top: -1px;
 }

  #mask {
    width: 100%;
    height: 100%;
    background: rgba(127, 126, 125, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1900;
    .dialog {
      z-index: 1901;
      width: 5.73rem;
      /*height: 3.4rem;*/
      background-color: #ffffff;
      border-radius: 0.2rem;
      padding: .3rem .5rem .3rem .5rem;
      position: fixed;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      .content {
        width: 100%;
        /*height: 2.2rem;*/
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        p {
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #333333;
          letter-spacing: 0;
          font-weight: 600;
        }
        .txt{
          font-family: PingFangSC-Regular;
          font-size: 15px;
          color: #333333;
          letter-spacing: 0;
          margin-top: 0.27rem;
        }
        .tips{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          .select{
            width: 15px;
            height: 15px;
            display: inline-block;
            background: url("https://assets.urwork.cn/image/member/icon_checked.png") no-repeat;
            background-size: 100%;
            border-radius: 2px;
            margin-right: 7px;
            margin-top: 6px;
          }
          .no-select{
            width: 15px;
            height: 15px;
            display: inline-block;
            background: url("https://assets.urwork.cn/image/member/icon_nochecked.png") no-repeat;
            background-size: 100%;
            border-radius: 2px;
            margin-right: 7px;
            margin-top: 6px;
          }
          .p{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #666666;
            letter-spacing: 0;
          }
        }
        span {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #666666;
          letter-spacing: 0;
          text-align: center;
          margin-top: 0.14rem;
        }
      }
      .bot {
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #097FFF;
        letter-spacing: 0;
        margin-top: 15px;
        padding-top: 10px;
        border-top: 1px solid #f4f4f4;
      }

    }
  }
</style>



