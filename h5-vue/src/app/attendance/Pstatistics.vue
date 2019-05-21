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
        <div class="">
          <div class="banner" >
            <div class="head-img">
              <img :src="data.headUrl" onerror="javascript:this.src='https://assets.urwork.cn/image/headImg.png';">
            </div>
            <p class="name">{{data.realname}}</p>
          </div>
          <div class="date" >
            <div  @click="selectMonth()">
              <p>{{pickerMonth[0]}}.{{pickerMonth[1]}}</p> <div><i class="uricon-arrow-right"></i></div>
            </div>
            <span style="color: #999999">平均工时{{averageWorktime}}</span>
          </div>
        </div>

        <div class="month-statis">
          <ul>
            <template v-for="tab in tabArry">
                <li @click="tab.checked = !tab.checked">
                  <div class="left">
                    <p class="name">{{tab.text}}</p>
                  </div>
                  <div class="right">
                    <span v-if="tab.id == 1" class="">{{tab.dateList.length}}天</span>
                    <span v-else="" class="">{{tab.dateList.length}}次</span>
                    <span class="more">
                     <i v-show="tab.checked" class="uricon-arrow-right i-up"></i>
                     <i v-show="!tab.checked" class="uricon-arrow-right i-down"></i>
                    </span>
                  </div>
                </li>
                <ul v-if="tab.dateList.length > 0" class="more-li" v-show="tab.checked">
                  <li v-for="row in tab.dateList" @click="mylinkto('/v2/attendance/month?year='+row.split('-')[0]+'&month='+parseInt(row.split('-')[1])+'&day='+parseInt(row.split('-')[2])+'&companyId='+companyId+'&distUserId='+distUserId)">{{row}} ({{weekDay[new Date(row).getDay()]}})</li>
                </ul>
                <ul v-else="" class="more-li" v-show="tab.checked">
                  <li>暂无</li>
                </ul>
            </template>
            <!--<li>-->
              <!--<div class="left">-->
                <!--<p class="name">迟到</p>-->
              <!--</div>-->
              <!--<div class="right">-->
                <!--<span class="">98人</span>-->
                <!--<span class="more">-->
                   <!--<i class="uricon-arrow-right i-down"></i>-->
                <!--</span>-->
              <!--</div>-->
            <!--</li>-->
            <!--<li>-->
              <!--<div class="left">-->
                <!--<p class="name">早退</p>-->
              <!--</div>-->
              <!--<div class="right">-->
                <!--<span class="">98人</span>-->
                <!--<span class="more">-->
                   <!--<i class="uricon-arrow-right i-down"></i>-->
                <!--</span>-->
              <!--</div>-->
            <!--</li>-->
            <!--<li>-->
              <!--<div class="left">-->
                <!--<p class="name">缺卡</p>-->
              <!--</div>-->
              <!--<div class="right">-->
                <!--<span class="">98人</span>-->
                <!--<span class="more">-->
                   <!--<i class="uricon-arrow-right i-down"></i>-->
                <!--</span>-->
              <!--</div>-->
            <!--</li>-->
            <!--<li>-->
              <!--<div class="left">-->
                <!--<p class="name">缺勤</p>-->
              <!--</div>-->
              <!--<div class="right">-->
                <!--<span class="">98人</span>-->
                <!--<span class="more">-->
                   <!--<i class="uricon-arrow-right i-down"></i>-->
                <!--</span>-->
              <!--</div>-->
            <!--</li>-->
          </ul>
        </div>
        <!--<div class="button" @click="openPicker()">-->
        <!--</div>-->
      </div>
      <mt-popup v-model="popMonth" :closeOnClickModal="false" popup-transition="popup-fade" position="bottom">
        <mt-picker ref="monthPicker" :closeOnClickModal="false" :slots="slots"  @change="monthChange" style="width: 7.5rem;" showToolbar>
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
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import {getScheme, setScheme} from 'nativeFix';
  import apiMonthlyListByType from 'api/attendance/apiMonthlyListByType';
  export default {
    components: {},
    data: () => {
      return {
        handler: function(e){
          e.preventDefault()
        },
        show: false,
        title: '统计',
        dialog: false,
        pickerMonth:['2019','02'],
        pickerMonthTemp:['2019','02'],
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
        popMonth:false,
        isSubmit: false,
        angle:150,
        tab:true,
        tabArry:[
          {
            id:1,
            text:'出勤天数',
            num:1,
            checked:false,
            dateList:[]
          },
          {
            id:2,
            text:'迟到',
            num:2,
            checked:false,
            dateList:[]
          },
          {
            id:3,
            text:'早退',
            num:2,
            checked:false,
            dateList:[]
          },
          {
            id:4,
            text:'缺卡',
            num:1,
            checked:false,
            dateList:[]
          },
          {
            id:5,
            text:'缺勤',
            num:1,
            checked:false,
            dateList:[]
          }
        ],
        weekDay:["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        companyId:'',
        year:'',
        month:'',
        type:"",
        averageWorktime:'0小时0分钟',
        data:'',
        defaultMonth:['01', '02', '03', '04', '05', '06','07','08','09','10','11','12'],
        currYearMonth:[],
        currYear:'2019'
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
      selectMonth(){
        this.popMonth=true;
        this.closeTouch();
      },
      monthChange(picker, values) {
        if(values[0]==this.currYear){
          picker.setSlotValues(1, this.currYearMonth);
        }else{
          picker.setSlotValues(1, this.defaultMonth);
        }
        this.pickerMonthTemp = values;
      },
      cancelPicker1(){
        this.$refs.monthPicker.setValues(this.pickerMonth);
        this.popMonth=false;
        this.openTouch();
      },
      confirmPicker1(){
        this.pickerMonth=this.copyArr(this.pickerMonthTemp);
        this.popMonth=false;
        this.apiMonthlyListByType(this.pickerMonth[0],this.pickerMonth[1]);
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
      arrayIdx (arry,key){
        var ary=arry;
        for(var i=0;i<ary.length;i++){
          if(ary[i]==key){
            return i;
            break;
          }
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
      apiMonthlyListByType (year,month){
        apiMonthlyListByType({
          "distUserId":this.distUserId,
          "companyId":this.companyId,
          "year":year,
          "month":month
        },this.$store.state.userInfo.userId).then(res => {
            if(res.retCode == 0){
              this.data = res.data;
              this.averageWorktime = res.data.averageWorktime;
              this.tabArry.map( (obj,idx) =>  {
                obj.id == 1 ? this.$set(obj,"dateList",this.data.attendanceList):'';
                obj.id == 2 ? this.$set(obj,"dateList",this.data.lateList):'';
                obj.id == 3 ? this.$set(obj,"dateList",this.data.earlyList):'';
                obj.id == 4 ? this.$set(obj,"dateList",this.data.lackList):'';
                obj.id == 5 ? this.$set(obj,"dateList", this.data.absentList):'';
              });
            }else{
              this.averageWorktime = '0小时0分钟';
              this.tabArry.map( (obj,idx) =>  {
                obj.id == 1 ? this.$set(obj,"dateList",[]):'';
                obj.id == 2 ? this.$set(obj,"dateList",[]):'';
                obj.id == 3 ? this.$set(obj,"dateList",[]):'';
                obj.id == 4 ? this.$set(obj,"dateList",[]):'';
                obj.id == 5 ? this.$set(obj,"dateList",[]):'';
              });
            }
          console.log(this.tabArry);
          this.show = true;
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
        let year=date1.getMonth();
        for(let i=firstYear;i<=year;i++){
          year_arr.push(i);
        }
        this.$set(this.slots[0], 'values', year_arr);

      }
    },

    created() {
      this.initPicker();
      this.year = this.$route.query.year;
      this.month = this.$route.query.month;
      this.companyId = this.$route.query.companyId;
      this.type = this.$route.query.type;
      this.distUserId = this.$route.query.distUserId;
      this.averageWorktime = this.$route.query.averageWorktime;
      this.pickerMonthTemp = [this.year,this.month.padStart(2, '0')];
      this.pickerMonth = [this.year,this.month.padStart(2, '0')];
      this.slots[0].defaultIndex = this.arrayIdx(this.slots[0].values,this.year);
      this.slots[2].defaultIndex = this.month-1;
      this.apiMonthlyListByType(this.year,this.month);
      this.show = true;
    },

    mounted() {

    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  i{
    line-height: inherit;
  }
  .i-down{
    font-size: 10px;
    transform:rotate(90deg);
    -ms-transform:rotate(90deg); 	/* IE 9 */
    -moz-transform:rotate(90deg); 	/* Firefox */
    -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
    -o-transform:rotate(90deg); 	/* Opera */
  }
  .i-up{
    font-size: 10px;
    transform:rotate(-90deg);
    -ms-transform:rotate(-90deg); 	/* IE 9 */
    -moz-transform:rotate(-90deg); 	/* Firefox */
    -webkit-transform:rotate(-90deg); /* Safari 和 Chrome */
    -o-transform:rotate(-90deg); 	/* Opera */
  }
  .page-attendance-center{
    background: #fafafa;
    height: 100vh;
    .banner{
      width: 100%;
      padding: 0 15px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-family: PingFangSC-Regular;
      font-size: 17px;
      color: #333333;
      letter-spacing: 0;
      background: #ffffff;
      .head-img{
        width: 45px;
        height: 45px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 8px;
        img{
          width: 45px;
          height: 45px;
          border-radius: 50%;
        }
      }
    }
    .date{
      height: 51px;
      line-height: 51px;
      background: #FAFAFA;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
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
      >ul{
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
        .more-li{
          background: #fafafa;
        }
      }
    }
  }
</style>

