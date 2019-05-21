<template>
  <page-wrap class="page-attendance-center">
    <title v-title>{{title}}</title>

    <page-header v-on:headCallBack="headCall" :tab="tab">
      <topbar :theme="'white'" :type="'back'" :hideShareBtn="true">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main :show="show">
      <div class="attendance">
        <div v-bind:class="{ 'fixed-mid': !isIosApp, 'fixed-mid-ios': isIosApp}" :style="computedStyle">
          <div class="banner" >
            <div v-if="!tab" :class="{ 'tab': true, 'sign': true, 'checked':tab}" @click="tab=!tab;tabClick(0)">
              <p>已打卡</p>
            </div>
            <div v-else="" :class="{ 'tab': true, 'sign': true, 'checked':tab}">
              <p>已打卡</p>
            </div>
            <div class="line"></div>
            <div v-if="tab" :class="{ 'tab': true, 'nosign': true, 'checked':!tab}" @click="tab=!tab;tabClick(5)">
              <p>未打卡</p>
            </div>
            <div v-else="" :class="{ 'tab': true, 'nosign': true, 'checked':!tab}">
              <p>未打卡</p>
            </div>
          </div>
          <div class="date" @click="selectDay()">
            <p>{{pickerDate}}</p> <div><i class="uricon-arrow-right"></i></div>
          </div>
          <div v-show="tab" class="mark">
            <ul>
              <li v-for="tab in tabArry" @click="tabClick(tab.id)" :class="{'mmm':tab.mmm,'nnn':tab.nnn,'checked':tab.checked}">{{tab.text}}({{tab.num}})</li>
            </ul>
          </div>
        </div>

        <div class="fixed-zhan">
          <div class="banner" >
            <div :class="{ 'tab': true, 'sign': true, 'checked':tab}" @click="tab=!tab">
              <p>已打卡</p>
            </div>
            <div class="line"></div>
            <div :class="{ 'tab': true, 'nosign': true, 'checked':!tab}" @click="tab=!tab">
              <p>未打卡</p>
            </div>
          </div>
          <div class="date">
            <p>2018.11.22</p> <div><i class="uricon-arrow-right"></i></div>
          </div>
          <div v-show="tab" class="mark">
            <ul>
              <li v-for="tab in tabArry" @click="tabClick(tab.id)" :class="{'mmm':tab.mmm,'nnn':tab.nnn,'checked':tab.checked}">{{tab.text}}({{tab.num}})</li>
            </ul>
          </div>
        </div>

        <div class="main">
          <ul>
            <template v-for="row in data">
              <li @click="mylinkto('/v2/attendance/month?year='+row.checkDate.split('-')[0]+'&month='+parseInt(row.checkDate.split('-')[1])+'&day='+parseInt(row.checkDate.split('-')[2])+'&companyId='+row.companyId+'&distUserId='+row.userId)">
                <div class="left">
                  <div class="head-img">
                    <img :src="row.headUrl" onerror="javascript:this.src='https://assets.urwork.cn/image/headImg.png';">
                  </div>
                  <div class="info">
                    <p class="name">{{row.realname}}</p>
                    <span v-if="row.dailyStatus!=3" class="time">
                      <span v-if="row.checkInTime">{{row.checkInTime.substr(0,5)}}</span>
                      <span v-else="">**:**</span>
                      -
                      <span v-if="row.checkOutTime">{{row.checkOutTime.substr(0,5)}}</span>
                      <span v-else="">**:**</span>
                    </span>
                  </div>
                </div>
                <div class="right">
                  <span v-if="row.checkInStatus == 1 && row.checkOutStatus == 1" class="txt-grey">正常</span>
                  <span v-if="row.checkInStatus == 2" class="txt-yell">迟到</span>
                  <span v-if="row.checkOutStatus == 2" class="txt-yell">早退</span>
                  <span v-if="row.checkInStatus == 0 && row.checkOutStatus == 0" class="txt-yell">缺勤</span>
                  <span v-else-if="row.checkInStatus == 0 || row.checkOutStatus == 0" class="txt-yell">缺卡</span>
                </div>
              </li>
            </template>

              <!--<li>-->
                <!--<div class="left" @click="mylinkto('/v2/attendance/month')">-->
                  <!--<div class="head-img">-->
                    <!--<img src="https://assets.urwork.cn/image/headImg.png" onerror="javascript:this.src='https://assets.urwork.cn/image/headImg.png';">-->
                  <!--</div>-->
                  <!--<div class="info">-->
                    <!--<p class="name">名字</p>-->
                    <!--<span class="time">09:48-19:40</span>-->
                  <!--</div>-->
                <!--</div>-->
                <!--<div class="right">-->
                  <!--<span class="txt-grey">正常</span>-->
                  <!--<span class="txt-yell">迟到</span>-->
                  <!--<span class="txt-yell">早退</span>-->
                <!--</div>-->
              <!--</li>-->
          </ul>
        </div>
        <!--<div class="button" @click="openPicker()">-->
        <!--</div>-->
      </div>
      <mt-datetime-picker ref="picker1" :startDate="startDate" :endDate="endDate" type="date" :closeOnClickModal="false" @cancel="handleCancel" @confirm="handleConfirm" v-model="pickerDateTemp">
      </mt-datetime-picker>
    </page-main>

  </page-wrap>
</template>

<script>
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import {getScheme, setScheme} from 'nativeFix';
  import apiDailyDetail from 'api/attendance/apiDailyDetail';
  import apiDailySummary from 'api/attendance/apiDailySummary';
  export default {
    components: {},
    data: () => {
      return {
        handler: function(e){
          e.preventDefault()
        },
        show: false,
        title: '考勤详情',
        dialog: false,
        pickerDate:null,
        pickerDateTemp:null,
        isSubmit: false,
        tab:true,
        topTab:'',
        tabArry:[
          {
            id:0,
            text:'全部',
            num:0,
            checked:true
          },
          {
            id:1,
            text:'正常',
            num:0,
            checked:false
          },
          {
            id:2,
            text:'迟到',
            num:0,
            checked:false
          },
          {
            id:3,
            text:'早退',
            num:0,
            mmm:'1',
            checked:false
          },
          {
            id:4,
            text:'缺卡',
            num:0,
            nnn:'1',
            checked:false
          }
        ],
        companyId:'534',
        type:'',
        data:[],
        dayDate:{},
        isIosApp:false,
        endDate:new Date(),
        startDate:new Date('2019/02/01')
      }
    },
    methods: {
      closeTouch() {
        document.getElementsByTagName('body')[0].addEventListener('touchmove', this.handler, {passive:false})//阻止默认事件
        this.$DANativeApi.setIsRefresh({
          isRefresh: false
        })
      },
      openTouch() {
        document.getElementsByTagName('body')[0].removeEventListener('touchmove', this.handler, {passive:false})//打开默认事件
        this.$DANativeApi.setIsRefresh({
          isRefresh: true
        })
      },
      selectDay(){
        this.$refs.picker1.open();
        this.closeTouch();
      },
      getDateString (date_t) {
        return date_t.getFullYear() +
          "." +
          (date_t.getMonth() + 1 > 9 ? (date_t.getMonth() + 1) :
            ("0" + (date_t.getMonth() + 1))) +
          "." +
          (date_t.getDate() > 9 ? date_t.getDate() : ("0" + date_t
            .getDate()));
      },
      handleCancel(){
        this.openTouch();
      },
      handleConfirm(data){
        this.pickerDate=this.getDateString(data);
        this.pickerDateTemp=data;
        this.openTouch();
        this.mylinkto('/v2/attendance/detail?type='+this.type+'&date='+this.pickerDate+'&companyId='+this.companyId)
      },
      headCall: function (msg) { //回调方法，接收子组件传的参数
        this.topTab = msg;
        console.log(this.topTab);
      },
      apiDailyDetail(n) {
        apiDailyDetail({
          "companyId":this.companyId,
          "queryDay":this.pickerDate.replace(/\./g,'-'),
          "type":n||0
        },this.$store.state.userInfo.userId).then(res => {
              console.log(res);
              this.data = res.data;
        })
      },
      apiDailySummary() {
        apiDailySummary({
          "companyId":this.companyId,
          "queryDay":this.pickerDate.replace(/\./g,'-')
        },this.$store.state.userInfo.userId).then(res => {
          if(res.retCode == 0){
            this.dayDate = res.data;
            this.tabArry.map( (obj,idx)=>{
              obj.id == 0 ? this.$set(obj,"num",this.dayDate.checkNum):'';
              obj.id == 1 ? this.$set(obj,"num",this.dayDate.normalNum):'';
              obj.id == 2 ? this.$set(obj,"num",this.dayDate.lateNum):'';
              obj.id == 3 ? this.$set(obj,"num",this.dayDate.earlyNum):'';
              obj.id == 4 ? this.$set(obj,"num",this.dayDate.lackNum):'';
            })
          }else{
            this.$toast(res.retMsg);
          }
        })
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
      openPicker() {
        this.$refs.picker.open();
        this.closeTouch();
        console.log("picker",this.pickerValue)
      },
      tabClick (item,n){
        this.type = item;
        this.tabArry.map( (obj,index)=>{
            this.$set(obj,"checked",false);
        });
        this.tabArry.map( (obj,index)=>{
          if(obj.id == item){
            this.$set(obj,"checked",true);
          }
        });
        this.apiDailyDetail(item);
        //n!=1 ? this.$router.replace({name: 'adetail',query:{type:item,date:this.pickerDate}}):'';
      }
    },

    created() {
      let u = navigator.userAgent;
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      isApp() ? this.isIosApp = true : '';
      this.show = true;
      this.companyId = this.$route.query.companyId;
      let date=new Date();
      this.pickerDateTemp=date;
      this.pickerDate=this.getDateString(date);
      if(this.$route.query.date){
        this.pickerDateTemp=new Date(this.$route.query.date.replace(/\./g,'-'));
        this.pickerDate=this.$route.query.date;
      }
      this.$route.query.type == 5 ? this.tab = false : '';
      if(this.$route.query.type != 5){
          this.tabClick(this.$route.query.type,1);
      }else{
        this.apiDailyDetail(this.$route.query.type);
      }
      this.apiDailySummary();
    },
    computed: {
      computedStyle() {
        return this.topTab ? `top: 0px` : ''
      }
    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  .page-attendance-center{
    background: #ffffff;
    .fixed-mid{
      width: 100%;
      position: fixed;
      top: 45px;
      z-index: 100;
      transition: top .2s;
    }
    .fixed-mid-ios{
      width: 100%;
      position: fixed;
      top: 0px;
      z-index: 100;
      transition: top .2s;
    }
    .fixed-zhan{
      visibility: hidden;
    }

    .banner{
      width: 100%;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      background: #ffffff;
      .tab{
        width: 49%;
        height: 100%;
        font-family: PingFangSC-Regular;
        font-size: 15px;
        color: #999999;
        letter-spacing: 0;
        text-align: center;
        p{
          height: 100%;
          line-height: 45px;
          display: inline-block;
          position: relative;
        }
      }
      .checked{
        p{
          color: #333333;
          font-weight: 600;
          &:after{
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: #FFD53D;
          }
        }
      }
      .line{
        height: 20px;
        border-right: 1px solid #bababa;
      }
    }
    .date{
      height: 46px;
      background: #FAFAFA;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 0 20px;
      p{
        font-family: PingFangSC-Regular;
        font-size: 15px;
        color: #4D7BFF;
        letter-spacing: 0;
        margin-right: 6px;
      }
      i{
        font-size: 10px;
        transform:rotate(90deg);
        -ms-transform:rotate(90deg); 	/* IE 9 */
        -moz-transform:rotate(90deg); 	/* Firefox */
        -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
        -o-transform:rotate(90deg); 	/* Opera */
      }
    }
    .mark{
      background: #ffffff;
      padding:7px 15px 17px 15px;
      position: relative;
      @include border-bottom(#E5E5E5);
      ul{
        /*height: 34px;*/
        /*display: flex;*/
        /*flex-wrap: wrap;*/
        /*justify-content: space-between;*/
        /*margin-bottom: 10px;*/
        overflow: hidden;
        li{
          width: 78px;
          height: 100%;
          float: left;
          line-height: 30px;
          background: #FFFFFF;
          border: 1px solid #EEEEEE;
          border-radius: 2px;
          font-size: 13px;
          color: #666666;
          letter-spacing: 0;
          text-align: center;
          margin-left: 10px;
          margin-top: 10px;
          &:first-child{
            margin-left: 0;
          }
        }
        .checked{
          background: #FFF1BB;
          color: #333333;
          border: 1px solid #FFF1BB;
        }
      }
    }
    .main{
      padding: 0 15px;
      margin-bottom: 50px;
      ul{
        li{
          height: 71px;
          position: relative;
          @include border-bottom(#E5E5E5);
          display: flex;
          align-items: center;
          justify-content: space-between;
          .left{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .head-img{
              width: 45px;
              height: 45px;
              border-radius: 50%;
              overflow: hidden;
              img{
                width: 45px;
                height: 45px;
                border-radius: 50%;
              }
            }
            .info{
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              margin-left: 6px;
              .name{
                font-family: PingFangSC-Regular;
                font-size: 17px;
                color: #333333;
                letter-spacing: 0;
              }
              .time{
                font-family: PingFangSC-Regular;
                font-size: 13px;
                color: #999999;
                letter-spacing: 0;
              }
            }
          }
          .right{
            font-family: PingFangSC-Regular;
            font-size: 15px;
            letter-spacing: 0;
            text-align: right;
            .txt-grey{
              color: #999999;
            }
            .txt-yell{
              color: #FF5F1A;
            }
          }
        }
      }
    }
  }
  @media (max-width: 374px) {
    .mmm {
      margin-left: 0!important;
    }
  }
  @media (min-width: 375px)  and (max-width:460px){
    .nnn {
      margin-left: 0!important;
    }
  }
</style>

