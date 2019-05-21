<template>
  <div id="main">
    <top-bar></top-bar>
    <div class="kong"></div>
    <div class="community">
      <div class="left">
        <div class="list-box">
          <div class="top">
            <div>
              <div style="cursor:pointer" class="all-commu" v-if="cityCode==''" @click="showAll(allModalshow)" href="javascript:void(0);">All Locations <img height="3px" width="5px"  style="margin-bottom: 3px" src="../assets/images/down.png"/></div>
              <a v-if="cityCode!==''" @click="goList()" href="javascript:void(0);">All Locations ></a>

              <transition name="my-hide">
                <a v-show="!allModalshow" href="javascript:void(0);">{{cityNameEn}}</a>
              </transition>
              <transition name="my-hide">
                <div class="search" v-show="!allModalshow">
                  <input type="search" v-model="searchText" placeholder="Search Communities" @keyup.enter="remoteMethod()"/>
                  <span class="search-icon" @click="remoteMethod()" ></span>
                </div>
              </transition>
            </div>
          </div>
          <h1>{{cityNameEn}}</h1>
          <transition name="my-hide">
            <ul v-show="!allModalshow">

              <li style="cursor:pointer" v-for="item in workstages" @click="$router.push({name: 'commudetail', query:{id:item.id,name:item.stageNameEn,city:citysMap.get(item.cityCode)}})">
               <img :src="item.workstageImage" onerror="javascript:this.src='https://image.urwork.cn/5288755d-a3b4-4462-8da0-92b019611a48.png';">
                <h3 class="name">{{item['stageNameEn']}}</h3>
                <p class="addr">
                  {{item['addressEn']}}
                </p>
                <ul v-if="item['openStation']||item['priOffice']">
                  <li v-if="item['openStation']">
                    <span>Hot Desk</span>
                    <span>¥{{item['openStation']}}/month</span>
                  </li>
                  <li v-if="item['priOffice']">
                    <span>Private Office</span>
                    <span>¥{{item['priOffice']}}/month</span>
                  </li>
                </ul>
                <ul v-if="!item['openStation']&&!item['priOffice']"><li style="font-family: PingFangSC-Semibold;font-size: 14px;color: #000000;">This community is not priced currently</li></ul>
                <div class="btn">
                  <a :href="'javascript:void(0)'">

                    <button>Learn More</button>

                  </a>
                </div>
              </li>

            </ul>
          </transition>
          <div id="dataLast"></div>
        </div>
      </div>
      <transition name="my-hide">
        <div :class="{ 'right':true,'fixed':!mapflag,'relative':mapflag}" v-show="!allModalshow">
          <div class="amap-page-container">
            <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" lang="en" :center="center" :zoom="zoom"
                     :events="events" :plugin="plugin" class="amap-demo" >
              <el-amap-marker v-for="(item,index) in markers" :position="item.position" :events="item.events"
                              :icon="item.icon" :key="index"></el-amap-marker>
              <el-amap-info-window v-if="window" :position="window.position" :visible="window.visible"
                                   :content="window.content" :offset="window.offset" :autoMove="window.autoMove"></el-amap-info-window>
            </el-amap>
          </div>
        </div>
      </transition>
    </div>
    <transition name="my-hide">
      <div style="margin-top: 128px">
        <Footer v-show="!allModalshow"></Footer>
      </div>
    </transition>
    <transition name="my-trans">
      <div v-show="allModalshow" class="all-city-modal">
        <div class="content">
          <transition name="my-hide">
            <a v-show="allModalshow" class="all-closed" href="javascript:void(0);" @click="showAll(allModalshow)">
              <img width="30px" height="30px" style="margin-top: 20px;margin-left: 20px" src="../assets/images/close.png"/>
            </a>
          </transition>
          <ul>
            <li v-for="item in citys">
              <h5>{{item.provinceNameEn}}</h5>
              <p v-for="role in item.cities" @click="search(role)">{{role.cityNameEn}}</p>
            </li>
          </ul>
        </div>
      </div>
    </transition>

  </div>
</template>
<!--<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>-->
<script>
  //  import $ from "jquery";
  import TopBar from '@/components/topbar/TopBar';
  import Footer from '@/components/footer/Footer';
  import apiCityList from '@/api/apiCityList';
  import apiMapList from '@/api/apiMapList';
  import apiWorkstageByCity from '@/api/apiWorkstageByCity';
  import apiSearchWorkstage from '@/api/apiSearchWorkstage';
  import apiWorkstageGetAllLocations from '@/api/apiWorkstageGetAllLocations';
  import Swiper from 'swiper';
  import {AMapManager} from 'vue-amap';
  import 'swiper/dist/css/swiper.min.css';
  export default {
    name: 'commu',
//    metaInfo: {
//      title: 'My Example App', // set a title
//      meta: [
//        {
//          name: 'keywords',
//          content: 'asdfg'
//        },
//        {
//          name: 'description',
//          content: 'werty'
//        }
//      ]
//    },
    components: {
      TopBar,
      Footer
    },
    data: function () {
      let self = this;
      return {
        isSearch:false,
        searchText: "",
        searchResult: [],
        loading: false,
        pageSize: 10,
        pageNO: 1,
        mobile: '',
        footer: true,
        amapManager:new AMapManager(),
        cityCode: '',
        cityNameEn: '',
        citys: [],
        citysMap:new Map(),
        workstages: [],
        allWorkstages: [],
        workstageId: 0,
        modalshow: false,
        allModalshow: false,
        modal_loading: false,
        defImg: require('../assets/images/map-blue.png'),
        selImg:require('../assets/images/map-black.png'),
        zoom: 1,
        center: [113.25749, 23.08491],
        events: {
          init: (o) => {
            o.getCity(result => {
            });
            o.lang = "en";
            setTimeout(() => {
              let cluster = new AMap.MarkerClusterer(o, self.markerRefs,{
                gridSize: 30,
                maxZoom:10,
                renderCluserMarker: self._renderCluserMarker
              });
            }, 1000);
          },
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
        markerRefs: [],
        windows: [],
        window: '',
        scrollTop:'',
        mapflag:''
      };
    },
    computed: {},
    methods: {
        goList(){

          if( this.$route.query.code){
            this.$router.replace({name: 'commu',params:{code:-1}})
          }else{
            location.reload();
          }

        },
      godetail(id,name,city){
        this.$router.push({name: 'commudetail', query:{id:id,name:name,city:city}})
      },
      _renderCluserMarker(context) {
        const count = this.markers.length;

        let factor = Math.pow(context.count/count, 1/18)
        let div = document.createElement('div');
        let Hue = 180 - factor* 180;
        let bgColor = 'hsla('+Hue+',100%,50%,0.7)';
        let fontColor = 'hsla('+Hue+',100%,20%,1)';
        let borderColor = 'hsla('+Hue+',100%,40%,1)';
        let shadowColor = 'hsla('+Hue+',100%,50%,1)';
        div.style.backgroundColor = bgColor
        let size = Math.round(30 + Math.pow(context.count/count,1/5) * 20);
        div.style.width = div.style.height = size+'px';
        div.style.border = 'solid 1px '+ borderColor;
        div.style.borderRadius = size/2 + 'px';
        div.style.boxShadow = '0 0 1px '+ shadowColor;
        div.innerHTML = context.count;
        div.style.lineHeight = size+'px';
        div.style.color = fontColor;
        div.style.fontSize = '14px';
        div.style.textAlign = 'center';
        context.marker.setOffset(new AMap.Pixel(-size/2,-size/2));
        context.marker.setContent(div)
      },
      remoteMethod(){
        this.isSearch=true;
        let query = this.searchText;
        if (query.trim() == '') {
          this.isSearch=false;
          this.workstages=this.allWorkstages;
          return;
        }
        apiSearchWorkstage({lang: 'EN', str: query}).then(res => {
          if (res.retCode === 0) {
            let data = res.data;
            this.searchResult = data;
            this.cityCode='';
            this.cityNameEn='';
            if (data.length > 0) {
              this.workstages = this.searchResult;
              //this.center = [this.workstages[0].longitude, this.workstages[0].latitude];
              //this.getLocation();
            }else{
              this.workstages =[];
              this.markers = [];
              this.windows = [];
              this.$Message.info("no data!");
            }
          } else {
            this.searchResult = [];

          }
        });
      },
      showAll (n) {
        if (n == false) {
          this.allModalshow = true;
        } else {
          this.allModalshow = false;
        }
      },
      close(){
        this.modalshow = false;
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
      handleScroll (el) {
        this.mapflag = ($(window).scrollTop()>=$("#footer-off").offset().top-$(window).height()-50);
        if(this.isSearch||this.cityCode==''){return}
        let scrollTop = $(document).scrollTop();
        let windowH = $(window).height();
        let offsetH = $("#dataLast").offset().top;
        if (scrollTop + windowH >= offsetH && !this.loading) {
          //加载数据
          this.loading=true;
          let pageNO=parseInt(this.pageNO)+1;
          apiWorkstageByCity({cityCode: this.cityCode, pageSize: this.pageSize, currentPageNo:pageNO,}).then(res => {
            if (res.retCode === 0) {
                if(res.data.lastPageNo<=(pageNO-1)){
                    return;
                }
              this.workstages = this.workstages.concat(res.data.result);
              //this.center = [this.workstages[0].longitude, this.workstages[0].latitude];
                //this.getLocation();
              this.loading=false;
              this.pageNO=this.pageNO+1;

            }
          });
        }
      },
      getLocation(){
        let markers = [];
        let windows = [];
        let num = 10;
        let self = this;
        this.workstages.map((item, index) => {
          markers.push({
            position: [item.longitude, item.latitude],
            events: {
              mouseover() {
                self.windows.forEach(window => {
                  window.visible = false;
                  self.$nextTick(() => {
                    self.$set(self.markers[index], 'icon', self.selImg);
                  });
                });

                self.window = self.windows[index];
                self.$nextTick(() => {
                  self.window.visible = true;
                });
              },
              click(){
                self.$router.push({name: 'commudetail', query:{id:item.id,name:item.stageNameEn,city:self.citysMap.get(item.cityCode)}})
              },
              mouseout(){
                self.windows.forEach(window => {
                  window.visible = false;
                  self.$nextTick(() => {
                    self.$set(self.markers[index], 'icon', self.defImg);
                  });
                });
              },
              init(o) {
                self.markerRefs.push(o);
              }
            },
            icon: this.defImg
          });
          windows.push({
            title: 'location',
            panel: 'panel',
            position: [item.longitude, item.latitude],
            offset:[-7, -12],
            autoMove:true,
            content:this.getHtml(item),
            visible: false
          });
        });
        this.markers = markers;
        this.windows = windows;
        $('.amap-zoom-labels').remove();
      },
      search(res) {
        this.searchText = "";
        this.cityCode = res.cityCode;
        this.cityNameEn = res.cityNameEn;
        this.showAll(1);
      },
      getHtml(item){
        let url='/en/commu/detail?id='+item.id+'&name='+item.stageNameEn+'&city='+this.citysMap.get(item.cityCode);
        let htmlStr='';
        htmlStr+='<div  onclick="location.href=\''+url+'\'" class="map-hover" style=" cursor: pointer;width: 250px;padding-bottom: 20px;display: inline-block;background: #FFFFFF;border: 0px solid #E4E4E4;text-align: center;font-size: 0;">';
        htmlStr+='<img data-v-1fe7f452="" style="width: 100%;height: 112px;" src="'+item['workstageImage']+'" onerror="javascript:this.src=\'https://image.urwork.cn/cd670007-a59d-4c6c-aa87-42e7aea070d5.png\';">';
        htmlStr+='<h3 data-v-1fe7f452="" style="padding: 0 42px;font-family: Avenir-Heavy;font-size: 16px;color: #333333;letter-spacing: 0;text-align: center;line-height: 25px;white-space:nowrap;margin-top: 15px;overflow: hidden;text-overflow:ellipsis;" class="name">'+item['stageNameEn']+'</h3>';
        htmlStr+='<p data-v-1fe7f452="" style="padding: 0 20px;font-family: Avenir-Roman;font-size: 12px;color: #666666;letter-spacing: 0;text-align: center;line-height: 15px;margin-top: 4px;" class="addr">';
        htmlStr+=item['addressEn'];
        htmlStr+='</p>';
        if(item['openStation']||item['priOffice']){
        htmlStr+='<ul style="margin-top: 15px;min-height:30px; max-height: 60px;display: flex;flex-direction: column;justify-content: space-around;">';
        if(item['openStation']){
        htmlStr+='<li style="padding: 0 20px;list-style: none;font-weight: 600;"><span style="font-family: PingFangSC-Semibold;font-size: 14px;color: #000000;letter-spacing: 0;float: left;">Hot Desk</span> <span style="font-family: PingFangSC-Semibold;font-size: 14px;color: #000000;letter-spacing: 0;float: right">¥'+item['openStation']+'/month</span></li>';
        }
        if(item['priOffice']){
          htmlStr+='<li style="padding: 0 20px;list-style: none;font-weight: 600;"><span style="font-family: PingFangSC-Semibold;font-size: 14px;color: #000000;letter-spacing: 0;float: left;">Private Office</span> <span style="font-family: PingFangSC-Semibold;font-size: 14px;color: #000000;letter-spacing: 0;float: right">¥'+item['priOffice']+'/month</span></li>';
        }
        htmlStr+='</ul>';
        }
        htmlStr+='</div>';
        return htmlStr;
      }
    },
    mounted(){
      this.$Message.config({
        top: 200,
        duration: 3
      });
      var mySwiper = new Swiper('.swiper-container', {
        autoplay: true,
        loop: true
      });
      window.addEventListener('scroll', this.handleScroll);
    },
    destroyed(){
      window.removeEventListener('scroll', this.handleScroll, false);
    },
    watch: {
      cityCode(value) {
        if (value !== '') {
            this.loading=false;
            this.isSearch=false;
            this.pageNO=1;
          apiWorkstageByCity({cityCode: value, pageSize: this.pageSize, currentPageNo: 1,}).then(res => {
            if (res.retCode === 0) {
              this.workstages = res.data.result;
              //this.center = [this.workstages[0].longitude, this.workstages[0].latitude];
                //this.getLocation();
            }
          });
        }
      },
      $route(){
        let code = this.$route.params.code;
        if(code==-1){
          location.reload();
        }
      }

    },
    created(){
      apiCityList().then(res => {
        if (res.retCode === 0) {
          let citys = res.data;
           citys.map(item=>{
             this.citysMap.set(item.cityCode,item.cityNameEn);
           })

        }
      });
      apiWorkstageGetAllLocations().then(res => {
        if (res.retCode === 0) {
          this.citys = res.data;
          let code = this.$route.query.code;
          let name = this.$route.query.name;
          if (code && name) {
            apiMapList().then(res=>{
              if (res.retCode === 0) {
                let data=res.data;
                data.map(item=>{
                    let ws=item.workstages;
                    ws.map(item1=>{
                      this.workstages.push(item1);
                    });
                  }
                )
                //this.workstages = res.data;
                //this.center = [this.workstages[0].longitude, this.workstages[0].latitude];
                this.getLocation();
                this.allWorkstages=this.workstages;
                this.cityCode = code;
                this.cityNameEn = name;
              }
            });
          } else {
            //this.cityCode = this.citys[0].cities[0].cityCode;
            //this.cityNameEn = this.citys[0].cities[0].cityNameEn;
//            apiWorkstageByCity().then(res => {//{pageSize: this.pageSize, currentPageNo: 1,}
//              if (res.retCode === 0) {
//                this.workstages = res.data.result;
//                this.center = [this.workstages[0].longitude, this.workstages[0].latitude],
//                  this.getLocation();
//              }
//            });

            apiMapList().then(res=>{
                            if (res.retCode === 0) {
                                let data=res.data;
                                data.map(item=>{
                                   let ws=item.workstages;
                                     ws.map(item1=>{
                                       this.workstages.push(item1);
                                     });
                                  }
                                )
                              //this.workstages = res.data;
                              //this.center = [this.workstages[0].longitude, this.workstages[0].latitude];
                                this.getLocation();
                                this.allWorkstages=this.workstages;
                            }
            });
          }
        }
      });


    }
  }
</script>

<style lang="scss" scoped>

  /deep/ .amap-info-content{
    padding: 0px;
    border: none;
  }
  /deep/ .amap-info-close{
  display: none;
}

  .my-trans-enter-active, .my-trans-leave-active {
    transition: all .4s ease-out;
  }

  .my-trans-enter {
    transform: translateY(-700px);
    opacity: 0;
  }

  .my-trans-leave-active {
    transform: translateY(-700px);
    opacity: 0;
  }

  .my-hide-enter-active, .my-hide-leave-active {
    transition: all 1s ease-out;
  }

  .my-hide-enter {
    opacity: 0;
  }

  .my-hide-leave-active {
    opacity: 0;
  }

  .hide {
    opacity: 0;
  }
  /deep/ .amap-zoom-labels{
    display: none;
  }

  .all-city-modal {
    position: fixed;
    top: 80px;
    right: 0;
    width: 100%;
    display: inline-block;
    height: 600px;
    overflow: hidden;
    margin: 50px 0 0 0;
    padding-bottom: 150px;
    z-index: 9999;
    .content {
      background: #ffffff;
      width: 102%;
      height: 100%;
      overflow-y: scroll;
      border-top: 1px solid #e5e5e5;
      margin-top: 17px;
      .all-closed {
        width: 0.4rem;
        height: 0.4rem;
        font-size: 25px;
        float: right;
        position: absolute;
        right: 80px;
        color: #000000;
      }
      ul {
        width: 12rem;
        margin: 0 auto;
        margin-top: 30px;
        -webkit-column-count: 5;
        -moz-column-count: 5;
        column-count: 5;
        -moz-column-gap: 20px;
        -webkit-column-gap: 20px;
        column-gap: 20px;
        padding: 10px 0;
        li {
          width: 1.5rem;
          list-style: none;
          display: inline-block;
          border-radius: 4px;
          margin-bottom: 35px;
          cursor: pointer;
          text-align: left;
          h5{
            font-family: Avenir-Black;
            font-size: 16px;
            color: #000000;
            letter-spacing: 0;
          }
          p{
            ont-family: Avenir-Book;
            font-size: 14px;
            color: #000000;
            letter-spacing: 0;
          }
        }
      }
    }
  }

  /*站位*/
  .kong {
    height: 80px;
  }

  /*社区*/
  .community{
      overflow: hidden;
      width: 12rem;
      margin: 0 auto;
      position: relative;
      .left{
      height: 100%;
      float: left;
      width: 7.8rem;
      .list-box {
        width: 7.8rem;
        float: left;
        .top {
          margin-top: 17px;
          .all-commu{
            font-family: Avenir-Black;
            font-size: 14px;
            color: #333333;
            letter-spacing: 0;
            height: 32px;
            line-height: 32px;
            display: inline-block;
            border: 1px solid rgba(170,170,170,0.50);
            padding: 0 12px;
          }
          /*span{*/
            /*font-family: Avenir-Medium;*/
            /*font-size: 14px;*/
            /*color: #000000;*/
            /*letter-spacing: 0;*/
            /*border: 1px solid rgba(170,170,170,0.50);*/
            /*height: 32px;*/
          /*}*/
          a {
            font-family: Avenir-Medium;
            font-size: 14px;
            color: #000000;
            letter-spacing: 0;
          }
          input {
            width: 3rem;
            height: 32px;
            background: #FFFFFF;
            border: 1px solid #DADADA;
            border-radius: 2px;
            margin-left: 3.35rem;
            float: right;
          }
          .search {
            width: 3rem;
            position: relative;
            display: inline-block;
            float: right;
            input {
              text-indent: 32px;
              font-size: 16px;
            }
            .search-icon {
              position: absolute;
              top: 0;
              left: 0;
              width: 32px;
              height: 32px;
              background: url("../assets/images/search.png") no-repeat center;
              background-size: 50%;
            }
          }
        }
        h1 {
          margin-top: 32px;
          color:#000000;
        }
        > ul {
          overflow: hidden;
          margin-top: 25px;
          min-height: 910px;
          > li {
            width: 3.8rem;
            height: 455px;
            float: left;
            display: inline-block;
            background: #FFFFFF;
            border: 1px solid #E4E4E4;
            text-align: center;
            margin-bottom: 20px;
            &:nth-child(even) {
              margin-left: 20px;
            }
            img {
              width: 100%;
              height: 170px;
            }
            .name {
              padding: 0 0.72rem;
              font-family: Avenir-Heavy;
              font-size: 20px;
              color: #333333;
              letter-spacing: 0;
              text-align: center;
              line-height: 25px;
              white-space: nowrap;
              margin-top: 25px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap
            }
            .addr {
              height: 50px;
              padding: 0 20px;
              font-family: Avenir-Roman;
              font-size: 14px;
              color: #666666;
              letter-spacing: 0;
              text-align: center;
              line-height: 15px;
              margin-top: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
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
                width: 3.4rem;
                height: 40px;
                background: #FFD53D;
                border-radius: 2px;
                border: none;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #000000;
                letter-spacing: 0;
                cursor: pointer;
              }
              margin-top: 20px;
            }
          }
        }
      }
    }
    .right {
      /*position: absolute;*/
      /*bottom: 0;*/
      /*right: 0;*/
      float: right;
      width: 4.2rem;
      height: 80vh;
      padding: 0.08rem 0 0.2rem 0;
      .amap-page-container {
        width: 100%;
        height: 100%;
      }
    }
    .relative{
      position: absolute;
      bottom: 0;
      right: -50px;
    }
    .fixed{
      position: fixed;
      top: 90px;
      right: 0px;
    }
  }

  /*toubu*/
  .top-bar .tab ul li {
    &:first-child {
      span {
        background: #FFD53D;
      }
    }
  }
  /deep/ .amap-info-sharp{
    background: url("../assets/images/arr.png") no-repeat;
    margin-top: -5px;
  }


  /*地图弹框*/
  .map-hover{
    width: 250px;
    padding-bottom: 20px;
    display: inline-block;
    background: #FFFFFF;
    border: 1px solid #E4E4E4;
    text-align: center;
    font-size: 0;
    &:nth-child(even){
      margin-left: 20px;
    }
    img{
      width: 100%;
      height: 112px;
    }
    .name{
      padding: 0 42px;
      font-family: Avenir-Heavy;
      font-size: 16px;
      color: #333333;
      letter-spacing: 0;
      text-align: center;
      line-height: 25px;
      white-space:nowrap;
      margin-top: 15px;
      overflow: hidden;
      text-overflow:ellipsis;
    }
    .addr{
      padding: 0 20px;
      font-family: Avenir-Roman;
      font-size: 12px;
      color: #666666;
      letter-spacing: 0;
      text-align: center;
      line-height: 15px;
      margin-top: 4px;
    }
    >ul{
      margin-top: 15px;
      height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      >li{
        padding: 0 20px;
        list-style: none;
        font-weight: 600;
        span{
          font-family: PingFangSC-Semibold;
          font-size: 14px;
          color: #000000;
          letter-spacing: 0;
          &:nth-of-type(1){
            float: left;
          }
          &:nth-of-type(2){
            float: right;
          }
        }
      }
    }
  }
</style>

