<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <page-header>
      <topbar :type="'back'" :hideShareBtn="true">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main :show="show">
       <ul class="items">
         <li class="item used" v-if="used&&used.length > 0">
           <h3>最近使用</h3>
           <ul>
             <template v-for="role in used">
               <li v-if="role.isThree == 1" @click="threeGo(role.routeUrl,role.name,role)">
                 <img :src="role.iconUrl">
                 <p>{{role.name}}</p>
               </li>
               <template v-else="">
                 <li v-if="role.id==1" @click="bookGo(role)">
                   <img :src="role.iconUrl">
                   <p>{{role.name}}</p>
                 </li>
                 <template v-else="">
                   <li v-if="role.id==2" @click="printGo(role)">
                     <img :src="role.iconUrl">
                     <p>{{role.name}}</p>
                   </li>
                   <li v-else="" @click="mylinkto(role,role.routeUrl)">
                     <img :src="role.iconUrl">
                     <p>{{role.name}}</p>
                   </li>
                 </template>
               </template>
             </template>
           </ul>
         </li>
         <li class="item" v-for="item in data">
           <h3>{{item.title}}</h3>
           <ul>
             <template v-for="role in item.content">
               <li v-if="role.isThree == 1" @click="threeGo(role.routeUrl,role.name,role)">
                 <img :src="role.iconUrl">
                 <p>{{role.name}}</p>
               </li>
               <template v-else="">
                 <li v-if="role.id==1" @click="bookGo(role)">
                   <img :src="role.iconUrl">
                   <p>{{role.name}}</p>
                 </li>
                 <template v-else="">
                   <li v-if="role.id==2" @click="printGo(role)">
                     <img :src="role.iconUrl">
                     <p>{{role.name}}</p>
                   </li>
                   <li v-else="" @click="mylinkto(role,role.routeUrl)">
                     <img :src="role.iconUrl">
                     <p>{{role.name}}</p>
                   </li>
                 </template>
               </template>
             </template>
           </ul>
           <div class="line">
             <span></span>
           </div>
         </li>
       </ul>
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
  import apiGetCards from 'api/user/apiGetCards';
  import apiTicket from 'api/user/apiTicket';
  import store from 'store';
  export default {
    components: {

    },
    data: () => {
      return {
        show: false,
        title: '更多服务',
        userId:'',
        clicktag:0,
        rights:'',
        checkTips:true,
        dialog:false,
        dialogName:'第三方',
        dialogUrl:'',
        used:[],
        data:[{
            title:'社区生活',
            content:[{
                id:1,
                name:'内有书屋',
                iconUrl:'https://assets.urwork.cn/image/v3/applylist/book.png',
                isThree:'0',
                routeUrl:'urwork://book'
            },{
              id:2,
              name:'云打印',
              iconUrl:'https://assets.urwork.cn/image/v3/applylist/print.png',
              routeUrl:'urwork://qrcode?type=3',
              isThree:'0',
            },{
              id:3,
              name:'一键上网',
              iconUrl:'https://assets.urwork.cn/image/v3/applylist/wifi.png',
              routeUrl:'/wifi/join',
              isThree:'0',
            },{
              id:4,
              name:'访客预约',
              iconUrl:'https://assets.urwork.cn/image/v3/applylist/fangke.png',
              routeUrl:'/v2/visit',
              isThree:'0',
            },{
              id:5,
              name:'活动行',
              iconUrl:'https://assets.urwork.cn/image/v3/applylist/huodong.png',
              routeUrl:'http://www.huodongxing.com',
              isThree:'1',
            }]
        },{
          title:'员工福利',
          content:[{
            id:6,
            name:'折扣专区',
            iconUrl:'https://assets.urwork.cn/image/v3/applylist/zhekou.png',
            routeUrl:'http://openapi.neigou.com/ChannelInterop/V1/URWork/Web/index',
            isThree:'1',
          },{
            id:7,
            name:'纽宾凯',
            iconUrl:'https://assets.urwork.cn/image/v3/applylist/nbk.png',
            routeUrl:'http://xyt.dashaning.com/wechat/urwork/index?v=1#/',
            isThree:'1',
          },{
            id:8,
            name:'蛋壳公寓',
            iconUrl:'https://assets.urwork.cn/image/v3/applylist/danke.png',
            routeUrl:'http://www.dankegongyu.com/?from=urwork',
            isThree:'1',
          }]
        },{
          title:'企业福利',
          content:[{
            id:9,
            name:'服务商',
            iconUrl:'https://assets.urwork.cn/image/v3/applylist/fuwu.png',
            routeUrl:'/facilitator/facilitatorList',
            isThree:'0',
          },{
            id:10,
            name:'投融资',
            iconUrl:'https://assets.urwork.cn/image/v3/applylist/tou.png',
            routeUrl:'/faInvestor/welcome',
            isThree:'0',
          },{
            id:11,
            name:'招聘',
            iconUrl:'https://assets.urwork.cn/image/v3/applylist/offer.png',
            routeUrl:'https://m.qtshe.com/business/qtsurwork?channel=106',
            isThree:'1',
          },{
            id:12,
            name:'电子签章',
            iconUrl:'https://assets.urwork.cn/image/v3/applylist/dianzi.png',
            routeUrl:'https://www.tsign.cn/',
            isThree:'1',
          }]
        }]
      }
    },
    methods:{
      loStorage (role) {
        var obj = JSON.parse(localStorage.getItem('urworkApplyUsed'))||[];
        if(obj.length>0&&obj){
            var  isHasCurrentUserid = 0;
            obj.map((key,idx)=> {
                if (key.userId == this.$store.state.userInfo.userId) {
                    isHasCurrentUserid = 1;
                    let flag = 0;
                    key.applyList.map((appObj,idx)=>{
                        role.id == appObj.id ? flag = idx:''
                    })
                  if(flag != 0){
                    [key.applyList[flag],key.applyList[0]] = [key.applyList[0],key.applyList[flag]];
                  }else{
                    if(key.applyList.length == 4){
                      key.applyList.pop();
                    }
                    key.applyList.unshift(role);
                  }
                }
            })
          if(isHasCurrentUserid == 0){
               let item = {
                  userId:this.$store.state.userInfo.userId||"",
                  applyList:[]
                };
                item.applyList.unshift(role)
                obj.push(item);
          }
        }else{//被清除  或者第一次
            let item = {
                userId:this.$store.state.userInfo.userId||"",
                applyList:[]
            };
            item.applyList.unshift(role)
            obj.push(item);
        }
        localStorage.setItem('urworkApplyUsed',JSON.stringify(obj));
      },
      clicktagx () {
        if (this.clicktag == 0) {
          this.clicktag = 1;
          setTimeout(function () {this.clicktag = 0}, 500);
        }else{
//          this.$toast("请勿频繁点击！");
        }
      },
      mylinkto(data,router) {
          this.loStorage(data);
        let url = getLocation().origin + router;
        if(isApp()) {
          this.$DANativeApi.navigateTo({
            url
          })
        } else {
            window.location.href = url;
//          this.$router.push(router);
        }
      },
      linkto(item) {
        this.clicktagx();
        let router = '/v2/membership/carddetail?code='+item.couponTypeCode+'_'+item.id+'_'+encodeURIComponent(item.couponName);
        if(isApp()) {
          let url = getLocation().origin + router;
          this.$DANativeApi.navigateTo({
            url
          })
        } else {
          this.$router.push(router);
        }
      },
      getinfo() {
        let arry = JSON.parse(localStorage.getItem('urworkApplyUsed'));
        if(arry){
          arry.map((obj,idx)=>{
            obj.userId == this.$store.state.userInfo.userId ? this.used = obj.applyList:''
          })
        }
        let obj = {}
        this.used = this.used.reduce((item, next) => {
          obj[next.id] ? '' : obj[next.id] = true && item.push(next)
          return item
        }, [])
        this.show = true;
      },
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
      threeGo(url,name,data) {
        this.dialogName = name;
        this.dialogUrl = url;
        this.loStorage(data);
        if(localStorage.getItem(this.dialogName) == 1){
          if(isApp()) {
            if(this.dialogUrl == 'http://openapi.neigou.com/ChannelInterop/V1/URWork/Web/index'){
              this.loginTransfer();
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
      bookGo(item) {
        this.loStorage(item);
        if (isApp()) {
          var appVersion = this.$DANativeApi.apiVersionNumber;;
          if(appVersion > 334){
            this.$DANativeApi.navigateTo({
              url: "urwork://book"
            });
          }else{
            this.$updateApp('3.3.5');
          }
        } else {
          this.$openApp('urwork://book');
        }
      },
      printGo(item) {
        this.loStorage(item);
        if (isApp()) {
          isLogin({
            success: () => {
              this.$DANativeApi.navigateTo({
                url:'urwork://qrcode?type=3'
              })
            },
            fail: () => {
              toLogin();
            }
          })
        } else {
          this.$openApp('urwork://qrcode?type=3');
        }
      },
      loginTransfer() {
        this.loStorage(item);
        //点击new_icon
        var loginUrl = "http://openapi.neigou.com/ChannelInterop/V1/URWork/Web/index";  //要跳转的url
        if(/ucommune.com/.test(window.location.host)){
          loginUrl = "http://openapi.neigou.com/ChannelInterop/V1/URWork/Web/index?domain=c"
        }else{
          loginUrl = "http://openapi.neigou.com/ChannelInterop/V1/URWork/Web/index?domain=r"
        }
        if (isApp()) {
          isLogin({
            success: () => {
              this.$DANativeApi.navigateTo({
                url:loginUrl
              })
            },
            fail: () => {
              toLogin();
            }
          })
        } else {
          isLogin({
            success: () => {
              window.location.href = loginUrl;
            },
            fail: () => {
              window.location.href = 'https://passport2.urwork.cn/passport/login?retUrl='+loginUrl;
            }
          })
        }
      }
    },
    created() {
      this.show = true;
      isLogin({
        success: () => {
          this.getinfo();
          console.log(this.used);
        },
        fail: () => {

        }
      })
    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  .page-wrapper{
    background-color: #ffffff;
  }
  /deep/ .page-topbar.topbar-theme-def {
    background-color: #ffffff;
  }
  #main{
    .items{
      padding-bottom: 20px;
      .used{
        margin: 4px 0;
        padding-bottom: 25px;
        border-bottom: 4px solid #f5f5f5;
        border-top: 4px solid #f5f5f5;
        margin-top: 0px;
      }
      .item{
        padding-top: 40px;
        background: #ffffff;
        .line{
          width: 100%;
          height: 1px;
          opacity: 0.5;
          padding: 0 20px;
          padding-top: 15px;
          span{
            width: 100%;
            height: 1px;
            display: inline-block;
            position: relative;
            @include border-bottom(#D1D1D1);
          }
        }
        &:last-of-type{
          .line{
            display: none;
          }
        }
          h3{
            font-family: PingFangSC-Medium;
            font-size: 18px;
            color: #1D1D1D;
            letter-spacing: 0;
            padding-left: 20px;
          }
         ul{
           display: flex;
           flex-wrap: wrap;
           align-items: center;
           justify-content: flex-start;
           li{
             width: 25%;
             display: flex;
             flex-direction: column;
             align-items: center;
             justify-content: center;
             margin-top: 24px;
             img{
               width: 25px;
               height: 25px;
             }
             p{
               font-family: PingFangSC-Regular;
               font-size: 14px;
               color: #1D1D1D;
               letter-spacing: 0;
               text-align: center;
               margin-top: 7px;
             }
           }
         }
      }
    }
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

