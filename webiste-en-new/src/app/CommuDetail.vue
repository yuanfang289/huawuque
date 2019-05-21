<template>
  <div id="main">
    <top-bar></top-bar>
    <div class="kong"></div>
    <div class="tab">
      <div>
        <a href="javascript:void(0)">
          <router-link :to="{name: 'commu'}">
            All Locations
          </router-link>
        </a> >
        <a href="javascript:void(0)">
          <router-link :to="{name: 'commu', query:{code:cityCode,name:cityName}}">
            {{cityName}}
          </router-link>
        </a>
        >
        <a href="javascript:void(0)">{{stageNameEn}}</a>
      </div>
    </div>
    <div class="banner">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div v-for="(role,index) in imgs" class="swiper-slide">
            <img :src="role+'?imageMogr2/auto-orient/thumbnail/!1400x380r/gravity/Center/crop/1400x380'">
          </div>
          <!--<div class="swiper-slide">-->
          <!--<img src="https://image.urwork.cn/2b33c710-07d6-4d39-8ca0-3a701b43447b.jpg" alt="b">-->
          <!--</div>-->
          <!--<div class="swiper-slide">-->
          <!--<img src="https://image.urwork.cn/2b33c710-07d6-4d39-8ca0-3a701b43447b.jpg" alt="c">-->
          <!--</div>-->
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="community-detail">
      <div class="detail-box">
        <div class="left">
          <div class="info">
            <h3>{{workstage.stageNameEn}}</h3>
            <p v-html="workstage.detailEn"></p>
          </div>
          <div class="resource" v-if="hasList">
            <h3>We Provide the following resource leases</h3>
            <ul v-if="hasList">
              <li class="price-title"><span>Type</span><span>Start Price</span></li>
              <template v-for="item in serverList">
                <li v-if="item['price']>0">
                  <span>{{item['showName']}}</span>
                  <span>¥ {{item['price']}} {{item['unit']}}</span>
                </li>
              </template>
            </ul>
          </div>
          <div class="directions">
            <h3>Directions</h3>
            <p>{{workstage.addressEn}}</p>
            <div class="map-con">
              <div class="amap-page-container">
                <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" lang="en" :center="center" :zoom="zoom"
                         :plugin="plugin" :events="events" class="amap-demo">
                  <el-amap-marker v-for="(item,index) in markers" :position="item.position" :events="item.events"
                                  :icon="item.icon" :key="index"></el-amap-marker>
                  <el-amap-info-window v-if="window" :position="window.position" :visible="window.visible"
                                       :content="window.content"></el-amap-info-window>
                </el-amap>
              </div>
            </div>
          </div>
          <div class="amenities">
            <h3>Amenities</h3>
            <ul>
              <li v-for="role in workstageDevices"><i :class="'uricon-'+role.deviceIcon"></i>{{role.nameEn}}</li>
            </ul>
          </div>
          <div v-if="workstage.recommendNameEn" class="star-company">
            <h3>Star Company</h3>
            <div class="company">
              <img v-if="workstage['recommendImages']" :src="workstage.recommendImages">
              <div class="company-info">
                <h4>{{workstage.recommendNameEn}} {{workstage.recommendJobEn}}</h4>
                <p>{{workstage.recommendPricipalEn}}</p>
                <p>{{workstage.recommendIntroductionEn}}</p>
              </div>
              <div class="quotation"></div>
            </div>
          </div>
          <div class="recommendations">
            <h3>Recommendations</h3>
            <ul>
              <li v-for="item in nearWorksatge" style=" cursor:pointer;"
                  @click="$router.replace({name: 'commudetail',params:{id:item.id,name:item.stageNameEn}, query:{id:item.id,name:item.stageNameEn}})">
                <img :src="'https://image.urwork.cn/'+item.workstageImage">
                <h3 class="name">{{item.stageNameEn}}</h3>
                <p class="addr">
                  {{item.addressEn}}
                </p>
              </li>
              <!--<li>-->
              <!--<img src="https://image.urwork.cn/243a6046-e9a9-43e4-8de0-14b72f0d4fc0.jpg">-->
              <!--<h3 class="name">Beijing PKU<br> Chuangye · UCOMMUNE</h3>-->
              <!--<p class="addr">-->
              <!--11th Floor,Hailong Mansion,NO.1 Zhongguangcun Avenue-->
              <!--</p>-->
              <!--</li>-->
            </ul>
          </div>
        </div>
        <div class="right">
          <div class="apply">
            <div class="tit">
              Book A Tour
            </div>
            <div class="input-box">
              <div class="input">
                <label>Full Name</label><br>
                <Input name="full-name" ref="name" v-model="name" class="full-name"/>
              </div>
              <div class="clear"></div>
            </div>
            <div class="input-box">
              <div class="input">
                <label>Company Name</label><br>
                <Input name="company-name" ref="companyName" v-model="companyName" class="company-name"/>

              </div>
              <div class="clear"></div>
            </div>
            <div class="input-box">
              <div class="input">
                <label>Email Address</label><br>
                <Input name="email-address" ref="email" v-model="email" type="email" class="email-address"/>
              </div>
            </div>
            <div class="input-box">
              <div class="input">
                <label>Phone Number</label><br>
                <div class="phone-box">
                  <PhoneInput
                    name="mobile"
                    v-model="mobile"
                  />
                </div>
              </div>
            </div>
            <div class="input-box">
              <div class="input">
                <label>How many seats do you need?</label><br>
                <input
                  onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                  onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                  name="seatNum" ref="seatNum" v-model="seatNum" class="optional"/>
              </div>
              <div class="clear"></div>
            </div>
            <div class="btn" @click="booking()">
              Submit
            </div>
            <p class="pp">By clicking Submit you agree to our <span style="cursor: pointer" @click="$router.push({name: 'policy'})">Privacy Policy</span> and
              <span style="cursor: pointer" @click="$router.push({name: 'legal'})">Legal Statement</span> .</p>
          </div>
          <div class="member">
            <div class="tit">
              Or Contact Our Team
            </div>
            <div class="member-item manayer">
              <img v-if="workstage.linkmen&&workstage.linkmen.length>0"
                   :src="workstage.linkmen[0].image1!==''?workstage.linkmen[0].image1:workstage.linkmen[0].image2" :onerror="adminImg"/>
              <p class="name" v-if="workstage.linkmen">{{workstage.linkmen[0].nameEn}}</p>
              <p class="role" v-if="workstage.linkmen">{{workstage.linkmen[0].jobEn}}</p>
              <p class="task" v-if="workstage.linkmen">{{workstage.linkmen[0].introductionEn}}</p>
            </div>
            <div class="members" v-for="item in linkmen">
              <div class="member-item" v-for="role in item.link">
                <img :src="role.image1!==''?role.image1:role.image2" :onerror="adminImg"/>
                <p class="name">{{role.nameEn}}</p>
                <p class="role">{{role.jobEn}}</p>
              </div>
            </div>
            <div class="phone-num">
              <span></span>400-1188-891
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer style="margin-top: 128px"></Footer>
    <Modal v-model="modalshow" :footerHide="footer" width="360">
      <p slot="header">
      </p>
      <div style="text-align:center">
        <p>After this task is deleted, the downstream 10 tasks will not be implemented.</p>
        <p>Will you delete it?</p>
      </div>
      <div slot="footer">
      </div>
    </Modal>
  </div>
</template>

<script>
  import TopBar from '@/components/topbar/TopBar';
  import Footer from '@/components/footer/Footer';
  import PhoneInput from '@/components/PhoneInput';
  import apiCityList from '@/api/apiCityList';
  import apiWorkstageByCity from '@/api/apiWorkstageByCity';
  import apiWorkstageGetInfo from '@/api/apiWorkstageGetInfo';
  import apibooking from '@/api/apibooking';
  import sleep from '@/utils/sleep';
  import Swiper from 'swiper';
  import {amapManager} from 'vue-amap';
  import 'swiper/dist/css/swiper.min.css';
  export default {
    components: {
      TopBar,
      Footer,
      PhoneInput
    },
    data: function () {
      return {
        mobile: '',
        footer: true,
        amapManager,
        cityCode: 0,
        citys: [],
        workstages: [],
        workstageId: 0,
        name: '',
        companyName: '',
        email: '',
        phone: '',
        seatNum: null,
        modalshow: false,
        modal_loading: false,
        defImg: require('../assets/images/map-blue.png'),
        quotation: require('../assets/images/quotation.png'),
        adminImg: 'this.src="' + require('../assets/images/adminImg.png') + '"',
        zoom: 12,
        center: [121.59996, 31.197646],
        events: {
          init: (o) => {
            o.getCity(result => {
            });
            o.lang = "en";
          },
          'moveend': () => {
          },
          'zoomchange': () => {
          },
          'click': (e) => {

          }
        },
        plugin: [{
          pName: 'ToolBar',
          events: {
            init(instance) {
            }
          }
        }
        ],
        markers: [],
        windows: [],
        window: '',
        scrollTop: '',
        commuDetail: {},    //社区详情的数据
        stageNameEn: '',     //社区英文名字
        cityName: '',          //社区所在城市
        imgs: [],
        workstage: [],
        serviceStation: [],
        workstageDevices: [],
        linkmen: [],
        nearWorksatge: [],
        serverList: [
          {name: 'openStation', showName: 'Hot Desk', price: 0, unit: '/ month'},
          {name: 'priOffice', showName: 'Private Office', price: 0, unit: '/ month'},
          {name: 'serviceStation', showName: 'Hourly Desk', price: 0, unit: '/ hour'},
          {name: 'serviceMeetingRoom', showName: 'Meeting Room', price: 0, unit: '/ 30min'}],
        hasList: false,
      };
    },
    computed: {},
    methods: {
      close(){
        this.modalshow = false;
      },
      booking(){
        // name,
        if (this.name.trim() == '') {
          this.$Message.info('Please input full name');
          this.$refs['name'].focus();
          return false;
        }
        //companyName
        if (this.companyName.trim() == '') {
          this.$Message.info('Please input company name');
          this.$refs['companyName'].focus();
          return false;
        }

        let nationCode = "";
        let phone = "";
        let mobile = this.mobile;
        let val = mobile.split(',');
        if (val.length == 1) {
          this.$Message.info('Please input mobile');
          this.$refs['mobile'].$refs['phone'].focus();
          return false;
        } else {
          nationCode = val[0];
          phone = val[1];
        }

        if (this.email.trim() == '') {
          this.$Message.info('Please input email');
          this.$refs['email'].focus();
          return false;
        }

        if (this.seatNum == 0 || !parseInt(this.seatNum)) {
          this.$Message.info('Please input seats you need');
          this.$refs['seatNum'].focus();
          return false;
        }

        apibooking({
          workstageId: this.workstageId + '',
          name: this.name + '', companyName: this.companyName + '',
          email: this.email + '', nationCode: nationCode, phone: phone + '', seatNum: this.seatNum, lang: 'EN'
        }).then(res => {
          if (res.retCode === 0) {
            this.$Message.info("Your application has been submitted");
            sleep(800).then(() => {
                location.reload();
              }
            )
          } else {
            this.$Message.info(res.retMsg);
          }
        });
      },
      getInfo (res) {
        this.commuDetail = res;
        this.cityCode = this.commuDetail.data.workstage.cityCode;
        this.workstageId = this.commuDetail.data.workstage.id;
        this.imgs = this.commuDetail.data.imgs;
        this.workstage = this.commuDetail.data.workstage;
        this.nearWorksatge = this.commuDetail.data.nearWorksatge;
        this.serviceStation = this.commuDetail.data.serviceStation;
        this.workstageDevices = this.commuDetail.data.workstageDevices;
        this.center = [this.workstage.longitude, this.workstage.latitude];
        //"priOffice":4444,
        //"openStation":3000,
        //serviceStation
        //serviceMeetingRoom
        if (this.workstage['openStation']) {
          this.hasList = true;
          this.$set(this.serverList[0], 'price', this.workstage['openStation'])
        }
        if (this.workstage['priOffice']) {
          this.hasList = true;
          this.$set(this.serverList[1], 'price', this.workstage['priOffice'])
        }

        if (this.commuDetail.data.serviceStation && this.commuDetail.data.serviceStation['minPrice']) {
          this.hasList = true;
          this.$set(this.serverList[2], 'price', this.commuDetail.data.serviceStation['minPrice'])
        }
        if (this.commuDetail.data.serviceMeetingRoom && this.commuDetail.data.serviceMeetingRoom['minPrice']) {
          this.hasList = true;
          this.$set(this.serverList[3], 'price', this.commuDetail.data.serviceMeetingRoom['minPrice'])
        }
        if (this.workstage['recommendImages']) {
          let imgUrl = this.workstage['recommendImages'];
            let arr = imgUrl.split(',');
            this.$set(this.workstage, 'recommendImages', "http://image.urwork.cn/" + arr[0]);

        }

        let arry = [];
        arry.push(this.workstage);
        this.workstages = arry;
        let linkArry = this.commuDetail.data.workstage.linkmen;
        let i = 0;
        let xArry = [];
        let xobj = {};
        let ret = [];
        linkArry.map((obj, idx) => {
          if (idx != 0) {
            if (i < 3) {
              xArry.push(obj);
              i++
            } else {
              xobj['link'] = xArry;
              ret.push(xobj);
              i = 0;
              xArry = [];
              xobj = {};
              xArry.push(obj);
              i++;
            }
          }
        })
        if (xArry.length > 0) {
          xobj['link'] = xArry;
          ret.push(xobj);
        }
        this.linkmen = ret;
        this.getLocation();

        var mySwiper = new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          autoplay: 1000,
          speed: 1000,
          loop: true,
          observer: true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents: true,//修改swiper的父元素时，自动初始化swiper
        });
      },
      getLocation(){
        let markers = [];
        let windows = [];

        let num = 10;
        let self = this;

        this.workstages.map((item, index) => {
          markers.push({
            position: [item.longitude, item.latitude],
            events: {},
            icon: this.defImg
          });

          windows.push({
            title: 'location',
            position: [item.longitude, item.latitude],
            content: `<div class="prompt">${item.stageNameEn}</div>`,
            visible: false
          });
        });


        this.markers = markers;
        this.windows = windows;
      },
      scroll: function (currentY, targetY) {// 计算需要移动的距离
        let needScrollTop = targetY - currentY
        let _currentY = currentY
        setTimeout(() => {// 一次调用滑动帧数，每次调用会不一样
          const dist = Math.ceil(needScrollTop / 10)
          _currentY += dist
          window.scrollTo(_currentY, currentY) // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
          if (needScrollTop > 10 || needScrollTop < -10) {
            scroll(_currentY, targetY)
          } else {
            window.scrollTo(_currentY, targetY)
          }
        }, 1)
      },
    },
    mounted(){
      this.$Message.config({
        top: 200,
        duration: 3
      });
      // window.addEventListener('scroll', this.handleScroll)
    },
    watch: {
      cityCode(value) {
        if (value !== '') {
          apiWorkstageByCity({cityCode: value, pageSize: -1}).then(res => {
            if (res.retCode === 0) {
              this.workstages = res.data.result;
            }
          });
        }
      },
      $route(){
        let id = this.$route.query.id;
        apiWorkstageGetInfo({id: id}).then(res => {
          this.getInfo(res);
        });

        this.stageNameEn = this.$route.query.name;
        this.cityName = this.$route.query.city;
      },
    },
    created(){
      apiWorkstageGetInfo({id: this.$route.query.id}).then(res => {
        this.getInfo(res);
      });

      this.stageNameEn = this.$route.query.name;
      this.cityName = this.$route.query.city;
    }
  }
</script>

<style lang="scss" scoped>
  //@import "../assets/scss/fonts/iconfont.css";

  .img-bg {
    border: none;
    background-image: url(../assets/images/search.png);
    background-repeat: no-repeat;
    background-size: 100%;
    margin: 0 auto;
  }

  @import "../assets/scss/fontsIcon/iconfont.css";
  /deep/ .swiper-pagination-bullet {
    background: #979797 !important;
    opacity: 1 !important;
  }

  /deep/ .swiper-pagination-bullet-active {
    background: #D8D8D8 !important;
  }

  /deep/ .ivu-select-selection {
    height: 42px !important;
  }

  /deep/ .ivu-input {
    height: 42px !important;
    font-size: 14px !important;
  }

  .kong {
    height: 80px;
  }

  .tab {
    margin: 0 auto;
    width: 1200px;
    height: 51px;
    line-height: 51px;
    a {
      font-family: Avenir-Medium;
      font-size: 14px;
      color: #B3B3B3;
      letter-spacing: 0;
      &:last-child {
        font-family: Avenir-Medium;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
      }
    }
  }

  .banner {
    width: 100%;
    //height: 368px;
    //background: #00a2d4;
  }

  .banner img {
    width: 100%;
    //height: 368px;
  }

  .community-detail {
    .detail-box {
      width: 12rem;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .left {
        width: 6rem;
        height: 100%;
        p {
          font-family: Avenir-Book;
          font-size: 14px;
          color: #333333;
          letter-spacing: 0;
          line-height: 21px;
          word-break: break-all;
          p {
          }
        }
        h3 {
          font-family: Avenir-Heavy;
          font-size: 20px;
          color: #333333;
          letter-spacing: 0;
          margin-bottom: 15px;
        }
        > div {
          padding: 35px 0 0 0;
        }
        .info {

        }

        .resource {
          > ul {
            width: 100%;
            > li {
              list-style: none;
              display: flex;
              justify-content: space-between;
              padding-top: 15px;
              border-bottom: solid 1px #DBDBDB;
              padding-right: 30%;
              padding-left: 10px;
              padding-bottom: 15px;
              &:nth-of-type(1) {
                // padding: 30px 0 0 0;
                span {
                  width: 110px;
                  font-family: Avenir-Heavy;
                  font-size: 16px;
                  font-weight: 800;
                  color: #333333;
                  letter-spacing: 0;
                  &:last-child {
                    color: #333333;
                  }
                }
              }
              span {
                width: 110px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #000000;
                letter-spacing: 0;
                &:last-child {
                  /*color: #658BFF;*/
                }
              }
            }

          }
        }
        .directions {
          .map-con {
            width: 100%;
            height: 230px;
            margin-top: 10px;
            .amap-page-container {
              height: 100%;
            }
          }
        }
        .amenities {
          > ul {
            overflow: hidden;
            > li {
              width: 33.33%;
              list-style: none;
              float: left;
              padding: 15px 0px 15px 15px;
              font-family: Avenir-Book;
              font-size: 14px;
              color: #666666;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
        .star-company {
          .company {
            width: 100%;
            background: #FFFFFF;
            margin-left: 54px;
            border: 1px solid #DFDFDE;
            display: flex;
            justify-content: space-between;
            position: relative;
            img {
              width: 100px;
              height: 100px;
              background: #000000;
              display: inline-block;
              position: absolute;
              left: -50px;
              top: 20px;
            }
            .company-info {
              display: inline-block;
              height: 100%;
              flex: 1;
              padding: 30px 10px 36px 90px;
              h4 {
                font-family: Avenir-Heavy;
                font-size: 14px;
                color: #333333;
                letter-spacing: 0;
              }
              p {
                font-family: Avenir-Light;
                min-height: 63px;
                font-size: 14px;
                color: #333333;
                letter-spacing: 0;
                line-height: 15px;
                &:nth-of-type(1) {
                  padding: 10px 0;
                }
              }
            }
          }
        }
        .recommendations {
          ul {
            overflow: hidden;
            margin-top: 25px;
            > li {
              width: 290px;
              height: 320px;
              float: left;
              display: inline-block;
              background: #FFFFFF;
              border: 1px solid #E4E4E4;
              text-align: center;
              &:nth-child(even) {
                margin-left: 20px;
              }
              img {
                width: 100%;
                height: 170px;
              }
              .name {
                /*padding: 0 72px;*/
                font-family: Avenir-Heavy;
                font-size: 20px;
                color: #333333;
                letter-spacing: 0;
                text-align: center;
                line-height: 25px;
                white-space: nowrap;
                margin-top: 25px;
                padding-left: 20px;
                padding-right: 20px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .addr {
                /*padding: 0 20px;*/
                font-family: Avenir-Roman;
                font-size: 14px;
                color: #666666;
                letter-spacing: 0;
                text-align: center;
                line-height: 15px;
                margin-top: 12px;
                padding-left: 20px;
                padding-right: 20px;
              }
            }
          }
        }
      }
      .right {
        width: 5rem;
        .apply {
          padding: .4rem;
          background: #FAF9F3;
          border: 1px solid #EBEBEB;
          margin-top: 20px;
          .tit {
            font-family: PingFangSC-Semibold;
            font-size: 30px;
            color: #000000;
            letter-spacing: 0;
          }
          .input-box {
            width: 100%;
            /*overflow: hidden;*/
            margin-top: 17px;
            label {
              font-family: Avenir-Book;
              font-size: 14px;
              color: #484848;
              letter-spacing: 0;
              text-align: center;
            }
            input {
              width: 100%;
              height: 42px;
              background: #FFFFFF;
              border: 1px solid #EBEBEB;
              border-radius: 2px;
              margin-top: 4px;
              text-indent: 1em;
            }
            .phone-box {
              width: 100%;
              position: relative;
              .zone {
                width: 65px;
                height: 42px;
                position: absolute;
                top: 5px;
                left: 1px;
                background: #F5F5F5;
                border-radius: 2px;
                p {
                  margin: 0;
                  height: 42px;
                  line-height: 42px;
                  text-align: center;
                  position: relative;
                  span {
                    /*width: 8px;*/
                    height: 3px;
                    background-size: 100%;
                    border-left: 3px solid transparent;
                    border-right: 3px solid transparent;
                    border-top: 4px solid #000000;
                    display: inline-block;
                    margin-left: 5px;
                  }
                }
              }
              input {
                text-indent: 67px;
              }
            }
            .input {
              .city {
                width: 150px;
                float: left;
              }
              .all-communities {
                width: 463px;
                float: right;
              }
            }
          }
          .btn {
            cursor: pointer;
            width: 100%;
            height: 44px;
            line-height: 44px;
            text-align: center;
            background: #FFD53D;
            border-radius: 2px;
            font-family: Avenir-Book;
            font-size: 14px;
            color: #000000;
            margin-top: 20px;
            &:hover {
              background: #ffce1d;
              border-radius: 1px;
            }
          }
          .pp {
            font-family: Avenir-Book;
            font-size: 14px;
            color: #484848;
            letter-spacing: 0;
            line-height: 18px;
            margin-top: 0.2rem;
            span {
              font-family: Avenir-Book;
              font-size: 14px;
              color: #658BFF;
              letter-spacing: 0;
              line-height: 18px;
            }
          }
        }
        .member {
          margin-top: 0.2rem;
          padding: .4rem;
          padding-bottom: 0;
          background: #FAF9F3;
          border: 1px solid #EBEBEB;
          .tit {
            font-family: PingFangSC-Semibold;
            font-size: 30px;
            color: #000000;
            letter-spacing: 0;
          }
          .member-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            p {
              font-family: Avenir-Book;
              font-size: 12px;
              color: #333333;
              letter-spacing: 0;
              text-align: center;
            }
            .name {
              font-family: Avenir-Heavy;
              font-size: 14px;
              color: #000000;
              letter-spacing: 0;
              margin-top: 0.31rem;
            }
            .task {
              margin-top: 0.1rem;
              width: 4rem
            }
            img {
              width: 0.8rem;
              height: 0.8rem;
              border-radius: 50%;
            }
          }
          .members {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 15px 0;
            .member-item {
              width: 1.02rem;
              .name {
                margin-top: 0.11rem;
              }
            }
          }
          .phone-num {
            height: 0.65rem;
            line-height: 0.65rem;
            border-top: 1px solid #EFEFEF;
            margin-top: 0.44rem;
            text-align: center;
            font-family: ArialMT;
            font-size: 18px;
            color: #000000;
            letter-spacing: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
              width: 0.3rem;
              height: 0.3rem;
              display: inline-block;
              background: url("../assets/images/phone.png") no-repeat center;
              margin-right: 0.08rem;
            }
          }
        }
      }
    }
  }

  .community {
    overflow: hidden;
    margin: 0 auto;
    /*position: relative;*/
    .left {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      .list-box {
        width: 780px;
        float: left;
        .top {
          margin-top: 20px;
          a {
            font-family: Avenir-Medium;
            font-size: 14px;
            color: #000000;
            letter-spacing: 0;
          }
          input {
            width: 300px;
            height: 32px;
            background: #FFFFFF;
            border: 1px solid #DADADA;
            border-radius: 2px;
            margin-left: 335px;
          }
        }
        h1 {
          margin-top: 32px;
        }
        > ul {
          overflow: hidden;
          margin-top: 25px;
          > li {
            width: 380px;
            height: 455px;
            float: left;
            display: inline-block;
            background: #FFFFFF;
            border: 1px solid #E4E4E4;
            text-align: center;
            &:nth-child(even) {
              margin-left: 20px;
            }
            img {
              width: 100%;
              height: 170px;
            }
            .name {
              padding: 0 72px;
              font-family: Avenir-Heavy;
              font-size: 20px;
              color: #333333;
              letter-spacing: 0;
              text-align: center;
              line-height: 25px;
              white-space: nowrap;
              margin-top: 25px;
            }
            .addr {
              padding: 0 20px;
              font-family: Avenir-Roman;
              font-size: 14px;
              color: #666666;
              letter-spacing: 0;
              text-align: center;
              line-height: 15px;
              margin-top: 12px;
            }
            > ul {
              margin-top: 15px;
              height: 60px;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              > li {
                padding: 0 20px;
                list-style: none;
                span {
                  font-family: PingFangSC-Semibold;
                  font-size: 14px;
                  color: #000000;
                  letter-spacing: 0;
                  &:nth-of-type(1) {
                    float: left;
                  }
                  &:nth-of-type(2) {
                    float: right;
                  }
                }
              }
            }
            .btn {
              width: 100%;
              margin: 0 auto;
              button {
                width: 340px;
                height: 40px;
                background: #FFD53D;
                border-radius: 2px;
                border: none;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #000000;
                letter-spacing: 0;
              }
              margin-top: 20px;
            }
          }
        }
      }
    }
    .right {
      /*position: fixed;*/
      /*bottom: 0;*/
      /*right: 0;*/
      width: 480px;
      height: 80vh;
      padding: 10px 10px 10px 10px;
      float: right;
      .amap-page-container {
        width: 100%;
        height: 100%;
      }
    }
  }

  .quotation {
    background: url("../assets/images/quotation.png");
    background-size: 25px 21px;
    width: 25px;
    height: 21px;
    margin-right: 20px;
    margin-top: 20px;

  }
</style>


