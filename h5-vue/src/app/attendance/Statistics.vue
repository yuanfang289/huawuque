<template>
  <page-wrap class="page-attendance-center">
    <title v-title>{{title}}</title>

    <page-header>
      <topbar :type="'back'" :hideShareBtn="true">
        <template slot="title">{{title}}</template>
      </topbar>
      <!--<topbar :theme="'white'" :type="'backclose'" :hideNativeTitleBar="true" :nativeBack="true" :nativeStatusBarStyle=1>-->
        <!--<template slot="navigate">-->
          <!--<a href="javascript:;" slot="navigate" class="xzyaction" @click.prevent="backHandler"><i class="uricon-arrow-left"></i></a>-->
          <!--&lt;!&ndash;<a :href="'/market/companyDetail?id='+companyId" slot="navigate" class="xzyaction"><i class="uricon-close"></i></a>&ndash;&gt;-->
          <!--<a @click="appBack()" slot="navigate" class="xzyaction"><i class="uricon-close"></i></a>-->
        <!--</template>-->
        <!--<template slot="title">{{title}}</template>-->
      <!--</topbar>-->
    </page-header>

    <page-main :show="show">
      <div v-if="mytab" class="attendance">
        <div class="">
          <div class="banner" >
            <div v-if="tab" :class="{ 'tab': true, 'sign': true, 'checked':tab}">
              <p>日统计</p>
            </div>
            <div v-else="" :class="{ 'tab': true, 'sign': true, 'checked':tab}" @click="tab=!tab">
              <p>日统计</p>
            </div>
            <div class="line"></div>
            <div v-if="!tab" :class="{ 'tab': true, 'nosign': true, 'checked':!tab}">
              <p>月统计</p>
            </div>
            <div v-else="" :class="{ 'tab': true, 'nosign': true, 'checked':!tab}" @click="tab=!tab">
              <p>月统计</p>
            </div>
          </div>
          <div class="date" v-show="tab">
            <div @click="selectDay()">
              <p>{{pickerDate}}</p> <div><i class="uricon-arrow-right"></i></div>
            </div>
          </div>
          <div class="date" v-show="!tab">
            <div @click="selectMonth()">
              <p>{{pickerMonth[0]}}.{{pickerMonth[1]}}</p> <div><i class="uricon-arrow-right"></i></div>
            </div>
            <span>考勤人数{{monthDate.totalNum}}人</span>
          </div>
        </div>

        <div class="month-statis" v-show="!tab">
          <ul>
            <li v-if="monthDate.normalNum == 0">
              <div class="left">
                <p class="name">正常</p>
              </div>
              <div class="right">
                <span class="">{{monthDate.normalNum}}人</span>
                <span class="more">
                   <i class="uricon-arrow-right"></i>
                </span>
              </div>
            </li>
            <li v-else="" @click="mylinkto('/v2/attendance/late?type=1&companyId='+companyId+'&year='+pickerMonth[0]+'&month='+parseInt(pickerMonth[1]))">
              <div class="left">
                <p class="name">正常</p>
              </div>
              <div class="right">
                <span class="">{{monthDate.normalNum}}人</span>
                <span class="more">
                   <i class="uricon-arrow-right"></i>
                </span>
              </div>
            </li>
            <li v-if="monthDate.lateNum == 0">
              <div class="left">
                <p class="name">迟到</p>
              </div>
              <div class="right">
                <span class="">{{monthDate.lateNum}}人</span>
                <span class="more">
                   <i class="uricon-arrow-right"></i>
                </span>
              </div>
            </li>
            <li v-else="" @click="mylinkto('/v2/attendance/late?type=2&companyId='+companyId+'&year='+pickerMonth[0]+'&month='+parseInt(pickerMonth[1]))">
              <div class="left">
                <p class="name">迟到</p>
              </div>
              <div class="right">
                <span class="">{{monthDate.lateNum}}人</span>
                <span class="more">
                   <i class="uricon-arrow-right"></i>
                </span>
              </div>
            </li>
            <li v-if="monthDate.earlyNum == 0">
              <div class="left">
                <p class="name">早退</p>
              </div>
              <div class="right">
                <span class="">{{monthDate.earlyNum}}人</span>
                <span class="more">
                   <i class="uricon-arrow-right"></i>
                </span>
              </div>
            </li>
            <li v-else="" @click="mylinkto('/v2/attendance/late?type=3&companyId='+companyId+'&year='+pickerMonth[0]+'&month='+parseInt(pickerMonth[1]))">
              <div class="left">
                <p class="name">早退</p>
              </div>
              <div class="right">
                <span class="">{{monthDate.earlyNum}}人</span>
                <span class="more">
                   <i class="uricon-arrow-right"></i>
                </span>
              </div>
            </li>
            <li v-if="monthDate.lackNum == 0">
              <div class="left">
                <p class="name">缺卡</p>
              </div>
              <div class="right">
                <span class="">{{monthDate.lackNum}}人</span>
                <span class="more">
                   <i class="uricon-arrow-right"></i>
                </span>
              </div>
            </li>
            <li v-else="" @click="mylinkto('/v2/attendance/late?type=4&companyId='+companyId+'&year='+pickerMonth[0]+'&month='+parseInt(pickerMonth[1]))">
              <div class="left">
                <p class="name">缺卡</p>
              </div>
              <div class="right">
                <span class="">{{monthDate.lackNum}}人</span>
                <span class="more">
                   <i class="uricon-arrow-right"></i>
                </span>
              </div>
            </li>
            <li v-if="monthDate.absentNum == 0">
              <div class="left">
                <p class="name">缺勤</p>
              </div>
              <div class="right">
                <span class="">{{monthDate.absentNum}}人</span>
                <span class="more">
                   <i class="uricon-arrow-right"></i>
                </span>
              </div>
            </li>
            <li v-else="" @click="mylinkto('/v2/attendance/late?type=5&companyId='+companyId+'&year='+pickerMonth[0]+'&month='+parseInt(pickerMonth[1]))">
              <div class="left">
                <p class="name">缺勤</p>
              </div>
              <div class="right">
                <span class="">{{monthDate.absentNum}}人</span>
                <span class="more">
                   <i class="uricon-arrow-right"></i>
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div class="day-statis" v-show="tab">
            <div v-if="angle > 180 || angle == 180" class="progressa">
              <div class="percent-circle percent-circle-left">
                <div v-if="angle == 0" class="left-content left-start0" v-bind:style="{ transform: 'rotate('+angle+'deg)' }"></div>
                <div v-if="angle < 180 && angle>0" class="left-content left-start" v-bind:style="{ transform: 'rotate('+angle+'deg)' }"></div>
                <div v-else="" class="left-content" v-bind:style="{ transform: 'rotate(180deg)' }"></div>
              </div>
              <div class="percent-circle percent-circle-right">
                <div v-if="angle > 180 || angle == 180" class="right-content right-start" v-bind:style="{ transform: 'rotate('+(angle-180)+'deg)' }"></div>
                <div v-else="" class="right-content"></div>
              </div>
              <div class="text-circle">
                <div class="score">
                  <span class="numerator">{{signPeopleNumStr}}</span><span class="denominator">/{{peopleNum}}</span>
                </div>
                <div class="txt">
                  打卡人数/应到人数
                </div>
              </div>
            </div>
            <div v-else="" class="progress">
                <div class="percent-circle percent-circle-left">
                  <div v-if="angle == 0" class="left-content left-start0" v-bind:style="{ transform: 'rotate('+angle+'deg)' }"></div>
                  <div v-if="angle < 180 && angle>0" class="left-content left-start" v-bind:style="{ transform: 'rotate('+angle+'deg)' }"></div>
                  <div v-else="" class="left-content" v-bind:style="{ transform: 'rotate(180deg)' }"></div>
                </div>
                <div class="percent-circle percent-circle-right">
                  <div v-if="angle > 180 || angle == 180" class="right-content right-start" v-bind:style="{ transform: 'rotate('+(angle-180)+'deg)' }"></div>
                  <div v-else="" class="right-content"></div>
                </div>
                <div class="text-circle">
                  <div class="score">
                    <span class="numerator">{{signPeopleNumStr}}</span><span class="denominator">/{{peopleNum}}</span>
                  </div>
                  <div class="txt">
                    打卡人数/应到人数
                  </div>
                </div>
            </div>
            <div class="table">
              <table>
                <tr>
                  <td v-if="dayDate.totalNum-dayDate.checkNum !=0" @click="mylinkto('/v2/attendance/detail?type=5&date='+pickerDate+'&companyId='+companyId)">
                    <p>{{dayDate.totalNum-dayDate.checkNum}}</p>
                    <span>未打卡</span>
                  </td>
                  <td v-else="">
                    <p>{{dayDate.totalNum-dayDate.checkNum}}</p>
                    <span>未打卡</span>
                  </td>
                  <td v-if="dayDate.lateNum !=0" @click="mylinkto('/v2/attendance/detail?type=2&date='+pickerDate+'&companyId='+companyId)">
                    <p>{{dayDate.lateNum}}</p>
                    <span>迟到</span>
                  </td>
                  <td v-else="">
                    <p>{{dayDate.lateNum}}</p>
                    <span>迟到</span>
                  </td>
                  <td v-if="dayDate.earlyNum !=0" @click="mylinkto('/v2/attendance/detail?type=3&date='+pickerDate+'&companyId='+companyId)">
                    <p>{{dayDate.earlyNum}}</p>
                    <span>早退</span>
                  </td>
                  <td v-else="">
                    <p>{{dayDate.earlyNum}}</p>
                    <span>早退</span>
                  </td>
                </tr>
              </table>
            </div>
            <div class="btnn" >
               <a v-if="dayDate.totalNum != 0" @click="mylinkto('/v2/attendance/detail?type=0&date='+pickerDate+'&companyId='+companyId)">
                 打卡明细
               </a>
              <a v-else="">
                打卡明细
              </a>
            </div>
        </div>
        <!--<div class="button" @click="openPicker()">-->
        <!--</div>-->
      </div>
      <div v-if="!mytab" class="setup">
        <div class="main">
          <div class="main-item">
            <h5 class="tit time-tit"><span>考勤时间</span><a class="edit" @click="mylinkto('/v2/attendance?from=setup&companyId='+companyId)">{{right_title}}</a></h5>
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
      </div>



      <div style="height: 61px">

      </div>
      <div :class="{ 'footer': true, 'footertab': !mytab}">
        <div class="iten tong-ji" @click="mylinktab(0)">
          <span></span>
          <p>统计</p>
        </div>
        <div class="iten she-zhi" @click="mylinktab(1)">
          <span></span>
          <p>设置</p>
        </div>
      </div>
      <mt-datetime-picker ref="picker1" :startDate="startDate" :endDate="endDate" type="date" :closeOnClickModal="false" @cancel="handleCancel" @confirm="handleConfirm" v-model="pickerDateTemp">
      </mt-datetime-picker>

      <mt-popup v-model="popMonth" popup-transition="popup-fade" :closeOnClickModal="false" position="bottom">
        <mt-picker ref="monthPicker" :slots="slots" :closeOnClickModal="false"  @change="monthChange" style="width: 7.5rem;" showToolbar>
          <div class="picker-toolbar">
            <span class="mint-datetime-action mint-datetime-cancel" @click="cancelPicker1()">取消</span>
            <span class="mint-datetime-action mint-datetime-confirm" @click="confirmPicker1()">确定</span>
          </div>
        </mt-picker>
      </mt-popup>
    </page-main>

  </page-wrap>
</template>

<script>
  import globalData from "src/globalData";
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import {getScheme, setScheme} from 'nativeFix';
  import apiEnroll from 'api/maker/apiEnroll';
  import apiDailySummary from 'api/attendance/apiDailySummary';
  import apiMonthlySummary from 'api/attendance/apiMonthlySummary';
  import apiGetSettings from 'api/attendance/apiGetSettings';
  export default {
    components: {},
    data: () => {
      return {
        handler: function(e){
          e.preventDefault()
        },
        show: false,
        title: '企业考勤',
        dialog: false,
        pickerDate:null,
        pickerDateTemp:null,
        pickerMonth:null,
        pickerMonthTemp:null,
        popMonth:false,
        isSubmit: false,
        angle:0,
        peopleNum:'100',
        signPeopleNum:'75',
        signPeopleNumStr:'0',
        tab:true,
        dayDate:{},
        monthDate:{},
        companyId:534,
        type:'',
        slots: [
          {
            flex: 1,
            values: ['2019'],
            className: 'slot1',
            textAlign: 'center',
            defaultIndex:0
          }, {
            divider: true,
            content: '',
            className: 'slot2'
          }, {
            flex: 1,
            values: ['01', '02', '03', '04', '05', '06','07','08','09','10','11','12'],
            className: 'slot3',
            textAlign: 'center',
            defaultIndex:0
          }
          ],
        nativeBack:true,
        endDate:new Date(),
        weekTxt:['一','二','三','四','五','六','日'],
        week:'',
        pickerValue1:'',
        lateTime:'',
        pickerValue2:'',
        earlyTime:'',
        info:'',
        mytab:true,
        right_title:"编辑",
        defaultMonth:['01', '02', '03', '04', '05', '06','07','08','09','10','11','12'],
        currYearMonth:[],
        currYear:'2019',
        startDate:new Date('2019/02/01')
      }
    },
    methods: {
      mylinktab(n) {
        n == 1 ? this.mytab = false:"";
        n == 0 ? this.mytab = true:"";
      },
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
      getDateString (date_t) {
        return date_t.getFullYear() +
          "." +
          (date_t.getMonth() + 1 > 9 ? (date_t.getMonth() + 1) :
            ("0" + (date_t.getMonth() + 1))) +
          "." +
          (date_t.getDate() > 9 ? date_t.getDate() : ("0" + date_t
            .getDate()));
      },
      selectDay(){
        this.$refs.picker1.open();
        this.closeTouch();
      },
      selectMonth(){
        this.popMonth=true;
        this.closeTouch();
      },
      handleConfirm(data){
        this.pickerDate=this.getDateString(data);
        this.pickerDateTemp=data;
        this.openTouch();
        this.apiDailySummary();
      },

      handleCancel(){
        this.openTouch();
      },

      monthChange(picker, values) {
        if(values[0]==this.currYear){
          picker.setSlotValues(1, this.currYearMonth);
        }else{
          picker.setSlotValues(1, this.defaultMonth);
        }
          this.pickerMonthTemp = values;
          console.log(" this.pickerMonth", this.pickerMonth);
      },
      cancelPicker1(){
          this.$refs.monthPicker.setValues(this.pickerMonth);
          this.popMonth=false;
          this.openTouch();
      },
      confirmPicker1(){
          this.pickerMonth=this.copyArr(this.pickerMonthTemp);
          this.popMonth=false;
          this.apiMonthlySummary();
          this.openTouch();
        },
      copyArr: function (arr) {
        return arr.map((e) => {
          if (typeof e === 'object') {
            return Object.assign({}, e)
          } else {
            return e
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
      tabClick (item){
        this.type = item;
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
            if(!res.data){
              if(isApp()) {
                let url = getLocation().origin + '/v2/attendance?companyId='+this.companyId;
                this.$DANativeApi.redirectTo({
                  url
                })
              } else {
                this.$router.replace('/v2/attendance?companyId='+this.companyId);
              }
            }else{
              let data = res.data;
              this.pickerValue1 = data.checkInTime.substr(0,data.checkInTime.length-3);
              this.lateTime = data.checkInTolerance;
              this.pickerValue2 = data.checkOutTime.substr(0,data.checkOutTime.length-3);
              this.earlyTime = data.checkOutTolerance;
              this.info = data;
              this.week = data.attendanceDays.replace('1','一').replace('2','二').replace('3','三').replace('4','四').replace('5','五').replace('6','六').replace('7','日').replace(/,/g,'、')
            }
        })
      },
      tabgetSettings(){
        apiGetSettings({
          "companyId":this.companyId
        },this.$store.state.userInfo.userId).then(res => {
          console.log(res,'44');
          if(res.data){
        }else{
            this.$toast("未查到设置信息");
          }
          this.show = true;
        })
      },

      apiDailySummary() {
        apiDailySummary({
          "companyId":this.companyId,
          "queryDay":this.pickerDate.replace(/\./g,'-')
        },this.$store.state.userInfo.userId).then(res => {
            if(res.retCode == 0){
              this.show = true;
                if(!res.data){
                  this.angle = 0;
                  this.dayDate = {};
                  this.dayDate.totalNum = 0;
                  this.dayDate.checkNum = 0;
                  this.dayDate.lateNum = 0;
                  this.dayDate.earlyNum = 0;
                  this.signPeopleNum = 0;
                  this.peopleNum = 0;
                  this.signPeopleNumStr = 0;
                }else{
                  let data = res.data;
                  this.dayDate = data;
                  this.signPeopleNum = data.checkNum;
                  this.peopleNum = data.totalNum;
                  let num = parseInt((this.signPeopleNum/this.peopleNum)*360);
                  this.signPeopleNumStr=0;
                  this.angle = 0;
                  var t2 = window.setInterval(() => {
                    if(this.signPeopleNumStr == this.signPeopleNum){
                      window.clearInterval(t2);
                      console.log(this.angle)
                    }else{
                      this.signPeopleNumStr++;
                      this.angle = parseInt((this.signPeopleNumStr/this.peopleNum)*360);
                    }
                  },10);
                }
            }
        })
      },
      apiMonthlySummary() {
        apiMonthlySummary({
          "companyId":this.companyId,
          "month":this.pickerMonth[1],
          "year":this.pickerMonth[0]
//          "queryDay":this.pickerDate.replace(/\./g,'-')
        },this.$store.state.userInfo.userId).then(res => {
          if(res.retCode == 0){
            this.show = true;
            if(!res.data){
              this.monthDate.absentNum = 0;
              this.monthDate.checkNum = 0;
              this.monthDate.earlyNum = 0;
              this.monthDate.lateNum = 0;
              this.monthDate.lackNum = 0;
              this.monthDate.normalNum = 0;
              this.monthDate.totalNum = 0;
            }else{
              let data = res.data;
              this.monthDate = data;
            }
          }
        })
      },
      initPicker(){
        let date1 = new Date();
        let month = (date1.getMonth() + 1 > 9 ? (date1.getMonth() + 1) :
          ("0" + (date1.getMonth() + 1)));
        let month_arr = [];
        let end_month = date1.getMonth() + 1;
        for (var i = 1; i <= end_month; i++) {
          let month_temp = (i > 9 ? i : ("0" + i));
          month_arr.push(month_temp);
        }
        this.currYear=date1.getFullYear()+'';
        this.currYearMonth=month_arr;
        this.slots[2].values=month_arr;
        let year_arr=this.slots[0].values;
        let firstYear=this.slots[0].values[0];
        firstYear=parseInt(firstYear);
        firstYear=firstYear+1;
        let year=date1.getFullYear();
        for(let i=firstYear;i<=year;i++){
          year_arr.push(i);
        }
        this.$set(this.slots[0], 'values', year_arr);

      }
    },

    created() {
      this.$route.query.companyId ? this.companyId = this.$route.query.companyId:'';
      this.$route.query.type == 1 ? this.tab = false : '';
      this.$route.query.from == 1 ?  this.mytab = false : '';
      this.initPicker();
      let Ndate=new Date();
      let date = new Date(Ndate.getTime() - 24*60*60*1000);
      this.pickerDateTemp=date;
      this.pickerDate=this.getDateString(date);
      let year=date.getFullYear();
      let month=(date.getMonth() + 1 > 9 ? (date.getMonth() + 1) :
        ("0" + (date.getMonth() + 1)));
      this.pickerMonthTemp = this.pickerMonth=[year+'',month+''];
      this.slots[2].defaultIndex = date.getMonth();
      this.apiDailySummary();
      this.apiMonthlySummary();
      this.getSettings();
      {
        let date1 = new Date();
        let month = (date1.getMonth() + 1 > 9 ? (date1.getMonth() + 1) :
          ("0" + (date1.getMonth() + 1)));
        let month_arr = [];
        let end_month = date1.getMonth() + 1;
        for (var i = 1; i <= end_month; i++) {
          let month_temp = (i > 9 ? i : ("0" + i));
          month_arr.push(month_temp);
        }
        this.$set(this.slots[2], 'values', month_arr);
      }
    },

    mounted() {

    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  /*/deep/ .page-topbar .navigate{*/
    /*width: 68px;*/
    /*display: flex;*/
    /*justify-content: space-evenly;*/
  /*}*/
  /deep/ i{
    line-height: inherit;
  }
  .page-attendance-center{
    background: #fafafa;
    height: 100vh;
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
      line-height: 46px;
      background: #FAFAFA;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      >span{
        color: #999999;
      }
      div{
        display: flex;
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
        span{
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #999999;
          letter-spacing: 0;
          text-align: right;
        }
      }
    }
    .month-statis{
      margin: 0 15px;
      background: #FFFFFF;
      box-shadow: 0 3px 4px 1px rgba(245,245,245,0.99);
      border-radius: 4px;
      ul{
        li{
          padding: 0 15px;
          height: 71px;
          position: relative;
          @include border-bottom(#E5E5E5);
          &:last-child{
            @include border-bottom(#ffffff);
          }
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: PingFangSC-Regular;
          font-size: 15px;
          color: #333333;
          letter-spacing: 0;
          .left{

          }
          .right{
            font-weight: 600;
            .more{
              font-size: 10px;
              color: #B5B5B5;
              font-weight: normal;
            }
          }
        }
      }
    }
    .day-statis{
      display: flex;
      flex-direction: column;
      margin: 0 15px 20px 15px;
      padding: 20px 0 0 0;
      background: #FFFFFF;
      box-shadow: 0 3px 5px 1px rgba(245,245,245,0.99);
      border-radius: 4px;
      .progress {
        margin: 0 auto;
        position:relative;
        display:inline-block;
        height:216px;
        width:216px;
        &:before{
          position: absolute;
          bottom: 0;
          left: 50%;
          content: '';
          width: 15px;
          height: 15px;
          -webkit-transform: translate(-50%, 0);
          -o-transform: translate(-50%, 0);
          -moz-transform: translate(-50%, 0);
          -ms-transform: translate(-50%, 0);
          transform: translate(-50%, 0);
          border-radius: 50%;
          background: #ffd53d;
          z-index: 999;
        }
        .percent-circle {
          position:absolute;
          height:100%;
          background: #FFD53D;
          overflow: hidden;
        }
        .percent-circle-right {
          right:0;
          width:108px;
          border-radius: 0 108px 108px 0/0 108px 108px 0;
          border: 1px solid #eeeeee;
          .right-content{
            position: absolute;
            content: '';
            width: 100%;
            height: 100%;
            transform-origin:left center;
            transform: rotate(0deg);
            border-radius: 0 108px 108px 0/0 108px 108px 0;
            background: #eeeeee;
            border-top: 1px solid #eeeeee;
            border-bottom: 1px solid #eeeeee;
          }
          .right-start{
            &:after{
              position: absolute;
              top: 0;
              left: 0;
              content: '';
              width: 15px;
              height: 15px;
              -webkit-transform: translate(-50%, 0);
              -o-transform: translate(-50%, 0);
              -moz-transform: translate(-50%, 0);
              -ms-transform: translate(-50%, 0);
              transform: translate(-50%, 0);
            /*  margin-left: -3.75%;*/
              border-radius: 50%;
              background: #ffd53d;
              z-index: 999;
            }
          }
        }
        .percent-circle-left {
          width:108px;
          border-radius: 108px 0 0 108px/108px 0 0 108px;
          border: 1px solid #eeeeee;
          .left-content {
            position: absolute;
            content: '';
            width: 100%;
            height: 100%;
            transform-origin:right center;
            transform: rotate(0deg);
            border-radius: 108px 0 0 108px/108px 0 0 108px;
            background: #eeeeee;
            border-top: 1px solid #eeeeee;
            border-bottom: 1px solid #eeeeee;
          }
          .left-start{
            &:after{
              position: absolute;
              bottom: 0;
              right: 0;
              content: '';
              width: 15px;
              height: 15px;
              -webkit-transform: translate(50%, 0);
              -o-transform: translate(50%, 0);
              -moz-transform: translate(50%, 0);
              -ms-transform: translate(50%, 0);
              transform: translate(50%, 0);
              /*  margin-left: -3.75%;*/
              border-radius: 50%;
              background: #ffd53d;
              z-index: 999;
            }
          }
          .left-start0{
            &:after{
              position: absolute;
              bottom: 0;
              right: 0;
              content: '';
              /*width: 15px;*/
              /*height: 15px;*/
              -webkit-transform: translate(50%, 0);
              -o-transform: translate(50%, 0);
              -moz-transform: translate(50%, 0);
              -ms-transform: translate(50%, 0);
              transform: translate(50%, 0);
              /*  margin-left: -3.75%;*/
              border-radius: 50%;
              background: #ffd53d;
              z-index: 999;
            }
          }
        }
        .text-circle {
          position: absolute;
          display:flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height:185px;
          width:185px;
          left:15px;
          top:15px;
          border-radius:100%;
          background:#ffffff;
          color:#333333;
          .score{
            line-height: 1;
            .numerator{
              font-family: DINAlternate-Bold;
              font-size: 55px;
              color: #333333;
              letter-spacing: 0;
              text-align: center;
            }
            .denominator{
              font-family: DINAlternate-Bold;
              font-size: 29px;
              color: #999999;
              letter-spacing: 0;
              text-align: center;
            }
          }
          .txt{
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #999999;
            letter-spacing: 0;
            text-align: center;
          }
        }
      }
      .progressa {
        margin: 0 auto;
        position:relative;
        display:inline-block;
        height:216px;
        width:216px;
        &:before{
          position: absolute;
          bottom: 0;
          left: 50%;
          content: '';
          width: 15px;
          height: 15px;
          -webkit-transform: translate(-50%, 0);
          -o-transform: translate(-50%, 0);
          -moz-transform: translate(-50%, 0);
          -ms-transform: translate(-50%, 0);
          transform: translate(-50%, 0);
          border-radius: 50%;
          background: #ffd53d;
          z-index: 999;
        }
        &:after{
          position: absolute;
          top: 0;
          left: 50%;
          content: '';
          width: 15px;
          height: 15px;
          -webkit-transform: translate(-50%, 0);
          -o-transform: translate(-50%, 0);
          -moz-transform: translate(-50%, 0);
          -ms-transform: translate(-50%, 0);
          transform: translate(-50%, 0);
          border-radius: 50%;
          background: #ffd53d;
          z-index: 999;
        }
        .percent-circle {
          position:absolute;
          height:100%;
          background: #FFD53D;
          overflow: hidden;
        }
        .percent-circle-right {
          right:0;
          width:108px;
          border-radius: 0 108px 108px 0/0 108px 108px 0;
          border: 1px solid #eeeeee;
          .right-content{
            position: absolute;
            content: '';
            width: 100%;
            height: 100%;
            transform-origin:left center;
            transform: rotate(0deg);
            border-radius: 0 108px 108px 0/0 108px 108px 0;
            background: #eeeeee;
            border-top: 1px solid #eeeeee;
            border-bottom: 1px solid #eeeeee;
          }
          .right-start{
            &:after{
              position: absolute;
              top: 0;
              left: 0;
              content: '';
              width: 15px;
              height: 15px;
              -webkit-transform: translate(-50%, 0);
              -o-transform: translate(-50%, 0);
              -moz-transform: translate(-50%, 0);
              -ms-transform: translate(-50%, 0);
              transform: translate(-50%, 0);
              /*  margin-left: -3.75%;*/
              border-radius: 50%;
              background: #ffd53d;
              z-index: 999;
            }
          }
        }
        .percent-circle-left {
          width:108px;
          border-radius: 108px 0 0 108px/108px 0 0 108px;
          border: 1px solid #eeeeee;
          .left-content {
            position: absolute;
            content: '';
            width: 100%;
            height: 100%;
            transform-origin:right center;
            transform: rotate(0deg);
            border-radius: 108px 0 0 108px/108px 0 0 108px;
            background: #eeeeee;
            border-top: 1px solid #eeeeee;
            border-bottom: 1px solid #eeeeee;
          }
          .left-start{
            &:after{
              position: absolute;
              bottom: 0;
              right: 0;
              content: '';
              width: 15px;
              height: 15px;
              -webkit-transform: translate(50%, 0);
              -o-transform: translate(50%, 0);
              -moz-transform: translate(50%, 0);
              -ms-transform: translate(50%, 0);
              transform: translate(50%, 0);
              /*  margin-left: -3.75%;*/
              border-radius: 50%;
              background: #ffd53d;
              z-index: 999;
            }
          }
          .left-start0{
            &:after{
              position: absolute;
              bottom: 0;
              right: 0;
              content: '';
              /*width: 15px;*/
              /*height: 15px;*/
              -webkit-transform: translate(50%, 0);
              -o-transform: translate(50%, 0);
              -moz-transform: translate(50%, 0);
              -ms-transform: translate(50%, 0);
              transform: translate(50%, 0);
              /*  margin-left: -3.75%;*/
              border-radius: 50%;
              background: #ffd53d;
              z-index: 999;
            }
          }
        }
        .text-circle {
          position: absolute;
          display:flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height:185px;
          width:185px;
          left:15px;
          top:15px;
          border-radius:100%;
          background:#ffffff;
          color:#333333;
          .score{
            line-height: 1;
            .numerator{
              font-family: DINAlternate-Bold;
              font-size: 55px;
              color: #333333;
              letter-spacing: 0;
              text-align: center;
            }
            .denominator{
              font-family: DINAlternate-Bold;
              font-size: 29px;
              color: #999999;
              letter-spacing: 0;
              text-align: center;
            }
          }
          .txt{
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #999999;
            letter-spacing: 0;
            text-align: center;
          }
        }
      }
      .table{
        margin-top: 25px;
        table{
          width: 100%;
          text-align: center;
          tr{
            height: 80px;
            border-bottom: 1px solid #e5e5e5;
            border-top: 1px solid #e5e5e5;
            td{
              width: 33.333%;
              p{
                font-weight: 600;
                font-size: 27px;
              }
              span{
                color: #999;
              }
              &:nth-of-type(2){
                border-right: 1px solid #e5e5e5;
                border-left: 1px solid #e5e5e5;
              }
            }
          }
        }
      }
      .btnn{
        margin: 25px auto;
        a{
          display: inline-block;
          width: 150px;
          height: 41px;
          line-height: 41px;
          text-align: center;
          background: #333333;
          border-radius: 2px;
          font-family: PingFangSC-Regular;
          font-size: 15px;
          color: #FFFFFF;
          letter-spacing: 0;
          text-align: center;
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
          background: url("https://assets.urwork.cn/image/attendance/tongji-yes.png") no-repeat;
          background-size: 100%;
        }
      }
      .she-zhi{
        width: 50%;
        span{
          background: url("https://assets.urwork.cn/image/attendance/shezhi-no.png") no-repeat;
          background-size: 100%;
        }
      }
    }
    .footertab{
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
    .setup{
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
            display: flex;
            justify-content: space-between;
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
              /*height: 51px;*/
              display: flex;
              align-items: center;
              justify-content: flex-start;
              margin-bottom: 10px;
              li{
                height: 100%;
                line-height: 51px;
                background: #FFFFFF;
                border-radius: 2px;
                font-size: 15px;
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
    }


  }
</style>

