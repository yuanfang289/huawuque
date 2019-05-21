<template>
  <page-wrap
    :gray-bg="true"
    :hasDownloadBar="false"
  >
    <div v-title>{{title}}</div>

    <page-header
    >
      <topbar
        :type="'back'"
        :hideShareBtn="true"
      >
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main
      :show="show"
    >
      <div class="slide-wrap">
        <Swiper
               :bannerList="bannerList"
               :paddingTop="55.970"
               :column="1"
               :transformScale="true"
        >

        </Swiper>
      </div>
      <div class="my-course-wrap" v-if="showStudy">
        <div class="my-course-tag">我的U课堂</div>
        <ul class="my-course-info">
          <li>
            <router-new-link router-path="/v2/classroom/myCourse" router-name="myCourse" @router-before="toMyCourse">
              <h3>{{studyRecord.subjectCnt}}个课程</h3>
              <p>我的课程<i class="uricon-arrow-right"></i></p>
            </router-new-link>
           <!-- <a href="javascript:;" @click="toMyCourse">
              <h3>{{studyRecord.subjectCnt}}个课程</h3>
              <p>我的课程<i class="uricon-arrow-right"></i></p>
            </a>-->
          </li>
          <li>
            <a href="javascript:;">
              <h3>{{Math.round(studyRecord.duration / 60)}}分钟</h3>
              <p>已学习</p>
            </a>
          </li>
        </ul>
      </div>
      <div class="course-list-wrap">
        <div class="course-list" v-for="(val,key,index) in typeList" :key="index">
          <sub-title :title="key">
            <router-new-link router-path="/v2/classroom/courseList" router-name="courseList">
              <span class="sub-title-more">更多</span>
            </router-new-link>
          </sub-title>
          <div class="course-list-item-wrap">
            <course-list-item :list="val"></course-list-item>
          </div>
        </div>
      </div>

    </page-main>

  </page-wrap>
</template>

<script>
  import {mapState} from 'vuex'
  import PrimaryTitle from './modules/PrimaryTitle'
  import SubTitle from './modules/SubTitle'
  import CourseListItem from './modules/CourseListItem'
  import Swiper from 'lib/swiper/Swiper'
  import RouterNewLink from 'nativeFix/component/routerNewLink/RouterNewLink';
  import apiClassStudyRecord from 'api/classroom/apiClassStudyRecord'
  import apiClassSubjectByType from "api/classroom/apiClassSubjectByType";
  import {isApp, toLogin} from 'src/nativeFix/index';

  const items = [
    {
      linkUrl: 'https://m.urwork.cn/news/getnewsdetial?id=1372',
      image: 'http://img.urwork.cn/lADPBbCc1sSYGTvNAZDNAu4_750_400.jpg_620x10000q90g.jpg',
      id: 1
    },
    {
      linkUrl: 'https://m.urwork.cn/news/getnewsdetial?id=1396',
      image: 'http://img.urwork.cn/lADPBbCc1sSY9wPNAZDNAu4_750_400.jpg_620x10000q90g.jpg',
      id: 2
    }
  ];
  const list = [
    {
      "type": "职场攻略",
      "ids": "24,25"
    },
    {
      "type": "行业指南星",
      "ids": "35,41,36,37,53,52,51,49,48,47,46,45,44,43,42,40,34,33,32,31,30,29,28,27,26"
    }
  ];

  export default {
    data: () => {
      return {
        title: 'U课堂',
        isApp: isApp(),
        show: false,
        showStudy:false,
        studyRecord: {},                //  学习记录信息
        typeList: {}                    //  分类列表
      }
    },
    components: {
      PrimaryTitle,
      Swiper,
      SubTitle,
      CourseListItem,
      RouterNewLink
    },
    computed: {
      ...mapState({
        isLogin: state => state.isLogin,
      }),
      bannerList() {
        return items;
      }
    },
    methods: {
      getStudyRecord() {
        //   获取我的学习记录
        var u = navigator.userAgent;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(this.isApp&&isIOS){
          let version = this.$DANativeApi.apiVersionNumber;
          if(version >= 330){
            apiClassStudyRecord().then(res => {
              if(res.retCode == 0){
                this.showStudy = true;
                this.studyRecord = res.data;
              }
            });
          }else{
            if (this.isLogin) {
              apiClassStudyRecord().then(res => {
                  if(res.retCode == 0){
                    this.showStudy = true;
                    this.studyRecord = res.data;
                  }
              });
            }
          }
        }else{
          if (!this.isLogin) {
            return;
          }
          apiClassStudyRecord().then(res => {
            console.log(res,"33333")
            if(res.retCode == 0){
              this.showStudy = true;
              this.studyRecord = res.data;
            }
          });
        }
      },
      getSubjectByType() {
        let data = list;
        apiClassSubjectByType({
          type: 'POST',
          contentType: 'json',
          data
        }).then(res => {
          this.typeList = res;
          this.show = true;
        })
      },
      toMyCourse() {
        if(!this.studyRecord.subjectCnt){
          return;
        }
      }
    },
    created() {
      this.getSubjectByType();
      this.getStudyRecord();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  $main-margin: 8px;

  .slide-wrap {
    padding: 10px 15px 20px;
    background: #fff;
    margin-bottom: $main-margin;
    .is-app & {
      padding-top: 2px;
    }
  }

  .my-course-wrap {
    position: relative;
    padding: 28px 20px 16px;
    background: #fff;
    margin-bottom: $main-margin;
    .my-course-tag {
      position: absolute;
      top: 0;
      left: 20px;
      font-size: 11px;
      color: #fff;
      text-align: center;
      background: #80B3FD;
      border-radius: 2px;
      padding: 0 5px;
    }
    .my-course-info {
      display: flex;
      align-items: center;
      li {
        position: relative;
        width: 50%;
        &:first-child {
          @include border-right(#e5e5e5);
        }
      }
      a {
        display: block;
        text-align: center;
      }
      h3 {
        font-size: 18px;
        font-weight: bold;
      }
      p {
        font-size: 12px;
        color: #999999;
        i {
          font-size: 10px;
          transform: scale(.7777);
        }
      }
    }
  }

  .course-list {
    padding: 15px 20px 0;
    background: #fff;
    margin-bottom: $main-margin;

  }

  .sub-title-more {
    font-size: 12px;
    color: #999999;
  }
</style>
