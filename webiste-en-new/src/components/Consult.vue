<template>
<modal fullscreen  footer-hide :scrollable="false" :closable="false" v-model="showModal">
  <div class="consult">
    <div class="bg">

    </div>
    <div class="consult-box">
      <div class="left">
        <div class="tit">Enquiry</div>
        <p>Our community team will contact you soonest!</p>
        <div class="input-box">
          <div class="input-left">
            <label>Full Name</label><br>
            <Input name="full-name" ref="name" v-model="name" class="full-name"/>
          </div>
          <div class="input-right">
            <label>Company Name</label><br>
            <input name="company-name" ref="companyName" v-model="companyName" class="company-name"/>

          </div>
          <div class="clear"></div>
        </div>
        <div class="input-box">
          <div class="input-left">
            <label>Email Address</label><br>
            <Input name="email-address" ref="email" type="email" v-model="email" class="email-address"/>
          </div>
          <div class="input-right">
            <label>Phone Number</label><br>
            <div class="phone-box">
              <PhoneInput
                ref="mobile"
                name="mobile"
                v-model="mobile"
              />
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="input-box">
          <div class="input">
            <label>Preferred Location</label><br>
            <div class="city">
              <Select ref="selCity" :placeholder="'city'" clearable v-model="cityCode" filterable>
                <Option v-for="item in citys" :value="item.cityCode" :key="item.cityCode">{{ item.cityNameEn }}</Option>
              </Select>

            </div>
            <div class="all-communities">
              <Select ref="selWorkstage" placeholder="All Communities" clearable v-model="workstageId" filterable>
                <Option v-for="item in workstages" :value="item.id" :key="item.id">{{ item.stageNameEn }}</Option>
              </Select>
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="input-box">
          <div class="input">
            <label>How many seats do you need? </label><br>
            <input onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" ref="seatNum"  v-model="seatNum" type="number" class="optional">
          </div>
          <div class="clear"></div>
        </div>
        <div class="btn" @click="booking()">
          Submit
        </div>
      </div>
      <div class="right">
        <div class="closeButton" @click="showModal=false"><img width="30px" height="30px" src="../assets/images/close.png"/></div>
        <div class="tit">Or Contact Us</div>
        <p>Questions about plans, pricing, or availability? <br>Just have your people call our people.</p>
        <div class="way">
          <div class="phone-num">
            <span></span>
            <a href="javascript:void(0)">400-1188-891</a>
          </div>
          <div class="email">
            <span></span>
            <a href="javascript:void(0)">marketing@ucommune.com</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</modal>
</template>
<script>
  import apiCityList from '@/api/apiCityList';
  import apiWorkstageByCity from '@/api/apiWorkstageByCity';
  import PhoneInput from '@/components/PhoneInput';
  import apibooking from '@/api/apibooking';
  import sleep from '@/utils/sleep';
  export default {
    name: 'Consult',
    components: {
      PhoneInput
    },
    props: {
      show:{
        type:Boolean,
        default:false,
      }

    },
    data () {
      return {
        showModal:false,
        mobile:'',
        citys:[],
        workstages:[],
        workstageId:0,
        cityCode:0,
        name:'',
        companyName:'',
        email:'',
        phone:'',
        seatNum:null,
      }
    },
    methods:{
      cancel(){
          this.showModal=false;
      },
      open(){
        this.showModal=true;
      },
      booking(){
//        this.$refs['mobile'].$refs['phone'].focus();
//        return;
        // name,
        if(this.name.trim()==''){
          this.$Message.info('Please input full name');
          this.$refs['name'].focus();
          return false;
        }
        //companyName
        if(this.companyName.trim()==''){
          this.$Message.info('Please input company name');
          this.$refs['companyName'].focus();
          return false;
        }


        let nationCode = "";
        let phone="";
        let mobile=this.mobile;
        let val = mobile.split(',');
        if (val.length == 1) {
          this.$Message.info('Please input mobile');
          this.$refs['mobile'].$refs['phone'].focus();
            return false;
        }else{
          nationCode=val[0];
          phone=val[1];
        }

        if(this.email.trim()==''){
          this.$Message.info('Please input email');
          this.$refs['email'].focus();
          return false;
        }

        //cityCode,
        if(this.cityCode==0){
          this.$Message.info('Please chose city');
          this.$refs['selCity'].$children[0].$refs.input.focus();
          return false;
        }

        //workstageId,
        if(this.workstageId==0){
          this.$Message.info('Please chose workstage');
          this.$refs['selWorkstage'].$children[0].$refs.input.focus();
          return false;
        }

        if(this.seatNum==0||!parseInt(this.seatNum)){
          this.$Message.info('Please input seats do you need');
          this.$refs['seatNum'].focus();
          return false;
        }

        apibooking({
           workstageId:this.workstageId+'',
          name:this.name+'', companyName:this.companyName+'',
          email:this.email+'',nationCode:nationCode, phone:phone+'',seatNum:this.seatNum,lang:'EN'
        }).then(res=>{
          if (res.retCode === 0) {
            this.$Message.info("Your application has been submitted");
            sleep(800).then(()=>{
              location.reload();
            })

          } else {
            this.$Message.info(res.retMsg);
          }
        });
      }
    },
    watch: {
      cityCode(value) {
        if(value!==''){
          apiWorkstageByCity({cityCode:value,pageSize:-1}).then(res=>{
            if(res.retCode===0){
              this.workstages=res.data.result;
            }
          });
        }
      },
    },
    mounted(){
      this.$Message.config({
        top: 200,
        duration: 3
      });
    },
    created () {
      apiCityList().then(res=>{
        if(res.retCode===0){
          this.citys=res.data;
        }
      });
    }
  }
</script>

<style lang="scss" scoped>
  .closeButton{
    z-index: 1;
    font-size: 12px;
    position: absolute;
    right: 0px;
    top: 20px;
    overflow: hidden;
    cursor: pointer;
  }
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
    width: 1200px;
    margin: 0 auto;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -600px;
  }
 /deep/ .ivu-modal-body{
    padding: 0px!important;
  }
  .consult{
   // width: 1198px;
    height: 100%;
    background: #FFFFFF;
    border: 0px solid #EBEBEB;
    position: relative;
   // margin: 40px auto;
    .left{
      box-sizing: border-box;
      width: 650px;
      height:100%;
      float: left;
      padding-top: 95px;
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
          text-indent: 1em;
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
          font-size: 14px!important;
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
      width: 450px;
      height: 100%;
      /*background: #FAF9F3;*/
      float: right;
      padding-top: 95px;
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
  .bg{
    width: 42%;
    height: 100%;
    display: inline-block;
    background: #FAF9F3;
    position: absolute;
    top: 0;
    right: 0;
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
