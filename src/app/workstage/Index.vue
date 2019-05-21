<template>
  <page-wrap class="page-workstage">
    <title v-title>{{title}}</title>

    <page-header :isHeadroom="false">
      <topbar v-bind:style="{ backgroundColor: '#ffffff'}" :type="'back'" :showNativeStatusBar="true" :hideNativeTitleBar="true" :nativeStatusBarStyle='1' :nativeBack="true">
          <template slot="title">
            <a href="javascript:;" id="searchLink" class="search-link">
              <span @click="gotoSearch()" style="width: 16px;height: 16px;margin-right: 8px;font-size: 16px"><i class="uricon-search-r"></i></span>
              <input v-model="searchStageName" placeholder="搜索社区名称"/>
            </a>
          </template>

          <template slot="actions"> <a class="map" @click="goappMap()"></a></template>
      </topbar>
      <div :class="{'fixed-citys':true,'fixed-citys-app':false}">
        <div class="citys">
          <ul ref="box">
            <li v-for="item in allCitys" :class="{'picked':item.picked}"  :id="item.cityCode" @click="selectOneCity(item)">{{item.cityName}}</li>
          </ul>
          <span @click="showSelCity=true" class="allcity"></span>
          <span @click="showSelCity=true" class="img"></span>
        </div>
      </div>
    </page-header>
    <page-main :show="show">
      <div id="main_list" class="list">
        <div class="ul_list">
          <st-list :apiFn="apiFn" :pageSize="10" :queryData="{
          'currentLongitude':currentLongitude,
          'currentLatitude':currentLatitude,
          'orderByDistance':1,
          'stageName':searchStageName,
          'cityCode':cityCode
          }">
            <template slot-scope="{item}">
              <!--<template>-->
                <!-- <a :href="item.stageStatus != 0 ? 'javascript:void(0);':'/workstage/detail?id='+item.id"> -->
                 <a :href="'/workstage/detail?id='+item.id">
                  <li>
                    <div class="left">
                      <img :src="item.workstageImage+'?imageMogr2/auto-orient/thumbnail/!420x248r/gravity/Center/crop/420x248/format/'+isWebp" onerror="src='https://image.urwork.cn/default/rentstation.png?imageMogr2/auto-orient/thumbnail/!210x280r/gravity/Center/crop/210x280'">
                      <div v-if="item.stageStatus != 0" class="ing">

                      </div>
                      <p v-if="item.stageStatus != 0">
                        <span class="ing-top">筹备中</span>
                        <!--<br><span class="ing-bot">敬请期待</span>-->
                      </p>
                    </div>
                    <div class="right">
                      <div class="tit"><span class="span">{{item.stageName}}</span>
                        <template v-if="item.distance">
                          <span class="meters" v-if="parseInt(item.distance)<1000">{{parseInt(item.distance)}}m</span>
                          <span class="meters" v-if="parseInt(item.distance)>=1000">{{(Math.round(parseInt(item.distance)/100)/10).toFixed(1)}}km</span>
                        </template>
                      </div>
                      <div class="add">{{item.address}}</div>
                      <div class="mark">
                        <div class="span" v-if="item.openStation">
                          <span>￥{{item.openStation}}/</span>月
                        </div>
                        <div class="span" v-else="">
                          价格请致电详询
                        </div>
                      </div>
                      <div class="num">
                        <div style="display: flex;">
                          <div class="star">
                            <span class="y" v-for="count in  Math.round(item.averageScore)"></span>
                            <span class="n" v-for="count in  (5-Math.round(item.averageScore))"></span>
                          </div>
                          <!--<div class="rate">45人评价</div>-->
                        </div>
                        <div v-if="item.reserveLongRentNum">
                          {{item.reserveLongRentNum}}个工位可租
                        </div>
                      </div>
                    </div>
                  </li>
                </a>
              </template>
              <!--<template v-else="">-->
                <!--<a :href="'http://m.urwork.cn/workstage/detail?id='+item.id">-->
                  <!--<li>-->
                    <!--<div class="left">-->
                      <!--<img :src="item.workstageImage+'?imageMogr2/auto-orient/thumbnail/!210x280r/gravity/Center/crop/210x280'" onerror="src='https://image.urwork.cn/default/rentstation.png?imageMogr2/auto-orient/thumbnail/!210x280r/gravity/Center/crop/210x280'">-->
                    <!--</div>-->
                    <!--<div class="right">-->
                      <!--<div class="tit"><span class="span">{{item.stageName}}</span><span class="meters" v-if="item.distance">{{parseInt(item.distance)}}m</span></div>-->
                      <!--<div class="add">&lt;!&ndash;span v-if="item.natureId==2" class="manager-out">管理输出</span><span v-if="item.natureId==1" class="manager-operating">自营</span&ndash;&gt;<span>{{item.address}}</span></div>-->
                      <!--<div class="mark">-->
                        <!--<div class="span" v-if="item.openStation">-->
                          <!--<span>￥{{item.openStation}}/</span>月-->
                        <!--</div>-->
                        <!--<div class="span" v-else="">-->
                          <!--价格请致电详询-->
                        <!--</div>-->
                      <!--</div>-->
                      <!--&lt;!&ndash;<div class="mark toum" v-else="">&ndash;&gt;-->
                        <!--&lt;!&ndash;<div class="span"><span></span></div>&ndash;&gt;-->
                      <!--&lt;!&ndash;</div>&ndash;&gt;-->
                      <!--<div class="num">-->
                        <!--<div style="display: flex;">-->
                          <!--<div class="star">-->
                            <!--<span class="y" v-for="count in  Math.round(item.averageScore)"></span>-->
                            <!--<span class="n" v-for="count in  (5-Math.round(item.averageScore))"></span>-->
                          <!--</div>-->
                          <!--<div class="rate">45人评价</div>-->
                        <!--</div>-->
                        <!--<div v-if="item.reserveLongRentNum">-->
                          <!--{{item.reserveLongRentNum}}个工位可租-->
                        <!--</div>-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</li>-->
                <!--</a>-->
              <!--</template>-->
            <!--</template>-->
          </st-list>
        </div>
      </div>
      <transition name="fade">
        <select-citys :show="showSelCity" :cityId="120000" @sel-city-close="showSelCity=false;" @select-city="getSelCity"></select-citys>
      </transition>
    </page-main>
  </page-wrap>
</template>

<script>

  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import apiListByCity from 'src/api/workstage/apiListByCity';
  import apiCityList from 'src/api/workstage/apiCityList';
  import apiGoodStageList from 'src/api/workstage/apiGoodStageList';
  import NoData from 'component/nodata/NoData';
  //  import CityList from 'app/workstage/CityList';
  import {getScheme, setScheme} from 'nativeFix';
  import StList from 'component/list/StList';
  import SelectCitys from 'component/picker/SelectCitys2';


  export default {
    components: {
      NoData,
      StList,
      SelectCitys
    },
    data: () => {
      return {
        isApp:isApp(),
        show: false,
        title:'优质社区',
        showSelCity: false,
        scrollTop:0,
        headShow:false,
        citySelectShow:true,
        opacityNum:0,
        cityCode:'',
        cityName:'全部社区',
        searchStageName:'',
        stageDate:'',
        iphoneXtop:32,
        opacitysNum:1,
        apiFn:apiGoodStageList,
        nativeStatusBarStyle:2,
        allCitys:[],
        currentLongitude:'',
        currentLatitude:''
      }
    },
    computed: {
      isWebp (){
        if(document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0){
          return 'webp'
        }else{
          return 'jpeg'
        }
      }
    },
    methods: {
      gotoSearch(){
        this.getDate();
      },
      getSelCity(obj){
        this.allCitys.map((item,idx)=>{
          item.cityCode == obj.cityCode ? this.$set(item,'picked',true):this.$set(item,'picked',false);
        })
        this.cityCode = obj.cityCode;
        this.cityName = obj.cityName;
        this.showSelCity = false;
        let code  = this.cityCode;
        this.$refs.box.scrollLeft = document.getElementById(code+'').offsetLeft-30;
      },
      selectOneCity(item) {
        this.allCitys.map((obj,idx)=>{
          obj.cityCode == item.cityCode ? this.$set(obj,'picked',true):this.$set(obj,'picked',false);
        })
        this.cityCode = item.cityCode;
        this.cityName = item.cityName;
      },
      scroll:function (currentY, targetY) {// 计算需要移动的距离
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
      handleScroll (el) {
        let  _this = this;
        _this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        let elh =  document.getElementById('back_white').offsetTop;
        let mah =  document.getElementById('main_list').offsetTop;
        let main = mah-elh;

        if(_this.scrollTop > 20){
          _this.headShow = true;
          _this.opacityNum = (_this.scrollTop-20)/main;
        }else{
          _this.headShow = false;
        }
        if(_this.scrollTop > main+10){
          _this.citySelectShow = false;
          _this.nativeStatusBarStyle = 2;
          _this.opacitysNum = 0;
        }else{
          _this.citySelectShow = true;
          _this.nativeStatusBarStyle = 1;
          _this.opacitysNum = 1;
        }
      },
      go_city:function (args) {
        let location = getLocation();
        let {
          path,
          query: {
            name,
            code
          }
        } = args;
        if (isApp()) {
          this.$DANativeApi.redirectTo({
            url: `${location.origin}${path}?name=${encodeURIComponent(name)}&code=${code}`
          })
        } else {
          this.$router.push(args);
        }
      },
      getDate:function () {
        apiGoodStageList({
          "pageSize":10,
          "currentPageNo":"1",
          "currentLongitude":this.currentLongitude,
          "currentLatitude":this.currentLatitude,
          "orderByDistance":0,
          "stageName":this.searchStageName,
          "cityCode":this.cityCode
        }).then(res => {
          if(res.result){
//              this.stageDate = res.result;
            this.show = true;
          }
          console.log(this.stageDate,'ssdsdsdsdsdsdsd');
        })
      },
      back:function () {
        if (isApp()) {
//          this.$DANativeApi.navigateBack();
          let url = 'homePage';
          setScheme(url);
        } else {
          this.$router.push({path: '/v2/index'});   //{path:'editmovie', query: {id : 111}}
        }
      },
      goappMap:function () {
        var url = 'communityMap?cityCode='+this.cityCode+'&cityName='+ encodeURIComponent(this.cityName)+'&source=1';
        if(isApp()){
          let version = this.$DANativeApi.apiVersionNumber;
          if(version < 331){
            this.$updateApp('3.3.1');
          }else {
            if(!navigator.geolocation){
              this.$dialog({
                type:'alert',
                content:'在系统设置中打开定位服务允许浏览器获取您的位置',
                confirmText:'去设置',
                callback(res) {
                }
              });
            }else{
              setScheme(url);
            }
          }
        }else{
          this.$openApp();
        }
      },
      getAllCitys() {
        apiCityList().then((res) => {
          this.allCitys = res;
          this.allCitys.map((obj,idx)=>{
                this.$set(obj,'picked',false)
          })
          this.allCitys.unshift({cityCode: "", cityName:"全部",cityNameEn: "",picked: true})
          console.log(this.allCitys,'22');
          this.show = true;
        })
      }
    },
    created() {
      this.$route.query.currentLongitude == "null"? this.currentLongitude = "":this.currentLongitude=this.$route.query.currentLongitude||'';
      this.$route.query.currentLatitude == "null"? this.currentLatitude = "":this.currentLatitude=this.$route.query.currentLatitude||'';
      this.getAllCitys();
//      this.getDate();
    },
    mounted() {
        console.log(app)
    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  /deep/ .page-topbar.topbar-theme-def .title {
    opacity: 1;
    margin-top: 15px;
  }
  /deep/ .page-header .header-inner {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 900;
    width: 100%;
    transition: top .2s;
    background: #ffffff;
  }
  /deep/ .page-topbar .title {
    position: relative;
    z-index: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal !important;
    word-break: normal !important;
    width: 100%;
    padding: 7px 60px 8px;
    font-size: 18px;
    font-weight: bold;
    line-height: 30px;
    text-align: center;
    opacity: 0;
    transition: .1s;
    border-radius: 3px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: .3s ease-in-out;
    transform: translateX(0);
  }
  .fade-enter{
    transition: .3s ease-in-out;
    transform: translateX(-100%);
  }
  .fade-leave-to{
    transition: .3s ease-in-out;
    transform: translateX(100%);
  }
  .top-title{
    display: inline-block;
    position: relative;
    .triangle-down{
      position: absolute;
      top: 11px;
    }
  }
  /deep/ .page-topbar.topbar-theme-def {
    background-color: #ffffff;
  }
  /deep/ .page-header .header-inner.has-border::before{
    border-bottom: 1px solid #ffffff;
  }
  .search-link {
    display: block;
    width: 100%;
    padding: 0 16px;
    background: #f5f5f5;
    border-radius: 3px;
    font-size: 14px;
    color: #999999;
    font-family: PingFangSC-Regular;
    text-align: left;
    input{
      border: none;
      background: #f5f5f5;
      margin-top: -2px;
      font-weight: 100;
    }
  }
  .app_map{
    width: 60px;
    height: 60px;
    border: 1px solid transparent;
    border-radius: 50%;
    background: url("img/map.png") no-repeat;
    background-size: 100%;
    position: fixed;
    right: 20px;
    bottom: 50px;
    z-index: 99;
  }
  .map{
    width: 24px;
    height: 24px;
    margin-bottom: 4px;
    margin-right: 15px;
    display: inherit;
    background: url("https://assets.urwork.cn/image/v3/workstage/map.png") no-repeat;
    background-size: 100% 100%;
  }
  .nodata{
    position: static!important;
  }
  .page-topbar .title{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .triangle-down {
    width: 8px;
    height: 8px;
    background: url("img/down.svg") no-repeat;
    background-size: 100%;
    /*border-left: 5px solid transparent;*/
    /*border-right: 5px solid transparent;*/
    /*border-top: 5px solid #333333;*/
    display: inline-block;
    margin-left: 5px;
  }
  .banner{
    height: 160px;
    padding: 0 20px;
    background: url("img/banner.png") no-repeat;
    background-size: cover;
    color: #ffffff;
    overflow: hidden;
    .back{
      /*margin: 32px 0 0 0;*/
      width: 10px;
      height: 30px;
      background: url("img/back_white.png") no-repeat;
      background-size: 100%;
    }
    h1{
      font-family: PingFangSC-Regular;
      font-size: 25px;
      color: #FFFFFF;
      letter-spacing: 0;
      line-height: 16px;
      text-shadow: 0 1px 8px rgba(0,0,0,0.33);
      margin-top: 20px;
      font-weight: 500;
    }
    h3{
      opacity: 0.9;
      font-family: PingFangSC-Regular;
      font-size: 15px;
      color: #FFFFFF;
      letter-spacing: 0;
      line-height: 16px;
      text-shadow: 0 1px 5px rgba(0,0,0,0.29);
      margin-top: 15px;
    }
  }
  .list{
    border-radius: 10px;
    .select_city{
      /*width: 65px;*/
      display: inline-block!important;
      height: 27px;
      line-height: 27px;
      padding: 0 10px;
      background: rgba( 227, 227, 227,0.3);
      border-radius: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-right: 20px;
      position: relative;
      .txt{
        color: #333333!important;
      }
      .triangle-down {
        width: 6px;
        height: 6px;
        /*border-left: 3px solid transparent;*/
        /*border-right: 3px solid transparent;*/
        /*border-top: 5px solid #333333;*/
        display: inline-block;
        margin-left: 5px;
        position: absolute;
        top: 10px;
        right: 10px
      }
    }
    .ul_list{
      margin-top: -4px!important;
      ul{
        li{
          padding: 24px 20px 28px 20px;
      /*    position: relative;
          @include border-bottom(#e5e5e5);*/
          border-bottom: 4px solid #f8f8f8;
          .left{
            width: 100%;
            // height: 4.28rem;
            border-radius: 4px;
            overflow: hidden;
            position: relative;
            img{
              width: 100%;
              height: 100%;
              display: inline-block;
            }
            .ing{
              /*width: 54px;*/
              /*height: 54px;*/
              /*border-radius: 4px;*/
              /*background: #555555;*/
              /*background: rgba(40,40,40,0.9);*/
              border-color: transparent #555555;
              border-width: 0 54px 54px 0;
              border-style: solid;
              position: absolute;
              top: 0;
              right: 0;
            }
            p{
              display: inline-block;
              position: absolute;
              top: 0;
              right: 0;
              text-align: center;
              color: #FFFFFF;
              margin-top: 10px;
              margin-left: 15px;
              transform:rotate(45deg);
              -ms-transform:rotate(45deg);   /* IE 9 */
              -moz-transform:rotate(45deg);   /* Firefox */
              -webkit-transform:rotate(45deg); /* Safari 和 Chrome */
              -o-transform:rotate(45deg);   /* Opera */
              .ing-top{
                font-family: PingFang-SC-Medium;
                font-size: 10px;
                color: #D8D8D8;
                letter-spacing: 0;
              }
              .ing-bot{
                font-family: PingFangSC-Regular;
                font-size: 11px;
                color: #FFFFFF;
                letter-spacing: 0;
                text-align: center;
                line-height: 20px;
              }
            }
          }
          .right{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            margin-top: 0.32rem;
            div{

            }
            .tit{
              font-family: PingFangSC-Regular;
              font-size: 18px;
              color: #1D1D1D;
              letter-spacing: 0;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              display: flex;
              justify-content: space-between;
              .span{
                width: calc(100% - 77px);
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                font-weight: 700;
              }
              .meters{
                width: 67px;
                font-family: SFProText-Regular;
                font-size: 12px;
                color: #808080;
                text-align: right;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                display: flex;
                align-items: center;
                justify-content: flex-end;
              }
            }
            .add{
              font-family: PingFangSC-Regular;
              font-size: 13px;
              color: #808080;
              letter-spacing: 0;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              margin-top: 2px;
              display: flex;
              align-items: center;
              .manager-out{
                position:relative;
                display:inline-block;
                padding: 0 6px;
                background: #FFFFFF;
                /*border: 1px solid #5196F3;*/
                border-radius: 50px;
                ont-family: PingFangSC-Regular;
                font-size: 10px;
                line-height:15px;
                color: #5196F3;
                letter-spacing: 0;
                text-align: center;
                margin-right:5px;
              }
              .manager-out:after{
                content: "";
                pointer-events: none; /* 防止点击触发 */
                box-sizing: border-box;
                position: absolute;
                width: 200%;
                height: 200%;
                left: 0;
                top: 0;
                border-radius: 50px;
                border: 1px solid #5196F3;
                transform:scale(0.5);
                -ms-transform:scale(0.5); /* IE 9 */
                -webkit-transform:scale(0.5); /* Safari and Chrome */
                -ms-transform-origin: 0 0;
                -webkit-transform-origin: 0 0;
                transform-origin: 0 0;
              }
              .manager-operating{
                position:relative;
                display:inline-block;
                background: #FFFFFF;
                /*border: 1px solid #FF7E00;*/
                border-radius: 50px;
                padding: 0 6px;
                font-family: PingFangSC-Regular;
                font-size: 10px;
                line-height:15px;
                color: #FF7E00;
                letter-spacing: 0;
                text-align: center;
                margin-right:5px;
              }
              .manager-operating:after{
                content: "";
                pointer-events: none; /* 防止点击触发 */
                box-sizing: border-box;
                position: absolute;
                width: 200%;
                height: 200%;
                left: 0;
                top: 0;
                border-radius: 50px;
                border: 1px solid #FF7E00;
                transform:scale(0.5);
                -ms-transform:scale(0.5); /* IE 9 */
                -webkit-transform:scale(0.5); /* Safari and Chrome */
                -ms-transform-origin: 0 0;
                -webkit-transform-origin: 0 0;
                transform-origin: 0 0;
              }
            }
            .mark{
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              margin-top: 5px;
              .span{
                display: inline-block;
                /*background-color: rgba(216,216,216,0.2);*/
                /*opacity: 0.2;*/
                border-radius: 4px;
                margin-right: 7px;
                /*padding: 3px 0;*/
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #808080;
                letter-spacing: 0.29px;
                span{
                  font-family: PingFangSC-Regular;
                  font-size: 16px;
                  color: #363636!important;
                  font-weight: 500;
                  letter-spacing: 0;
                }
              }
            }
            .toum{
              opacity: 0;
            }
            .num{
              display: flex;
              justify-content: space-between;
              margin-top: 4px;
              font-size: 12px;
              div{
                color: #999999;
              }
              .rate{
                margin-left: 8px;
              }
              .star{
                display: inline-block;
                padding-top: 2px;
                span{
                  width: 12px;
                  height: 12px;
                  display: inline-block;
                  margin-right: 4px;
                }
                .y{
                  background: url("img/yellow_atsr.png") no-repeat;
                  background-size: 100%;
                }
                .n{
                  background: url("img/grey_star.png") no-repeat;
                  background-size: 100%;
                }
              }
            }
          }
          &:nth-of-type(0){
            padding-top: 10px;
          }
        }
      }
    }
  }
  #main{
    padding-top: 50px;
  }
  .fixed-citys{
    position: fixed;
    top: 45px;
    background: #ffffff;
    width: 100%;
    padding: 25px 20px 0 20px;
    .citys{
      overflow: hidden;
      margin-top: -2px;
      margin-bottom: 8px;
      padding-right: 1px;
      .allcity{
        position: absolute;
        top: -1px;
        right: 0;
        width: 70px;
        height: 100%;
        background-image: linear-gradient(-90deg, #FFFFFF 50%, rgba(255,255,255,0.00) 100%);
      }
      .img{
        width: 16px;
        height: 16px;
        background: url("https://assets.urwork.cn/image/v3/workstage/all-city.png") no-repeat;
        background-size: 100%;
        position: absolute;
        top: 40px;
        right: 20px;
      }
      ul{
        white-space: nowrap;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        margin-bottom: -10px;
        padding-top: 10px;
        li{
          list-style: none;
          display: inline-block;
          height: 30px;
          line-height: 30px;
          padding: 0 15px;
          /*border: 1px solid #363636;*/
          /*border-radius: 16px;*/
          font-family: PingFang-SC-Bold;
          font-size: 13px;
          color: #808080;
          letter-spacing: 0;
          text-align: center;
          margin-right: 9px;
          margin-bottom: 10px;
          position: relative;
          @include border(#d6d6d6){
            border-radius: 32px;
          };
        }
        .picked{
          list-style: none;
          display: inline-block;
          height: 30px;
          line-height: 30px;
          padding: 0 18px;
          /*border: 1px solid #363636;*/
          /*border-radius: 16px;*/
          font-family: PingFang-SC-Bold;
          font-size: 13px;
          color: #1D1D1D;
          letter-spacing: 0;
          text-align: center;
          margin-right: 9px;
          margin-bottom: 10px;
          position: relative;
          font-weight: 500;
          @include border(#363636){
            border-radius: 32px;
          };
        }
      }
    }
  }
  .fixed-citys-app{
    position: fixed;
    top: 65px;
    background: #ffffff;
    width: 100%;
    padding: 10px 20px 0 20px;
    .citys{
      overflow: hidden;
      margin-top: -2px;
      margin-bottom: 8px;
      padding-right: 1px;
      .allcity{
        position: absolute;
        top: -1px;
        right: 0;
        width: 66px;
        height: 100%;
        background-image: linear-gradient(-90deg, #FFFFFF 50%, rgba(255,255,255,0.00) 100%);
      }
      .img{
        width: 16px;
        height: 16px;
        background: url("https://assets.urwork.cn/image/v3/workstage/all-city.png") no-repeat;
        background-size: 100%;
        position: absolute;
        top: 25px;
        right: 20px;
      }
      ul{
        white-space: nowrap;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        margin-bottom: -10px;
        padding-top: 10px;
        li{
          list-style: none;
          display: inline-block;
          height: 30px;
          line-height: 30px;
          padding: 0 18px;
          /*border: 1px solid #363636;*/
          /*border-radius: 16px;*/
          font-family: PingFang-SC-Bold;
          font-size: 13px;
          color: #1D1D1D;
          letter-spacing: 0;
          text-align: center;
          margin-right: 9px;
          margin-bottom: 10px;
          position: relative;
          @include border(#363636){
            border-radius: 32px;
          };
        }
      }
    }
  }

</style>


