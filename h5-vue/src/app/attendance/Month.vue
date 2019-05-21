<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <page-header>
      <topbar :theme="'white'" :type="'back'" :hideShareBtn="true">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main :show="show" style="background: #ffffff">
      <div class="user">
        <div class="avatar">
          <img :src="headUrl" alt="">
        </div>
        <div class="name">{{realname}}</div>
        <div class="date">{{selDateText}}</div>
        <div style="clear:both;"></div>
      </div>
      <div class="calendar">
        <div class="title">
          <div class="text">一</div>
          <div class="text">二</div>
          <div class="text">三</div>
          <div class="text">四</div>
          <div class="text">五</div>
          <div class="text">六</div>
          <div class="text">日</div>
          <div style="clear:both;"></div>
        </div>

        <div class="detail">
          <!--dateObj.push({isShow:false,text:allDays[i],date:dateString,isCurr:currDateString==dateString})-->
          <div v-for="(item,index) in dataList" class="nums" @click="selDay(index)">
            <div
              :class="{'bac':item.isCurr&&!item.isSel&&item.isShow,'bac-n':!item.isCurr&&!item.isSel&&item.isShow, 'bac-sel':item.isSel}">
              <template v-if="item.isShow">{{item.text}}</template>
            </div>
            <div v-if="item.isADay&&item.isShow&&!item.isFuture&&item.hasData" :class="{'dot-n':item.isAttend,'dot':!item.isAttend}"></div>
          </div>

          <!--<div class="nums"><div class="bac-sel">30</div><div class="dot"></div></div>-->
          <!--<div class="nums"><div class="bac">30</div><div class="dot-n"></div></div>-->

          <div style="clear:both;"></div>
        </div>

      </div>
      <div v-if="!currInfo['isFuture']&&currInfo['hasData']" class="info-content">
        <div class="info">
          今日打卡<span>{{currInfo['nums']}}</span>次，共计工时<span>{{currInfo['hour']}}</span>小时<span>{{currInfo['min']}}</span>分钟
        </div>
        <div class=" routine">
          <div class="start">
            <div class="icon">上</div>
            <div class="start-info">
              <p class="time">打卡时间 {{currInfo['checkInTime']}} <span>(上班时间 {{inTime}})</span></p>
              <span class="sign" v-if="currInfo.checkInStatus!=1">
           {{currInfo.exceptionIn}}
          </span>
            </div>
          </div>

          <div v-if="false" class="midway">
            <div class="icon"></div>
            <span class="time">打卡时间 12:50</span>
          </div>

          <div class="end">
            <div class="icon">下</div>
            <div>
              <div class="end-info">
                <p class="time">打卡时间 <template v-if="currInfo['checkOutTomorrow']==1">次日</template> {{currInfo['checkOutTime']}} <span>(下班时间 {{outTime}})</span></p>
                <span v-if="currInfo.checkOutStatus!=1" class="sign">
            {{currInfo.exceptionOut}}
          </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="height: 0.67rem"></div>
    </page-main>

  </page-wrap>
</template>

<script>
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import apiIsAdmin from 'api/attendance/apiIsAdmin';
  import apiMonth from 'api/attendance/apiMonth';
  import apiGetSettings from 'api/attendance/apiGetSettings';
  export default {
    components: {},
    data: () => {
      return {
        show: false,
        title: '月统计',
        weekName: new Array("星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"),
        date: new Date(),
        currDate:new Date(),
        selDateText: '',
        firstDate: null,
        d: null,
        m: null,
        y: null,
        dateList: [],
        dataList: [],
        dateMap: new Map(),
        realname: '未知',
        headUrl: 'https://assets.urwork.cn/v2/assets/images/pic_def.f71a172.png',
        attendanceDays:[1,2,3,4,5],
        inTime:'09:00',
        outTime:'19:00',
        currInfo: {
          checkOutTime: '无',
          checkInTime: '无',
          exceptionOut: '缺卡',
          exceptionIn: '缺卡',
          checkOutTomorrow:0,
          nums: 0,
          hour: 0,
          min: 0,
          isFuture:false,
        },
        defaultIndex: 0,
      }
    },
    methods: {
      setDate(t_date) {
        this.date = t_date;
        this.d = t_date.getDate();
        this.m = t_date.getMonth();
        this.y = t_date.getFullYear();
        this.firstDate = new Date(this.y, this.m, 1);
      },
      getSelDateText(date_t){
        var nums = date_t.getDay();
        let index = nums - 1;
        if (index < 0) {
          index = 6;
        }
        let weekName = this.weekName[index];
        return this.getDateString(date_t) + " " + weekName;
      },
      getDateString (date_t) {
        return date_t.getFullYear() +
          "-" +
          (date_t.getMonth() + 1 > 9 ? (date_t.getMonth() + 1) :
            ("0" + (date_t.getMonth() + 1))) +
          "-" +
          (date_t.getDate() > 9 ? date_t.getDate() : ("0" + date_t
            .getDate()));
      },
      getFirstDate() {
        var nums = this.firstDate.getDay();
        var date_t = new Date(this.y, this.m, 1 - (nums - 1));
        return date_t;
      },
      getCurrDays() {
        var nums_t = this.getDays(this.y, this.m);
        var arr = new Array();
        for (var i = 1; i <= nums_t; i++) {
          arr.push(i);
        }
        return arr;
      },
      getDays(a, b) {
        var d = Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
        return b == 2 ? a % 4 == 0 && a % 100 != 0 || a % 400 == 0 || a < 1900 ? 29 :
          d[b] :
          d[b]
      },
      showDays() {
        var days = this.firstDate.getDay() + this.getDays(this.y, this.m) - 1;
        return Math.ceil(days / 7) * 7;
      },
      getPDays () {
        var t_date = new Date(this.y, this.m - 1, 1);
        var nums = this.firstDate.getDay();
        var max_day = this.getDays(t_date.getFullYear(), t_date.getMonth());
        var days = new Array();
        for (var i = 0; i < nums - 1; i++) {
          days.unshift(max_day - i);
        }
        return days;
      },
      getNDays() {
        var t_date = new Date(this.y, this.m + 1, 1);
        var nums = this.showDays() - this.firstDate.getDay() - this.getDays(this.y, this.m);
        var max_day = this.getDays(t_date.getFullYear(), t_date.getMonth());
        var days = new Array();
        for (var i = 1; i <= nums - 1; i++) {
          days.push(i);
        }
        return days;
      },
      getDateList(){
        var arr_p = this.getPDays();
        var arr_n = this.getNDays();
        var days_c = this.getCurrDays();
        var allDays = arr_p.concat(days_c, arr_n);
        var data_begin = this.getFirstDate();
        var n_p = arr_p.length;
        var n_c = days_c.length;
        var n_n = arr_n.length;
        var alldays_length = allDays.length;
        var showNums = 28;

        if (alldays_length > 35) {
          showNums = 42;
        } else if (alldays_length > 28) {
          showNums = 35;
        }
        if (alldays_length < showNums) {
          var last = allDays[alldays_length - 1];
          if (this.getDays(this.y, this.m) == last) {
            last = 0;

          }
          for (var i = alldays_length + 1; i <= showNums; i++) {
            last++;
            allDays.push(last);
          }
        }

        let dateObj = [];
        let currDateString = this.getDateString(this.currDate);
        let selDateString = this.getDateString(this.date);
        let d = this.currDate.getDate();
        let m = this.currDate.getMonth();
        let y = this.currDate.getFullYear();
        let yesterday = new Date(y, m, d-1);
        let yesterdayTime=yesterday.getTime();
        let isFirstData=false;
        let hasSel=false;
        for (var i = 0; i < allDays.length; i++) {
          let dateString = this.getDateString(data_begin);
          let day = data_begin.getDay();
          let isADay = true;
          let isAttend = true;
          let isFuture=false;
          let hasData=false;
          if (day == 0 || day == 6) {
            isADay = false;
          }

          if(data_begin.getTime()>yesterdayTime){
            isADay = false;
            isFuture=true;
          }
          let dateInfo = this.dateMap.get(dateString);
          if(dateInfo){
            isADay=true;
            hasData=true;
            if(!isFirstData&&!hasSel){
              this.defaultIndex = i
              isFirstData=true;
            }
          }
          if (!dateInfo || dateInfo.checkOutStatus != 1||dateInfo.checkInStatus!=1) {
            isAttend = false;
          }
          if (selDateString == dateString) {
            this.defaultIndex = i
            hasSel=true;
          }
          let obj = {
            isShow: true,
            isADay: isADay,
            isSel: false,
            isAttend: isAttend,
            text: allDays[i],
            date: dateString,
            dateText: this.getSelDateText(data_begin),
            isCurr: currDateString == dateString,
            isFuture:isFuture,
            hasData:hasData,
          };

          if (i < n_p || (i > (n_p + n_c - 1))) {
            obj.isShow = false;
          } else {
            obj.isShow = true;
          }
          dateObj.push(obj);
          data_begin = new Date(data_begin.getFullYear(), data_begin
            .getMonth(), data_begin.getDate() + 1);

        }
        this.dataList = dateObj;
      },
      noPromise(){
        this.$toast("你不是公司的管理员，请重新以管理员账号登陆");
        setTimeout(()=>{
          if (isApp()) {
            toLogin();
          } else {
            window.location.href = 'https://passport2.urwork.cn/passport/login?retUrl=' + location.href;
          }
        },1200)
      },
      gotoIndexPage(){
        if (typeof(res1) == Number && res1 < 0) {
          let url = getLocation().origin + "/v2/index";
          if (this.isApp) {
            this.$DANativeApi.navigateTo({
              url
            })
          }
        } else {
          window.location.href = "/v2/index";
        }
      },
      selDay(index_t){
        let dataList = this.dataList;
        let currItem = null;
        dataList.map((item, index) => {
          if (index == index_t && item.isShow) {
            item['isSel'] = true;
            currItem = item;
            this.selDateText = item.dateText;
          } else {
            item['isSel'] = false;
          }
          return item;
        });
        this.dataList = dataList;
        if (currItem) {
          let item = this.dateMap.get(currItem.date);
          if (item) {
            item['hour'] = parseInt(item['worktimeMinute'] / 60);
            item['min'] = item['worktimeMinute'] % 60;
            item['nums'] = 0;
            if (item['checkInTime']&&item['checkInTime']!="无") {
              item['nums']=item['nums']+1;
              item['checkInTime'] = item['checkInTime'].substr(0, 5);
              if (item['checkInStatus'] == 2) {
                item['exceptionIn'] = '迟到'
              } else if (item['checkInStatus'] == 0) {
                item['exceptionIn'] = '缺卡'
              }
            } else {
              item['checkInTime'] = "无";
              item['exceptionIn'] = '缺卡';
            }
            if (item['checkOutTime']&&item['checkOutTime']!="无") {
              item['nums']=item['nums']+1;
              item['checkOutTime'] = item['checkOutTime'].substr(0, 5);
              if (item['checkOutStatus'] == 2) {
                item['exceptionOut'] = '早退'
              } else if (item['checkOutStatus'] == 0) {
                item['exceptionOut'] = '缺卡'
              }
            } else {
              item['checkOutTime'] = "无";
              item['exceptionOut'] = '缺卡';
            }
            item['hasData'] = true;
            this.currInfo = item;
          } else {
            this.currInfo = {
              hasData: false,
              checkInTime: "无",
              checkOutTime: "无",
              checkOutStatus: 0,
              checkInStatus: 0,
              exceptionIn: '缺卡',
              exceptionOut: '缺卡',
              checkOutTomorrow:0,
              nums: 0,
              hour: 0,
              min: 0,
              isFuture:currItem.isFuture,
            };
          }

        }
        console.log(" this.currInfo", this.currInfo);
      }
    },

    created() {
      this.show = true;
      let companyId = this.$route.query.companyId;
      let userId = this.$store.state.userInfo.userId;
      //userId = 160271;
      apiIsAdmin({companyId: companyId, userId: userId}).then(res => {
        if (!res['isAdmin']) {
          this.noPromise();
        }
        let month = this.$route.query.month;
        let year = this.$route.query.year;
        let day=this.$route.query.day;
        console.log("day",day);
        let distUserId = this.$route.query.distUserId;
        if(!parseInt(distUserId)||!parseInt(month)||!parseInt(year)){
          this.gotoIndexPage();
        }
        month = (month > 9 ? month : ("0" + month));
        day = (day > 9 ? day : ("0" + day));
        let end_str = (year + "-" + month + (parseInt(day)?("-"+day+" 00:00:00"):"-01 00:00:00")).replace(/-/g, "/");
        let date = new Date(end_str);
        let currDate = new Date();
        let currYear = currDate.getFullYear();
        let currMouth = currDate.getMonth() + 1;
        if (month == currMouth && year == currYear&&!parseInt(day)) {
          //date = currDate;
        }
        this.setDate(date);
        this.selDateText = this.getSelDateText(date);
        apiGetSettings({companyId:companyId},userId).then(res=>{
          this.attendanceDays=res.data['attendanceDays'];
          this.inTime =res.data['checkInTime'].substr(0,5);
          this.outTime =res.data['checkOutTime'].substr(0,5);

          console.log("res.data",res.data);
        });
        apiMonth({companyId: companyId, distUserId: distUserId, month: month, year: year}, userId).then(res1 => {
          if (res1 == -1) {
            this.noPromise();
          }
          let dateMap = new Map();
          res1.map(item => {
            dateMap.set(item.checkDate, item);
          });
          this.dateMap = dateMap;
          this.getDateList();
          if (res1.length > 0) {
            res1[0].realname ? this.realname = res1[0].realname : '';
            res1[0].headUrl ? this.headUrl = res1[0].headUrl : '';
          }
          this.selDay(this.defaultIndex);
          console.log("this.dataList", this.dataList)
        })
      })
    },

    mounted() {

    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/_variables";
  @import "../../assets/scss/_mixins";

  .user {
    font-family: PingFangSC-Regular;
    color: #333333;
    line-height: 0.9rem;
    padding-right: 0.30rem;
    padding-left: 0.30rem;
    padding-top: 0.19rem;
    padding-bottom: 0.19rem;

    .avatar {
      float: left;
      margin-right: 0.16rem;
      img {
        width: 0.9rem;
        height: 0.9rem;
        border-radius: 0.9rem;
      }
    }
    .name {
      font-size: 17px;
      float: left;
    }
    .date {
      font-size: 13px;
      color: #333333;
      text-align: right;
      float: right;
    }
  }

  .calendar {
    width: 6.9rem;
    //height: 5.5rem;
    background: #FFFFFF;
    box-shadow: 0 3px 5px 1px rgba(245, 245, 245, 0.99);
    border-radius: 4px;
    margin: 0 auto;
    padding-top: 0.30rem;

    //border:1px solid red;

    .title {
      height: 0.33rem;
      width: 6.86rem;
      margin: 0 auto;
      margin-top: 0.30rem;
      .text {
        float: left;
        width: 0.24rem;
        margin-left: 0.37rem;
        margin-right: 0.37rem;
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #999999;
      }
    }
    .detail {

      width: 6.86rem;
      height: 100%;
      margin: 0 auto;
      margin-top: 0.3rem;
      padding-bottom: 0.5rem;
      .nums {
        float: left;
        width: 0.66rem;
        height: 0.66rem;
        text-align: center;
        margin-left: 0.16rem;
        margin-right: 0.16rem;
        margin-bottom: 0.22rem;
        font-family: PingFangSC-Regular;
        font-size: 17px;

        .bac {
          width: 0.66rem;
          height: 0.66rem;
          background-color: rgba(77, 123, 255, 0.12);
          border-radius: 50%;
          color: #4D7BFF;
          text-align: center;
          line-height: 0.66rem;
        }
        .bac-n {
          width: 0.66rem;
          height: 0.66rem;
          text-align: center;
          line-height: 0.66rem;
        }
        .bac-sel {
          width: 0.66rem;
          height: 0.66rem;
          background: #4D7BFF;
          border-radius: 50%;
          color: #ffffff;
          text-align: center;
          line-height: 0.66rem;
        }

        .dot {
          position: relative;
          width: 0.1rem;
          height: 0.1rem;
          background: #FF5F1A;
          border-radius: 50%;
          margin: 0 auto;
          margin-top: 0.05rem;
        }
        .dot-n {
          position: relative;
          width: 0.1rem;
          height: 0.1rem;
          background: #4D7BFF;
          border-radius: 50%;
          margin: 0 auto;
          margin-top: 0.05rem;
        }
      }
    }
  }

  .info-content {

    .info {
      font-family: PingFangSC-Regular;
      font-size: 13px;
      color: #999999;
      margin-top: 0.4rem;
      margin-left: 0.4rem;
      margin-bottom: 0.1rem;
      span {
        font-size: 13px;
        color: #FF5F1A;
        letter-spacing: 0;
      }
    }
    .routine {
      background: #FFFFFF;
      box-shadow: 0 3px 5px 1px rgba(245, 245, 245, 0.99);
      border-radius: 4px;
      margin-left: 0.3rem;
      margin-right: 0.3rem;
      padding-top: 0.4rem;
      padding-left: 0.3rem;
      padding-bottom: 0.42rem;
      .start {
        position: relative;
        font-family: PingFangSC-Regular;
        height: 0.99rem;
        border-left: 0.01rem solid #E5E5E5;
        .icon {
          position: absolute;
          left: -0.19rem;
          display: inline-block;
          height: 0.38rem;
          width: 0.38rem;
          margin-bottom: 0.03rem;
          margin-right: 0.16rem;
          border-radius: 50%;
          background: #B8B8B8;
          font-size: 11px;
          color: #FFFFFF;
          text-align: center;
          line-height: 0.38rem;
        }
        .start-info {
          position: absolute;
          top: -0.03rem;
          .time {
            display: inline-block;
            //width: 4.74rem;
            font-size: 0.3rem;
            color: #333333;
            margin-left: 0.35rem;
            //margin-right: 0.16rem;
            span {
              font-size: 15px;
              color: #999999;
            }
          }
          .sign {
            display: inline-block;
            width: 1rem;
            height: 0.44rem;
            background: #FF5F1A;
            border-radius: 0.24rem;
            font-size: 12px;
            color: #FFFFFF;
            text-align: center;
            line-height: 0.44rem;
          }
        }
      }
      .space {
        height: 0.48rem;
        margin-left: 0.19rem;
        width: 1px;
        background: #E5E5E5;

      }
      .midway {
        position: relative;
        height: 0.90rem;
        border-left: 0.01rem solid #E5E5E5;
        font-family: PingFangSC-Regular;
        font-size: 15px;
        color: #333333;
        .icon {
          position: absolute;
          left: -0.05rem;
          top: 0.4rem;
          display: inline-block;
          height: 0.1rem;
          width: 0.1rem;
          border-radius: 50%;
          background: #B8B8B8;

        }
        .time {
          position: absolute;
          top: 25%;
          font-size: 0.3rem;
          height: 0.42rem;
          line-height: 0.42rem;
          color: #333333;
          margin-left: 0.35rem;
          margin-right: 0.16rem;

        }
      }
      .end {
        position: relative;
        font-family: PingFangSC-Regular;
        height: 0.99rem;
        border-left: 0.01rem solid #E5E5E5;
        .icon {
          position: absolute;
          left: -0.19rem;
          bottom: 0rem;
          display: inline-block;
          height: 0.38rem;
          width: 0.38rem;
          margin-bottom: 0.03rem;
          margin-right: 0.16rem;
          border-radius: 50%;
          background: #B8B8B8;
          font-size: 11px;
          color: #FFFFFF;
          text-align: center;
          line-height: 0.38rem;
        }
        .end-info {
          position: absolute;
          bottom: -0.03rem;
          .time {
            display: inline-block;
            //width: 4.74rem;
            font-size: 0.3rem;
            color: #333333;
            margin-left: 0.35rem;
            //margin-right: 0.16rem;
            span {
              font-size: 15px;
              color: #999999;
            }
          }
          .sign {
            display: inline-block;
            width: 1rem;
            height: 0.44rem;
            background: #FF5F1A;
            border-radius: 0.24rem;
            font-size: 12px;
            color: #FFFFFF;
            text-align: center;
            line-height: 0.44rem;
          }
        }
      }
    }
  }
</style>

