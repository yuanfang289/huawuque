<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <page-header>
      <topbar :type="'back'" :hideShareBtn="true">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main :show="show">
        <div class="select-tab">
           <ul>
             <li v-if="selectedParam.city.id ==''&&selectedParam.stage.id ==''" @click="stageShowFn(1)">选择城市
               <span class="triangle-down"></span>
             </li>
             <template v-else="">
               <li v-if="selectedParam.stage" class="selected" @click="stageShowFn(1)">
                 {{selectedParam.stage.stageName}}
                 <span class="triangle-down"></span>
               </li>
               <li v-else="" class="selected" @click="stageShowFn(1)">
                 {{selectedParam.city.stageName}}
                 <span class="triangle-down"></span>
               </li>
             </template>

             <li v-if="selectedParamType.category.id==''&&selectedParamType.activityCategory.id==''" @click="typesShowFn(1)">选择类别
               <span class="triangle-down"></span>
             </li>
             <template v-else="">
               <li v-if="selectedParamType.activityCategory" class="selected" @click="typesShowFn(1)">
                 {{selectedParamType.activityCategory.categoryName}}
                 <span class="triangle-down"></span>
               </li>
               <li v-else="" class="selected" @click="typesShowFn(1)">
                 {{selectedParamType.category.categoryName}}
                 <span class="triangle-down"></span>
               </li>
             </template>
           </ul>
        </div>
        <div class="items">
          <ul class="ul">
            <st-list :apiFn="apiFn" :pageSize="10"
                     :queryData="{ 'cityCode':this.selectedParam.city.id||'',
                    'workStageId':this.selectedParam.stage.id||'',
                    'categoryParent':this.selectedParamType.category.id||'',
                    'activityCategory':this.selectedParamType.activityCategory.id||''}">
              <template slot-scope="{item}">
                <a :href="'/activity/h5Detail?id='+item.id">
                  <li class="li">
                    <div class="txt">
                      <h3 class="title">{{item.name}}</h3>
                      <p class="address" v-if="item.workstageActivities[0].workstage">{{item.workstageActivities[0].workstage.stageName}}</p>
                      <p class="date">{{item.startTime.split(' ')[0].split('-')[1]}}月{{item.startTime.split(' ')[0].split('-')[2]}}日 {{item.startTime.split(' ')[1].split(':')[0]}}:{{item.startTime.split(' ')[1].split(':')[1]}}
                        -{{item.endTime.split(' ')[0].split('-')[1]}}月{{item.endTime.split(' ')[0].split('-')[2]}}日 {{item.endTime.split(' ')[1].split(':')[0]}}:{{item.endTime.split(' ')[1].split(':')[1]}}</p>
                      <div class="type">
                        <span class="ing"  v-if="item.status==2||item.status==4">进行中</span>
                        <span class="start" v-if="item.status==1||item.status==3">即将开始</span>
                        <span class="end" v-if="item.status==0||item.status==5">已结束</span>
                      </div>

                      <div class="apply" v-if="item.enrollStatus">
                        <span>{{item.enrollStatus}}</span>
                      </div>
                      <template v-else="">
                        <template v-if="item.status==2||item.status==4">
                          <div class="apply" v-if="item.canSignup == 'buy'">
                            <span>立即购票</span>
                          </div>
                          <div class="apply" v-if="item.canSignup == 'on'">
                            <span>立即报名</span>
                          </div>
                        </template>

                      </template>
                    </div>
                    <div class="img">
                      <img :src="'https://image.urwork.cn/'+item.image3+'?imageMogr2/thumbnail/!220x220r/gravity/Center/crop/220x220/format/'+isWebp+'/quality/90'" onerror="javascript:this.src='https://assets.urwork.cn/image/headImg.png';">
                    </div>
                  </li>
                </a>
              </template>
            </st-list>
          </ul>
        </div>
    </page-main>
    <transition name="fade">
      <div class="all-stage" v-show="stageShow">
      <div class="banner">
        <object>
          <div class="back_white back" @click="stageShowFn(0)"></div>
        </object>
      </div>
      <div class="hot_city">
        <ul>
          <object>
            <li v-for="city in hotCity" :class="{checked:city.isChecked}" @click="selectCity(city)">
              {{city.stageName}}
            </li>
          </object>
        </ul>
      </div>
      <div class="line" v-if="stage&&stage.length>0"></div>
      <div class="main_list list">
        <ul>
          <li v-for="st in stage" :class="{checked:st.isChecked}" @click="selectStage(st)">
             {{st.stageName}}
          </li>
        </ul>
      </div>
      <div class="kong82">

      </div>
      <div class="sure">
        <a href="javascript:void(0)" @click="sureFn()">确定</a>
      </div>
    </div>
    </transition>

    <transition name="fade">
      <div class="all-stage" v-show="typesShow">
        <div class="banner">
          <object>
            <div class="back_white back" @click="typesShowFn(0)"></div>
          </object>
        </div>
        <div class="hot_city">
          <ul>
            <object>
              <li v-for="obj in hotType" :class="{checked:obj.isChecked}" @click="selectType(obj)">
                {{obj.categoryName}}
              </li>
            </object>
          </ul>
        </div>
        <div class="line" v-if="types&&types.length>0"></div>
        <div class="main_list list">
          <ul>
            <li v-for="st in types" :class="{checked:st.isChecked}" @click="selectTypes(st)">
              {{st.categoryName}}
            </li>
          </ul>
        </div>
        <div class="kong82">

        </div>
        <div class="sure">
          <a href="javascript:void(0)" @click="sureTypeFn()">确定</a>
        </div>
      </div>
    </transition>
  </page-wrap>
</template>

<script>
  import apiCityList from 'src/api/workstage/apiCityList';
  import apiIndex from 'src/api/index/apiIndex';
  import apiSearchJson from 'src/api/activity/apiSearchJson';
  import getactivitylistpageJson from 'src/api/activity/getactivitylistpageJson';
  import StList from 'component/list/activityList';

  export default {
    components: {
      StList
    },
    data: () => {
      return {
        show: false,
        title: '社区活动',
        cityName:'123',
        cityCode:'123',

        hotCity:[{name:'北京',isChecked:false},{name:'上海',isChecked:false},{name:'广州',isChecked:false},{name:'深圳',isChecked:false},{name:'天津',isChecked:false},{name:'郑州',isChecked:false},{name:'南京',isChecked:false},{name:'杭州',isChecked:false}],
        stage:[],
        selectedObj:{},
        selectedParam:{stage:{id:''},city:{id:''}},
        stageShow:false,

        hotType:[{name:'北京',isChecked:false},{name:'上海',isChecked:false},{name:'广州',isChecked:false},{name:'深圳',isChecked:false},{name:'天津',isChecked:false},{name:'郑州',isChecked:false},{name:'南京',isChecked:false},{name:'杭州',isChecked:false}],
        types:[],
        selectedObjType:{},
        selectedParamType:{activityCategory:{id:''},category:{id:''}},
        typesShow:false,

        data:'',
        apiFn:getactivitylistpageJson,
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
    methods:{
      selectCity(item) {
        if(item.isChecked){
          return false;
        }
        this.$set(this.selectedObj,'city',item);

        this.hotCity.map((obj,idx)=>{
          this.$set(obj,'isChecked',false);
          if(obj.workStageVOList){
            obj.workStageVOList.map((obj,idx) => {
              this.$set(obj,'isChecked',false)
            })
          }
        })//清除之前的选中

        let index = 0;
        this.hotCity.map((obj,idx) => {
            if(obj.id == item.id ){
              this.$set(obj,'isChecked',true);
              index = idx
            }
        })//选中
        this.stage = this.hotCity[index].workStageVOList;//改变对应的值
        this.$set(this.selectedObj,'stage','');
      },
      selectStage(item) {
        if(item.isChecked){
          return false;
        }
        this.stage.map((obj,idx) => {
          this.$set(obj,'isChecked',false)
        })
        this.stage.map((obj,idx) => {
          obj.id == item.id ?  this.$set(obj,'isChecked',true):""
        })
        this.selectedObj.city.id == item.id ? item.id = '':'';
        this.$set(this.selectedObj,'stage',item);
      },
      sureFn(){
        console.log(this.selectedObj);
        this.selectedParam = JSON.parse(JSON.stringify(this.selectedObj));
        /*请求数据*/
        this.getList();
        this.stageShowFn(0);
      },
      getList(){
        getactivitylistpageJson({
          pageSize:10,
          currentPageNo:1,
          cityCode:this.selectedParam.city.id||'',
          workStageId:this.selectedParam.stage.id||'',
          categoryParent:this.selectedParamType.category.id||'',
          activityCategory:this.selectedParamType.activityCategory.id||''
        }).then(res=>{
              console.log(res);
              this.data = res.result;
        })
      },
      stageShowFn(n) {
        n == 1 ? this.stageShow = true:this.stageShow = false;
      },

      selectType(item) {
        if(item.isChecked){
          return false;
        }
        this.$set(this.selectedObjType,'category',item);
        this.hotType.map((obj,idx)=>{
          this.$set(obj,'isChecked',false);
          if(obj.categoryList){
            obj.categoryList.map((obj,idx) => {
              this.$set(obj,'isChecked',false)
            })
          }
        })//清除之前的选中

        let index = 0;
        this.hotType.map((obj,idx) => {
          if(obj.id == item.id ){
            this.$set(obj,'isChecked',true);
            index = idx
          }
        })//选中
        this.types = this.hotType[index].categoryList;//改变对应的值
        this.$set(this.selectedObjType,'activityCategory','');
      },
      selectTypes(item) {
        console.log(item,'kkkkkkkkkkkk')
        if(item.isChecked){
          return false;
        }
        this.types.map((obj,idx) => {
          this.$set(obj,'isChecked',false)
        })
        this.types.map((obj,idx) => {
          obj.id == item.id ?  this.$set(obj,'isChecked',true):""
        })
        item.categoryLevel == 1 ? item.id = '':''
        this.$set(this.selectedObjType,'activityCategory',item);
      },
      sureTypeFn(){
        console.log(this.selectedObjType);
        this.selectedParamType = JSON.parse(JSON.stringify(this.selectedObjType));
        this.getList();
        this.typesShowFn(0);
      },
      typesShowFn(n) {
        n == 1 ? this.typesShow = true:this.typesShow = false;
      }
    },
    created() {
      apiSearchJson({}).then(res=>{
       console.log(res);
        this.hotCity = res.workstage;
        this.hotCity.map((obj,idx)=>{
            this.$set(obj,'isChecked',false);
            if(obj.workStageVOList){
              obj.workStageVOList.map((obj,idx) => {
                this.$set(obj,'isChecked',false)
              })
            }
        })
        this.stage = ''
        this.hotType =  res.category;
        this.hotType.map((obj,idx)=>{
          this.$set(obj,'isChecked',false);
          if(obj.categoryList){
            obj.categoryList.map((obj,idx) => {
              this.$set(obj,'isChecked',false)
            })
          }
        })
        this.types = ''
      })

      setTimeout(() => {
        this.show = true;
      }, 200)
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  /deep/ .nodata{
    position: inherit!important;
  }
  .triangle-down {
    width: 8px;
    height: 8px;
    background: url("https://assets.urwork.cn/image/v3/workstage/arrow_down.png") no-repeat;
    background-size: 100%;
    display: inline-block;
    margin-left: 5px;
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
  #main{
    padding:0 20px 20px 20px;
    .select-tab{
      ul{
        overflow: hidden;
        li{
          margin-top: 18px;
          height: 30px;
          line-height: 30px;
          border-radius: 3px;
          margin-right: 10px;
          font-family: PingFang-SC-Medium;
          font-size: 13px;
          color: #808080;
          letter-spacing: 0;
          text-align: center;
          float: left;
          padding: 0 18px;
          @include border(#D6D6D6){
            border-radius: 36px;
          };
        }
        .selected{
          color: #1D1D1D;
          @include border(#363636);
        }
      }
    }
    .items{
      .ul{
        padding-top: 12px;
        .li{
          padding:24px 0;
          position: relative;
          @include border-bottom(#e5e5e5);
          display: flex;
          justify-content: space-between;
          .txt{
            width: calc(100% - 2.2rem);
            padding-right: 10px;
            .title{
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp:2;
              /* autoprefixer: off */
              -webkit-box-orient: vertical;
              /* autoprefixer: on */
              font-family: PingFang-SC-Bold;
              font-size: 18px;
              color: #1D1D1D;
              letter-spacing: 0;
              line-height: 21px;
              font-weight: 500;
            }
            .address{
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #808080;
              margin-top: 15px;
            }
            .date{
              font-family: PingFang-SC-Bold;
              font-size: 14px;
              color: #1D1D1D;
              margin-top: 2px;
              font-size: 12px;
              color: #808080;
            }
            .type{
              margin-top: 5px;
              .ing{
                min-width: 42px;
                padding: 3px 10px;
                line-height: 18px;
                background: #FAB116;
                border-radius: 2px;
                font-family: PingFangSC-Regular;
                font-size: 10px;
                color: #FFFFFF;
                letter-spacing: 0.19px;
              }
              .start{
                min-width: 48px;
                padding: 3px 10px;
                line-height: 18px;
                background: #80C700;
                border-radius: 2px;
                font-family: PingFangSC-Regular;
                font-size: 10px;
                color: #FFFFFF;
                letter-spacing: 0.19px;
              }
              .end{
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #CFCFCF;
              }
            }
            .apply{
              width: 96px;
              height: 36px;
              line-height: 36px;
              border: 1px solid #d6d6d6;
              border-radius: 3px;
              font-family: PingFang-SC-Bold;
              font-size: 14px;
              color: #191919;
              letter-spacing: 0;
              text-align: center;
              margin-top: 15px;
            }
          }
          .img{
            width: 2.2rem;
            height: 2.2rem;
            border-radius: 3px;
            overflow: hidden;
            img{
              display: block;
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
      }
    }
  }
  .all-stage{
    width: 100vw;
    height: 100vh;
    background: #ffffff;
    position: fixed;
    top: 0;
    z-index: 999;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
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
        width: 15px;
        height: 15px;
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
      margin-bottom: 30px;
      padding: 0 19px;
      h4{
        font-family: PingFangSC-Semibold;
        font-size: 16px;
        color: #333333;
        font-weight: 600;
        max-height: 2.13rem;
      }
      ul{
        object{
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          li{
            height: 30px;
            line-height: 30px;
            display: inline-block;
            padding: 0 16px;
            font-family: PingFangSC-Medium;
            font-size: 13px;
            color: #808080;
            letter-spacing: 0;
            text-align: center;
            margin: 0 7px;
            margin-top: 20px;
            position: relative;
            @include border(#D6D6D6){
              border-radius: 60px;
            };
          }
          .checked{
            color: #ffffff;
            background: #1D1D1D;
            position: relative;
            border-radius: 30px;
          }
        }

      }
    }
    .line{
      height: 1px;
      margin: 0 27px;
      opacity: 0.1;
      background: #000000;
    }
    .main_list{
      margin-top: 6px;
      padding: 0 19px;
      ul{
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
        li{
          height: 30px;
          line-height: 30px;
          display: inline-block;
          padding: 0 20px;
          font-family: PingFangSC-Medium;
          font-size: 13px;
          color: #808080;
          letter-spacing: 0;
          text-align: center;
          margin: 0 7px;
          margin-top: 24px;
          position: relative;
          @include border(#D6D6D6){
            border-radius: 60px;
          };
        }
        .checked{
          color: #ffffff;
          background: #1D1D1D;
          position: relative;
          border-radius: 30px;
        }
        }
    }
    .kong82{
      height: 82px;
    }
    .sure{
      width: 100%;
      height: 82px;
      padding: 20px;
      background: #ffffff;
      position: fixed;
      bottom: 0;
      a{
        width: 100%;
        height: 100%;
        display: inline-block;
        background: #1D1D1D;
        border-radius: 3px;
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        color: #FFFFFF;
        letter-spacing: 0.38px;
        text-align: center;
        line-height: 41px;
      }
    }
  }
</style>
