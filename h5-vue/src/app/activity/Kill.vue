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
          <img style="display: none" src="https://assets.urwork.cn/image/shareicon.png">
          <article style="display: none">超值福利限时领取——温暖办公 诞愿有你</article>
          <img class="drsn" src="https://assets.urwork.cn/image/kill/drsn.gif"/>
          <img class="flash" src="https://assets.urwork.cn/image/kill/flash.gif">
          <div class="rule" @click="ruleto('/v2/activity/killrule')"> </div>
          <img class="bannerimg" src="https://assets.urwork.cn/image/kill/banner.png">
          <div class="good-item kill">
              <!--<img src="./img/kill/title1.png">-->
              <div class="content">
                  <div v-if="timeList.length>0" class="time">
                    <ul>
                      <li v-for="item in timeList" v-bind:class="{'red-time': item.click }" @click="tabGoods(item)">
                          <p>{{item.StartTime.split(" ")[1].split(":")[0]+':'+item.StartTime.split(" ")[1].split(":")[1]}}</p>
                          <span v-if="currentTime > item.maxEndTime">已结束</span>
                          <span v-if="currentTime < item.maxEndTime&&currentTime > item.StartTime">抢购中</span>
                          <span v-if="currentTime < item.StartTime">即将开场</span>
                      </li>
                    </ul>
                  </div>
                  <div class="goods">
                    <ul v-for="(list,key,index) in seckillGoods" v-show="showListKey == key">
                      <li v-for="item in list" @click="linkto(item)">
                        <template v-if="item.jsdjs != '00:00:00'">
                          <p class="limt-time" v-if="item.djs != '00:00:00'">距离开抢仅剩<span class="t_h">{{item.djs.split(':')[0]}}</span>:<span class="t_m">{{item.djs.split(':')[1]}}</span>:<span class="t_s">{{item.djs.split(':')[2]}}</span></p>
                          <p class="limt-time" v-else="">距离结束仅剩<span class="t_h">{{item.jsdjs.split(':')[0]}}</span>:<span class="t_m">{{item.jsdjs.split(':')[1]}}</span>:<span class="t_s">{{item.jsdjs.split(':')[2]}}</span></p>
                        </template>
                        <div>
                          <div class="goods-img">
                            <span class="limt-one"><span>限购一件</span></span>
                            <img :src="'http://image.urwork.cn/'+item.mainImage">

                            <template v-if="item.jsdjs == '00:00:00'">
                              <progress class="progress" :value="item.stock" :max="item.stock">
                              </progress>
                              <p class="num">
                                <span>已抢{{item.stock}}件</span>
                                <span>100%</span>
                              </p>
                            </template>

                            <template v-else="">
                              <progress class="progress" :value="item.stock-item.stockLeft" :max="item.stock">
                              </progress>
                              <p class="num">
                                <span>已抢{{item.stock-item.stockLeft}}件</span>
                                <span>{{parseInt(((item.stock-item.stockLeft)*100)/item.stock)}}%</span>
                              </p>
                            </template>
                            <div v-if="item.stockLeft==0||item.jsdjs == '00:00:00'" class="sale-out"></div>
                          </div>
                          <div class="goods-info">
                            <p style="overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;" class="name">{{item.name}}</p>
                            <p v-if="item.sellingPoint" class="selling-point">{{item.sellingPoint}}</p>
                            <div class="price">
                              <del>￥{{item.marketPrice}}</del>
                              <em>￥<span>{{item.price}}</span></em>
                            </div>
                            <div v-if="item.djs == '00:00:00'&&item.jsdjs != '00:00:00'&&item.stockLeft!='0'" class="butn" v-on:touchstart.stop.prevent="voteClick(item,1)" v-on:touchend.stop.prevent="voteClick(item,0)">
                              <!--<img v-if="item.click == 1" src="./img/kill/mashangclick.png">-->
                              <!--<img v-else="" src="./img/kill/mashang.png">-->
                              马上抢
                            </div>
                            <div v-if="item.stockLeft =='0'" class="butn-txt">
                              已售罄
                            </div>
                            <div v-if="item.djs != '00:00:00'" class="butn-txt">
                              {{item.startTime.split(" ")[1].split(":")[0]}}:{{item.startTime.split(" ")[1].split(":")[1]}}开抢
                            </div>
                            <!--<div class="butn-li">-->
                            <!--<img src="./img/kill/like.png">-->
                            <!--<p>立即抢购</p>-->
                            <!--</div>-->
                            <div v-if="item.jsdjs == '00:00:00'" class="butn-txt">
                              已结束
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="vip">
                    <div>
                      <a href="http://m.urwork.cn/v2/membership/card">
                        <img src="https://assets.urwork.cn/image/kill/rights.png">
                      </a>
                    </div>
                  </div>
              </div>
              <!--<img class="border-bottom" src="./img/kill/border-bottom.jpg">-->
          </div>
          <div v-if="worthGoods.length>0" class="good-item worth">
            <img src="https://assets.urwork.cn/image/kill/worth-tit.png">
            <div class="content">
                   <ul class="worth-goods">
                     <li v-for="item in worthGoods" @click="linkto(item)">
                       <div class="img">
                         <img :src="'http://image.urwork.cn/'+item.mainImage">
                         <div class="wtime">
                            限时抢购[{{item.startTime.split(' ')[1].split(':')[0]}}:{{item.startTime.split(' ')[1].split(':')[1]}}--{{item.endTime.split(' ')[1].split(':')[0]}}:{{item.endTime.split(' ')[1].split(':')[1]}}]
                         </div>
                       </div>
                       <div class="info">
                         <p class="name">{{item.name}}</p>
                         <p class="price">
                           <em>￥<span>{{item.price}}</span></em>
                           <del>￥{{item.marketPrice}}</del>
                         </p>
                       </div>
                       <div v-if="item.endTime > currentTime&&item.stockLeft!=0" v-on:touchstart.stop.prevent="wvoteClick(item,1)" v-on:touchend.stop.prevent="wvoteClick(item,0)"
                            v-bind:class="{ buton: !item.click, 'buton-click': item.click }">
                         立即抢购
                       </div>
                       <div v-if="item.endTime > currentTime&&item.stockLeft==0" class="buton-txt">
                         已售罄
                       </div>
                       <div v-if="item.endTime < currentTime" class="buton-txt">
                         已结束
                       </div>
                     </li>
                   </ul>
            </div>
            <div class="kong"></div>
            <!--<img class="border-bottom" src="https://assets.urwork.cn/image/kill/footer.png">-->
          </div>
        </div>
        <div id="mask" v-show="diolog">
        <div class="diolog">
          <div class="content">
            <a @click="tohome('/v2/index')" class="click"></a>
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
  import apiSecKill from 'api/activity/apiSecKill';
  export default {
    components: {

    },
    data: () => {
      return {
        show: false,
        title: '优客工场企业会员狂欢日',
        seckillGoods:'',
        worthGoods:'',
        showListKey:'2018-12-10 00:00:00',
        list:'',
        timeKey:'',
        timeList:[],
        h:'00',
        m:'00',
        s:'00',
        currentTime:'',
        diolog:false
      }
    },
    methods:{
      linkto(item) {
          if(item.jsdjs != '00:00:00'&&item.stockLeft!= 0&& this.currentTime < item.endTime){
            this.$router.push('/v2/activity/goodsdetail?id='+item.id);
          }
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
      get_object_x_attribute(x,data){
        for (var key in data)
            if(x == key){
              return data[x];
            }
      },
      get_object_key(data){
        let arry = []
        for(var key in data){
          arry.push(key)
        }
        return arry;
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
      getlist() {
        apiSecKill().then(res => {
          console.log(res.seckillGoods,'qwqeqwewq');
          let a = res.seckillGoods;
          if(Object.keys(a).length == 0){
              this.diolog = true;
             this.show = true;
          }else{
            let _this = this;
            this.worthGoods = res.worthGoods;
            /*初始化超值购*/
            this.worthGoods.map( (obj,index)=>{
              this.$set(
                obj,"click",0
              );
            })
            /*====结束超值购初始化====*/
            this.seckillGoods = res.seckillGoods;
            this.data = res;
            this.currentTime = res.currentTime;
            this.timeKey = this.get_object_key(res.seckillGoods);
            let timeList = [];
            let items = res.seckillGoods
            for(var key in items){
              let timeObj = {};
              let endtimeList = []
              items[key].map(function (obj,idx) {
                let end = ''
                endtimeList.push(obj.endTime)
              })
              let a = endtimeList.sort().pop();
              timeObj.StartTime = key;
              timeObj.maxEndTime = a;
              timeObj.click = false;
              timeList.push(timeObj);
            }
            timeList[0].click = true;
            this.timeList = timeList;
//            this.list =  this.get_object_x_attribute(this.timeKey[0],res.seckillGoods);
            let data = this.seckillGoods;
            for(let n in data){
              data[n].map( (obj,index)=>{
                this.$set(
                  obj,"djs",_this.initTime(obj.startTime)
                );
                this.$set(
                  obj,"jsdjs",_this.initTime(obj.endTime)
                );
                this.$set(
                  obj,"click",0
                );
              })
            }
            this.seckillGoods = data;
            this.tabGoods(1)
            this.show = true;
            console.log(this.seckillGoods,'gggggg')
          }
        })
      },
      tabGoods(res) {
          let _this = this;
        if(res!=1){
          this.showListKey = res.StartTime;
          this.timeList.map( (obj,index)=>{
            if(obj.StartTime == res.StartTime){
              this.$set(
                obj,"click",true
              );
            }else{
              this.$set(
                obj,"click",false
              );
            }
          })
        }else{
          this.timeList.map(function (obj,idx) {
            obj.click = false;
          })
          for(let n in _this.timeList){
            if(_this.currentTime>_this.timeList[n].StartTime&&_this.currentTime<_this.timeList[n].maxEndTime){
              _this.showListKey = _this.timeList[n].StartTime;
              _this.timeList[n].click = true;
              break;
            }else{
                //都未开始  显示第一个
              if(_this.currentTime < _this.timeList[0].StartTime) {
                _this.showListKey = _this.timeList[0].StartTime;
                _this.timeList[0].click = true;
                break;
              }
              //结束前一个  显示即将开始的  _this.timeList[n+1]&&
              if(_this.timeList[parseInt(n+1)]&&_this.currentTime > _this.timeList[n].maxEndTime&&_this.currentTime < _this.timeList[parseInt(n+1)].StartTime){
                _this.showListKey = _this.timeList[parseInt(n+1)].StartTime;
                _this.timeList[parseInt(n+1)].click = true;
                break;
              }
              //都结束
              if(_this.currentTime>_this.timeList[parseInt(_this.timeList.length-1)].maxEndTime){
                  _this.showListKey = _this.timeList[parseInt(_this.timeList.length-1)].StartTime;
                  _this.timeList[parseInt(_this.timeList.length-1)].click = true;
                  break;
              }
            }
          }
          let flag = 0;
          for(let n in _this.timeList){
            if(_this.timeList[n].click == true){
              flag = 1;
              break;
            }
          }
          if(!flag){
            _this.showListKey = _this.timeList[_this.timeList.length-1].StartTime;
            _this.timeList[parseInt(_this.timeList.length-1)].click = true;
          }
        }
      },
      touchStart(item,flag){
        let _this = this;
        let obj = _this.seckillGoods;
        for(let i in _this.seckillGoods) {
          obj[i].map(function (obj,idx) {
              obj.click=0
          })
        }
        for(let i in _this.seckillGoods) {
          obj[i].map(function (obj,idx) {
            obj.id == item.id&&flag==1 ? obj.click=1 : ''
          })
        }
        flag == 0 ? this.linkto(item):''
      },
      voteClick(item,n){
        this.touchStart(item,n);
      },
      wtouchStart(item,flag){
        let _this = this;
        let obj = _this.worthGoods;
        this.worthGoods.map( (obj,index)=>{
          this.$set(
            obj,"click",0
          );
        })
        this.worthGoods.map( (obj,index)=>{
          obj.id == item.id&&flag==1 ? this.$set(obj,"click",1) : ''
        })
        flag == 0 ? this.linkto(item):''
      },
      wvoteClick(item,n){
        this.wtouchStart(item,n);
      }
    },
    created() {
       this.getlist();
    },
    mounted() {
      let _this = this;
        setInterval( ()=> {
          for(let n in _this.seckillGoods){
            for (var key in _this.seckillGoods[n]) {
              let xh = _this.seckillGoods[n][key]["djs"].split(':')[0];
              let xm = _this.seckillGoods[n][key]["djs"].split(':')[1];
              let xs = _this.seckillGoods[n][key]["djs"].split(':')[2];
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
              _this.seckillGoods[n][key]["djs"] = h+':'+m+':'+s
            }
          }
        }, 1000);

        setInterval( ()=> {
        for(let n in _this.seckillGoods){
          for (var key in _this.seckillGoods[n]) {
                let jsxh = _this.seckillGoods[n][key]["jsdjs"].split(':')[0];
                let jsxm = _this.seckillGoods[n][key]["jsdjs"].split(':')[1];
                let jsxs = _this.seckillGoods[n][key]["jsdjs"].split(':')[2];
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
                _this.seckillGoods[n][key]["jsdjs"] = jsh+':'+jsm+':'+jss
          }
        }
      }, 1000);
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
    /*background: url("./img/kill/redbg.jpg") repeat;*/
    /*background-size: 100%;*/
    background: #fafafa;
    .banner{
      width: 100%;
      text-align: center;
      font-size: 0;
      position: relative;
      .drsn{
        width: 100vw;
        position: absolute;
        top: 0;
        left: 0;
      }
      .flash{
        width: 100vw;
        position: absolute;
        top: -0.5rem;
        left: 0;
      }
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
      .good-item{
        >img{
          width: 100vw;
        }
        .content{
          width: 100%;
          margin-top: -1px;
          .time{
            padding: 0 0.38rem;
            >ul{
              display: flex;
              align-items: center;
              justify-content: space-around;
              font-size: 14px;
              padding: 10px 0 15px 0;
              position: relative;
              @include border-bottom(#f2d4a0);
              /*border-bottom: 1px solid #ebebeb;*/
              >li{
                color: #a9a9a9;
                p{
                  font-size: 15px;
                  font-weight: 600;
                }
                span{
                  font-size: 12px;
                }
              }
              .red-time{
                color: #e83324;
                p{
                  font-size: 17px;
                  font-weight: 600;
                }
                span{
                  color: #ffffff;
                  font-size: 12px;
                  margin-top: -4px;
                  background: #e83324;
                  padding: 1px 4px;
                  border-radius: 2px;
                }
              }
            }
          }
          .goods{
            padding: 0 0.38rem;
            ul{
              li{
                padding: 15px 0 15px 0;
                position: relative;
                @include border-bottom(#f2d4a0);
                &:last-of-type{
                  @include border-bottom(#ffffff);
                }
                .limt-time{
                  font-size: 13px;
                  text-align: left;
                  margin-bottom: 12px;
                  color: #333333;
                  span{
                    display: inline-block;
                    width: 20px!important;
                    height: 14px;
                    line-height: 14px;
                    text-align: center;
                    font-size: 12px;
                    background: #262627;
                    border-radius: 2px;
                    color: #ffffff;
                    /*padding: 0 3px;*/
                    margin: 0 3px;
                    &:nth-of-type(1){
                      margin-left:6px;
                    }
                  }
                }
                >div{
                  display: flex;
                  justify-content: space-between;
                  .goods-img{
                    width: 3.38rem;
                    height: 2.5rem;
                    overflow: hidden;
                    position: relative;
                    background: url("https://assets.urwork.cn/image/kill/flower-border.png") no-repeat;
                    background-size: 100%;
                    display: flex;
                    flex-direction: column;
                    padding: 0.08rem;
                    .limt-one{
                      height: 0.28rem;
                      border-radius: 2px;
                      color: #fef7dd;
                      background: rgba(0,0,0,0.7);
                      position: absolute;
                      top: 0.18rem;
                      left: 0.18rem;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      >span{
                        height: 0.28rem;
                        line-height: 0.28rem;
                        font-size: 10px;
                        display: inline-block;
                        padding: 0 2px;
                        /*-webkit-transform:scale(0.64);*/
                      }
                    }
                    img{
                      width: 100%;
                      height: 100%;
                      display: inline-block;
                      /*border: 1px solid #e5e5e5;*/
                      border-radius: 2px;
                    }
                    .progress{
                      width: 100%;
                      height: 0.38rem;
                      margin-top: -0.38rem;
                      position: relative;
                      border: none;
                      background-color:#f8c1bd;
                      color: #f8c1bd; /*IE10*/
                      opacity: 0.8;
                      &::-moz-progress-bar { background: #f8c1bd; }
                      &::-webkit-progress-bar { background: #f8c1bd; }
                      &::-webkit-progress-value  { background: #ed6256; }
                    }
                    .num{
                      width: 100%;
                      height: 0.24rem;
                      line-height: 0.24rem;
                      position: absolute;
                      top: 2.1rem;
                      font-size: 12px;
                      padding: 0 7px 0 10px;
                      span{
                        color: #ffffff;
                        font-size: 12px;
                        height: 0.24rem;
                        line-height: 0.24rem;
                        transform: scale(0.8);
                        &:nth-of-type(1){
                          float: left;
                        }
                        &:nth-of-type(2){
                          float: right;
                        }
                      }
                    }
                    .sale-out{
                      position: absolute;
                      top: 0;
                      width: 3.35rem;
                      height: 2.5rem;
                      background: url("./img/kill/sale-out.png") no-repeat center;
                      background-size: 50%;
                    }
                  }
                  .goods-info{
                    flex: 1;
                    font-size: 12px;
                    text-align: left;
                    padding-left: 10px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    position: relative;
                    .name{
                      font-size: 15px;
                      font-weight: 600;
                      line-height: 1.5;
                      color: #333333;
                      word-wrap:break-word;
                    }
                    .selling-point{
                      font-size: 12px;
                      color: #666666;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      margin-top: 8px;
                    }
                    .price{
                      margin-top: 14px;
                      del{
                        color: #666666;
                        display: block;
                      }
                      em{
                        color: #e83324;
                        font-weight: 600;
                        display: block;
                        position: absolute;
                        bottom: 0;
                        span{
                          font-size: 15px;
                        }
                      }
                    }
                    .butnold{
                      /*position: absolute;*/
                      /*top: 2.05rem;*/
                      /*right: 0px;*/
                      /*border: none;*/
                      /*img{*/
                        /*width: 1.78rem;*/
                        /*height: 0.81rem;*/
                      /*}*/
                      /*p{*/
                        /*width: 1.78rem;*/
                        /*height: 0.81rem;*/
                        /*line-height: 0.65rem;*/
                        /*text-align: center;*/
                        /*position: absolute;*/
                        /*bottom: 0px;*/
                        /*right: 0px;*/
                        /*font-size: 13px;*/
                        /*color: #ffffff;*/
                      /*}*/
                    }
                    .butn{
                      position: absolute;
                      bottom: 0;
                      right: 0;
                      border: none;
                      background: #e12414;
                      border-radius: 0.3rem;
                      padding: 0 20px;
                      height: 0.6rem;
                      line-height: 0.65rem;
                      text-align: center;
                      font-size: 13px;
                      color: #ffffff;
                    }
                    .butn-li{
                      position: absolute;
                      bottom: 0px;
                      right: 0px;
                      border: none;
                      img{
                        width: 2rem;
                        height: 0.62rem;
                      }
                      p{
                        width: 2rem;
                        height: 0.62rem;
                        line-height: 0.5rem;
                        text-align: center;
                        position: absolute;
                        bottom: 0px;
                        right: 0px;
                        font-size: 13px;
                        color: #ffffff;
                      }
                    }
                    .butn-txt{
                      position: absolute;
                      bottom: 0;
                      right: 0px;
                      border: none;
                      background: #d8d8d8;
                      border-radius: 0.3rem;
                      padding: 0 20px;
                      height: 0.6rem;
                      line-height: 0.65rem;
                      text-align: center;
                      font-size: 13px;
                      color: #ffffff;
                    }
                  }
                }
              }
            }
          }
          .vip{
            padding: 15px 0.38rem 0 0.38rem;
            div{
              padding-bottom: 24px;
              position: relative;
              @include border-bottom(#f2d4a0);
              img{
                width: 100%;
                height: 18.8vw;
              }
            }
          }
          .worth-goods{
            font-size: 20px;
            em{
              font-weight: 600;
            }
          }
        }
        .border-bottom{
          margin-top: -1px;
        }
      }
      .worth{
        /*margin-top: 18px;*/
        background: url("https://assets.urwork.cn/image/kill/footer.png") no-repeat;
        background-size: 100%;
        background-position-y:bottom;
        >img{
          margin-bottom: 15px;
        }
        .content{
          /*background: url("./img/kill/whitebg.jpg") repeat;*/
          /*background-size: 100%;*/
          ul{
            padding: 0 0.38rem 10px 0.38rem;
            overflow: hidden;
            li{
              width: 48.7%;
              margin-bottom: 10px;
              &:nth-of-type(odd){
                float: left;
                .wtime{
                  width: 100%;
                  height: 0.38rem;
                  line-height: 0.4rem;
                  text-align: center;
                  /*position: absolute;*/
                  /*bottom: 0;*/
                  font-size: 12px;
                  color: #ffffff;
                  background: #e83324;
                  opacity: 0.8;
                  /*border-right: 1px solid #e83324;*/
                  /*border-left: 1px solid #e83324;*/
                  margin-top: -0.375rem;
                }
              }
              &:nth-of-type(even){
                float: right;
                .wtime{
                  width: 100%;
                  height: 0.38rem;
                  line-height: 0.4rem;
                  text-align: center;
                  /*position: absolute;*/
                  /*bottom: 0;*/
                  font-size: 12px;
                  color: #ffffff;
                  background: #e83324;
                  opacity: 0.8;
                  margin-top: -0.375rem;
                  /*border-right: 1px solid #e83324;*/
                  /*border-left: 1px solid #e83324;*/
                }
              }
              .img{
                width: 100%;
                height: 2.8rem;
                border-radius: 2px;
                position: relative;
                background: url("https://assets.urwork.cn/image/kill/worth-border.png") no-repeat;
                background-size: 100%;
                padding: 0.08rem;
                img{
                  width: 100%;
                  height: 2.55rem;
                  /*border: 1px solid #e5e5e5;*/
                  /*border-bottom: none;*/
                  border-radius: 2px;
                }
              }
              .info{
                overflow: hidden;
                 white-space: nowrap;
                text-overflow: ellipsis;
                .name{
                  font-size: 15px;
                  font-weight: 600;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  margin-top: 10px;
                }
                .price{
                  margin-top: 12px;
                  font-size: 12px;
                  em{
                    color: #ea4133;
                    span{
                      font-size: 14px;
                    }
                  }
                  del{
                    margin-left: 13px;
                    color: #666666;
                    font-size: 13px;
                  }
                }
              }
              .buton{
                width: 2.6rem;
                height: 0.6rem;
                line-height: 0.6rem;
                display: inline-block;
                font-size: 15px;
                color: #ffffff;
                background: #e83324;
                border-radius: 0.3rem;
                /*background: url("./img/kill/like.png") no-repeat;*/
                background-size: 100%;
                margin-top: 15px;
              }
              .buton-click{
                width: 2.6rem;
                height: 0.6rem;
                line-height: 0.6rem;
                display: inline-block;
                font-size: 15px;
                color: #ffffff;
                background: #e83324;
                border-radius: 0.3rem;
                /*background: url("./img/kill/likeclick.png") no-repeat;*/
                background-size: 100%;
                margin-top: 15px;
              }
                .buton-txt{
                  width: 2.6rem;
                  height: 0.78rem;
                  line-height: 0.6rem;
                  display: inline-block;
                  font-size: 15px;
                  color: #ffffff;
                  background: #d8d8d8;
                  /*background: url("./img/kill/greylike.png") no-repeat;*/
                  background-size: 100%;
                  margin-top: 15px;
                }
            }
          }
        }
      }
      .kill{
        margin-top: -7px;
        .content{
          margin-top: -60px;
          /*background: url("./img/kill/whitebg.jpg") repeat;*/
          /*background-size: 100%;*/
          ul{
            li{
              /*padding: 15px 0;*/
              /*border-bottom: 1px solid #e5e5e5;*/
            }
          }
        }
      }
    }
  }

  #mask{
    width: 100%;
    height: 100%;
    background: rgba(23, 21, 20, 1);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 900;
    //display: none;
    .diolog{
      z-index: 901;
      width: 4.3rem;
      border-radius: 0.2rem;
      position: fixed;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      .content{
        width: 4.3rem;
        height: 3.5rem;
        background: url("https://assets.urwork.cn/image/kill/dialog.jpg") no-repeat;
        background-size: 100%;
        position: relative;
        /*display: flex;*/
        /*justify-content: center;*/
        /*flex-direction: column;*/
        /*align-items: center;*/
        .click{
          width: 2.6rem;
          height: 0.8rem;
          position: absolute;
          bottom: 0.7rem;
          left: 50%;
          margin-left: -1.3rem;
        }
      }
    }
  }
</style>

