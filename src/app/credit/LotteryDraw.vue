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
        <!--<img style="display: none" src="https://assets.urwork.cn/image/shareicon.png">-->
        <!--<article style="display: none">超值福利限时领取——温暖办公 诞愿有你</article>-->
        <!--<div class="rule" @click="ruleto('/v2/activity/killrule')"> </div>-->
        <img class="bannerimg" src="https://assets.urwork.cn/image/credit/banner.jpg">
        <div class="rule" @click="showrule(1)">
           <img src="https://assets.urwork.cn/image/credit/rule.jpg">
        </div>
      </div>
      <div class="lucky-wheel">
         <div class="wheel">
            <p class="p">我的积分：{{total_integral}}</p>
            <div class="prize-box" v-if="prizeList.length>0">
              <div class="item" id="1">
                <div :class="{'checked':sort ==1 }">
                  <img :src="prizeList[0].imgUrl" onerror="this.src='https://assets.urwork.cn/image/ugift/g_def.png'">
                  <p>{{prizeList[0].name}}</p>
                </div>
              </div>
              <div class="item" id="2">
                <div :class="{'checked':sort ==2 }">
                  <img :src="prizeList[1].imgUrl" onerror="this.src='https://assets.urwork.cn/image/ugift/g_def.png'">
                  <p>{{prizeList[1].name}}</p>
                </div>
              </div>
              <div class="item" id="3">
                <div :class="{'checked':sort ==3 }">
                  <img :src="prizeList[2].imgUrl" onerror="this.src='https://assets.urwork.cn/image/ugift/g_def.png'">
                  <p>{{prizeList[2].name}}</p>
                </div>
              </div>
              <div class="item" id="8">
                <div :class="{'checked':sort ==8 }">
                  <img :src="prizeList[7].imgUrl" onerror="this.src='https://assets.urwork.cn/image/ugift/g_def.png'">
                  <p>{{prizeList[7].name}}</p>
                </div>
              </div>
              <div class="item">
                <div v-if="loading" class="go" @click="payPoint()">
                  GO
                </div>
                <div v-else="" class="go">
                  GO
                </div>
              </div>
              <div class="item" id="4">
                <div :class="{'checked':sort ==4 }">
                  <img :src="prizeList[3].imgUrl" onerror="this.src='https://assets.urwork.cn/image/ugift/g_def.png'">
                  <p>{{prizeList[3].name}}</p>
                </div>
              </div>
              <div class="item" id="7">
                <div :class="{'checked':sort ==7 }">
                  <img :src="prizeList[6].imgUrl" onerror="this.src='https://assets.urwork.cn/image/ugift/g_def.png'">
                  <p>{{prizeList[6].name}}</p>
                </div>
              </div>
              <div class="item" id="6">
                <div :class="{'checked':sort ==6 }">
                  <img :src="prizeList[5].imgUrl" onerror="this.src='https://assets.urwork.cn/image/ugift/g_def.png'">
                  <p>{{prizeList[5].name}}</p>
                </div>
              </div>
              <div class="item" id="5">
                <div :class="{'checked':sort ==5 }">
                  <img :src="prizeList[4].imgUrl" onerror="this.src='https://assets.urwork.cn/image/ugift/g_def.png'">
                  <p>{{prizeList[4].name}}</p>
                </div>
              </div>

            </div>
         </div>
      </div>
      <div class="footer">
        <!--<img class="footerimg" src="https://assets.urwork.cn/image/credit/footer.jpg">-->
        <div class="winners-list">
          <div ref="scrollbox" class="box">
            <div  class="ul">
              <ul ref="scrollbox1">
                <li v-for="(item, index) in marqueeList">
                  <p>{{item.userName.substr(0, 1)}}** 抽到 <span>{{item.awardName}}</span></p>
                </li>
              </ul>
              <ul v-if="marqueeList.length > 6" ref="scrollbox2">
                <li v-for="(item, index) in marqueeList">
                  <p>{{item.userName.substr(0, 1)}}** 抽到 <span>{{item.awardName}}</span></p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <a class="look" @click="linkto(2)">

        </a>
      </div>
      <div id="mask" v-show="ruleDiolog">
        <div class="diolog">
          <div class="content">
            <a @click="showrule(0)" class="click">
              <img src="https://assets.urwork.cn/image/credit/closed.jpg"/>
            </a>
            <h3>活动规则</h3>
            <p>
              一、参与方式：<br>
              1、可从“我的 -> 积分中心 -> 幸运大转盘”进入活动页面参与抽奖；<br>
              二、抽奖说明：<br>
              1、同一用户每天有三次抽奖机会；<br>
              2、每次抽奖消耗20积分；<br>
              三、中奖说明：<br>
              1、代金券奖励会自动进入“我的-我的代金券”中；<br>
              2、U礼包奖励会自动进入“我的-我的U礼包”中；<br>
              3、积分奖励会自动进入积分账户，可以在“积分中心首页”点击“积分数量”进入积分明细查看；<br>
              4、活动采用随机中奖原则，人人获奖概率均等；<br>
              5、不同的代金券有效期不同，请中奖用户获取代金券后尽快下单。如在有效期内未使用，则视作自动放弃该奖品，不再补发；<br>
              四、违规锁门：<br>
              1、如发现有违规行为（如作弊、恶意逃去等），一经发现我司有权终止该客户参与活动并取消其获奖资格；<br>
              2、凡参与本活动者，即视为接收活动所有规则。优鲜集有权在法律允许的范围内对活动规则作出适当调整。<br>
              五、特殊声明：<br>
              苹果公司不是本次活动的赞助商且本活动与苹果公司无关。
            </p>
          </div>
        </div>
      </div>
      <transition name="my-trans">
       <div id="mask2" v-show="prizeDiolog">
        <div class="diolog">
          <div class="content">
            <a class="click" @click="prizeDiologclosed()">
                <p>再抽一次</p>
            </a>
            <h3 :awardid = "prize.awardId">{{prize.name}}</h3>
          </div>
        </div>
      </div>
      </transition>
    </page-main>
  </page-wrap>
</template>

<script>
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import {getScheme, setScheme} from 'nativeFix';
  import store from 'store';
  import apigetLottery from 'api/credit/apigetLottery';               //8个奖品
  import apiLottery from 'api/credit/apiLottery';                     //获取奖品（支付积分之后）
  import apiLotteryPay from 'api/credit/apiLotteryPay';               //支付积分 （成功之后调取获取奖品的接口）
  import apiLotteryAward from 'api/credit/apiLotteryAward';           //得到的奖品信息
  import apiLotteryAwardList from 'api/credit/apiLotteryAwardList';   //中奖记录
  import apiLotteryPayStatus from 'api/credit/apiLotteryPayStatus';   //查询支付状态
  import apiTask from 'api/credit/apiTask';   //获取总积分
  export default {
    components: {

    },
    data: () => {
      return {
        show: false,
        title: '幸运大转盘',
        list:'',
        diolog:false,
        sort:1,
        time:0,//记时
        prizeid:6,//奖品id
//        point:9999,
        marqueeList: [],//抽奖记录
        ruleDiolog:false,//规则弹框
        prizeDiolog:false,//奖品弹框
        prize:'',
        prizeName:"神秘礼品",//奖品名字
        prizeList:[],//奖品列表（8个）
        batchId:'1',//批次,
        loading:true,
        total_integral:'0',//总积分,
        paystatusNum:'0'
      }
    },
    methods:{
      linkto(n) {
        localStorage.setItem('creditToMyAccount', n)
        this.$router.push({
          name: 'myAccount'
        })
      },
      prizeDiologclosed(){
        this.prizeDiolog = false;
      },
      ruleto(router){
        this.$router.push(router);
      },
      tohome(router) {
        if(isApp()) {
          setScheme('homePage');
        } else {
          this.$router.push(router);
        }
      },
      go(res) {
        let _this = this;
        _this.sort = 1;
        _this.time = 0,
        _this.prizeid = 6;
//        _this.point = _this.point - 20;
//        console.log(this.prizeList);
        var data = this.prizeList;
        for(let n in data){
            if(data[n].id == res.data.awardId){
            _this.prizeid = n;
            _this.prize = data[n];
//              console.log(n,"jjjjj");
            break;
          }
        }
//        console.log(_this.prizeid,"jjjjj")
//        this.prizeList.map(function (obj,idx) {
//          if(obj.id = res.data.awardId){
//            _this.prizeid = idx;
//            _this.prize = obj;
//            console.log(idx,"jjjjj");
//            console.log(_this.prize,"jjjjj")
//          }
//        })
        var t0 = setInterval( ()=> {
          this.time++
        }, 300);
        var t1 = window.setInterval( ()=> {
          this.sort < 8 ? this.sort++ : this.sort = 1;
          if(_this.time > 5){
            window.clearInterval(t1)
            var t2 = window.setInterval( ()=> {
              this.sort < 8 ? this.sort++ : this.sort = 1;
              if(_this.time > 10){
                window.clearInterval(t2)
                var t3 = window.setInterval( ()=> {
                  this.sort < 8 ? this.sort++ : this.sort = 1;
                  if(_this.time > 15){
                    window.clearInterval(t3);
                    var t4 = window.setInterval( ()=> {
                      this.sort < 8 ? this.sort++ : this.sort = 1;
                      if(_this.time > 20){
                        window.clearInterval(t4);
                        var t5 = window.setInterval( ()=> {
//                          this.sort < 8 ? this.sort++ : this.sort = 1;
                          if(this.sort == (parseInt(this.prizeid)+1)){
                            window.clearInterval(t5);
                            window.clearInterval(t0);
                            _this.time = 0;
                            _this.prizeDiolog = true;
                            _this.loading = true;
                            _this.getPoint();
                          }else{
                            this.sort < 8 ? this.sort++ : this.sort = 1;
                          }
                        }, 500);
                      }
                    }, 400);
                  }
                }, 300);
              }
            }, 200);
          }
        }, 100);
      },
      paystatus(n){
        apiLotteryPayStatus({
          "payNo":n
        },this.$store.state.userInfo.userId).then(res => {
//          console.log(res,'支付状态');
          if(res.data == 2){
            this.total_integral = this.total_integral-20;
            this.paystatusNum = 0;
            this.lottery(n)
          }else{
            this.paystatusNum++;
            if(this.paystatusNum > 10){
              this.$toast(res.retMsg);
              this.loading = true;
              this.paystatusNum = 0;
            }else{
              setTimeout(() => {this.paystatus(n)},200);
            }
          }
        })
      },
      lottery(n){
        apiLottery({
          "batchId":this.batchId,
          "payNo":n
        },this.$store.state.userInfo.userId).then(res => {
//          console.log(res,'获取奖品信息');
          if(res.retCode == 0){
            this.go(res)
          }else{
            this.$toast(res.retMsg);
            this.loading = true;
          }
        })
      },
      payPoint(){
          this.loading = false;
        apiLotteryPay({},this.$store.state.userInfo.userId).then(res => {
//          console.log(res,'支付积分');
          if(res.retCode == 0){
            this.paystatus(res.data)
          }else{
              this.$toast(res.retMsg);
              this.loading = true;
          }
        })
      },
      showrule(n) {
          n == 1 ? this.ruleDiolog = true : this.ruleDiolog = false;
      },
      getlottery(){
        apigetLottery({}).then(res => {
//          console.log(res,'8个奖品');
          if( res.retCode == 0){
            this.prizeList = res.data.awardList;
            this.marqueeList = res.data.recordList;
            this.batchId = res.data.id;
            this.$nextTick(function () {
              let ulHeight = this.$refs.scrollbox1.clientHeight;
              let _box2 = this.$refs.scrollbox2;
              let _box = this.$refs.scrollbox;
              _box2 ? _box2.style.top = ulHeight + 'px':''
              var x = 0;
              var fun = function(){
                _box.scrollTop = x; x++;
                x + _box.clientHeight == _box.scrollHeight ? x = 0 : ''
              }
              setInterval(fun,100);
            })
          }else{
            this.$toast(res.retMsg)
          }
        })
      },
      getAwardList() {
        apiLotteryAwardList({}).then(res => {
//          console.log(res,'抽奖列表');
          res.retCode == 0 ? this.marqueeList = res.data.records : this.$toast(res.retMsg);
          this.$nextTick(function () {
            let ulHeight = this.$refs.scrollbox1.clientHeight;
            let _box2 = this.$refs.scrollbox2;
            let _box = this.$refs.scrollbox;
            _box2 ? _box2.style.top = ulHeight + 'px':''
            var x = 0;
            var fun = function(){
              _box.scrollTop = x; x++;
              x + _box.clientHeight == _box.scrollHeight ? x = 0 : ''
            }
            setInterval(fun,100);
          })
        })
      },
      getPoint() {
        apiTask().then(res => {
//          console.log(res,'积分');
          this.total_integral = res.total_integral;
        });
      }
    },
    created() {
      this.getPoint();
      this.getlottery();
//      this.getAwardList();
    },
    mounted() {
      this.show = true;
    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  .kong{
    height: 30px;
  }
  .bannerimg{
    margin-top: -1px;
  }
  #main{
    background: #fafafa;
    font-size: 0;
    .banner{
      width: 100%;
      text-align: center;
      font-size: 0;
      position: relative;
      .rule{
        width: 17vw;
        height: 5.2vw;
        position: absolute;
        top: 3.5vw;
        right: 0;
      }
      >img{
        width: 100vw;
        display: inline-block;
        margin: 0 auto;
      }
    }
    .lucky-wheel{
      margin-top: -1px;
      width: 100vw;
      height: 98.667vw;
      background: url("https://assets.urwork.cn/image/credit/lottery_draw.gif") no-repeat;
      background-size: 100%;
      .wheel{
        width: 100%;
        height: 100%;
        padding: 7.111vw 4vw;
        .p{
          width: 100%;
          height: 9.2444vw;
          line-height: 10.2444vw;
          font-size: 15px;
          color: #ffffff;
          text-align: center;
        }
        .prize-box{
          width: 81.333vw;
          height: 69.777vw;
          margin: 0 auto;
          padding: 1.7vw 1.6vw 1.6vw 1.7vw;
          .item{
            width: 33.33%;
            height: 33.33%;
            display: inline-block;
            float: left;
            border-radius: 6px;
            padding: 0.888vw;
            >div{
              width: 100%;
              height: 100%;
              background: url("https://assets.urwork.cn/image/credit/wheel_item_bg.jpg") no-repeat;
              background-size: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              img{
                width: 60%;
                height: 46%;
                margin-top: 4px;
              }
              p{
                width: 80%;
                font-size: 12px;
                text-align: center;
                line-height: 20px;
                color: #302166;
                margin-top: 5%;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
              }
            }
            .checked{
              position: relative;
              &::before{
                content: '';
                width: 100%;
                height: 102%;
                background: url("https://assets.urwork.cn/image/credit/wheel_checked.jpg") no-repeat;
                background-size: 100%;
                position: absolute;
                top: 0;
              }
            }
            .go{
              background: url("https://assets.urwork.cn/image/credit/wheel_go.jpg") no-repeat;
              background-size: 100%;
            }
          }
        }
      }
    }
    .footer{
      margin-top: -1px;
      width: 100vw;
      height: 78.488vw;
      background: url("https://assets.urwork.cn/image/credit/footer.jpg") no-repeat;
      background-size: 100%;
      .winners-list{
        width: 100vw;
        height: 57.4222vw;
        padding: 8vw 13vw 4vw 13vw;
        .box{
          width: 100%;
          height: 100%;
          overflow: scroll;
          position: relative;
          &::-webkit-scrollbar {
            /*display: none;*/
          }
          ul{
            position: absolute;
            li{
              p{
                font-size: 12px;
                line-height: 27px;
                span{
                  color: #fc5c20;
                  margin-left: 5px;
                }
              }
            }
          }
        }
      }
      .look{
        width: 37.333vw;
        height: 10vw;
        display: inline-block;
        margin: 0 auto;
        margin-top: 6.6666vw;
        -webkit-transform: translate(84%, 0);
        -o-transform: translate(84%, 0);
        -moz-transform: translate(84%, 0);
        -ms-transform: translate(84%, 0);
        transform: translate(84%, 0);
      }
    }
  }
  #mask{
    width: 100%;
    height: 100%;
    background: rgba(23, 21, 20, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 900;
    //display: none;
    .diolog{
      z-index: 901;
      width: 250px;
      position: fixed;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      .content{
        width: 250px;
        /*height: 6rem;*/
        background: url("https://assets.urwork.cn/image/credit/rule_bg.jpg") no-repeat;
        background-size: 100% 100%;
        position: relative;
        padding-bottom: 20px;
        /*display: flex;*/
        /*justify-content: center;*/
        /*flex-direction: column;*/
        /*align-items: center;*/
        .click{
          width: 0.4rem;
          height: 0.4rem;
          position: absolute;
          top: 0.24rem;
          right: 0.24rem;
          /*background: url("https://assets.urwork.cn/image/credit/closed.jpg") no-repeat;*/
          /*background-size: 100%;*/
          img{
            width: 100%;
            height: 100%;
          }
        }
        h3{
          font-size: 16px;
          font-weight: 600;
          color: #333;
          padding: 0.4rem 0 0.1rem 0;
          text-align: center;
        }
        p{
          font-size: 12px;
          color: #333;
          padding: 0.2rem 20px 0;
          line-height: 20px;
          height: 5rem;
          overflow: scroll;
        }
      }
    }
  }
  #mask2{
    width: 100%;
    height: 100%;
    background: rgba(23, 21, 20, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 900;
    //display: none;
    .diolog{
      z-index: 901;
      width: 75vw;
      position: fixed;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      .content{
        width: 75vw;
        height: 90vw;
        /*height: 6rem;*/
        background: url("https://assets.urwork.cn/image/credit/congratulations.jpg") no-repeat;
        background-size: 100% 100%;
        position: relative;
        /*display: flex;*/
        /*justify-content: center;*/
        /*flex-direction: column;*/
        /*align-items: center;*/
        .click{
          width: 2.6rem;
          height: 1rem;
          position: absolute;
          bottom: 5%;
          left: 51%;
          -webkit-transform: translate(-50%, -50%);
          -o-transform: translate(-50%, -50%);
          -moz-transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          img{
            width: 100%;
            height: 100%;
          }
          p{
            font-size: 15px;
            width: 100%;
            height: 100%;
            color: #ffffff;
            line-height: 50px;
            text-align: center;
          }
        }
        h3{
          width: 70%;
          font-size: 16px;
          font-weight: 600;
          color: #333;
          text-align: center;
          position: absolute;
          bottom: 30%;
          left: 50%;
          -webkit-transform: translate(-50%, -50%);
          -o-transform: translate(-50%, -50%);
          -moz-transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          overflow:hidden; //超出的文本隐藏
          text-overflow:ellipsis; //溢出用省略号显示
          white-space:nowrap; //溢出不换行
        }
        p{
          font-size: 12px;
          color: #333;
          padding: 0 20px 10px;
          line-height: 20px;
        }
      }
    }
  }
  .my-trans-enter-active, .my-trans-leave-active {
    transition: all .4s ease-out;
  }
  .my-trans-enter {
    transform: translateY(500px);
    opacity: 0;
  }
  .my-trans-leave-active {
    transform: translateY(500px);
    opacity: 0;
  }
</style>


