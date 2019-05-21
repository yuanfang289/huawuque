<template>
  <page-wrap class="page-user-center">
    <title v-if="!isApp" v-title>{{title}}</title>
    <div v-if="!isApp" class="index-header">
      <div class="left" @click="dialog=true">
        <div class="location-icon"></div>
        <div class="location-list">
          {{stageInfo}}
          <!--span>·{{stageInfo[1]}}</span-->
        </div>
      </div>
      <div class="left"></div>
    </div>
    <div v-if="!isApp" style="height: 1.28rem"></div>
    <page-main :show="show">
      <div class="m-main">
        <div class="m-main-list">
          <div v-for="item in modules" class="m-main-item" @click="gotoFun(item)">
            <div class="m-img">
              <img :src="item.img">
            </div>
            <div class="m-title">{{isEn?item.eName:item.name}}</div>
          </div>
        </div>
      </div>

      <div v-if="schedules.length>0" class="schedule">
        <div class="schedule-title">{{curr_lang[0]}}</div>
        <div class="schedule-list" :style="spread_style">
          <template v-for="(item,index) in schedules">
            <div class="schedule-item" @click="schedule_detail(item)">
              <div class="schedule-type">
                <div
                  :class="{'schedule-type1':item.sType==1,'schedule-type2':item.sType==2,'schedule-type3':item.sType==3}"
                ></div>
              </div>
              <div class="schedule-when">
                <div class="schedule-time" v-html="timeSvg(item.time+'')"></div>
                <div class="schedule-date">{{item.date}}</div>
              </div>
              <div class="schedule-content">
                <div class="schedule-name">{{item.title}}</div>
                <div class="schedule-location">
                  <span v-if="item.location[0]!=''">{{item.location[0]}}</span>
                  {{item.location[1]}}
                </div>
              </div>
            </div>
            <div
              v-if="index<schedules.length-1||schedules.length>schedules_H"
              class="schedule-dividers"
            ></div>
          </template>
        </div>
        <div v-if="schedules.length>schedules_H" class="schedule-more" @click="schedule_more()">
          <p>
            <span class="s-m-txt">{{schedule_spread ? '收起日程' : '更多日程'}}</span>
            <span :class="{'s-m-icon':true,'s-m-icon-reverse':schedule_spread}"></span>
          </p>
        </div>
        <div v-if="schedules.length<(schedules_H+1)&&managers.length>1" style="height: 0.01rem"></div>
      </div>

      <div v-if="managers.length>0" class="manager">
        <div class="manager-title">{{curr_lang[1]}}</div>
        <div class="manager-list">
          <template v-for="(item,index) in managers">
            <div class="manager-list-item">
              <a v-if="!isNaN(item.userId)" :href="'/user/userDetail?userId='+item.userId">
                <div class="manager-img">
                  <img
                    :src="item.image1+'?imageMogr2/thumbnail/!120x120r/gravity/Center/crop/120x120/format/'+isWebp"
                    onerror="this.src='https://assets.urwork.cn/v2/assets/images/pic_def.f71a172.png';this.onerror=null;"
                  >
                </div>
              </a>

              <div v-if="isNaN(item.userId)" class="manager-img">
                <img
                  :src="item.image1+'?imageMogr2/thumbnail/!120x120r/gravity/Center/crop/120x120/format/'+isWebp"
                  onerror="this.src='https://assets.urwork.cn/v2/assets/images/pic_def.f71a172.png';this.onerror=null;"
                >
              </div>

              <div class="manager-info">
                <div class="manager-name">{{isEn?item.nameEn:item.name}}</div>
                <div class="manager-item-title">{{isEn?item.jobEn:item.job}}</div>
              </div>
              <div class="manager-contact">
                <div class="manager-contact-info">
                  <a :href="'tel:'+item.phone">
                    <div class="manager-contat-tel"></div>
                  </a>

                  <div
                    v-if="!isNaN(item.userId)"
                    @click="gotoFun({url:'',appUrl:'conversation?targetUserId='+item.userId})"
                    class="manager-contat-msg"
                  ></div>
                  <div v-if="isNaN(item.userId)" class="manager-contat-msg"></div>
                </div>
              </div>
            </div>

            <div v-if="index<managers.length-1" class="manager-dividers"></div>
          </template>
        </div>
      </div>
      <div :class="{'ad-margin':managers.length>0}" >
<ad-banner v-if="ad1" :bannerList="ad1" :paddingTop="29.85"></ad-banner>
</div>
      <div class="near-meetingroom">
        <div class="n-m-title">{{curr_lang[2]}}</div>
        <div class="n-m-list">
          <template v-for="item in meetingRoom">
            <div
              class="n-m-item"
              @click="gotoFun({url:'/rentMeetingRoom/list?plantId='+item.plantId,appUrl:'meetingRoom?workstageId='+item.plantId+'&workstageName='+encodeURIComponent(item.plantName)+'&meetingRoomId='+item.meetingroomId})"
            >
              <div class="n-m-img">
                <img
                  :src="item.pic+'?imageMogr2/thumbnail/!324x243r/gravity/Center/crop/324x243/format/'+isWebp"
                  :onerror="'this.src=\'https://image.urwork.cn/default/meetingRoom2.png'+'?imageMogr2/thumbnail/!324x243r/gravity/Center/crop/324x243/format/'+isWebp+'/quality/90\';this.onerror=null'"
                >
              </div>
              <div class="n-m-desc">
                <div class="n-m-name-distance">
                  <div class="n-m-name">{{item.meetingroomName}}</div>
                  <div class="n-m-distance">{{item.distance}}</div>
                </div>
                <div class="n-m-location">{{item.plantName}}</div>
                <div class="n-m-price">
                  <span class="n-m-price-val">￥{{item.rentalPrice}}</span>
                  <span class="n-m-price-name">/{{curr_lang[4]}}</span>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div
          class="n-m-more"
          @click="gotoFun({url:'/rentMeetingRoom/list',appUrl:'meetingRoom'})"
        >{{curr_lang[3]}}</div>
      </div>
      <!--div style="height:1.08rem;"></div-->

      <div class="index-open">
        <div class="index-open-icon"></div>
      </div>

      <div id="mask" v-show="dialog">
        <div class="dialog">
          <div class="close" @click="dialog=false"></div>
          <div class="title">入驻社区</div>
          <div class="list">
            <template v-for="item in myWorkstage">
              <div
                :class="{'item':true,'item-select':item.selected}"
                @click="choseWorkstage(item.id)"
              >{{item.stageName}}</div>
            </template>
          </div>
        </div>
      </div>
    </page-main>
  </page-wrap>
</template>

<script>
import { mapState } from "vuex";
import store from "store";
import { isLogin, setUrl, getLocation } from "src/utils/index";
import { getScheme, setScheme } from "nativeFix";
import { passport } from "src/globalData";
import { isApp, toLogin } from "src/nativeFix/index";
import apiIndexNew from "api/index/apiIndexNew";
import apiMyWorkstage from "api/index/apiMyWorkstage";
import AdBanner from 'app/index/modules/AdBanner';
export default {
  components: {AdBanner},
  data: () => {
    return {
      show: false,
      title: "首页",
      dialog: false,
      isApp: isApp(),
      userId: 0,
      schedule_spread: false,
      spread_style: "",
      showTimeTxt: "",
      modules: [
        {
          name: "订会议室",
          eName: "Meeting Rooms",
          img: "https://assets.urwork.cn/image/v3/meetingroom.png",
          url: "/rentMeetingRoom/list",
          appUrl: "meetingRoom"
        },
        {
          name: "租工位",
          eName: "Hot Desks",
          img: "https://assets.urwork.cn/image/v3/workstation.png",
          url: "/rentSation/getStationListView",
          appUrl: "bookingStation"
        },
        {
          name: "访客预约",
          eName: "Visitors",
          img: "https://assets.urwork.cn/image/v3/visitor.png",
          url: "/v2/visit",
          appUrl: ""
        },
        {
          name: "优质社区",
          eName: "Communities",
          img: "https://assets.urwork.cn/image/v3/community.png",
          url: "/v3/workStage",
          appUrl: "goodStage"
        },
        {
          name: "管理输出",
          eName: "Franchise",
          img: "https://assets.urwork.cn/image/v3/manager-out.png",
          url: "/urworkCity",
          appUrl: ""
        },
        {
          name: "更多服务",
          eName: "More Services",
          img: "https://assets.urwork.cn/image/v3/more-service.png",
          url: "/v3/applyList",
          appUrl: ""
        }
      ],
      schedules: [],
      schedules_H: 5, //最初最显示5条
      managers: [],

      meetingRoom: [],
      longitude: "", // 116.40,
      latitude: "", // 39.90,
      cityCode: "", // 110000,
      workstageId: "", //10043,
      //stageInfo:['维拓社区','UCOMMUNE'],
      stageInfo: "北京维拓·优客工场",
      myWorkstage: [],
      isEn: false,
      curr_lang:[],
      lang: {
        en: ["My Schedule", "Community Managers", "Nearby","More","30min"],
        ch: ["我的日程", "我的社区管家", "附近会议室","更多","半小时"]
      },
      ad1:[
            {
                "id":1,
                "title":"banner1",
                "linkUrl":"/v2/activity/rightspage",
                "image":"https://assets.urwork.cn/image/v3/b1.jpg",
                "postionType":"ad1",
                "postionIndex":1,
                "status":1,
                "bannerType":1
            },
           {
                "id":2,
                "title":"banner1",
                "linkUrl":"https://m.urwork.cn/market/serviceCustom?from=groupmessage",
                "image":"https://assets.urwork.cn/image/v3/b2.jpg",
                "postionType":"ad1",
                "postionIndex":2,
                "status":1,
                "bannerType":1
            },
        ],
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    }),
    isWebp() {
      if (
        document
          .createElement("canvas")
          .toDataURL("image/webp")
          .indexOf("data:image/webp") == 0
      ) {
        return "webp";
      } else {
        return "jpeg";
      }
    }
  },
  methods: {
    schedule_detail(item) {
      if (item.jumpType == 0) {
        return;
      }
      let url = { url: "", appUrl: "" };
      if (item.sType == 1) {
        url.url = "/rentMeetingRoom/orderInfo?id=" + item.relationId;
        url.appUrl = "meetingRoomOrderDetail?orderId=" + item.relationId;
      }
      if (item.sType == 2) {
        url.url = "/activity/h5Detail?id=" + item.relationId;
      }
      if (item.sType == 3) {
        url.url = "/workstageVisit/detail?id=" + item.relationId;
      }
      if (item.sType == 4) {
        url.url = "/workstageVisit/bookingDetail?id=" + item.relationId;
      }
      this.gotoFun(url);
    },
    gotoFun(item) {
      let h5Url = item.url;
      let appUrl = item.appUrl;
      if (h5Url == "" && appUrl == "") {
        return;
      }
      if (isApp() && appUrl != "") {
        setScheme(appUrl);
      } else {
        if (h5Url == "") {
          return;
        }
        let url = getLocation().origin + h5Url;
        if (isApp()) {
          this.$DANativeApi.navigateTo({
            url
          });
        } else {
          window.location.href = url;
        }
      }
    },

    initWorkstage(id) {
      let arr = this.myWorkstage;
      arr.map(item => {
        if (item.id == id) {
          item.selected = true;
          this.stageInfo = item.stageName;
        } else {
          item.selected = false;
        }
        return item;
      });
      this.myWorkstage = JSON.parse(JSON.stringify(arr));
    },
    choseWorkstage(id) {
      let arr = this.myWorkstage;
      localStorage.setItem(this.userId, id);
      this.workstageId = id;
      this.initWorkstage(id);
      this.dialog = false;
      this.getData();
    },
    schedule_more() {
      this.schedule_spread = !this.schedule_spread;
      if (this.schedule_spread) {
        this.spread_style = "height:" + this.schedules.length * 1.55 + "rem";
      } else {
        let len = this.schedules.length;
        if (len > this.schedules_H) {
          len = this.schedules_H;
        }
        this.spread_style = "height:" + len * 1.55 + "rem";
      }
    },
    schedules_data(data) {
      data.map(item => {
        let st = item.scheduleTime;
        let date_t = new Date(st);
        if (item.dayType == 3 || item.dayType == 0) {
          item.date =
            (date_t.getMonth() + 1 > 9
              ? date_t.getMonth() + 1
              : "0" + (date_t.getMonth() + 1)) +
            "月" +
            (date_t.getDate() > 9 ? date_t.getDate() : "0" + date_t.getDate()) +
            "日";
        } else {
          item.date = item.dayType == 1 ? "今天" : "明天";
        }
        item.sType =
          item.typeName == "活动"
            ? 2
            : item.typeName == "会议"
            ? 1
            : item.typeName == "访客" && item.title == "预约参观"
            ? 4
            : 3;
        let min = date_t.getMinutes() + "";
        let hour = date_t.getHours() + "";
        if (min.length < 2) {
          min = "0" + min;
        }
        if (hour.length < 2) {
          hour = "0" + hour;
        }
        item.time = hour + ":" + min;
        let location = [];
        location[0] = item.meetingRoomName.trim();
        location[1] = item.workstageName;
        item.location = location;
        return item;
      });
      this.schedules = data;
      let len = this.schedules.length;
      if (len > this.schedules_H) {
        len = this.schedules_H;
      }
      this.spread_style = "height:" + len * 1.55 + "rem";
    },

    manager_data(data) {
      this.managers = data.slice(0, 3);
    },
    get_distance_txt(d) {
      return d >= 1000 ? (d / 1000).toFixed(1) + "km" : d + "m";
    },
    meetingRooms_data(data) {
      data.map(item => {
        //distance
        let d = item.distance;
        if (d) {
          d = parseInt(d);
          item.distance = this.get_distance_txt(d);
        } else {
          item.distance = "";
        }
        return item;
      });
      this.meetingRoom = data;
    },
    getData() {
      apiIndexNew({
        longitude: this.longitude,
        latitude: this.latitude,
        cityCode: this.cityCode,
        workstageId: this.workstageId
      }).then(res => {
        this.schedules_data(res.userSchedules);
        this.meetingRooms_data(res.meetingRooms);
        this.manager_data(res.workstageTeam);
        this.show = true;
      });
    }
  },
  created() {
    let currentLang = (
      navigator.systemLanguage ||
      navigator.userLanguage ||
      navigator.language ||
      navigator.browserLanguage
    ).toLowerCase();
    //alert(currentLang);
    this.curr_lang=this.lang['ch'];
    if (currentLang.indexOf("en") > -1||this.isEn) {
      this.isEn = true;
      this.curr_lang=this.lang['en'];
    }
    if (this.$route.query.cityid) {
      this.cityCode = this.$route.query.cityid;
    }
    if (this.$route.query.longitude) {
      this.longitude = this.$route.query.longitude;
    }
    if (this.$route.query.latitude) {
      this.latitude = this.$route.query.latitude;
    }
    if (this.$route.query.cid) {
      this.workstageId = this.$route.query.cid;
    }
    this.modules[3].appUrl =
      "goodStage?longitude=" + this.longitude + "&latitude=" + this.latitude;
    this.userId = this.$store.state.userInfo.userId;
    let enterType = this.$store.state.userInfo.enterType;
    if (enterType !== 3) {
      this.$router.push({ path: "/v2/index2", query: this.$route.query });
    }
    //todo 参数

    apiMyWorkstage().then(res => {
      this.myWorkstage = res;
      let st_info;
      let st_id = JSON.parse(localStorage.getItem(this.userId));
      if (!st_id && res.length > 0) {
        st_id = res[0].id;
      }
      this.initWorkstage(st_id);
    });
    this.getData();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped="">
@import "../../assets/scss/variables";
@import "../../assets/scss/mixins";
.ad-margin{
 margin-top:-0.4rem;
}

/deep/ .swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction{
    bottom:2px !important;
  }
/deep/ .ad-banner-wrapper{
      padding-top: 0px !important;
      margin-bottom: 0.9rem !important;
      background: #fff !important;
}
/deep/ .swiper-content{
  background: #fff !important;
}

/deep/ .swiper-container{
  border-radius: 3px !important;
}
.index-header {
  position: fixed;
  z-index: 999;
  background: #fff;
  top: 0;
  width: 100%;
  height: 1.28rem;
  padding: 0.4rem;
  .left {
    height: 0.48rem;
    display: flex;
    //justify-content: center;
    .location-icon {
      width: 0.48rem;
      height: 0.48rem;
      margin-right: 0.08rem;
      background: url("https://assets.urwork.cn/image/v3/location.png")
        no-repeat;
      background-size: 100% 100%;
    }
    .location-list {
      height: 0.48rem;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #1d1d1d;
      line-height: 0.48rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      span {
        font-family: SFProText-Bold;
        font-weight: bold;
        font-size: 16px;
        color: #000000;
        line-height: 16px;
      }
    }
  }
}

.m-main {
  margin: 0 auto;
  width: 100%;
  height: auto;
  .m-main-list {
    width: 100%;
    padding: 0.6rem 0.38rem 0.8rem 0.4rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: baseline;
    .m-main-item {
      width: 2rem;
      height: 2.12rem;
      //padding: 0.2rem 0.4rem 0.26rem 0.4rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      .m-img {
        width: 1.2rem;
        height: 1.2rem;
        img {
          background-size: 100%;
        }
      }
      .m-title {
        width: 100%;
        height: 0.26rem;
        margin-top: 0.2rem;
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #1d1d1d;
        text-align: center;
        line-height: 0.26rem;
      }
    }
  }
}

.schedule {
  width: 100%;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  padding-bottom: 0.66rem;

  .schedule-title {
    height: 0.56rem;
    font-family: PingFangSC-Regular;
    font-weight: bold;
    font-size: 24px;
    color: #1d1d1d;
    line-height: 0.56rem;
    margin-bottom: 0.21rem;
  }

  .schedule-list {
    overflow: hidden;
    //height: 4.65rem;
    transition: height 0.5s;
    transition-timing-function: ease-in-out;
    .schedule-item {
      display: flex;
      justify-content: flex-start;
      padding-top: 0.37rem;
      .schedule-type {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-right: 0.28rem;
        margin-left: 0.2rem;
      }
      .schedule-type > div {
        width: 0.16rem;
        height: 0.16rem;
        border-radius: 50%;
      }
      .schedule-type1 {
        background-color: #36cafe;
      }
      .schedule-type2 {
        background-color: #ffbc2d;
      }
      .schedule-type3 {
        background-color: #92d813;
      }

      .schedule-when {
        display: flex;
        flex-direction: column;
        text-align: center;
        margin-right: 0.48rem;
        .schedule-time {
          height: 0.4rem;
          width: 1.28rem;
          margin-bottom: 0.2rem;
          font-family: DINPro-Bold;
          font-size: 20px;
          color: #1d1d1d;
          line-height: 0.4rem;
        }
        .schedule-date {
          height: 0.24rem;
          width: 1.28rem;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #808080;
          line-height: 0.24rem;
        }
      }
      .schedule-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        //text-align: center;
        .schedule-name {
          height: 0.32rem;
          width: 4.4rem;
          margin-top: 4px;
          font-family: PingFangSC-Regular;
          font-weight: bold;
          font-size: 16px;
          color: #1d1d1d;
          line-height: 0.32rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .schedule-location {
          height: 13px;
          width: 4.5rem;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #808080;
          line-height: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          span {
            display: inline-block;
            margin-right: 0.36rem;
          }
        }
      }
    }
    .schedule-dividers {
      width: 100%;
      margin-top: 0.33rem;
      position: relative;
      @include border-bottom(#e8e8e8, 20);
    }
  }

  .schedule-more {
    width: 100%;
    height: 0.96rem;
    margin-top: 0.23rem;
    display: flex;
    justify-content: center;
    p {
      display: flex;
      justify-content: center;
      padding-top: 0.32rem;
      padding-bottom: 0.32rem;
      .s-m-txt {
        display: inline-block;
        height: 0.32rem;
        font-family: PingFangSC-Semibold;
        font-size: 16px;
        color: #1d1d1d;
        line-height: 0.32rem;
        margin-right: 0.16rem;
      }
      .s-m-icon {
        width: 0.32rem;
        height: 0.32rem;
        display: inline-block;
        background: url("https://assets.urwork.cn/image/v3/down-more.png")
          no-repeat;
        background-size: 100% 100%;
      }
      .s-m-icon-reverse {
        transform: rotate(180deg);
      }
    }
  }
}

.manager {
  width: 100%;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  margin-bottom: 0.96rem;
  .manager-title {
    height: 0.48rem;
    font-family: PingFangSC-Regular;
    font-weight: bold;
    font-size: 24px;
    color: #1d1d1d;
    line-height: 0.48rem;
  }
  .manager-list {
    padding-top: 0.13rem;
    .manager-list-item {
      display: flex;
      justify-content: space-between;
      padding-top: 0.35rem;
      padding-bottom: 0.35rem;
      .manager-img {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        overflow: hidden;
        background-size: 100% 100%;
        margin-right: 0.32rem;
        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .manager-info {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        .manager-name {
          height: 0.32rem;
          font-family: PingFangSC-Regular;
          font-weight: bold;
          font-size: 16px;
          color: #1d1d1d;
          line-height: 0.32rem;
          margin-bottom: 0.2rem;
        }
        .manager-item-title {
          height: 0.24rem;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #808080;
          line-height: 0.24rem;
        }
      }
      .manager-contact {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .manager-contact-info {
          display: flex;
          justify-content: center;
          a {
            width: 0.48rem;
            margin-right: 0.6rem;
          }
          .manager-contat-tel {
            width: 0.48rem;
            height: 0.48rem;
            background: url("https://assets.urwork.cn/image/v3/phone.png")
              no-repeat;
            background-size: 100% 100%;
            margin-right: 0.6rem;
          }
          .manager-contat-msg {
            width: 0.48rem;
            height: 0.48rem;
            background: url("https://assets.urwork.cn/image/v3/msg.png")
              no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }

    .manager-dividers {
      width: 100%;
      position: relative;
      @include border-bottom(#e8e8e8, 20);
    }
  }
}

.near-meetingroom {
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  .n-m-title {
    height: 0.48rem;
    font-family: PingFangSC-Regular;
    font-weight: bold;
    font-size: 24px;
    color: #1d1d1d;
    line-height: 0.48rem;
  }
  .n-m-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .n-m-item {
      margin-top: 0.48rem;
      .n-m-img {
        height: 2.43rem;
        width: 3.24rem;
        border-radius: 0.06rem;
        overflow: hidden;
        img {
          height: 2.43rem;
          width: 3.24rem;
          background-size: 100% 100%;
        }
      }
      .n-m-desc {
        .n-m-name-distance {
          display: flex;
          justify-content: space-between;
          margin-top: 0.21rem;
          .n-m-name {
            height: 18px;
            max-width: 2.26rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-family: PingFangSC-Regular;
            font-weight: bold;
            font-size: 18px;
            color: #1d1d1d;
            line-height: 18px;
          }
          .n-m-distance {
            height: 0.36rem;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #808080;
            line-height: 0.36rem;
          }
        }

        .n-m-location {
          height: 12px;
          margin-top: 0.16rem;
          width: 3.2rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #808080;
          line-height: 12px;
        }

        .n-m-price {
          margin-top: 0.16rem;
          .n-m-price-val {
            height: 0.32rem;
            font-family: PingFang-SC-Bold;
            font-weight: bold;
            font-size: 16px;
            color: #1d1d1d;
            line-height: 0.32rem;
          }

          .n-m-price-name {
            height: 0.24rem;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #808080;
            line-height: 0.24rem;
          }
        }
      }
    }
  }

  .n-m-more {
    height: 0.96rem;
    background: rgba(186, 193, 200, 0.1);
    border-radius: 0.06rem;
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #1d1d1d;
    text-align: center;
    line-height: 0.96rem;
    margin-top: 0.48rem;
    margin-bottom: 0.48rem;
  }
}

.index-open {
  display: none;
  position: fixed;
  right: 0.4rem;
  bottom: 2.28rem;
  background: #ffffff;
  opacity: 1;
  border: 1px solid #e6e6e6;
  border-radius: 50%;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.06);
  .index-open-icon {
    width: 1.2rem;
    height: 1.2rem;
    background: url("https://assets.urwork.cn/image/v3/open.png") no-repeat;
    background-size: 0.48rem 0.48rem;
    background-position: center;
  }
}

#mask {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  .dialog {
    margin-top: 0.4rem;
    margin-left: 0.4rem;
    margin-right: 0.4rem;
    .close {
      width: 0.48rem;
      height: 0.48rem;
      background: url("https://assets.urwork.cn/image/v3/close.png") no-repeat;
      background-size: 100% 100%;
    }
    .title {
      margin-top: 0.6rem;
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      color: #1d1d1d;
      font-weight: bold;
    }
    .list {
      margin-top: 0.1rem;
      .item {
        display: inline-block;
        margin-top: 0.3rem;
        padding: 0.17rem 0.26rem;
        background: #ffffff;
        @include border(#d6d6d6) {
          border-radius: 0.35rem;
        }
        font-family: PingFangSC-Medium;
        font-size: 13px;
        color: #808080;
        line-height: 0.26rem;
      }
      .item-select {
        @include border(#363636) {
          border-radius: 0.35rem;
        }
        font-family: PingFangSC-Semibold;
        color: #1d1d1d;
      }
    }
  }
}
</style>



