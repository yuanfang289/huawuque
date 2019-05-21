<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <page-header>
      <topbar :type="'back'" :hideShareBtn="true">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main :show="show" style="height: 500px">
        <div class="card">
            <div class="img" v-if="show"  @click="mylinkto('/v2/membership/myecode')">
              <img v-if="list&&list[0].cardType==3" src="https://assets.urwork.cn/image/member/card3.png">
              <img v-if="list&&list[0].cardType==2" src="https://assets.urwork.cn/image/member/card2.png">
              <img v-if="list&&list[0].cardType==1" src="https://assets.urwork.cn/image/member/card1.png">
              <!--<div class="ecode" @click="mylinkto('/v2/membership/myecode')">-->

              <!--</div>-->
              <p class="card-sn">
                {{list[0].cardSn.replace(/(.{4})/g, "$1 ")}}
              </p>
            </div>
        </div>
        <div class="ul-icon">
          <ul>
            <li>
              <img src="./img/membership/sicon2.png">
              <span>会员福袋</span>
            </li>
            <li>
              <img src="./img/membership/sicon4.png">
              <span>生日权益</span>
            </li>
            <li>
              <img src="./img/membership/sicon3.png">
              <span>尊享服务</span>
            </li>
            <li>
              <img src="./img/membership/sicon1.png">
              <span>会员专享</span>
            </li>
          </ul>
        </div>
        <div class="rights">
            <h4 class="tit">
              <span></span><span></span><span></span>
              <span>会员专享</span>
              <span></span><span></span><span></span>
            </h4>
            <!--<h4 v-else="" class="tit">高级会员权益</h4>-->
            <div class="float-box">
              <div class="tit">
                <span class="tit-icon tit-icon1"></span>
                <span class="tit-txt">演奏绿色旋律，拥抱每一个生命</span>
              </div>
              <ul>
                <template v-for="item in list1">
                  <li @click="threeGo(item.path,item.name)" v-if="item.couponTypeCode == 0">
                    <img class="img" :src="item.img">
                    <div class="txt">
                      <p class="p"><span class="price">{{item.price}}</span><span class="left_num">不限数量</span></p>
                      <p class="name">{{item.name}}</p>
                    </div>
                    <div class="btn_box">
                      <div class="button">
                        立即领取
                      </div>
                    </div>
                  </li>
                  <li v-else="" @click="linkto(item)">
                    <img class="img" :src="item.img">
                    <div class="txt">
                      <p class="p"><span class="price">{{item.price}}</span><span class="left_num">已领{{item.obtainQuantity}}个</span></p>
                      <p class="name">{{item.name}}</p>
                    </div>
                    <div class="btn_box">
                      <div v-if="item.obtained == 1" class="button_grey">
                        已领取
                      </div>
                      <template v-else="">
                        <div v-if="item.remainderQuantity == 0" class="button_grey">
                          已领完
                        </div>
                        <div v-else="" class="button">
                          立即领取
                        </div>
                      </template>
                    </div>
                  </li>
                </template>

              </ul>
          </div>
            <!--<div class="float-box">-->
              <!--<div class="tit">-->
                <!--<span class="tit-icon tit-icon2"></span>-->
                <!--<span class="tit-txt">首汽优惠出行，寻找诗和远方</span>-->
              <!--</div>-->
              <!--<ul>-->
                <!--<template v-for="item in list2">-->
                  <!--<li @click="threeGo(item.path,item.name)" v-if="item.couponTypeCode == 0">-->
                    <!--<img class="img" :src="item.img">-->
                    <!--<div class="txt">-->
                      <!--<p class="p">-->
                        <!--<span class="price">{{item.price}}</span>-->
                        <!--<span v-if="item.remainderQuantity == 0" class="left_num">已领完</span>-->
                        <!--<span v-else="" class="left_num">不限数量</span>-->
                      <!--</p>-->
                      <!--<p class="name">{{item.name}}</p>-->
                    <!--</div>-->
                    <!--<div class="btn_box">-->

                        <!--<div class="button">-->
                          <!--立即领取-->
                        <!--</div>-->
                    <!--</div>-->
                  <!--</li>-->
                  <!--<li v-else="" @click="linkto(item)">-->
                    <!--<img class="img" :src="item.img">-->
                    <!--<div class="txt">-->
                      <!--<p class="p">-->
                        <!--<span class="price">{{item.price}}</span>-->
                        <!--<span v-if="item.remainderQuantity == 0" class="left_num">已领完</span>-->
                        <!--<span v-else="" class="left_num">剩余{{item.remainderQuantity}}个</span>-->
                      <!--</p>-->
                      <!--<p class="name">{{item.name}}</p>-->
                    <!--</div>-->
                    <!--<div class="btn_box">-->

                      <!--<div v-if="item.obtained == 1" class="button_grey">-->
                        <!--已领取-->
                      <!--</div>-->
                      <!--<template v-else="">-->
                        <!--<div v-if="item.remainderQuantity == 0" class="button_grey">-->
                          <!--已领完-->
                        <!--</div>-->
                        <!--<div v-else="" class="button">-->
                          <!--立即领取-->
                        <!--</div>-->
                      <!--</template>-->
                    <!--</div>-->
                  <!--</li>-->
                <!--</template>-->
              <!--</ul>-->
            <!--</div>-->
            <div class="float-box">
              <div class="tit">
                <span class="tit-icon tit-icon3"></span>
                <span class="tit-txt">精选新春好礼，温暖办公生活</span>
              </div>
              <ul>
                <template v-for="item in list3">
                  <li @click="linkto(item)" v-if="item.couponTypeCode == 7">
                    <img class="img" :src="item.img">
                    <div class="txt">
                      <p class="p">
                        <span class="price">{{item.price}}</span>
                        <span v-if="item.remainderQuantity == 0" class="left_num">已领完</span>
                        <span v-else="" class="left_num">剩余{{item.remainderQuantity}}个</span>
                      </p>
                      <p class="name">{{item.name}}</p>
                    </div>
                    <div class="btn_box">

                      <div v-if="item.obtained == 1" class="button_grey">
                        已领取
                      </div>
                      <template v-else="">
                        <div v-if="item.remainderQuantity == 0" class="button_grey">
                          已领完
                        </div>
                        <div v-else="" class="button">
                          立即领取
                        </div>
                      </template>
                    </div>
                  </li>
                  <li @click="threeGo(item.path,item.name)" v-else="">
                    <img class="img" :src="item.img">
                    <div class="txt">
                      <p class="p">
                        <span class="price">{{item.price}}</span>
                        <span v-if="item.remainderQuantity == 0" class="left_num">已领完</span>
                        <span v-else="" class="left_num">不限数量</span>
                      </p>
                      <p class="name">{{item.name}}</p>
                    </div>
                    <div class="btn_box">
                        <div class="button">
                          立即领取
                        </div>
                    </div>
                  </li>
                </template>

              </ul>
            </div>
            <div class="float-box">
              <div class="tit">
                <span class="tit-icon tit-icon4"></span>
                <span class="tit-txt">领略雪域风情，享受雪上速度与激情</span>
              </div>
              <ul>
                <li v-for="item in list4" @click="linkto(item)">
                  <img class="img" :src="item.img">
                  <div class="txt">
                    <p class="p"><span class="price">最低5.5折</span><span class="left_num">已领{{item.obtainQuantity}}个</span></p>
                    <p class="name">{{item.name}}</p>
                  </div>
                  <div class="btn_box">
                    <div v-if="item.obtained == 0" class="button">
                      立即领取
                    </div>
                    <div v-else="" class="button_grey">
                      已领取
                    </div>
                  </div>
                </li>
              </ul>
            </div>


            <div class="ad">
            <a href="/v2/activity/rightspage">
              <img src="https://assets.urwork.cn/image/member/footer-ad2.jpg">
            </a>
          </div>
            <h4 class="tit">
              <span></span><span></span><span></span>
              <span>企业优惠</span>
              <span></span><span></span><span></span>
            </h4>
            <div class="float-box">
              <div class="tit">
                <span class="tit-icon tit-icon5"></span>
                <span class="tit-txt">突破传统，让企业办公随心而动</span>
              </div>
              <ul>
                <a href="javascript:;" @click="threeGo('/v2/membership/ping','移动支付专家')">
                  <li>
                    <img class="img" src="https://assets.urwork.cn/image/member/payment.png">
                    <div class="txt">
                      <p class="p"><span class="price">9折优惠</span></p>
                      <p class="name">移动支付专家</p>
                    </div>
                    <div class="btn_box">
                      <div class="button">
                        立即领取
                      </div>
                      <!--<div class="button_grey">-->
                      <!--已领完-->
                      <!--</div>-->
                    </div>
                  </li>
                </a>
                <a href="javascript:;" @click="threeGo('https://ent.bestsign.cn/h5-single/mobile?source=youkegongchang','电子合同免费领取【上上签】')">
                  <li>
                    <img class="img" src="https://assets.urwork.cn/image/member/contract.png">
                    <div class="txt">
                      <p class="p"><span class="price">价值2600元</span></p>
                      <p class="name">电子合同免费领取【上上签】</p>
                    </div>
                    <div class="btn_box">
                      <div class="button">
                        立即领取
                      </div>
                    </div>
                  </li>
                </a>
              </ul>
            </div>


            <!--<div class="float-box">-->
            <!--<div class="tit">-->
              <!--<span class="tit-icon tit-icon4"></span>-->
              <!--<span class="tit-txt">团队权益，组团享优惠</span>-->
            <!--</div>-->
            <!--<ul>-->
              <!--<a href="https://ent.bestsign.cn/h5-single/mobile">-->
                <!--<li>-->
                  <!--<img class="img" src="https://assets.urwork.cn/image/member/goods-com.png">-->
                  <!--<div class="txt">-->
                    <!--<p class="p"><span class="price">最低5.5折</span></p>-->
                    <!--<p class="name">上上签</p>-->
                  <!--</div>-->
                  <!--<div class="btn_box">-->
                    <!--<div class="button">-->
                      <!--去看看-->
                    <!--</div>-->
                    <!--&lt;!&ndash;<div class="button_grey">&ndash;&gt;-->
                    <!--&lt;!&ndash;已领完&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                  <!--</div>-->
                <!--</li>-->
              <!--</a>-->
            <!--</ul>-->
          <!--</div>-->
        </div>
        <a href="q" class="ask-icon"></a>

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
        title: '会员卡',
        userId:'',
        list:'',
        skisTicketStatusList:'',
        list0:'',
        list1:[],
        list2:[{'couponTypeCode':0,"obtained":0}],
        list3:[{'couponTypeCode':1,"obtained":0}],
        list4:[],
        clicktag:0,
        rights:'',
        checkTips:true,
        dialog:false,
        dialogName:'第三方',
        dialogUrl:''
      }
    },
    methods:{
      clicktagx () {
        if (this.clicktag == 0) {
          this.clicktag = 1;
          setTimeout(function () {this.clicktag = 0}, 500);
        }else{
//          this.$toast("请勿频繁点击！");
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
      linkto(item) {
        this.clicktagx();
        let router = item.path+'?code='+item.couponTypeCode;
        if(item.obtained == 1){
          router = item.path+'?code='+item.couponTypeCode+'&first=1';
          if(isApp()) {
            let url = getLocation().origin + router;
            this.$DANativeApi.navigateTo({
              url
            })
          } else {
            this.$router.push(router);
          }
        }else{
            if(item.remainderQuantity != 0){
              router = item.path+'?code='+item.couponTypeCode+'&first='+item.obtained;
              apiTicket({
                "couponType":item.couponTypeCode,
              }).then(res => {
                if(res.retCode == 0){
                  item.obtained = 1;
                  item.remainderQuantity = item.remainderQuantity - 1;
                  item.obtainQuantity = item.obtainQuantity + 1;

                  if(isApp()) {
                    let url = getLocation().origin + router;
                    this.$DANativeApi.navigateTo({
                      url
                    })
                  } else {
                    this.$router.push(router);
                  }
                }else{
                  this.$toast(res.retMsg)
                }
              })
            }else{
              this.$toast('已领完！')
            }
        }
      },
      getinfo() {
        apiGetCards({
          "userId":this.$store.state.userInfo.userId,
          "pn":1,
          "ps":1
        }).then(res => {
          this.list = res.list;
          this.rights = res.rights;
          /*一次匹配*/
          this.rights.map( (obj,index)=>{
            obj.rightsType == 1 ? this.list0 = obj.rightsList:'';
          })
          /*二次匹配*/
          this.list0.map( (obj,index)=>{
            obj.couponTypeCode == 1 || obj.couponTypeCode == 2 ? this.list4.push(obj):'';

            obj.couponTypeCode == 6 ? this.list1.push(obj):'';
            obj.couponTypeCode == 5 ? this.list2.push(obj):'';
            obj.couponTypeCode == 7 ? this.list3.push(obj):'';

          })
          this.list1.push({'couponTypeCode':0,"obtained":0});
          this.list1.map( (obj,index)=>{
            if(obj.couponTypeCode == 6){
              this.$set(obj,"img",'https://assets.urwork.cn/image/member/seed.png');
              this.$set(obj,"name",'播种希望 助力公益');
              this.$set(obj,"price",'免费种树');
              this.$set(obj,"path",'/v2/membership/mforest');
            }else{
              this.$set(obj,"img",'https://assets.urwork.cn/image/member/insurance.png');
              this.$set(obj,"name",'假日无忧家庭出行保障');
              this.$set(obj,"price",'假日10元险');
              this.$set(obj,"path",'http://openweb.liangzibao.cn/redirect/to?p=9972206');
            }
          });
          this.list2.map( (obj,index)=>{
            if(obj.couponTypeCode == 5){
              this.$set(obj,"img",'https://assets.urwork.cn/image/member/specialcar.png');
              this.$set(obj,"name",'专车礼券 先到先得');
              this.$set(obj,"price",'30元代金券');
              this.$set(obj,"path",'/v2/membership/rent');
            }else{
              this.$set(obj,"img",'https://assets.urwork.cn/image/member/taix.png');
              this.$set(obj,"name",'打车福利 出行无忧');
              this.$set(obj,"price",'8.9折优惠');
              this.$set(obj,"path",'https://img.yun.01zhuanche.com/frontapp/activity/2018/12/payGo_21.html?from=singlemessage&isappinstalled=0');
            }
          });
          this.list3.push({'couponTypeCode':3,"obtained":0},{'couponTypeCode':4,"obtained":0});
          this.list3.map( (obj,index)=>{
            if(obj.couponTypeCode == 1){
              this.$set(obj,"img",'https://assets.urwork.cn/image/member/yeargoods.png');
              this.$set(obj,"name",'年货狂欢，领券臻享好礼');
              this.$set(obj,"price",'60元代金券');
              this.$set(obj,"path",'https://h5.youzan.com/v2/feature/l9wvQ0AZ9G');
            }else if(obj.couponTypeCode == 7){
              this.$set(obj,"img",'https://assets.urwork.cn/image/member/five.png');
              this.$set(obj,"name",'会员专享五福新春礼盒');
              this.$set(obj,"price",'60元代金券');
              this.$set(obj,"path",'/v2/membership/sugar');
            }else if(obj.couponTypeCode == 3){
              this.$set(obj,"img",'https://assets.urwork.cn/image/member/grill.png');
              this.$set(obj,"name",'炭火烤肉免费领取');
              this.$set(obj,"price",'0元免费');
              this.$set(obj,"path",'https://act.you.163.com/act/static/3wEFM7OLOa.html?from=out_bd_youkugongchang_0');
            }else if(obj.couponTypeCode == 4){
              this.$set(obj,"img",'https://assets.urwork.cn/image/member/dell.png');
              this.$set(obj,"name",'全网抄底价 客服领券【戴尔直销】');
              this.$set(obj,"price",'直降¥1000');
              this.$set(obj,"path",'https://j.youzan.com/z6jdR9');
            }
          })
          this.list4.map( (obj,index)=>{
              if(obj.couponTypeCode == 1){
                this.$set(obj,"img",'https://assets.urwork.cn/image/member/goods-ski1.png');
                this.$set(obj,"name",'万科石京龙滑雪场专享优惠');
                this.$set(obj,"path",'/v2/membership/discountcode');
              }
            if(obj.couponTypeCode == 2){
              this.$set(obj,"img",'https://assets.urwork.cn/image/member/goods-ski2.png');
              this.$set(obj,"name",'万科松花湖滑雪场专享优惠');
              this.$set(obj,"path",'/v2/membership/discountcode');
            }
          })
          this.show = true;
        })
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
      }
    },
    created() {
      isLogin({
        success: () => {
          this.getinfo();
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

    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  .ask-icon{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: url("https://assets.urwork.cn/image/member/ask-icon.jpg") no-repeat;
    background-size: 100%;
    position: fixed;
    bottom: 10%;
    right: 10px;
  }
  .tit-icon1{
      background: url("https://assets.urwork.cn/image/member/tit-icon04.png") no-repeat;
      background-size: 100%;
  }
  .tit-icon2{
    background: url("https://assets.urwork.cn/image/member/tit-icon05.png") no-repeat;
    background-size: 100%;
  }
  .tit-icon3{
    background: url("https://assets.urwork.cn/image/member/tit-icon06.png") no-repeat;
    background-size: 100%;
  }
  .tit-icon4{
    background: url("https://assets.urwork.cn/image/member/tit-icon01.png") no-repeat;
    background-size: 100%;
  }
  .tit-icon5{
    background: url("https://assets.urwork.cn/image/member/tit-icon07.png") no-repeat;
    background-size: 100%;
  }
  #main{
    margin: 0 auto;
    .card{
       max-width: 7.5rem;
       height: 100%;
       margin: 0 auto;
       padding: 12px 7px;
      .img{
        position: relative;
        img{
          width: 7.5rem;
          display: inline-block;
        }
        .ecode{
          width: 0.8rem;
          height: 0.8rem;
          display: inline-block;
          position: absolute;
          bottom: 0.6rem;
          right: 0.4rem;
        }
        .card-sn{
          position: absolute;
          bottom: 0.7rem;
          left: 0.7rem;
          font-size: 16px;
          color: #ffffff;
        }
      }
     }
    .ul-icon{
      padding: 0 19px 20px 19px;
      /*border-bottom: 10px solid #f9f9f9;*/
      ul{
        display:flex;
        justify-content: space-between;
        align-items: center;
        li{
          display: flex;
          flex-direction: column;
          align-items: center;
          img{
            width: 37px;
            height: 37px;
          }
          span{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            letter-spacing: 0;
            text-align: center;
            margin-top: 5px;
          }
        }
      }
    }
    .rights{
      background: #f9f9f9;
      max-width: 7.5rem;
      padding: 0px 10px;
      margin: 0 auto;
      border-bottom: 10px solid #f9f9f9;
      >.tit{
        height: 60px;
        line-height: 60px;
        font-weight: 600;
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        color: #F34311;
        letter-spacing: 0;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        span{
          border-radius: 50%;
          background: #F34311;
          display: inline-block;
          &:nth-of-type(1){
            width: 2px;
            height: 2px;
            margin-right: 6px;
          }
          &:nth-of-type(2){
            width: 4px;
            height: 4px;
            margin-right: 6px;
          }
          &:nth-of-type(3){
            width: 6px;
            height: 6px;
            margin-right: 15px;
          }
          &:nth-of-type(4){
            background: transparent;
          }
          &:nth-of-type(5){
            width: 6px;
            height: 6px;
            margin-left: 15px;
          }
          &:nth-of-type(6){
            width: 4px;
            height: 4px;
            margin-left: 6px;
          }
          &:nth-of-type(7){
            width: 2px;
            height: 2px;
            margin-left: 6px;
          }
        }
      }
      .content{
        margin-top: 5px;
        display: none;
        ul>li{
          padding: 15px 0;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          border-bottom: 1px solid #EDEDED;
          &:last-of-type{
            border: none;
          }
          .img{
            width: 90px;
            height: 105px;
            display: inline-block;
            border-radius: 5px;
          }
          .txt{
            display: none;
            height: 105px;
            flex: 1;
            display: flex;
            flex-direction: column;
            /*justify-content: space-around;*/
            padding: 0 15px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            span{
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap;
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #666666;
              letter-spacing: 0;
            }
            .name{
              font-family: PingFangSC-Medium;
              font-size: 14px;
              color: #333333;
              letter-spacing: 0;
              line-height: 20px;
              font-weight: 700;
              padding-bottom: 5px;
            }
            .time{
              margin-top: 3px;
              .time-icon{
                width: 11px;
                height: 10px;
                display: inline-block;
                background: url("./img/membership/cal-icon.png") no-repeat center;
                background-size: cover;
                margin-right: 7px;
              }
            }
            .price{
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #FF4500;
              letter-spacing: 0;
              margin-top: 22px;
              font-weight: 500;
            }
          }
          .button{
            width: 75px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            background: #F34311;
            border-radius: 14px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #FFFFFF;
            letter-spacing: 0;
            position: absolute;
            bottom: 15px;
            right: 0;
          }
          .received{
            position: absolute;
            top: 5px;
            right: -15px;
            width: 70px;
            height: 85px;
            background: url("./img/membership/received.png") no-repeat center;
            background-size: 100%;
          }
        }
      }
      .float-box{
        border-radius: 5px;
        background: #ffffff;
        margin-bottom: 15px;
        >.tit{
          padding: 0 13px;
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #333333;
          letter-spacing: 0;
          display: flex;
          align-items: center;
          padding-top: 7px;
          .tit-icon{
            width: 30px;
            height: 30px;
            display: inline-block;
            border-radius: 50%;
            margin-right: 8px;
          }
          .tit-txt{
            line-height: 25px;
            border-bottom: 1px dotted #c2c2c2;
            flex: 1;
          }
        }
        ul{
          overflow: hidden;
          padding: 0 13px 20px 13px;
          a{
            &:nth-of-type(odd){
              float: left;
            }
            &:nth-of-type(even){
              float: right;
            }
          }
          li{
            width: 3.2rem;
            padding: 10px 0 0 0;
            position: relative;
            display: flex;
            flex-direction: column;
            &:nth-of-type(odd){
              float: left;
            }
            &:nth-of-type(even){
              float: right;
            }
            &:nth-of-type(3){
              padding-top: 25px;
            }
            &:nth-of-type(4){
              padding-top: 25px;
            }
            .img{
              width: 100%;
              height: 2.2rem;
              display: inline-block;
              background: #FFFFFF;
              border-radius: 4px 4px 0 0;
            }
            .txt{
              flex: 1;
              display: flex;
              flex-direction: column;
              /*justify-content: space-around;*/
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap;
              padding-right: 10px;
              .p{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 7px 0 5px 0;
                .left_num{
                  display: none;
                  font-family: PingFangSC-Regular;
                  font-size: 11px;
                  color: #666666;
                  letter-spacing: 0;
                  text-align: right;
                }
                .price{
                  min-width: 55px;
                  height: 15px;
                  line-height: 15px;
                  text-align: center;
                  font-family: PingFangSC-Regular;
                  font-size: 10px;
                  color: #FFFFFF;
                  letter-spacing: 0;
                  background: #DEA34C;
                  border-radius: 2px;
                  padding: 0 3px;
                }
              }
              .name{
                height: 40px;
                font-family: PingFangSC-Medium;
                font-size: 14px;
                color: #333333;
                letter-spacing: 0;
                line-height: 20px;
                font-weight: 600;
                white-space: initial;
              }
              .time{
                margin-top: 3px;
                .time-icon{
                  width: 11px;
                  height: 10px;
                  display: inline-block;
                  background: url("./img/membership/cal-icon.png") no-repeat center;
                  background-size: cover;
                  margin-right: 7px;
                }
              }
            }
            .btn_box{
              width: 100%;
              margin: 0 auto;
              margin-top: 10px;
              text-align: center;
              .button{
                width: 130px;
                height: 28px;
                display: inline-block;
                line-height: 28px;
                text-align: center;
                border-radius: 14px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #F34311;
                /*border: 1px solid #F34311;*/
                position: relative;
                @include border(#F34311){
                  border-radius: 28px;
                }
                letter-spacing: 0;
              }
              .button_grey{
                width: 130px;
                height: 28px;
                display: inline-block;
                line-height: 28px;
                text-align: center;
                border-radius: 14px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #999999;
                letter-spacing: 0;
                background: #f5f5f5;
              }
            }
          }
        }
      }
      .explain{
        margin-top: 10px;
      }
    }
    .ad{
      max-width: 7.5rem;
      height: 100%;
      margin: 0 auto;
      margin: 15px 0;
      img{
        width: 100%;
        height: 2.2rem;
        border-radius: 5px;
        display: inline-block;
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
