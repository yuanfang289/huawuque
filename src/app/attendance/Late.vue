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
          <div class="date">
             <span>{{year}}年{{month}}月  {{title}}共<span class="orange">{{data.length}}</span>人</span>
          </div>
        </div>

        <div class="month-statis">
          <ul>
            <template v-for="row in data">
              <li @click="mylinkto('/v2/attendance/pstatistics?type='+type+'&year='+row.year+'&month='+row.month+'&companyId='+row.companyId+'&distUserId='+row.userId+'&averageWorktime='+encodeURIComponent(row.averageWorktime))">
                <div class="left">
                  <div class="head-img">
                    <img :src="row.headUrl" onerror="javascript:this.src='https://assets.urwork.cn/image/headImg.png';">
                  </div>
                  <p class="name">{{row.realname}}</p>
                </div>
                <div class="right">
                  <span v-if="type == 1" class="">{{row.normalNum}}次</span>
                  <span v-if="type == 2" class="">{{row.lateNum}}次</span>
                  <span v-if="type == 3" class="">{{row.earlyNum}}次</span>
                  <span v-if="type == 4" class="">{{row.lackNum}}次</span>
                  <span v-if="type == 5" class="">{{row.absentNum}}次</span>
                  <span class="more">
                     <i class="uricon-arrow-right"></i>
                  </span>
                </div>
              </li>
            </template>
            <!--<li>-->
              <!--<div class="left">-->
                <!--<div class="head-img">-->
                  <!--<img src="https://assets.urwork.cn/image/headImg.png" onerror="javascript:this.src='https://assets.urwork.cn/image/headImg.png';">-->
                <!--</div>-->
                <!--<p class="name">名字</p>-->
              <!--</div>-->
              <!--<div class="right">-->
                <!--<span class="">3次</span>-->
                <!--<span class="more">-->
                   <!--<i class="uricon-arrow-right"></i>-->
                <!--</span>-->
              <!--</div>-->
            <!--</li>-->
          </ul>
        </div>
      </div>
    </page-main>

  </page-wrap>
</template>

<script>
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import {getScheme, setScheme} from 'nativeFix';
  import apiMonthlyDetail from 'api/attendance/apiMonthlyDetail';
  export default {
    components: {},
    data: () => {
      return {
        show: false,
        title: '正常',
        dialog: false,
        pickerValue:'09:00',
        isSubmit: false,
        angle:150,
        tab:true,
        peopleNum:'0',
        year:'',
        month:'',
        data:[],
        type:'1'
      }
    },
    methods: {
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
      titleFn (n){
        n == 1 ? this.title = '正常':'';
        n == 2 ? this.title = '迟到':'';
        n == 3 ? this.title = '早退':'';
        n == 4 ? this.title = '缺卡':'';
        n == 5 ? this.title = '缺勤':'';
      },
      apiMonthlyDetail (type) {
        apiMonthlyDetail({
          "companyId":this.companyId,
          "year":this.year,
          "month":this.month,
          "type":type || 1
        },this.$store.state.userInfo.userId).then(res => {
            console.log(res,'hah');
            this.data = res.data;
           this.show = true;
        })
      }
    },
    created() {
      this.year = this.$route.query.year;
      this.month = this.$route.query.month;
      this.companyId = this.$route.query.companyId;
      this.type = this.$route.query.type;
      this.titleFn(this.type);
      this.apiMonthlyDetail(this.type);
    },

    mounted() {

    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  .page-attendance-center{
    background: #fafafa;
    height: 100vh;
    .date{
      height: 46px;
      line-height: 46px;
      background: #FAFAFA;
      padding: 0 20px;
      color: #999999;
      div{
        span{
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #999999;
          letter-spacing: 0;
          text-align: right;
        }
      }
    }
    .orange{
      color: #FF5F1A;
    }
    .month-statis{
      margin: 0 15px;
      background: #FFFFFF;
      box-shadow: 0 3px 4px 1px rgba(245,245,245,0.99);
      border-radius: 4px;
      ul{
        li{
          padding: 0 15px;
          height: 55px;
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
            display: flex;
            align-items: center;
            justify-content: space-around;
            .head-img{
              width: 30px;
              height: 30px;
              border-radius: 50%;
              overflow: hidden;
              margin-right: 8px;
              img{
                width: 30px;
                height: 30px;
                border-radius: 50%;
              }
            }
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
      }
    }
  }
</style>

