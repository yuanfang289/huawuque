<template>
  <page-wrap
    :error="error"
    :hasDownloadBar="false"
  >
    <div v-title>{{title}}</div>

    <page-header
    >
      <topbar
        type="back"
        :hideShareBtn="true"
      >
        <template slot="title">{{title}}</template>
      </topbar>

    </page-header>

    <page-main
      :show="show"
    >
      <div class="course-list-item-wrapper">
        <ul>
          <li v-for="(item,index) in data">
            <a :href="'/user/userDetail?userId='+item.id">
              <div class="listener">
                <img class="listener-img" :src="''+item.headImageUrl" onerror="javascript:this.src='https://assets.urwork.cn/image/headImg.png';"/>
                <div class="listener-info">
                  <h2>{{item.realname}}</h2>
                  <p>{{item.duties}}<span v-if="item.duties">｜</span>
                    <span v-if="flag">{{item.companyName}}</span>
                    <span v-else="">{{item.company}}</span>
                  </p>
                  <p v-if="item.workstage&&flag">{{item.workstage.stageName}}</p>
                  <p v-if="!flag">{{item.stageName}}</p>
                </div>
              </div>
            </a>

            <div v-if="flag" class="follow">
              <button  v-if="item.beFollowed == true" @click="followFn(item,true,index)" class="already">已关注</button>
              <button v-else @click="followFn(item,false,index)" class="one">+关注</button>
            </div>

            <div class="follow" v-if="!flag">
              <button  v-if="item.isFollowed == 1" @click="followFn(item,true,index)" class="already">已关注</button>
              <button v-else @click="followFn(item,false,index)" class="one">+关注</button>
            </div>

          </li>
        </ul>
      </div>
    </page-main>

  </page-wrap>

</template>

<script>
  import toPage from 'nativeFix/component/toPage/toPage'
  import List from 'component/list/List';
  import apiTerList from 'api/classroom/apiTerList';
  import apiClassGetSubjectByid from 'api/classroom/apiClassGetSubjectByid';
  import apiIsLoginUser from 'api/apiIsLoginUser';
  import apiFollowUser from 'api/apiFollowUser';
  import apiCancelFollowUser from 'api/apiCancelFollowUser';
  import apiSign from 'api/user/apiSign';

  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';




  import {passport} from 'src/globalData';


  export default {
    components: {
      List
    },
    data: () => {
      return {
        isApp: isApp(),
        title: '',
        id:'',
        userId:'',
        flag:true,
        error: false,
        show:false,
        data:''
      }
    },
    methods: {
      getdata: function () {
        var _this = this;
        if(_this.title == '最近他们听过'||_this.title == '最近听过'){
          _this.flag = false;
          apiClassGetSubjectByid({
            subjectId: this.$route.query.id
          }).then(res => {
            _this.data = res.leastListeners;
          })
        }else{
          apiTerList({
            acticityId: this.$route.query.id
          }).then(res => {
            _this.data = res;
          })
        }
      },
      followFn: function (item,flag,idx) {
        var _this = this;
        apiIsLoginUser().then(res => {
          if(res.retCode == -2){
            console.log('没有登录');
            if(_this.isApp) {
              console.log('没有登录app');
              toLogin();
            } else {
              console.log('没有登录h5');
              passport.toLogin();
            }
          }else{
            if(flag == true){
              _this.data[idx].isFollowed = 1;
              apiCancelFollowUser({
                cancelledUserId: item.id
              }).then(ret => {
                _this.data[idx].isFollowed = 1;
                this.getdata();
              })
            }else{
              _this.data[idx].isFollowed = 0;
              apiFollowUser({
                beFollowedUserId: item.id
              }).then(ret => {
                console.log(ret);
                _this.data[idx].isFollowed = 0;
                //积分提交
                apiSign({
                  data: {"taskCode":"10060","userId":this.userId}
                }).then(res => {
                  console.log(res);
                })
                this.getdata();
              })
            }
          }
        })
      }
    },
    created() {

    },
    mounted() {
      this.show = true;
      this.title = decodeURIComponent(this.$route.query.title);
      this.id = this.$route.query.id;
      this.userId = this.$store.state.userInfo.userId;
      this.getdata();
    }
  }
</script>

<style lang="scss" scoped>
  .course-list-item-wrapper{
    padding: 0 20px;
    ul{
      display: inline-block;
      padding-bottom: 25px;
      li{
        width: 100%;
        float: left;
        display: flex;
        flex-wrap:nowrap;
        justify-content: center;
        margin-top: 25px;
        .listener{
          display: flex;
          justify-content: center;
          align-items: center;
          .listener-img{
            width: 55px;
            height: 55px;
            border-radius: 50%;
          }
          .listener-info{
            margin-left: 10px;
            line-height: normal;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #666666;
            h2{
              font-family: PingFangSC-Semibold;
              font-size: 16px;
              color: #333333;
            }
          }
        }
        .follow{
          flex: 1;
          text-align: right;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          button{
            width: 60px;
            height: 25px;

            border-radius: 12.5px;
            font-size: 12px;
            color: #151515;
          }
          .one{
            border: 1px solid #333333;
            background: #ffffff;
          }
          .already{
            background: #F0F0F0;
          }
        }
      }
    }
  }
</style>
