<template>
  <page-wrapf7 class="page-user-center">
    <title v-title>{{title}}</title>

    <page-header :isHeadroom="false">
      <topbar :type="'back'" :hideNativeTitleBar="true" :nativeBack="true" :nativeStatusBarStyle=1>
        <template slot="title">{{title}}</template>
        <template slot="actions"></template>
      </topbar>
    </page-header>

    <page-main :show="show">
      <main id="main" class="station-main">
        <div class="tab">
          <ul>
            <li v-for="item in tab" :class="{'click':item.click}" @click="tabClick(item)">
              {{item.name}}
            </li>
          </ul>
        </div>
        <div v-if="showId == 2" class="img">
          <a href="/v2/credit/lotterydraw">
            <img src="https://assets.urwork.cn/image/credit/award.jpg"/>
          </a>
        </div>
        <div class="list">
            <ul v-if="showId == 0" class="point-ul">
              <task-list :apiFn="apiFn"
                         :pageSize="10"
                         :queryData="{'userId':this.$store.state.userInfo.userId}"
              >
                <template slot-scope="{item}">
                  <li>
                    <p>
                      <span>{{item.opRemark}}</span>
                      <span v-if="item.opAmount.indexOf('-')>-1" class="reduce">{{item.opAmount}}</span>
                      <span v-else="" class="add">{{item.opAmount}}</span>
                    </p>
                    <span>{{item.opTime}}</span>
                  </li>
                </template>
              </task-list>


              <!--<li>-->
                <!--<p><span>积分抽奖</span><span class="reduce">-2500</span></p>-->
                <!--<span>2018-08-28 09:00</span>-->
              <!--</li>-->
              <!--<li>-->
                <!--<p><span>发布新鲜事</span><span class="add">+250</span></p>-->
                <!--<span>2018-08-28 09:00</span>-->
              <!--</li>-->
            </ul>
            <ul v-if="showId == 1" class="u-ul">
              <u-list :apiFn="apiUFn"
                         :pageSize="10"
                         :queryData="{'userId':this.$store.state.userInfo.userId}"
              >
                <template slot-scope="{item}">
                  <li>
                    <p>
                      <span>{{item.opRemark}}</span>
                      <span v-if="item.opAmount.indexOf('-')>-1" class="reduce">{{item.opAmount}}</span>
                      <span v-else="" class="add">{{item.opAmount}}</span></p>
                    <span>{{item.opTime}}</span>
                  </li>
                </template>
              </u-list>
            <!--<li>-->
              <!--<p><span>充值</span><span class="add">+22</span></p>-->
              <!--<span>2018-08-28 09:00</span>-->
            <!--</li>-->
          </ul>
            <ul v-if="showId == 2" class="prize-ul">
              <prize-list :apiFn="apiprizeFn" :pageSize="10">
                <template slot-scope="{item}">
                  <li>
                    <div class="order-code">
                      <p>
                        <span class="code">订单号：{{item.awardNo}}</span>
                      </p>
                    </div>
                    <div class="order-info">
                      <p class="name"><span>{{item.awardName}}</span></p>
                      <span>{{item.createTime}}</span>
                    </div>
                  </li>
                </template>
              </prize-list>


              <!--<li>-->
                <!--<div class="order-code">-->
                    <!--<p>-->
                      <!--<span class="code">订单号：234432</span>-->
                      <!--<span class="type">未确认</span>-->
                    <!--</p>-->
                <!--</div>-->
                <!--<div class="order-info">-->
                  <!--<p class="name"><span>乐迪猫窝</span><span class="djs">还有{{m}}分{{s}}秒失败</span></p>-->
                  <!--<span>2018-08-28 09:00</span>-->
                <!--</div>-->
              <!--</li>-->
              <!--<li>-->
                <!--<div class="order-code">-->
                  <!--<p>-->
                    <!--<span class="code">订单号：234432</span>-->
                    <!--<span class="type">未确认</span>-->
                  <!--</p>-->
                <!--</div>-->
                <!--<div class="order-info">-->
                  <!--<p class="name"><span>乐迪猫窝</span></p>-->
                  <!--<p>收货人：张三</p>-->
                  <!--<p>收获地址：北京朝阳区道家村一号楼 维托社区</p>-->
                  <!--<span>2018-08-28 09:00</span>-->
                <!--</div>-->
              <!--</li>-->
            </ul>
            <ul v-if="showId == 3" class="exchange-ul">
              <record-list :apiFn="apirecordFn" :pageSize="10">
                <template slot-scope="{item}">
                  <li>
                    <div class="order-code">
                      <p>
                        <span class="code">订单号：{{item.pointNo}}</span>
                        <span class="point-price">-{{item.pointsUsed}}</span>
                      </p>
                    </div>
                    <div class="order-info">
                      <p class="name"><span>{{item.pointsGoodsName}}</span></p>
                      <span>{{item.createTime}}</span>
                    </div>
                  </li>
                </template>
              </record-list>

              <!--<li>-->
                <!--<div class="order-code">-->
                  <!--<p>-->
                    <!--<span class="code">订单号：234432</span>-->
                    <!--<span class="point-price">-5678</span>-->
                  <!--</p>-->
                <!--</div>-->
                <!--<div class="order-info">-->
                  <!--<p class="name"><span>乐迪猫窝</span></p>-->
                  <!--<p>收货人：张三</p>-->
                  <!--<p>收获地址：北京朝阳区道家村一号楼 维托社区</p>-->
                  <!--<span>2018-08-28 09:00</span>-->
                <!--</div>-->
              <!--</li>-->
            </ul>
        </div>
      </main>

    </page-main>

  </page-wrapf7>
</template>

<script>
  import apiDetail from 'api/user/apiDetail';
  import apiUlist from 'api/credit/apiUlist';
  import apiAwardRecord from 'api/credit/apiAwardRecord';
  import apiRecordList from 'api/credit/apiRecordList';
  import TaskList from 'component/list/TaskList';
  import UList from 'component/list/UList';
  import PrizeList from 'component/list/PrizeList';
  import RecordList from 'component/list/RecordList';
  import {mapState} from 'vuex';
  import store from 'store';
  export default {
    components: {
      TaskList,
      PrizeList,
      RecordList,
      UList
    },
    data: () => {
      return {
        show: false,
        title: '我的账户',
        datalist:[],
        total:0,
        apiFn:apiDetail,
        apiUFn:apiUlist,
        apiprizeFn:apiAwardRecord,
        apirecordFn:apiRecordList,
        tab:[
          {id:0,
            name:'积分明细',
            click:true
          },
          {id:1,
            name:'U点明细',
            click:false
          },
          {id:2,
            name:'中奖礼品',
            click:false
          },
          {id:3,
            name:'兑换礼品',
            click:false
          }
        ],
        m:'5',
        s:'0',
        showId:0
      }
    },
    methods:{
      tabClick(ret) {
        localStorage.setItem('creditToMyAccount', ret.id)
        this.showId = ret.id;
//        this.$router.push({
//          name: 'myAccount',
//          query: {tab: ret.id}
//        })
        this.tab.map( (obj,idx) => {
          ret.id == obj.id ? obj.click = true : obj.click = false
        })
      }
    },
    created() {
      this.show = true;
      apiDetail({
        "userId":this.$store.state.userInfo.userId,
        "pn":1,
        "ps":10
      }).then(res => {
//          console.log(res);
      })

      apiUlist({
        "userId":this.$store.state.userInfo.userId,
        "pn":1,
        "ps":10
      }).then(res => {
//          console.log(res);
      })

      apiAwardRecord({
        "pageNum":1,
        "pageSize":10
      },this.$store.state.userInfo.userId).then(res => {
//        console.log(res,'中奖记录');
      })
      apiRecordList({
        "pageNum":1,
        "pageSize":10
      },this.$store.state.userInfo.userId).then(res => {
//        console.log(res,'兑奖记录');
      })
    },
    mounted() {
        console.log(this.$store.state.userInfo.userId)
      setInterval( ()=> {
        let xh = 0;
        let xm = this.m;
        let xs = this.s;
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
//          if(m < 10) {
//            m = "0" + m;
//          }
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
        this.m = m;
        this.s = s;
      }, 1000);
      this.showId = localStorage.getItem('creditToMyAccount') || 0;
      this.tab.map( (obj,idx) => {
        this.showId == obj.id ? obj.click = true : obj.click = false
      })
    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  /deep/ .loading {
    position: absolute;
    top: 150px;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 20%;
  }
  /deep/ .nodata{
    position: fixed;
    z-index: 1;
    top: 200px;
    height: 50%;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: transparent;
  }
    /* background-color: #fff; */
  /deep/ .page-topbar.topbar-theme-def .title{
    background-color: #ffffff;
  }
  /deep/ .page-header .header-inner.has-border::before{
    border-bottom: 1px solid #ffffff;
  }
  #main{
    .tab{
      background: #ffffff;
      border-bottom: 1px solid #e5e5e5;
      ul{
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 25px;
        li{
          float: left;
          /*margin: 0 18px;*/
          padding: 15px 0;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #A2A2A2;
        }
        .click{
          font-family: PingFangSC-Medium;
          color: #333333;
          font-weight: 600;
          position: relative;
          &::after{
            content: '';
            width: 22px;
            height: 2px;
            display: inline-block;
            background: #FE4C27;
            position: absolute;
            left: 50%;
            bottom: 10px;
            transform: translate(-50%, 0);
            -ms-transform: translate(-50%,0);
            -webkit-transform: translate(-50%,0);
            -o-transform: translate(-50%,0);
            -moz-transform: translate(-50%,0);
          }
        }
      }
    }
    .img{
      padding: 15px 15px 0 15px;
    }
    .list{
      padding: 15px;
      .u-ul{
        li{
          padding: 15px;
          background: #ffffff;
          margin-bottom: 15px;
          >p{
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #333333;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .reduce{
              font-family: PingFangSC-Regular;
              font-size: 16px;
              color: #999999;
              text-align: right;
            }
            .add{
              font-family: PingFangSC-Regular;
              font-size: 16px;
              color: #FB6020;
              text-align: right;
            }
          }
          >span{
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #A2A2A2;
          }
        }
      }
      .point-ul{
        li{
          padding: 15px;
          background: #ffffff;
          margin-bottom: 15px;
          >p{
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #333333;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .reduce{
              font-family: PingFangSC-Regular;
              font-size: 16px;
              color: #999999;
              text-align: right;
            }
            .add{
              font-family: PingFangSC-Regular;
              font-size: 16px;
              color: #FB6020;
              text-align: right;
            }
          }
          >span{
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #A2A2A2;
          }
        }
      }
      .prize-ul{
        li{
          padding: 15px;
          background: #ffffff;
          margin-bottom: 15px;
          .order-code{
            margin-bottom: 10px;
            p{
              display: flex;
              align-items: center;
              justify-content: space-between;
              .code{
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #333333;
              }
              .type{
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #FB6020;
                text-align: right;
              }
            }
          }
          .order-info{
            background: #f7f7f7;
            padding: 13px 15px;
            p{
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #666666;
              margin-bottom: 2px;
            }
            .name{
              font-family: PingFangSC-Semibold;
              font-size: 16px;
              color: #333333;
              font-weight: 500;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .djs{
                font-family: PingFangSC-Regular;
                font-size: 11px;
                color: #FC6729;
                background: rgba(252,103,41,0.1);
                border-radius: 2px;
                padding: 1px 5px;
              }
            }
            >span{
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #A2A2A2;
            }
          }
        }
      }
      .exchange-ul{
        li{
          padding: 15px;
          background: #ffffff;
          margin-bottom: 15px;
          .order-code{
            margin-bottom: 10px;
            p{
              display: flex;
              align-items: center;
              justify-content: space-between;
              .code{
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #333333;
              }
              .point-price{
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #999999;
                text-align: right;
              }
            }
          }
          .order-info{
            background: #f7f7f7;
            padding: 13px 15px;
            p{
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #666666;
              margin-bottom: 2px;
            }
            .name{
              font-family: PingFangSC-Semibold;
              font-size: 16px;
              color: #333333;
              font-weight: 500;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .djs{
                font-family: PingFangSC-Regular;
                font-size: 11px;
                color: #FC6729;
                background: rgba(252,103,41,0.1);
                border-radius: 2px;
                padding: 1px 5px;
              }
            }
            >span{
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #A2A2A2;
            }
          }
        }
      }
      li{
        background: #FFFFFF;
        box-shadow: 0 1px 8px -1px rgba(208,211,213,0.58);
        border-radius: 2px;
      }
    }
  }
  .nodata{
    top: 145px!important;
  }
</style>


