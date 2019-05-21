<template>
  <page-wrap class="page-user-center">
    <title v-if="!isApp" v-title>{{title}}</title>
    <div v-if="!isApp" class="index-header">
      <div class="left" @click="showSelCity=true">
        <div class="location-icon"></div>
        <div class="location-list">
          {{cityName}}
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

      <div class="excellent">
        <div class="e-title">
          <div class="e-title-txt">{{curr_lang[0]}}</div>
          <div class="e-title-icon" @click="goappMap()"></div>
        </div>

        <div class="e-city-content">
          <div class="e-city-list">
            <div class="e-city-list-content">
              <template v-for="item in hotCity">
                <div
                  @click="getEWorkstages(item.cityCode)"
                  :class="{'e-city-item':true,'e-city-item-sel':item.selected}"
                >{{isEn?item.cityNameEn:item.cityName}}</div>
              </template>
            </div>
          </div>
        </div>

        <div class="e-w-list">
          <div
            v-for="item in excellentWorkstages"
            class="e-w-list-item"
            @click=" gotoFun({url:'/workstage/detail?id='+item.id,appUrl:''})"
          >
            <div class="e-w-list-item-img">
              <img
                :src="item.workstageImage+'?imageMogr2/thumbnail/!324x243r/gravity/Center/crop/324x243/format/'+isWebp"
                onerror="this.src='https://assets.urwork.cn/image/v3/workstage.jpg';this.onerror=null;"
              >
            </div>
            <div class="e-w-list-item-name">{{isEn?item.stageNameEn:item.stageName}}</div>
            <div class="e-w-list-item-addr">{{isEn?item.stageNameEn:item.address}}</div>

            <div class="e-w-list-item-detail">
              <div class="e-w-list-item-price no-price" v-if="!item.openStation">{{curr_lang[1]}}</div>
              <div class="e-w-list-item-price" v-if="item.openStation">
                ￥{{item.openStation}}
                <span class="e-w-list-item-price-title">/{{curr_lang[16]}}</span>
              </div>
              <div class="e-w-list-item-distance">{{item.distance}}</div>
            </div>
          </div>
        </div>

        <div
          class="e-w-more"
          @click=" gotoFun({url:'/v3/workStage'+'?currentLongitude='+longitude+'&currentLatitude='+latitude,appUrl:'goodStage'+'?longitude='+longitude+'&latitude='+latitude})"
        >{{curr_lang[10]}}</div>
      </div>

      <div class="form">
        <div class="form-title">{{curr_lang[2]}}</div>

        <div class="form-content">
          <div class="form-item" @click="showSelArea=true">
            <input readonly="readonly" :placeholder="curr_lang[3]" :value="areaName" type="text">
            <span class="location-icon"></span>
          </div>

          <div class="form-item">
            <input type="txt" v-model="formData.number" maxlength="5" :placeholder="curr_lang[4]">
            <span class="people-icon"></span>
          </div>

          <div class="form-item-phone">
            <div class="zone">
              <select
                style="  -webkit-appearance: none;-moz-appearance: none;appearance: none;background-color: white"
                v-model="formData.nationalCode"
              >
                <option
                  :value="item"
                  style="background-color: #fff;"
                  v-for="item in nationalCodes"
                >+{{item}}</option>
              </select>
              <span></span>
            </div>
            <div class="user-contact">
              <input
                type="text"
                maxlength="11"
                v-model="formData.phone"
                class="input-phone"
                :placeholder="curr_lang[5]"
              >
            </div>
          </div>
        </div>

        <div class="form-sbumit" @click="form_submit">
          <span>{{curr_lang[6]}}</span>
        </div>
      </div>

      <div v-if="managers.length>0" class="manager">
        <div class="manager-title">{{curr_lang[17]}}</div>
        <div class="manager-list">
          <template v-for="(item,index) in managers">
            <div class="manager-list-item">
              <a v-if="!isNaN(item.userId)" :href="'/user/userDetail?userId='+item.userId">
                <div class="manager-img">
                  <img
                    :src="item.headImage+'?imageMogr2/thumbnail/!120x120r/gravity/Center/crop/120x120/format/'+isWebp"
                    onerror="this.src='https://assets.urwork.cn/v2/assets/images/pic_def.f71a172.png'"
                  >
                </div>
              </a>
              <div v-if="isNaN(item.userId)" class="manager-img">
                <img
                  :src="item.headImage+'?imageMogr2/thumbnail/!120x120r/gravity/Center/crop/120x120/format/'+isWebp"
                  onerror="this.src='https://assets.urwork.cn/v2/assets/images/pic_def.f71a172.png'"
                >
              </div>
              <div class="manager-info">
                <div class="manager-name">{{item.name}}</div>
                <div class="manager-item-title">{{item.position}}</div>
              </div>
              <div class="manager-contact">
                <div class="manager-contact-info">
                  <a :href="'tel:'+item.tel">
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
      <ad-banner v-if="ad1" :bannerList="ad1" :paddingTop="29.85"></ad-banner>
    
      <div class="near-meetingroom">
        <div class="n-m-title">{{curr_lang[8]}}</div>
        <div class="n-m-list">
          <template v-for="item in meetingRoom">
            <div
              class="n-m-item"
              @click="gotoFun({url:'/rentMeetingRoom/list?plantId='+item.plantId,appUrl:'meetingRoom?workstageId='+item.plantId+'&workstageName='+encodeURIComponent(item.plantName)+'&meetingRoomId='+item.meetingroomId})"
            >
              <div class="n-m-img">
                <img
                  :src="item.pic?item.pic+'?imageMogr2/thumbnail/!324x243r/gravity/Center/crop/324x243/format/'+isWebp:'1'"
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
                  <span class="n-m-price-name">/{{curr_lang[9]}}</span>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div
          class="n-m-more"
          @click=" gotoFun({url:'/rentMeetingRoom/list',appUrl:'meetingRoom'})"
        >{{curr_lang[10]}}</div>
      </div>
      <!--div style="height:1.08rem;"></div-->

      <div class="index-open">
        <div class="index-open-icon"></div>
      </div>

      <div id="mask" v-show="dialog">
        <div class="dialog" style="display: none">
          <div class="close" @click="dialog=false"></div>
        </div>
      </div>

      <select-citys v-model="showSelCity" :cityId="110000" @select-city="getSelCity"></select-citys>

      <select-area
        :show="showSelArea"
        @sel-area-close="showSelArea=false;"
        @select-area="getSelArea"
      ></select-area>
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
import apiCityList from "src/api/workstage/apiCityList";
import apiGoodStageList from "src/api/workstage/apiGoodStageList";
import apiEnterSave from "src/api/index/apiEnterSave";
import SelectCitys from "component/picker/SelectCitys";
import SelectArea from "component/picker/SelectArea";
import AdBanner from 'app/index/modules/AdBanner';
export default {
  components: {
    SelectCitys,
    SelectArea,
    AdBanner
  },
  data: () => {
    return {
      show: false,
      showSelCity: false,
      showSelArea: false,
      title: "首页",
      dialog: false,
      isApp: isApp(),
      userId: 0,
      schedule_spread: false,
      spread_style: "",
      showTimeTxt: "",
      //nationalCodes: [244, 93, 355, 213, 376, 1264, 1268, 54, 374, 247, 61, 43, 994, 1242, 973, 880, 1246, 375, 32, 501, 229, 1441, 591, 267, 55, 673, 359, 226, 95, 257, 237, 1, 1345, 236, 235, 56, 86, 57, 242, 682, 506, 53, 357, 420, 45, 253, 1890, 593, 20, 503, 372, 251, 679, 358, 33, 594, 241, 220, 995, 49, 233, 350, 30, 1809, 1671, 502, 224, 592, 509, 504, 852, 36, 354, 91, 62, 98, 964, 353, 972, 39, 225, 1876, 81, 962, 855, 327, 254, 82, 965, 331, 856, 371, 961, 266, 231, 218, 423, 370, 352, 853, 261, 265, 60, 960, 223, 356, 1670, 596, 230, 52, 373, 377, 976, 1664, 212, 258, 264, 674, 977, 599, 31, 64, 505, 227, 234, 850, 47, 968, 92, 507, 675, 595, 51, 63, 48, 689, 351, 1787, 974, 262, 40, 7, 1758, 1784, 684, 685, 378, 239, 966, 221, 248, 232, 65, 421, 386, 677, 252, 27, 34, 94, 1758, 1784, 249, 597, 268, 46, 41, 963, 886, 992, 255, 66, 228, 676, 1809, 216, 90, 993, 256, 380, 971, 44, 1, 598, 233, 58, 84, 967, 381, 263, 243, 260],
      nationalCodes: [86, 1, 44, 65, 852, 853, 886],

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
      hotCity: [
        { cityCode: "", cityName: "附近", cityNameEn: "fujin" },
        { cityCode: "110000", cityName: "北京市", cityNameEn: "Beijing" },
        { cityCode: "310000", cityName: "上海市", cityNameEn: "Shanghai" },
        { cityCode: "440300", cityName: "深圳市", cityNameEn: "Shenzhen" },
        { cityCode: "510100", cityName: "成都市", cityNameEn: "Chengdu" },
        { cityCode: "610100", cityName: "西安市", cityNameEn: "Xi'an" },
        { cityCode: "420100", cityName: "武汉市", cityNameEn: "Wuhan" },
        { cityCode: "350200", cityName: "厦门市", cityNameEn: "Xiamen" },
        { cityCode: "810000", cityName: "香港", cityNameEn: "Hong Kong" },
        { cityCode: "990100", cityName: "新加坡", cityNameEn: "Singapore" }
      ],
      excellentWorkstages: [],
      schedules: [],
      schedules_H: 5, //最初最显示5条
      managers: [],
      formData: { nationalCode: 86, phone: null, number: null, district: 0 },
      meetingRoom: [],
      longitude: "", // 116.40,
      latitude: "", // 39.90,
      cityCode: "", // 110000,
      cityName: "北京",
      workstageId: "", // ,
      //stageInfo:['维拓社区','UCOMMUNE'],
      myWorkstage: [],
      letter: [],
      allCity: [],
      areaId: 0,
      areaName: "",
      isEn: false,
      curr_lang: [],
      lang: {
        en: [
          "Discover Communities",
          "Enquiries",
          "Need a new workplace?",
          "Choose Location",
          "Company Size",
          "Mobile Number",
          "Submit",
          "Your request has been submitted. Our staffs will contact you shortly.",
          "Nearby",
          "30min",
          "More",
          "Please choose location",
"Please company size",	
"Please enter correct area code",	
"Please enter correct mobile number",	
"Submission Failed",	
"month",
"Sales Consultant",
        ],
        ch: [
          "发现气质社区",
          "价格致电详询",
          "您想在哪里办公？",
          "选择地点",
          "公司人数",
          "手机号码",
          "提交",
          "预约成功，工作人员将会尽快与您联系",
          "附近会议室",
          "半小时",
          "更多",

          "请选择正确的区域",
"请填写正确的人数",
"请填写正确的电话区号",
"请填写正确的电话",
"预约失败",
 "月",
 "招商顾问",
          
        ]
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
    goappMap: function() {
      var url =
        "communityMap?cityCode=" +
        this.cityCode +
        "&cityName=" +
        encodeURIComponent(this.cityName) +
        "&source=1";
      if (isApp()) {
        let version = this.$DANativeApi.apiVersionNumber;
        if (version < 331) {
          this.$updateApp("3.3.1");
        } else {
          if (!navigator.geolocation) {
            this.$dialog({
              type: "alert",
              content: "在系统设置中打开定位服务允许浏览器获取您的位置",
              confirmText: "去设置",
              callback(res) {}
            });
          } else {
            setScheme(url);
          }
        }
      } else {
        this.$openApp();
      }
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
    getSelCity(obj) {
      this.cityCode = obj.cityCode;
      this.cityName = obj.cityName;
      this.getData();
      this.showSelCity = false;
    },
    getSelArea(obj) {
      this.areaId = obj.id;
      this.areaName = obj.name;
      console.log("obj", obj);
      this.formData.district = obj.id;
      this.showSelArea = false;
    },
    form_submit() {
      if (this.formData.district == 0) {
        this.$toast(this.curr_lang[11]);
        return;
      }
      let number = /^[1-9]+(\d+)?$/;
      if (!number.test(this.formData.number)) {
        this.$toast(this.curr_lang[12]);
        return;
      }

      if (this.formData.nationalCode == 0) {
        this.$toast(this.curr_lang[13]);
        return;
      }

      var mobile = /^1[0-9]{4,10}$/;
      if (!this.formData.phone || !mobile.test(this.formData.phone)) {
        this.$toast(this.curr_lang[14]);
        return;
      }

      apiEnterSave(this.formData).then(res => {
        console.log("EnterSave", res);
        if (res.retCode === 1) {
          this.$toast(this.curr_lang[7]);
        } else {
          this.$toast(this.curr_lang[15]);
        }
        setTimeout(() => {
          location.reload();
        }, 800);
      });
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

    manager_data(data) {
      if (!data) {
        this.managers = [];
        return;
      }
      this.managers = data.slice(0, 3);
    },

    get_distance_txt(d) {
      return d >= 1000 ? (d / 1000).toFixed(1) + "km" : d + "m";
    },
    meetingRooms_data(data) {
      data.map(item => {
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
    excellentWorkstages_data(data) {
      data.map(item => {
        let d = item.distance;
        if (d) {
          d = parseInt(d);
          item.distance = this.get_distance_txt(d);
        } else {
          item.distance = "";
        }
        return item;
      });
      return data;
    },

    getEWorkstages(cityCode) {
      let hotCity = this.hotCity;
      hotCity.map(item => {
        if (item.cityCode == cityCode) {
          item.selected = true;
        } else {
          item.selected = false;
        }
      });
      this.hotCity = JSON.parse(JSON.stringify(hotCity));
      let orderBy = cityCode == "" ? 1 : 0;
      apiGoodStageList({
        pageSize: 4,
        currentPageNo: "1",
        currentLongitude: this.longitude,
        currentLatitude: this.latitude,
        orderByDistance: orderBy,
        cityCode: cityCode
      }).then(res => {
        if (res.result) {
          this.excellentWorkstages = this.excellentWorkstages_data(res.result);
        }
      });
    },
    getData() {
      apiIndexNew({
        longitude: this.longitude,
        latitude: this.latitude,
        cityCode: this.cityCode
      }).then(res => {
        this.meetingRooms_data(res.meetingRooms);
        this.manager_data(res.listPersonLiable);
        this.excellentWorkstages = this.excellentWorkstages_data(
          res.excellentWorkstages
        );
        let hotCity_arr = res.hotCity;
        if (this.longitude && this.latitude) {
          hotCity_arr.unshift({
            cityCode: "",
            cityName: "附近",
            cityNameEn: "Nearby"
          });
        }
        hotCity_arr.map((item, index) => {
          if (index == 0) {
            item.selected = true;
          } else {
            item.selected = false;
          }
        });
        this.hotCity = hotCity_arr;
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
    this.userId = this.$store.state.userInfo.userId;

    this.modules[3].appUrl =
      "goodStage?longitude=" + this.longitude + "&latitude=" + this.latitude;

    //      isLogin({
    //        success: () => {
    //          let enterType= this.$store.state.userInfo.enterType;
    //          if(enterType==3){
    //            this.$router.push({path: '/v2/index1', query: this.$route.query});
    //          }
    //        },
    //        fail: () => {}
    //      })

    let enterType = this.$store.state.userInfo.enterType;
    if (enterType && enterType == 3) {
      this.$router.push({ path: "/v2/index1", query: this.$route.query });
    }

    //todo 参数

    //      apiMyWorkstage().then(res => {
    //        this.myWorkstage = res;
    //        let st_info;
    //        let st_id = JSON.parse(localStorage.getItem(this.userId));
    //        if (!st_id) {
    //          st_id = res[0].id;
    //        }
    //        this.initWorkstage(st_id);
    //      });
    this.getData();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped="">
@import "../../assets/scss/variables";
@import "../../assets/scss/mixins";
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

.excellent {
  padding-bottom: 0.48rem;
  width: 100%;
  .e-title {
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    .e-title-txt {
      height: 0.48rem;
      font-family: PingFangSC-Semibold;
      font-size: 24px;
      font-weight: bold;
      color: #1d1d1d;
      line-height: 0.48rem;
    }
    .e-title-icon {
      width: 0.48rem;
      height: 0.48rem;
      background: url("https://assets.urwork.cn/image/v3/map.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .e-city-content {
    height: 32px;
    margin-bottom: 0.4rem;
    overflow: hidden;

    .e-city-list {
      padding-left: 0.4rem;
      overflow-x: scroll;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 0.6rem;
      .e-city-list-content {
        white-space: nowrap;
        height: 32px;
        .e-city-item {
          position: relative;
          height: 30px;
          line-height: 30px;
          display: inline-block;

          font-family: PingFangSC-Medium;
          font-size: 13px;
          color: #808080;

          @include border(#d6d6d6) {
            border-radius: 32px;
          }
          padding-left: 0.36rem;
          padding-right: 0.36rem;
          margin-right: 0.18rem;
        }
        .e-city-item-sel {
          position: relative;
          font-family: PingFangSC-Medium;
          font-size: 13px;
          color: #1d1d1d;
          font-weight: bold;
          @include border(#363636) {
            border-radius: 32px;
          }
        }
      }
    }
  }

  .e-w-list {
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .e-w-list-item {
      margin-bottom: 0.44rem;
      .e-w-list-item-img {
        border-radius: 6px;
        overflow: hidden;
        margin-bottom: 0.13rem;
        img {
          width: 3.24rem;
          height: 2.43rem;
        }
      }
      .e-w-list-item-name {
        width: 3.24rem;
        min-height: 0.5rem;
        max-height: 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        font-family: PingFangSC-Regular;
        font-size: 18px;
        font-weight: bold; //todo
        color: #1d1d1d;
        line-height: 0.5rem;
        margin-bottom: 0.16rem;
      }
      .e-w-list-item-addr {
        width: 3.24rem;
        height: 0.3rem;
        ont-family: PingFangSC-Regular;
        font-size: 12px;
        color: #808080;
        line-height: 0.3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 0.16rem;
      }
      .e-w-list-item-detail {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .e-w-list-item-price {
          font-family: PingFangSC-Semibold;
          font-size: 16px;
          .e-w-list-item-price-title {
            height: 0.24rem;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            height: 0.24rem;
            color: #808080;
            line-height: 0.24rem;
          }
          .e-w-list-item-distance {
            height: 0.24rem;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #808080;
            line-height: 0.24rem;
          }
        }
        .no-price {
          font-family: PingFangSC-Regular;
          color: #333;
          font-size: 12px;
        }
      }
    }
  }

  .e-w-more {
    height: 0.96rem;
    margin-left: 0.4rem;
    margin-right: 0.4rem;
    background: rgba(186, 193, 200, 0.1);
    border-radius: 0.06rem;
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #1d1d1d;
    text-align: center;
    line-height: 0.96rem;
    margin-top: 0.18rem;
    margin-bottom: 0.48rem;
  }
}

.form {
  //padding-top: 0.48rem;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  padding-bottom: 0.66rem;
  .form-title {
    font-family: PingFangSC-Regular;
    font-weight: bold;
    font-size: 24px;
    color: #1d1d1d;
    text-align: left;
    line-height: 0.67rem;
  }

  .form-content {
    margin-top: 0.48rem;
    // height: 0.5rem;

    .form-item-phone {
      box-sizing: content-box;
      height: 1rem;
      margin-bottom: 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .zone {
        position: relative;
        height: 1rem;
        width: 1.5rem;
        box-sizing: border-box;
        padding-left: 0.2rem;
        @include border(#cccccc) {
          border-radius: 6px;
        }

        display: flex;
        justify-content: flex-start;
        align-items: center;
        select {
          z-index: 100;
          display: inline-block;
          height: 0.45rem;
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #1d1d1d;
          min-width: 0.6rem;
          border-style: none;
        }
        span {
          display: inline-block;
          width: 0.2rem;
          height: 0.2rem;
          //margin-left: 0.12rem;
          background: url("https://assets.urwork.cn/image/v3/arrow_down.png")
            no-repeat;
          background-size: 100% 100%;
        }
      }
      .user-contact {
        position: relative;
        box-sizing: border-box;
        width: 4.9rem;
        height: 1rem;
        @include border(#cccccc) {
          border-radius: 6px;
        }
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 0.2rem;
        .input-phone {
          //position: absolute;
          z-index: 100;
          display: inline-block;
          border-style: none;
          width: 4.5rem;
          height: 0.45rem;
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #1d1d1d;
        }
      }
    }
    .form-item {
      position: relative;
      height: 1rem;
      margin-bottom: 0.5rem;
      padding-left: 0.2rem;
      box-sizing: content-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      @include border(#cccccc) {
        border-radius: 6px;
      }
      input {
        z-index: 100;
        display: inline-block;
        min-width: 5rem;
        height: 0.45rem;
        background: #ffffff;
        border-style: none;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #1d1d1d;
      }

      .location-icon {
        display: inline-block;
        margin-right: 0.31rem;
        width: 0.4rem;
        height: 0.4rem;
        background: url("https://assets.urwork.cn/image/v3/location.png")
          no-repeat;
        background-size: 100% 100%;
      }

      .people-icon {
        display: inline-block;
        margin-right: 0.31rem;
        width: 0.4rem;
        height: 0.4rem;
        background: url("https://assets.urwork.cn/image/v3/people.png")
          no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  .form-sbumit {
    height: 0.96rem;
    margin-bottom: 0.3rem;
    background: #1d1d1d;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      height: 0.32rem;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      font-weight: bold;
      color: #ffffff;
      text-align: center;
      line-height: 0.32rem;
    }
  }
}

.manager {
  width: 100%;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  padding-bottom: 0.66rem;
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
  // padding-top: 0.66rem;
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
            width: 2.4rem;
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
            font-family: PingFangSC-Regular;
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
        position: relative;
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
        position: relative;
        @include border(#363636) {
          border-radius: 0.35rem;
        }
        font-family: PingFangSC-Semibold;
        color: #1d1d1d;
      }
    }
  }

  .city-dialog {
    margin-top: 0.4rem;
    margin-left: 0.4rem;
    //margin-right: 0.4rem;
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
      margin-bottom: 0.24rem;
    }

    .select-city {
      display: inline-block;
      position: relative;
      box-sizing: content-box;
      font-family: PingFangSC-Semibold;
      font-size: 13px;
      color: #1d1d1d;
      text-align: center;
      line-height: 13px;

      @include border(#363636) {
        border-radius: 32px;
      }
      padding: 0.17rem 0.44rem;
      margin-bottom: 0.55rem;
    }
    .list-main {
      position: relative;
      height: 9.1rem;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;

      .index {
        position: fixed;
        top: 20%;
        right: 0.3rem;
        width: 12px;
        ul {
          li {
            font-family: PingFangSC-Medium;
            font-size: 12px;
            color: #333333 !important;
            letter-spacing: 0;
            text-align: center;
            line-height: 19px;
          }
        }
      }
      .list {
        .item {
          .letter {
            font-family: Helvetica;
            font-size: 18px;
            color: #1d1d1d;
            margin-top: 0.5rem;
          }
          .cities {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            margin-top: 0.24rem;
            .city-item {
              display: inline-block;
              position: relative;
              height: 0.26rem;
              box-sizing: content-box;
              padding: 0.17rem 0.36rem;
              margin-right: 0.18rem;
              margin-bottom: 0.3rem;
              @include border(#d6d6d6) {
                border-radius: 32px;
              }
              font-family: PingFangSC-Medium;
              font-size: 13px;
              color: #808080;
              text-align: center;
              line-height: 0.26rem;
            }
          }
        }
      }
    }
  }
}

input::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #cfcfcf;
}

input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #cfcfcf;
}

input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #cfcfcf;
}

input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #cfcfcf;
}
</style>



