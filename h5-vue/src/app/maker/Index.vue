<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <page-header>
      <topbar :type="'back'" :hideShareBtn="true">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main :show="show">
      <div class="maker">
        <div class="banner" >

        </div>
        <!--<div class="button" @click="openPicker()">-->
        <!--</div>-->
        <!--<mt-datetime-picker-->
          <!--ref="picker"-->
          <!--type="time"-->
          <!--v-model="pickerValue">-->
        <!--</mt-datetime-picker>-->

        <div class="form">
          <div class="item">
            <div class="left"><span>* </span> 姓名</div>
            <div class="right"><input ref="username" type="text" v-model="info['username']" maxlength="20"
                                      placeholder="输入姓名"/></div>
          </div>
          <div class="item">
            <div class="left"><span>* </span>联系电话</div>
            <div class="right"><input ref="mobile" type="text" v-model="info['mobile']" maxlength="20"
                                      placeholder="输入电话"/></div>
          </div>
          <div class="item">
            <div class="left"><span>* </span>企业名称</div>
            <div class="right"><input ref="companyName" type="text" v-model="info['companyName']" maxlength="30"
                                      placeholder="输入企业名称"/></div>
          </div>
          <div class="item">
            <div class="left"><span>* </span>地址</div>
            <div class="right"><input ref="address" type="text" v-model="info['address']" maxlength="50"
                                      placeholder="输入企业地址"/></div>
          </div>
          <div class="item">
            <div class="left">入驻社区</div>
            <div class="right"><input type="text" v-model="info['stageName']" maxlength="20" placeholder="输入入驻社区"/>
            </div>
          </div>
          <div class="item">
            <div class="left">推荐渠道</div>
            <div class="right"><input type="text" v-model="info['channel']" maxlength="20" placeholder="输入推荐渠道"/></div>
          </div>
        </div>
        <div class="submit">
          <div class="button" @click="submit()">提交报名</div>
        </div>
      </div>
      <div id="mask" v-show="dialog">
        <div class="dialog">

        </div>

      </div>
    </page-main>

  </page-wrap>
</template>

<script>
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import {getScheme, setScheme} from 'nativeFix';
  import apiEnroll from 'api/maker/apiEnroll';
  export default {
    components: {},
    data: () => {
      return {
        show: false,
        title: '寻找"中国创客"报名活动',
        dialog: false,
        pickerValue:'09:00',
        info: {
          username: '',
          mobile: '',
          companyName: '',
          address: '',
          stageName: '',
          channel: '',

        },
        isSubmit: false
      }
    },
    methods: {
      openPicker() {
        this.$refs.picker.open();
        console.log("picker",this.pickerValue)
      },
      checkTel(){
        var tel = this.info['mobile'];
        console.log("tel",tel);
        if (tel.trim()==''){return false;}
        var mobile = /^1[0-9]{10}$/;
        return mobile.test(tel);
      },

      submit(){
        if (this.isSubmit) {
          this.$toast("请不要重复提交");
          return
        } else {
          this.isSubmit = true;
        }
        if (this.info['username'].trim() == '') {
          this.$toast("请输入姓名");
          this.$refs['username'].focus();
          this.isSubmit = false;
          return
        }
        if (!this.checkTel()) {
          this.$toast("请输入正确的手机号");
          this.$refs['mobile'].focus();
          this.isSubmit = false;
          return;
        }
        if (this.info['companyName'].trim() == '') {
          this.$toast("请输入企业名称");
          this.$refs['companyName'].focus();
          this.isSubmit = false;
          return
        }
        if (this.info['address'].trim() == '') {
          this.$refs['address'].focus();
          this.$toast("请输入地址");
          this.isSubmit = false;
          return
        }

        apiEnroll(this.info).then(res => {
          if (res.userId) {
            this.$toast("报名成功");
            var userId = res.userId;
            let url = getLocation().origin + '/v2/makerSuccess?userId=' + userId + '&mobile=' + this.info['mobile'];
            if (isApp()) {
              this.$DANativeApi.navigateTo({
                url
              })
            } else {
              this.$router.push({name: 'makerSuccess', query: {userId: userId,mobile:this.info['mobile']}})
            }
          } else {
              if(res==1){
                this.$toast("该手机号已报名");
              }else{
                this.$toast("报名失败");
              }
            this.isSubmit = false;
          }
        });
      }

    },

    created() {
      this.show = true;
      //this.getData();

    },

    mounted() {

    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  #main {
    .maker {
      .banner {
        height: 2.8rem;
        width: 7.5rem;
        //margin-top: 0.29rem;
        background: url("https://assets.urwork.cn/image/maker/banner.png") no-repeat;
        background-size: 100%;
      }

      .form {
        margin-left: 0.4rem;
        margin-right: 0.4rem;
        margin-bottom: 0.7rem;
        .item {
          margin-top: 30px;
          border-bottom: 0.01rem solid #CCCCCC;
          position: relative;
          height: 0.65rem;
          .left {
            float: left;
            padding-left: 0.05rem;
            font-family: PingFangSC-Regular;
            font-size: 15px;
            color: #151515;
            letter-spacing: 0;
            line-height: 21px;
            span {
              color: #FF0000;
            }
          }
          .right {
            float: right;
            width: 4rem;
            padding-right: 0.05rem;
            text-align: right;
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #CCCCCC;
            input::-webkit-input-placeholder { /* WebKit browsers */
              direction: rtl;
              font-size: 15px;
              color: #CCCCCC;

            }
            input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
              direction: rtl;
              font-size: 15px;
              color: #CCCCCC;
            }
            input::-moz-placeholder { /* Mozilla Firefox 19+ but I'm not sure about working */
              direction: rtl;
              font-size: 15px;
              color: #CCCCCC;
            }
            input:-ms-input-placeholder { /* Internet Explorer 10+ */
              direction: rtl;
              font-size: 15px;
              color: #CCCCCC;
            }
            input {
              border: 0px;
              outline: none;
              width: 3.9rem;
              height: 0.45rem;
              cursor: pointer;
              text-align: right;
              color: black;
            }
          }
        }
      }

      .submit {
        width: 100%;
        .button {
          height: 0.9rem;
          width: 6.1rem;
          background: #FF7733;
          border-radius: 1rem;
          margin: 0 auto;
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #FFFFFF;
          text-align: center;
          line-height: 0.9rem;

        }
      }

    }

  }
</style>

