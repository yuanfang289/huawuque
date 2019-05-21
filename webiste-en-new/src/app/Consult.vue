<template>
  <div id="main">
    <top-bar></top-bar>
    <div class="kong"></div>
    <div class="consult-box">
      <div class="consult">
        <div class="left">
          <div class="tit"  @click="$refs.ct.open()">
            现在咨询
          </div>
          <p>我们的专家将会联系你</p>
          <div class="input-box">
            <div class="input-left">
              <label>Full Name</label><br>
              <Input name="full-name" class="full-name"/>
            </div>
            <div class="input-right">
              <label>Company Name</label><br>
              <Input name="company-name" class="company-name"/>

            </div>
            <div class="clear"></div>
          </div>
          <div class="input-box">
            <div class="input-left">
              <label>Email Address</label><br>
              <Input name="email-address" class="email-address"/>
            </div>
            <div class="input-right">
              <label>Phone Number</label><br>
              <div class="phone-box">
                <PhoneInput
                  name="mobile"
                  placeholder="手机号码"
                  data-vv-as="手机号码"
                  v-model="mobile"
                />
              </div>
            </div>
            <div class="clear"></div>
          </div>
          <div class="input-box">
            <div class="input">
              <label>Email Address</label><br>
              <div class="city">
                <Select ref="selCity" clearable v-model="cityCode" filterable>
                  <Option v-for="item in citys" :value="item.cityCode" :key="item.cityCode">{{ item.cityNameEn }}</Option>
                </Select>

              </div>
              <div class="all-communities">
                <Select ref="selWorkstage" clearable v-model="workstageId" filterable>
                  <Option v-for="item in workstages" :value="item.id" :key="item.id">{{ item.stageNameEn }}</Option>
                </Select>
              </div>
            </div>
            <div class="clear"></div>
          </div>
          <div class="input-box">
            <div class="input">
              <label>How many seats do you need?  (Optional)</label><br>
              <input name="optional" class="optional">
            </div>
            <div class="clear"></div>
          </div>
          <div class="btn">
            Submit
          </div>
        </div>
        <div class="right">
          <div class="tit">
            Or Contact Us
          </div>
          <p>Questions about plans, pricing, or availability? Just have your people call our people.</p>
          <div class="way">
            <div class="phone-num">
              <span></span>
              <a href="tel:+85223609278">+852 2360 9278</a>
            </div>
            <div class="email">
              <span></span>
              <a href="marketing@ucommune.com">marketing@ucommune.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Consult ref="ct"></Consult>
  </div>
</template>

<script>
  import TopBar from '@/components/topbar/TopBar';
  import Footer from '@/components/footer/Footer';
  import PhoneInput from '@/components/PhoneInput';
  import apiCityList from '@/api/apiCityList';
  import apiWorkstageByCity from '@/api/apiWorkstageByCity';
  import Consult from '@/components/consult';
  import Swiper from 'swiper';
  import { amapManager } from 'vue-amap';
  import 'swiper/dist/css/swiper.min.css';
  export default {
    components: {
      TopBar,
      Footer,
      PhoneInput,
      Consult
    },
    data: function() {
      return {
          show:true,
        mobile:'',
        footer:true,
        amapManager,
        cityCode:'',
        citys:[],
        workstages:[],
        workstageId:0,
        window: '',
      };
    },
    computed: {

    },
    methods: {
    },
    mounted(){

    },
    watch: {
      cityCode(value) {
        if(value!==''){
          apiWorkstageByCity({apiWorkstageByCity}).then(res=>{
            if(res.retCode===0){
              this.workstages=res.data.result;
            }
          });
        }
      }
    },
    created(){
      apiCityList().then(res=>{
        if(res.retCode===0){
          this.citys=res.data;
        }
      });
    }
  }
</script>

<style lang="scss" scoped>
  .kong{
    height: 80px;
  }
  .top-bar{
    .tab{
      ul{
        li{
          &:first-child{
            border-bottom: 2px solid #FFD53D;
          }
        }
      }
    }
  }
  h2{
    display: inline-block;
    font-family: Avenir-Heavy;
    font-size: 30px;
    line-height: 20px;
    color: #000000;
    letter-spacing: 0;
    border-bottom: 8px solid #FFD53D;
    box-sizing: border-box;
    margin-top: 25px;
  }

 .consult-box{
    width: 100%;
  }
  .consult{
    width: 1198px;
    height: 548px;
    background: #FFFFFF;
    border: 1px solid #EBEBEB;
    margin: 40px auto;
    .left{
      box-sizing: border-box;
      width: 714px;
      height:100%;
      float: left;
      padding: 45px;
      .tit{
        font-family: PingFangSC-Semibold;
        font-size: 30px;
        color: #000000;
        letter-spacing: 0;
      }
      p{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #333333;
        letter-spacing: 0;
        margin-top: 6px;
      }
      .input-box{
        width: 100%;
        /*overflow: hidden;*/
        margin-top: 17px;
        .full-name{
          margin-top: 4px;
        }
        .company-name{
          margin-top: 4px;
        }
        .email-address{
          margin-top: 4px;
        }
        label{
          font-family: Avenir-Book;
          font-size: 14px;
          color: #484848;
          letter-spacing: 0;
          text-align: center;
        }
        input{
          width: 298px;
          height: 42px;
          background: #FFFFFF;
          border: 1px solid #EBEBEB;
          border-radius: 2px;
          margin-top: 4px;
        }
        /deep/ .ivu-input-group-prepend{
          border-radius: 2px;
        }
        /deep/ .ivu-select-selection{
          height: 42px;
          border-radius: 2px;
        }
        /deep/ .ivu-input{
          height: 42px;
          border-radius: 2px;
        }
        /deep/ .ivu-select-input{
          height: 42px;
          border-radius: 2px;
        }
        .input-left{
          width: 300px;
          float: left;
        }
        .input-right{
          width: 300px;
          float: right;
        }
        .phone-box{
          width: 300px;
          position: relative;
          .phone-select{
            margin-top: 4px;
          }
          .zone{
            width: 65px;
            height: 42px;
            position: absolute;
            top: 5px;
            left: 1px;
            background: #F5F5F5;
            border-radius: 2px;
            p{
              margin: 0;
              height: 42px;
              line-height: 42px;
              text-align: center;
              position: relative;
              span{
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
          input{
            text-indent: 67px;
          }
        }
        .input{
          .city{
            width: 150px;
            float: left;
            margin-top: 4px;
          }
          .all-communities{
            width: 463px;
            float: right;
            margin-top: 4px;
          }
        }
      }
      .btn{
        cursor:pointer;
        width: 300px;
        height: 44px;
        line-height: 44px;
        text-align: center;
        background: #FFD53D;
        border-radius: 2px;
        font-family: Avenir-Book;
        font-size: 14px;
        color: #000000;
        margin-top: 20px;
        &:hover{
          background: #ffce1d;
          border-radius: 1px;
        }
      }
    }
    .right{
      box-sizing: border-box;
      width: 482px;
      height: 100%;
      background: #FAF9F3;
      float: right;
      padding: 44px 55px;
      .tit{
        font-family: PingFangSC-Semibold;
        font-size: 30px;
        color: #000000;
        letter-spacing: 0;
      }
      p{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #333333;
        letter-spacing: 0;
        margin-top: 6px;
      }
      .way{
        margin-top: 50px;
        .email{
          margin-top: 20px;
          span{
            background: url("../assets/images/email.png") no-repeat center;
            background-size: 100%;
          }
        }
        .phone-num{
          span{
            background: url("../assets/images/phone.png") no-repeat;
            background-size: 100%;
          }
        }
        a{
          font-family: Avenir-Medium;
          font-size: 20px;
          color: #333333;
          letter-spacing: 0;
        }
        >div{
          >span{
            width: 12px;
            height: 12px;
            display: inline-block;
            margin-right: 15px;
          }
        }
      }
    }
  }
  .amap-demo {
    height: 300px;
  }
  .prompt {
    background: white;
    width: 100px;
    height: 30px;
    text-align: center;
  }
  .clear{
    clear: both;
  }
  /deep/ .ivu-modal-header{
    border-bottom-width: 0px!important;
  }
</style>
