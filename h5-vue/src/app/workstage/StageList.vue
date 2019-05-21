<template>
  <page-wrap class="page-workstage">
    <title v-title>{{title}}</title>

    <page-header :isHeadroom="false" v-show="headShow" v-bind:style="{ opacity: opacityNum }">
      <topbar :type="'back'" :hideNativeTitleBar="true" :nativeBack="true" :nativeStatusBarStyle='nativeStatusBarStyle'>
        <template v-if="!citySelectShow" slot="title">
          <div class="top-title">
            <object>
              <span @click="go_city({path:'/v2/workStage/cityList', query: {name: cityName, code: cityCode}})">{{cityName}}</span>
            </object>
            <span class="triangle-down"></span>
          </div>
        </template>
        <template v-else="" slot="title">{{cityName}}<span class="triangle-down"></span></template>
      </topbar>
    </page-header>
    <page-main :show="show">
      <div class="banner">
          <div id="back_white" class="back" @click="back()" v-bind:style="{ marginTop: iphoneXtop+'px' }"></div>
          <h1>社区</h1>
          <h3 class="hh">让平行世界的人相互遇见</h3>
      </div>
      <div id="main_list" class="list">
        <object>
          <div class="select_city" v-bind:style="{ opacity: opacitysNum }" @click="go_city({path:'/v2/workStage/cityList', query: {name: cityName, code: cityCode}})">
              <span class="txt">{{cityName}}</span><span class="triangle-down"></span>
          </div>
        </object>
          <div class="ul_list">

              <st-list :apiFn="apiFn"
                         :pageSize="10"
                         :queryData="{'cityCode':this.$route.query.code}"
              >
                <!--<ul>-->
                <template slot-scope="{item}">


                  <template v-if="item.stageStatus == -1">
                    <a href="javascript:void(0);">
                      <li>
                        <div class="left">
                          <img :src="item.workstageImage+'?imageMogr2/auto-orient/thumbnail/!210x280r/gravity/Center/crop/210x280'" onerror="src='https://image.urwork.cn/default/rentstation.png?imageMogr2/auto-orient/thumbnail/!210x280r/gravity/Center/crop/210x280'">
                          <div class="ing">
                            <p>
                              <span class="ing-top">筹备中</span><br><span class="ing-bot">敬请期待</span>
                            </p>
                          </div>
                        </div>
                        <div class="right">
                          <div class="tit">{{item.stageName}}</div>
                          <div class="add">{{item.address}}</div>
                          <div class="mark" v-if="item.workstageDevices">
                            <div class="span" v-for="n in item.workstageDevices"><span>{{n.name}}</span></div>
                          </div>
                          <div class="mark toum" v-else="">
                            <div class="span"><span></span></div>
                          </div>
                          <div class="num">
                            <div class="star">
                              <span class="y" v-for="count in  Math.round(item.averageScore)"></span>
                              <span class="n" v-for="count in  (5-Math.round(item.averageScore))"></span>
                            </div>
                            <div v-if="item.reserveLongRentNum">
                              {{item.reserveLongRentNum}}个工位可租
                            </div>
                          </div>
                        </div>
                      </li>
                    </a>
                  </template>
                  <template v-else="">
                    <a :href="'http://m.urwork.cn/workstage/detail?id='+item.id">
                      <li>
                        <div class="left">
                          <img :src="item.workstageImage+'?imageMogr2/auto-orient/thumbnail/!210x280r/gravity/Center/crop/210x280'" onerror="src='https://image.urwork.cn/default/rentstation.png?imageMogr2/auto-orient/thumbnail/!210x280r/gravity/Center/crop/210x280'">
                        </div>
                        <div class="right">
                          <div class="tit">{{item.stageName}}</div>
                          <div class="add"><!--span v-if="item.natureId==2" class="manager-out">管理输出</span><span v-if="item.natureId==1" class="manager-operating">自营</span--><span>{{item.address}}</span></div>
                          <div class="mark" v-if="item.workstageDevices">
                            <div class="span" v-for="n in item.workstageDevices"><span>{{n.name}}</span></div>
                          </div>
                          <div class="mark toum" v-else="">
                            <div class="span"><span></span></div>
                          </div>
                          <div class="num">
                            <div class="star">
                              <span class="y" v-for="count in  Math.round(item.averageScore)"></span>
                              <span class="n" v-for="count in  (5-Math.round(item.averageScore))"></span>
                            </div>
                            <div v-if="item.reserveLongRentNum">
                              {{item.reserveLongRentNum}}个工位可租
                            </div>
                          </div>
                        </div>
                      </li>
                    </a>
                  </template>

                </template>
            <!--</ul>-->
              </st-list>

            <!--<no-data v-else="">暂无数据</no-data>-->
          </div>
      </div>
      <div class="app_map" @click="goappMap()">

      </div>
      <!--<div class="diolge">-->

      <!--</div>-->
      <!--<city-list></city-list>-->
    </page-main>
  </page-wrap>
</template>

<script>

  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import apiListByCity from 'src/api/workstage/apiListByCity';
  import NoData from 'component/nodata/NoData';
//  import CityList from 'app/workstage/CityList';
  import {getScheme, setScheme} from 'nativeFix';
  import StList from 'component/list/StList';

  export default {
    components: {
      NoData,
      StList
    },
    data: () => {
      return {
        isApp:isApp(),
        show: false,
        title:'社区列表',
        scrollTop:0,
        headShow:false,
        citySelectShow:true,
        opacityNum:0,
        cityCode:'',
        cityName:'全部社区',
        stageDate:'',
        iphoneXtop:32,
        opacitysNum:1,
        apiFn:apiListByCity,
        nativeStatusBarStyle:2
      }
    },
    methods: {
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
//          let location = getLocation();
//          if (isApp()) {
//            this.$DANativeApi.navigateTo({
//              url: `${location.origin}v2/workStage/cityList?name=${encodeURIComponent(name)}&code=${code}`
//            })
//          } else {
//            this.$router.push({path: 'cityList', query: {name : this.cityName,code:this.cityCode}});   //{path:'editmovie', query: {id : 111}}
//          }
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
        apiListByCity({
          "pageSize":10,
          "currentPageNo":"1",
          "cityCode":this.$route.query.code
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
      }
    },
    created() {
      this.cityCode = this.$route.query.code;
      this.cityName = this.$route.query.name||'全部社区';
      this.getDate();
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
      const systemInfo = this.$systemInfo();
      if(systemInfo.isIphoneX){
        this.iphoneXtop = 52;
      }
    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  .top-title{
    display: inline-block;
    position: relative;
    .triangle-down{
      position: absolute;
      top: 11px;
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
      font-family: PingFangSC-Medium;
      font-size: 25px;
      color: #FFFFFF;
      letter-spacing: 0;
      line-height: 16px;
      text-shadow: 0 1px 8px rgba(0,0,0,0.33);
      margin-top: 20px;
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
    margin-top: 15px;
    padding: 0 20px;
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
          display: flex;
          /*border-bottom: 1px solid #E5E5E5;*/
          padding: 19px 0;
          position: relative;
          @include border-bottom(#e5e5e5);
          .left{
            width: 90px;
            height: 120px;
            border-radius: 4px;
            overflow: hidden;
            position: relative;
            img{
              width: 100%;
              height: 100%;
              display: inline-block;
            }
            .ing{
              width: 100%;
              height: 100%;
              border-radius: 4px;
              background: rgba(40,40,40,0.4);
              position: absolute;
              top: 0;
              right: 0;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              p{
                text-align: center;
                color: #FFFFFF;
                .ing-top{
                  font-size: 14px;
                  color: #FFFFFF;
                  letter-spacing: 0;
                  text-align: center;
                  line-height: 20px;
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
          }
          .right{
            margin-left: 15px;
            flex: 1;
            /*display: flex;*/
            /*justify-content: space-between;*/
            /*flex-direction: column;*/
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            div{

            }
            .tit{
              font-family: PingFangSC-Medium;
              font-size: 18px;
              color: #333333;
              letter-spacing: 0;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            .add{
              font-family: PingFangSC-Regular;
              font-size: 13px;
              color: #666666;
              letter-spacing: 0;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              margin-top: 5px;
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
                background-color: rgba(216,216,216,0.2);
                /*opacity: 0.2;*/
                border-radius: 4px;
                margin-right: 7px;
                padding: 3px 6px;
                span{
                  color: #666666!important;
                  font-size: 12px;
                }
              }
            }
            .toum{
              opacity: 0;
            }
            .num{
              display: flex;
              justify-content: space-between;
              margin-top: 20px;
              div{
                color: #999999;
              }
              .star{
                display: inline-block;
                span{
                  width: 11px;
                  height: 11px;
                  display: inline-block;
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
        }
      }
    }
  }
</style>

