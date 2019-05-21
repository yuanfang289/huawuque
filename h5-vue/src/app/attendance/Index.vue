<template>
  <page-wrap class="page-attendance-center">
    <title v-title>{{title}}</title>

    <page-header>
      <topbar :theme="'white'" :type="'back'" :hideShareBtn="true">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main :show="show">
      <div class="attendance">
        <div class="banner" v-if="bannershow">
            <h3>欢迎您使用企业考勤功能</h3>
            <p>初次使用请您设置贵公司的考勤规则</p>
        </div>
        <div class="main">
          <div class="main-item">
            <h5 class="tit time-tit">考勤时间</h5>
            <div class="item time">
              <ul>
                <li>
                  <p>上班时间</p>
                  <span @click="openPicker1()">
                    <span class="item-value" style="font-weight: 700">{{pickerValue1}}</span>
                    <span class="more">
                       <i class="uricon-arrow-right"></i>
                    </span>
                  </span>
                </li>
                <li>
                  <p>晚到多久不算迟到</p>
                  <span>
                    <span class="item-value" style="font-weight: 700" @click="showMin('late')">{{lateTime}}分钟</span>
                    <span class="more">
                       <i class="uricon-arrow-right"></i>
                    </span>
                  </span>
                </li>
                <li>
                  <p>下班时间</p>
                  <span @click="openPicker2()">
                    <span class="item-value" style="font-weight: 700">{{pickerValue2}}</span>
                    <span class="more">
                       <i class="uricon-arrow-right"></i>
                    </span>
                  </span>
                </li>
                <li>
                  <p>早走多久不算早退</p>
                  <span>
                    <span class="item-value" style="font-weight: 700" @click="showMin('early')">{{earlyTime}}分钟</span>
                    <span class="more">
                       <i class="uricon-arrow-right"></i>
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div class="main-item">
            <h5 class="tit date-tit">考勤日期</h5>
            <div class="item date">
              <ul>
                <li v-for="item in week1" :class="{ checked: item.checked }" @click="weekcheck(item)">{{item.text}}</li>
              </ul>
              <ul>
                <li v-for="item in week2" :class="{ checked: item.checked }" @click="weekcheck(item)">{{item.text}}</li>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
        <!--<div class="button" @click="openPicker()">-->
        <!--</div>-->
        <div class="submit">
          <div class="button" @click="submit()">确定</div>
        </div>
      </div>

       <mt-datetime-picker ref="picker" :endDate="endDate"  type="time" :closeOnClickModal="false"  @cancel="handleCancel" @confirm="handleConfirm1" v-model="pickerValue1Temp">
       </mt-datetime-picker>

      <mt-datetime-picker ref="picker2" :endDate="endDate" type="time" :closeOnClickModal="false" @cancel="handleCancel"  @confirm="handleConfirm2" v-model="pickerValue2Temp">
      </mt-datetime-picker>

      <mt-popup v-model="popLate" popup-transition="popup-fade" :closeOnClickModal="false" position="bottom">
        <mt-picker ref="lateTimePicker" :slots="slotsEarly" :closeOnClickModal="false"  @change="lateChange" style="width: 7.5rem;" showToolbar>
        <div class="picker-toolbar">
          <span class="mint-datetime-action mint-datetime-cancel" @click="cancelPicker('lateTime')">取消</span>
          <span class="mint-datetime-action mint-datetime-confirm" @click="confirmPicker('lateTime')">确定</span>
        </div>
        </mt-picker>
    </mt-popup>

      <mt-popup v-model="popEarly" popup-transition="popup-fade" :closeOnClickModal="false" position="bottom">
        <mt-picker ref="earlyTimePicker" :slots="slotsLate" :closeOnClickModal="false" @change="earlyChange" style="width: 7.5rem;" showToolbar>
          <div class="picker-toolbar">
            <span class="mint-datetime-action mint-datetime-cancel" @click="cancelPicker('earlyTime')">取消</span>
            <span class="mint-datetime-action mint-datetime-confirm" @click="confirmPicker('earlyTime')">确定</span>
          </div>
        </mt-picker>
      </mt-popup>

    </page-main>

  </page-wrap>
</template>

<script>
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import {getScheme, setScheme} from 'nativeFix';
  import apiSaveSettings from 'api/attendance/apiSaveSettings';
  import apiGetSettings from 'api/attendance/apiGetSettings';
  export default {
    components: {},
    data: () => {
      return {
        handler: function(e){
          e.preventDefault()
        },
        show: false,
        title: '考勤设置',
        dialog: false,
        pickerValue1:'09:00',
        pickerValue1Temp:'09:00',
        pickerValue2:'18:00',
        pickerValue2Temp:'18:00',


        //迟到
        popLate:false,
        slotsLate: [{
          values: ['0','1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16', '17', '18', '19', '20', '21', '22','23','24','25','26','27','28','29','30'],
          defaultIndex:4
        }],
        lateTime:5,
        lateTimeTemp:5,
        lateTimeIndex:5,

        //早退
        popEarly:false,
        slotsEarly: [{
          values: ['0','1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16', '17', '18', '19', '20', '21', '22','23','24','25','26','27','28','29','30'],
          defaultIndex:4
        }],
        earlyTime:5,
        earlyTimeTemp:5,
        earlyTimeIndex:5,

        week1:[{
            id:1,
            text:'每周一',
            checked:false
        },{
          id:2,
          text:'每周二',
          checked:false
        },{
          id:3,
          text:'每周三',
          checked:false
        },{
          id:4,
          text:'每周四',
          checked:false
        }],
        week2:[{
          id:5,
          text:'每周五',
          checked:false
        },{
          id:6,
          text:'每周六',
          checked:false
        },{
          id:7,
          text:'每周日',
          checked:false
        }],
        checkedweekArry:[],
        info:{
          attendanceDays:'',
          checkInTime:'',
          checkInTolerance:'',
          checkOutTime:'',
          checkOutTolerance:'',
          companyId:'12213',
          id:''
        },
        isSubmit: false,
        bannershow: true,
        endDate:new Date(),
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
      showMin(name){
          if(name=='late'){
            this.popLate=true;
          }else{
            this.popEarly=true;
          }
        this.closeTouch();
      },
      handleCancel(){
        this.openTouch();
      },
      handleConfirm1(data){
        this.pickerValue1= this.pickerValue1Temp=data;
        this.openTouch();
      },

      handleConfirm2(data){
        this.pickerValue2=this.pickerValue2Temp=data;
        this.openTouch();
      },

      cancelPicker(name){
          if(name=="lateTime"){
            this.$refs.lateTimePicker.setValues([this.lateTime]);
            this.popLate=false;
          }else{
            this.$refs.earlyTimePicker.setValues([this.earlyTime]);
            this.popEarly=false;
          }
        this.openTouch();
      },
      confirmPicker(name){
        if(name=="lateTime"){
          this.lateTime=this.lateTimeTemp;
          this.popLate=false;
        }else{
          this.earlyTime=this.earlyTimeTemp;
          this.popEarly=false;
        }
        this.openTouch();
      },

      lateChange(picker, values) {
        this.lateTimeTemp = values[0];
      },
      earlyChange(picker, values) {
        this.earlyTimeTemp = values[0];
      },

      openPicker1() {
        this.$refs.picker.open();
        this.closeTouch();
      },
      openPicker2() {
        this.$refs.picker2.open();
        this.closeTouch();
      },

      checkTel(){
        var tel = this.info['mobile'];
        console.log("tel",tel);
        if (tel.trim()==''){return false;}
        var mobile = /^1[0-9]{10}$/;
        return mobile.test(tel);
      },
      weekcheck (item){
          this.checkedweekArry = [];
          this.week1.map( (obj,index)=>{
            if(obj.id == item.id){
              this.$set(obj,"checked",!obj.checked);
            }
            if(obj.checked){
              this.checkedweekArry.push(obj);
            }
          });
          this.week2.map( (obj,index)=>{
            if(obj.id == item.id){
              this.$set(obj,"checked",!obj.checked);
            }
            if(obj.checked){
              this.checkedweekArry.push(obj);
            }
          });
          let str = '';
          this.checkedweekArry.map( (obj,index)=> {
              str = str + obj.id + ',';
          })
          str = str.substring(0, str.length - 1);
          this.info.attendanceDays = str;
      },
      getSettings(){
        apiGetSettings({
          "companyId":this.info.companyId
        },this.$store.state.userInfo.userId).then(res => {
            console.log(res,'44');
            if(res.data){
              let data = res.data;
              this.pickerValue1 = this.pickerValue1Temp = data.checkInTime.substr(0,data.checkInTime.length-3);
              this.lateTime = data.checkInTolerance;
              this.pickerValue2 = this.pickerValue2Temp = data.checkOutTime.substr(0,data.checkOutTime.length-3);
              this.earlyTime  = data.checkOutTolerance;
              let num = parseInt(data.checkOutTolerance);
              let num1 = parseInt(data.checkInTolerance);
              this.$set(this.slotsLate[0],'defaultIndex',num);
              this.$set(this.slotsEarly[0],'defaultIndex',num1);
              console.log(num,num1);
              this.info.attendanceDays = data.attendanceDays;
              this.info.id = data.id;
              let weekStr = data.attendanceDays.split(',');
              console.log(weekStr);
              this.week1.map( (obj,idx)=> {
                for(let n in  weekStr){
                  weekStr[n] == obj.id ?  this.$set(obj,"checked",true):''
                }
              })
              this.week2.map( (obj,idx)=> {
                for(let n in  weekStr){
                  weekStr[n] == obj.id ?  this.$set(obj,"checked",true):''
                }
              })
            }else{

            }
            this.show = true;
        })
      },
      submit(){
        this.info.checkInTime = this.pickerValue1+ ":00";
        this.info.checkInTolerance = this.lateTime;
        this.info.checkOutTime = this.pickerValue2+ ":00";
        this.info.checkOutTolerance = this.earlyTime;
        let inTimes = this.info.checkInTime.split(':')[0]*3600+this.info.checkInTime.split(':')[1]*60;
        let outTimes = this.info.checkOutTime.split(':')[0]*3600+this.info.checkOutTime.split(':')[1]*60;
        if (inTimes >= outTimes ) {
          this.$toast("上班时间不能晚于下班时间");
          return
        }
        if(this.info.attendanceDays.length == 0){
          this.$toast("请至少选择一个考勤日期");
          return
        }
        if (this.isSubmit) {
          this.$toast("请不要重复提交");
          return
        } else {
          this.isSubmit = true;
        }
        apiSaveSettings(this.info,this.$store.state.userInfo.userId).then(res => {
          if (res.retCode == 0) {
            this.$toast("设置成功");
            window.setTimeout(() => {
              this.mylinkto('/v2/attendance/statistics?companyId='+this.info.companyId+'&from=1');
            }, 2000);
          } else {
            this.$toast(res.retMsg);
            this.isSubmit = false;
          }
        });
      }
    },
    created() {
      this.info.companyId = this.$route.query.companyId;
      this.$route.query.from == 'setup' ? this.bannershow = false : ''
      this.getSettings();
    },

    mounted() {
        
    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  .page-attendance-center{
    background: #fafafa;
  }
  .banner{
      width: 100vw;
      height: 22.667vw;
      background: url("https://assets.urwork.cn/image/attendance/banner.png") no-repeat;
      background-size: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      h3{
          font-family: PingFangSC-Semibold;
          font-size: 15px;
          color: #333333;
          letter-spacing: 0;
          font-weight: 600;
      }
      p{
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #333333;
          letter-spacing: 0;
        margin-top: 6px;
      }
  }
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
            .more{
              font-size: 9px;
            }
          }
        }
      }
      .date{
        padding: 20px 15px;
        ul{
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin-bottom: 10px;
          li{
            width: 23%;
            height: 100%;
            line-height: 34px;
            background: #FFFFFF;
            border: 1px solid #EEEEEE;
            border-radius: 2px;
            font-size: 13px;
            color: #666666;
            letter-spacing: 0;
            text-align: center;
          }
          .checked{
            background:url("https://assets.urwork.cn/image/attendance/date-checked.png") no-repeat;
            background-size: 100% 100%;
            border: 1px solid transparent;
          }
          &:last-child{
            margin-bottom: 0;
            li{
              &:last-child{
                visibility: hidden;
              }
            }
          }
        }
      }
    }

  }
  .submit{
    width: 100%;
    padding: 10px 15px;
    .button{
      width: 100%;
      height: 41px;
      line-height: 41px;
      text-align: center;
      background: #333333;
      border-radius: 2px;
      font-family: PingFangSC-Regular;
      font-size: 15px;
      color: #FFFFFF;
      letter-spacing: 0;
    }
  }
  .picker-toolbar-title {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
  }
      
      .usi-btn-cancel,
      .usi-btn-sure {
      color: #FF6600
      }


  .picker .picker-toolbar {
    border-bottom: solid 1px #eaeaea;
  }
</style>

