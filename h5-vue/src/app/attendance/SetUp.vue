<template>
  <page-wrap class="page-attendance-center">
    <title v-title>{{title}}</title>

    <page-header>
      <topbar :theme="'white'" :type="'backclose'" :hideNativeTitleBar="true" :nativeBack="true" :nativeStatusBarStyle=1>
        <template slot="navigate">
          <a href="javascript:;" slot="navigate" class="xzyaction" @click.prevent="backHandler"><i class="uricon-arrow-left"></i></a>
          <!--<a :href="'/market/companyDetail?id='+companyId" slot="navigate" class="xzyaction"><i class="uricon-close"></i></a>-->
          <a @click="appBack()" slot="navigate" class="xzyaction"><i class="uricon-close"></i></a>
        </template>
        <template slot="title">{{title}}</template>
        <template slot="actions"> <a class="edit" @click="mylinkto('/v2/attendance?from=setup&companyId='+companyId)">{{right_title}}</a></template>
      </topbar>
    </page-header>

    <page-main :show="show">
      <div class="attendance">
        <div class="main">
          <div class="main-item">
            <h5 class="tit time-tit">考勤时间</h5>
            <div class="item time">
              <ul>
                <li>
                  <p>上班</p>
                  <span class="item-value">{{pickerValue1}}</span>
                  <p>晚到</p>
                  <span class="">{{lateTime}}分钟</span>
                  <p>为迟到</p>
                </li>
                <li>
                  <p>下班</p>
                  <span class="item-value">{{pickerValue2}}</span>
                  <p>早走</p>
                  <span class="">{{earlyTime}}分钟</span>
                  <p>为早退</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="main-item">
            <h5 class="tit date-tit">考勤日期</h5>
            <div class="item date">
              <ul>
                <li>每 <span style="font-weight: 600">周{{week}}</span> 记录考勤</li>
              </ul>
            </div>
          </div>
          <div class="text">
            <div class="title">
                <div class="line"></div>
                <p>考勤打卡说明</p>
            </div>
            <div class="content">
              <p class="first">欢迎体验优鲜集企业考勤功能，基于面部识别系统，自动扫脸打卡，无感记录考勤，新一代的考勤方式</p>
              <p>打卡方式：上班签到打卡，在社区大门处人脸识别设备前扫脸进门；下班签退打卡，在社区大门处人脸识别设备前扫脸识别</p>
              <p>未录入面部信息的用户，需在“个人中心-设置-个人资料”进入“面部信息采集”录入自己的面部信息，才可记录用户考勤信息</p>
              <p>如需导出考勤报表，请联系社区运营人员</p>
            </div>
          </div>
        </div>
        <!--<div class="button" @click="openPicker()">-->
        <!--</div>-->
      </div>
      <div style="height: 61px">

      </div>
      <div class="footer">
        <div class="iten tong-ji" @click="mylinkto('/v2/attendance/statistics?companyId='+companyId)">
          <span></span>
          <p>统计</p>
        </div>
        <div class="iten she-zhi">
          <span></span>
          <p>设置</p>
        </div>
      </div>
      <mt-datetime-picker :startDate="startDate" :endDate="endDate" ref="picker" type="time" v-model="pickerValue">
      </mt-datetime-picker>

    </page-main>

  </page-wrap>
</template>

<script>
  import globalData from "src/globalData";
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import {getScheme, setScheme} from 'nativeFix';
  import apiGetSettings from 'api/attendance/apiGetSettings';
  export default {
    components: {},
    data: () => {
      return {
        show: false,
        title: '考勤设置',
        right_title:'编辑',
        dialog: false,
        pickerValue:'09:00',
        isSubmit: false,
        angle:150,
        tab:true,
        companyId:'',
        info:{},
        weekTxt:['一','二','三','四','五','六','日'],
        week:'',
        pickerValue1:'',
        lateTime:'',
        pickerValue2:'',
        earlyTime:'',
        nativeBack:true,
        endDate:new Date(),
        startDate:new Date('2019/02/01')
      }
    },
    methods: {
      appBack() {
          if(isApp()){
            this.$DANativeApi.navigateBack();
          }else{
            location.href = '/market/companyDetail?id='+companyId;
          }
      },
      backHandler() {

        // TODO 原生APP补丁
        if (this.nativeBack && isApp()) {
          this.$DANativeApi.navigateBack();
          return
        }

        globalData.routerTimer = setTimeout(() => {
          if (this.$route.name === 'index') return;

          // TODO 由于首页为做前后端分离，只能采用直接修改href的方式跳转
          location.href = '/';
          // this.$router.replace({name: 'index'});
        }, 1000);

        this.$router.back();
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
        console.log("picker",this.pickerValue)
      },
      tabClick (item){
        this.tabArry.map( (obj,index)=>{
          this.$set(obj,"checked",false);
        });
        this.tabArry.map( (obj,index)=>{
          if(obj.id == item.id){
            this.$set(obj,"checked",true);
          }
        });
      },
      getSettings(){
        apiGetSettings({
          "companyId":this.companyId
        },this.$store.state.userInfo.userId).then(res => {
          console.log(res,'44');
          if(res.data){
            let data = res.data;
            this.pickerValue1 = data.checkInTime.substr(0,data.checkInTime.length-3);
            this.lateTime = data.checkInTolerance;
            this.pickerValue2 = data.checkOutTime.substr(0,data.checkOutTime.length-3);
            this.earlyTime = data.checkOutTolerance;
            this.info = data;
            this.week = data.attendanceDays.replace('1','一').replace('2','二').replace('3','三').replace('4','四').replace('5','五').replace('6','六').replace('7','日').replace(/,/g,'、')
          }else{
            this.$toast("未查到设置信息");
          }
          this.show = true;
        })
      }
    },

    created() {
      this.show = true;
      this.companyId = this.$route.query.companyId;
      this.getSettings();
    },

    mounted() {

    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  .edit{
    font-size: 15px;
    margin-right: 15px;
  }
  /deep/ .page-topbar .navigate{
    width: 68px;
    display: flex;
    justify-content: space-evenly;
  }
  .page-attendance-center{
    background: #fafafa;
    height: 100vh;
    .main{
      padding: 0 15px;
      .main-item{
        padding: 10px 0 20px 0;
        .tit{
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #999999;
          letter-spacing: 0;
          text-align: left;
          padding: 5px;
        }
        .item{
          background: #FFFFFF;
          box-shadow: 0 3px 5px 1px rgba(245,245,245,0.99);
          border-radius: 4px;
        }
        .time{
          ul{
            li{
              height: 55px;
              line-height: 55px;
              font-family: PingFangSC-Regular;
              font-size: 15px;
              color: #333333;
              letter-spacing: 0;
              border-bottom: 1px solid #eeeeee;
              padding: 0 15px;
              font-weight: 500;
              display: flex;
              justify-content: space-between;
              p{
                color: #999999;
              }
              span{
                color: #333333;
                font-weight: 600;
              }
              &:last-of-type{
                border-bottom: 1px solid transparent;
              }
            }
          }
        }
        .date{
          ul{
            height: 51px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-bottom: 10px;
            li{
              height: 100%;
              line-height: 51px;
              background: #FFFFFF;
              border-radius: 2px;
              font-size: 13px;
              color: #666666;
              letter-spacing: 0;
              text-align: center;
              padding-left: 20px;
              span{
                color: #333333;
              }
            }
            .checked{
              background:url("https://assets.urwork.cn/image/attendance/date-checked.png") no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
      .text{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #B3B3B3;
        letter-spacing: 0;
        text-align: justify;
        line-height: 18px;
        margin-top: 34px;
        .title{
          height: 15px;
          position: relative;
          p{
            position: absolute;
            top: 0;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            padding: 0 16px;
            background: #fafafa;
            z-index: 20;
          }
          .line{
            position: relative;
            @include border-bottom(#D8D8D8);
          }
        }
        .content{
          p{
            margin-top: 15px;
            padding-left: 10px;
            position: relative;
            &:after{
              position: absolute;
              top: 6px;
              left: 0;
              content: '';
              width: 4px;
              height: 4px;
              border-radius: 50%;
              background: #B7B7B7;
            }
          }
          /deep/ .first{
            padding-left: 0;
            &:after{
              position: absolute;
              top: 6px;
              left: 0;
              content: '';
              background: transparent;
            }
          }
        }
      }

    }
    .footer{
      width: 100%;
      height: 61px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      position: fixed;
      bottom: 0;
      border-top: 1px solid #e5e5e5;
      background: #ffffff;
      .iten{
        display: flex;
        flex-direction: column;
        span{
          width: 20px;
          height: 20px;
          display: inline-block;
          margin: 0 auto;
        }
        p{
          font-family: PingFangSC-Medium;
          font-size: 10px;
          color: #666666;
          letter-spacing: 0;
          text-align: center;
          margin-top: 3px;
        }
      }
      .tong-ji{
        width: 50%;
        span{
          background: url("https://assets.urwork.cn/image/attendance/tongji-no.png") no-repeat;
          background-size: 100%;
        }
      }
      .she-zhi{
        width: 50%;
        span{
          background: url("https://assets.urwork.cn/image/attendance/shezhi-yes.png") no-repeat;
          background-size: 100%;
        }
      }
    }
  }
</style>

