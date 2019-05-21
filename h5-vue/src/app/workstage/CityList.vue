<template>
  <page-wrap class="page-workstage">
    <title v-title>{{title}}</title>

    <page-header :isHeadroom="false" v-show="headShow" v-bind:style="{ opacity: opacityNum }">
      <topbar :type="'back'" :hideNativeTitleBar="true" :nativeBack="true" :nativeStatusBarStyle=1>
        <template slot="title">选择城市</template>
      </topbar>
    </page-header>
    <page-main :show="show">
      <div class="banner" v-bind:style="{ paddingTop: iphoneXtop+'px' }">
        <object>
        <div id="back_white" class="back" @click="closed({path: '/v2/workStage/stageList', query: {name: cityName, code: cityCode}})"></div>
        </object>
        <div class="mid">选择城市</div>
        <div class="rig"> </div>
      </div>
      <div class="hot_city" v-bind:style="{ marginTop: iphoneXhotop+'px' }">
        <h4>热门城市</h4>
        <ul>
          <object>
            <li @click="closed({path: '/v2/workStage/stageList', query: {name: item.cityName, code: item.cityCode}})" v-for="item in hotCity" :code="item.cityCode">{{item.cityName}}</li>
          </object>
        </ul>
      </div>
      <div id="main_list" class="list">
        <h4>全部城市</h4>
        <ul>
          <li>
            <h6 id="1">#</h6>
            <ul>
              <object>
              <li class="item" @click="closed({path: '/v2/workStage/stageList', query: {name: '全部城市', code: ''}})">全部城市</li>
              </object>
            </ul>
          </li>
          <li v-for="(item,index) in allCity">
            <h6 :id="index">{{index}}</h6>
            <ul>
              <object>
              <li @click="closed({path: '/v2/workStage/stageList', query: {name: n.cityName, code: n.cityCode}})" class="item" v-for="n in item" :code="n.cityCode">{{n.cityName}}</li>
              </object>
            </ul>
          </li>
        </ul>
      </div>
      <div class="index">
        <ul>
          <!--<object>-->
          <a href="javascript:void(0)" v-on:click="goAnchor('#1')">
            <li>#</li>
          </a>
          <!--</object>-->
          <!--<object>-->
          <a href="javascript:void(0)" v-for="item in letter" v-on:click="goAnchor(item)">
            <li>{{item}}</li>
          </a>
          <!--</object>-->
        </ul>
      </div>
    </page-main>
  </page-wrap>
</template>

<script>
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import apiCityList from 'src/api/workstage/apiCityList';
  import apiIndex from 'src/api/index/apiIndex';
  import getSystemInfo from 'vendor/systemInfo/systemInfo';
  export default {
    data: () => {
      return {
        show: false,
        title:'城市列表',
        scrollTop:0,
        headShow:false,
        citySelectShow:true,
        opacityNum:0,
        hotCity:'',
        letter:'',
        allCity:'',
        cityName:'',
        cityCode:'',
        offsetTopplus:90,
        iphoneXtop:0,
        iphoneXhotop:65
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
      },
      closed:function (args) {
//        let location = getLocation();
//        if (isApp()) {
//          this.$DANativeApi.navigateTo({
//            url: `${location.origin}v2/workStage/stageList?name=`
//          })
//        } else {
//          this.$router.push({path: 'stageList', query: {name : this.$route.query.name,code:this.$route.query.code}});   //{path:'editmovie', query: {id : 111}}
//        }

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
      unique:function (arr){
        var newArr = [arr[0]];
        for(var i=1;i<arr.length;i++){
          if(newArr.indexOf(arr[i]) == -1){
            newArr.push(arr[i]);
          }
        }
        return newArr;
      },
      goAnchor:function(selector) {
//        var anchor = this.$el.querySelector(selector);
//        document.documentElement.scrollTop = anchor.offsetTop+50;
//        window.pageYOffset = anchor.offsetTop+50;
//        document.body.scrollTop = anchor.offsetTop+50;


        const currentY = document.documentElement.scrollTop || document.body.scrollTop;
        this.scroll(currentY,document.getElementById(selector).offsetTop-this.offsetTopplus);

      },
      go_stage:function (item) {
        let location = getLocation();
        if (isApp()) {
          this.$DANativeApi.navigateTo({
            url: `${location.origin}v2/workStage/stageList`
          })
        } else {
          this.$router.push({path: 'stageList', query: {name : item.cityName,code:item.cityCode}});   //{path:'editmovie', query: {id : 111}}
        }
      }
    },
    created() {

      setTimeout(() => {
        this.show = true;
      }, 200)
      apiCityList().then((res) => {
        let data = res;
        console.log(data);
        var Array = data;
        var letter = [];
        Array.map(function (obj,idx) {
          if(obj.cityNameEn){
            let a = obj.cityNameEn.substr(0,1);
            letter.push(a)
          }
        })
        var allCity = {};

        this.letter = this.unique(letter.sort());

        this.unique(letter.sort()).map(function (obj,idx) {
          let letArry = [];
          Array.map(function (ob,id) {
            if(ob.cityNameEn){
              let a = ob.cityNameEn.substr(0,1);
              if(obj == a){
                letArry.push(ob);
                allCity[obj] = letArry
              }
            }
          })
        })
        this.allCity = allCity;

        console.log(this.allCity)
      })
      apiIndex().then((res) => {
        let data = res;
        this.hotCity = data.hotCity;
        console.log(this.hotCity,'xxxxccccc');
      })
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
      this.cityName = this.$route.query.name;
      this.cityCode = this.$route.query.code;
      const systemInfo = this.$systemInfo();
//      alert(JSON.stringify(systemInfo));
      if(systemInfo.isIphoneX){
          this.iphoneXtop = 20;
          this.iphoneXhotop = 85;
      }
      if(systemInfo.isAndroid||systemInfo.isIos){
        this.iphoneXtop = 10;
        this.iphoneXhotop = 75;
      }

    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  .page-workstage{
    padding: 0 20px;
    .banner{
      width: 100%;
      height: 65px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: fixed;
      top: 0px;
      left: 0px;
      opacity: 1;
      background: #ffffff;
      z-index: 100;
      .back{
        width: 19px;
        height: 19px;
        background: url("https://assets.urwork.cn/image/v3/workstage/city_x.png") no-repeat;
        background-size: 100%;
      }
      .mid{
        font-family: PingFangSC-Medium;
        font-size: 17px;
        color: #333333;
        letter-spacing: 0;
        line-height: 32px;
        font-weight: bold;
      }
    }
    .hot_city{
      overflow: hidden;
      margin-top: 65px;
      h4{
        font-family: PingFangSC-Semibold;
        font-size: 16px;
        color: #333333;
        font-weight: 600;
      }
      ul{
        li{
          float: left;
          padding: 7px 23px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
          background: #F8F9F8;
          border-radius: 4px;
          margin-right: 10px;
          margin-top: 12px;
        }
      }
    }
    #main_list{
      margin-top: 30px;
      h4{
        font-family: PingFangSC-Semibold;
        font-size: 16px;
        color: #333333;
      }
      h6{
        height: 26px;
        line-height: 26px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #BBBBBB;
        background: #FAFAFA;
      }
      ul{
        .item{
          height: 45px;
          line-height: 45px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
        }
        &>li>ul .item{
          position: relative;
          border-bottom: 1px solid #e5e5e5;
          &:last-child{
            position: relative;
            @include border-bottom(#ffffff);
            border: none;
          }
        }
      }
    }
    .index{
      position: fixed;
      top: 30%;
      right: 0px;
      width: 30px;
      height: 100%;
      font-family: PingFangSC-Medium;
      font-size: 12px;
      color: #327AF2;
      text-align: center;
      line-height: 20px;
      ul{
        li{
          color: #327AF2!important;
        }
      }
    }
  }

</style>

