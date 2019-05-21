<template>
  <div>
    <!--课程列表的-->
    <div class="course-list-item course--list-object" v-if="Object.prototype.toString.call(list) === '[object Object]'">
      <!--免费的  不判断最新版本号-->
      <template v-if="list.price === 0">
        <to-page
          :ios="'3.0.8'"
          :android="'3.0.9'"
          :nativePath="'subjectMain?id=' + list.id"
          :path="{name: 'courseDetail', params: {id: list.id}}"
        >
          <dl>
            <dt>
              <Img :src="list.imgUrl"/>
              <!--<div class="play-cnt">-->
              <!--<i class="uricon-audio-number"></i> {{list.playCnt}}-->
              <!--</div>-->
            </dt>
            <dd>
              <h3>{{list.name}}</h3>
              <h4>{{list.title}}</h4>
              <div class="course-use-info">
                <p>{{list.lessonsCnt}}节课</p>
                <!--<p>{{Math.round(item.durationTotal / 60)}}分钟／{{item.playCnt}}人听过</p>-->
              </div>
              <!--<div class="course-price">-->
              <!--<p  v-if="list.price === 0">免费</p>-->
              <!--<p  v-else><span>￥</span>{{list.price}}</p>-->
              <!--</div>-->
              <div class="course-tip">
                <div v-if="list.leastListeners" class="listeners">
                  <to-page
                    :ios="'3.0.8'"
                    :android="'3.0.9'"
                    :nativePath="'subjectMain?id=' + list.id"
                    :path="{path: v2+'/classroom/listenerList', query: {id: list.id,title:'最近听过'}}"
                  >
                    <ul>
                      <li v-for="row in list.leastListeners.slice(0,4)"><img :src="row.headImageUrl+'?imageMogr2/thumbnail/!140x140r/gravity/Center/crop/140x140'" onerror="javascript:this.src='https://assets.urwork.cn/image/headImg.png';"/></li>

                      <li class="lessonsCnt" v-if="list.playCnt > 4">{{list.playCnt}}</li>
                    </ul>
                  </to-page>
                </div>
              </div>
              <div class="course-price">
                <p style="font-size: 14px" v-if="list.isBuyed==1">已购买</p>
                <template v-else="">
                  <p style="font-size: 14px" v-if="list.price === 0">限时免费</p>
                  <template v-else="">
                    <p v-if="list.discountPrice&&list.discountPrice!=list.price">
                      <span>￥</span>{{list.discountPrice}}<span class="del">￥{{list.price}}</span>
                    </p>
                    <p v-else="">
                      <span>￥</span>{{list.price}}
                    </p>
                  </template>

                </template>
              </div>
              <button class="btn btn-primary">{{isEn ? field.podcasts.en : field.podcasts.ch}}
                <!--<img src="../../../static/images/classroom/pause.png" alt="">-->
              </button>
              <!--<div class="course-tip">-->
              <!--<p v-if="list.price === 0">免费</p>-->
              <!--<p v-else><span>￥</span>{{list.price}}</p>-->
              <!--<button class="btn btn-primary">限时免费 <img src="../../../static/images/classroom/pause.png" alt=""></button>-->
              <!--</div>-->
            </dd>
          </dl>
        </to-page>
      </template>
      <!--付费的  判断最新版本号-->
      <template v-else="">
        <to-page
          :ios="'3.3.0'"
          :android="'3.3.0'"
          :nativePath="'subjectMain?id=' + list.id"
          :path="{name: 'courseDetail', params: {id: list.id}}"
        >
          <dl>
            <dt>
              <Img :src="list.imgUrl"/>
              <!--<div class="play-cnt">-->
              <!--<i class="uricon-audio-number"></i> {{list.playCnt}}-->
              <!--</div>-->
            </dt>
            <dd>
              <h3>{{list.name}}</h3>
              <h4>{{list.title}}</h4>
              <div class="course-use-info">
                <p>{{list.lessonsCnt}}节课</p>
                <!--<p>{{Math.round(item.durationTotal / 60)}}分钟／{{item.playCnt}}人听过</p>-->
              </div>
              <!--<div class="course-price">-->
              <!--<p  v-if="list.price === 0">免费</p>-->
              <!--<p  v-else><span>￥</span>{{list.price}}</p>-->
              <!--</div>-->
              <div class="course-tip">
                <div v-if="list.leastListeners" class="listeners">
                  <to-page
                    :ios="'3.0.8'"
                    :android="'3.0.9'"
                    :nativePath="'subjectMain?id=' + list.id"
                    :path="{path: v2+'/classroom/listenerList', query: {id: list.id,title:'最近听过'}}"
                  >
                    <ul>
                      <li v-for="row in list.leastListeners.slice(0,4)"><img :src="row.headImageUrl+'?imageMogr2/thumbnail/!140x140r/gravity/Center/crop/140x140'" onerror="javascript:this.src='https://assets.urwork.cn/image/headImg.png';"/></li>

                      <li class="lessonsCnt" v-if="list.playCnt > 4">{{list.playCnt}}</li>
                    </ul>
                  </to-page>
                </div>
              </div>
              <div class="course-price">
                <p style="font-size: 14px" v-if="list.isBuyed==1">已购买</p>
                <template v-else="">
                  <p style="font-size: 14px"  v-if="list.price === 0">限时免费</p>
                  <template v-else="">
                    <p v-if="list.discountPrice&&list.discountPrice!=list.price">
                      <span>￥</span>{{list.discountPrice}}<span class="del">￥{{list.price}}</span>
                    </p>
                    <p v-else="">
                      <span>￥</span>{{list.price}}
                    </p>
                  </template>

                </template>
              </div>
              <button class="btn btn-primary">{{isEn ? field.podcasts.en : field.podcasts.ch}}
                <!--<img src="../../../static/images/classroom/pause.png" alt="">-->
              </button>
              <!--<div class="course-tip">-->
              <!--<p v-if="list.price === 0">免费</p>-->
              <!--<p v-else><span>￥</span>{{list.price}}</p>-->
              <!--<button class="btn btn-primary">限时免费 <img src="../../../static/images/classroom/pause.png" alt=""></button>-->
              <!--</div>-->
            </dd>
          </dl>
        </to-page>
      </template>
    </div>

    <!--其余的-->
    <div class="course-list-item" v-else v-for="item in list" :key="item.id">
      <!--免费的  不判断最新版本号-->
      <template v-if="item.price === 0">
        <to-page
          :ios="'3.0.8'"
          :android="'3.0.9'"
          :nativePath="'subjectMain?id=' + item.id"
          :path="{name: 'courseDetail', params: {id: item.id}}"
        >
          <dl>
            <dt>
              <Img :src="item.imgUrl"/>
              <!--<div class="play-cnt">-->
              <!--<i class="uricon-audio-number"></i> {{item.playCnt}}-->
              <!--</div>-->
            </dt>
            <dd>
              <h3>{{item.name}}</h3>
              <h4>{{item.title}}</h4>
              <div class="course-use-info">
                <p>{{item.lessonsCnt}}节课</p>
                <!--<p>{{Math.round(item.durationTotal / 60)}}分钟／{{item.playCnt}}人听过</p>-->
              </div>
              <div class="course-tip">
                <div v-if="item.leastListeners" class="listeners">
                  <object>
                    <a href="javascript:;" @click.stop="toListenerList({path: v2+'/classroom/listenerList', query: {id: item.id, title: '最近听过'}})">
                      <ul>
                        <li v-for="row in item.leastListeners.slice(0,4)"><img :src="row.headImageUrl+'?imageMogr2/thumbnail/!140x140r/gravity/Center/crop/140x140'" onerror="javascript:this.src='https://assets.urwork.cn/image/headImg.png';"/></li>

                        <li class="lessonsCnt" v-if="item.playCnt > 4">{{item.playCnt}}</li>
                      </ul>
                    </a>
                  </object>
                </div>
              </div>
              <div class="course-price">
                <p style="font-size: 14px" v-if="item.isBuyed==1">已购买</p>
                <template v-else="">
                  <p style="font-size: 14px" v-if="item.price === 0">限时免费</p>
                  <template v-else="">
                    <p v-if="item.discountPrice&&item.discountPrice!=item.price">
                      <span>￥</span>{{item.discountPrice}}<span class="del">￥{{item.price}}</span>
                    </p>
                    <p v-else="">
                      <span>￥</span>{{item.price}}
                    </p>
                  </template>

                </template>
              </div>
              <button class="btn btn-primary">{{isEn ? field.podcasts.en : field.podcasts.ch}}
                <!--<img src="../../../static/images/classroom/pause.png" alt="">-->
              </button>
            </dd>
          </dl>
        </to-page>
      </template>
      <!--付费的  判断最新版本号-->
      <template v-else="">
        <to-page
          :ios="'3.3.0'"
          :android="'3.3.0'"
          :nativePath="'subjectMain?id=' + item.id"
          :path="{name: 'courseDetail', params: {id: item.id}}"
        >
          <dl>
            <dt>
              <Img :src="item.imgUrl"/>
              <!--<div class="play-cnt">-->
              <!--<i class="uricon-audio-number"></i> {{item.playCnt}}-->
              <!--</div>-->
            </dt>
            <dd>
              <h3>{{item.name}}</h3>
              <h4>{{item.title}}</h4>
              <div class="course-use-info">
                <p>{{item.lessonsCnt}}节课</p>
                <!--<p>{{Math.round(item.durationTotal / 60)}}分钟／{{item.playCnt}}人听过</p>-->
              </div>
              <div class="course-tip">
                <div v-if="item.leastListeners" class="listeners">
                  <object>
                    <a href="javascript:;" @click.stop="toListenerList({path: v2+'/classroom/listenerList', query: {id: item.id, title: '最近听过'}})">
                      <ul>
                        <li v-for="row in item.leastListeners.slice(0,4)"><img :src="row.headImageUrl+'?imageMogr2/thumbnail/!140x140r/gravity/Center/crop/140x140'" onerror="javascript:this.src='https://assets.urwork.cn/image/headImg.png';"/></li>

                        <li class="lessonsCnt" v-if="item.playCnt > 4">{{item.playCnt}}</li>
                      </ul>
                    </a>
                  </object>
                </div>
              </div>
              <div class="course-price">
                <p style="font-size: 14px" v-if="item.isBuyed==1">已购买</p>
                <template v-else="">
                  <p style="font-size: 14px" v-if="item.price === 0">限时免费</p>
                  <template v-else="">
                    <p v-if="item.discountPrice&&item.discountPrice!=item.price">
                      <span>￥</span>{{item.discountPrice}}<span class="del">￥{{item.price}}</span>
                    </p>
                    <p v-else="">
                      <span>￥</span>{{item.price}}
                    </p>
                  </template>

                </template>
              </div>
              <button class="btn btn-primary">{{isEn ? field.podcasts.en : field.podcasts.ch}}
                <!--<img src="../../../static/images/classroom/pause.png" alt="">-->
              </button>
            </dd>
          </dl>
        </to-page>
      </template>
    </div>
  </div>
</template>

<script>
  import toPage from 'nativeFix/component/toPage/toPage'
  import field from 'src/app/classroom/EnTable';
  import {mapState} from 'vuex';
  import {isApp} from 'nativeFix';
  import {getLocation} from 'utils';
  import routePrefix from 'config/config';

  /**
   * @property {Array, Object}   list                课程列表
   */
  export default {
    props: {
      list: {
        type: [Array, Object],
        required: true
      }
    },
    components: {
      toPage
    },
    computed: {
      ...mapState({
        isEn: state => state.languageEnUS
      })
    },
    data: () => {
      return {
        field, //  英文化字段
        v2:''
      }
    },
    methods: {
      toListenerList(args) {
        let location = getLocation();
        let {
          path,
          query: {
            id,
            title
          }
        } = args;
        if (isApp()) {
          this.$DANativeApi.navigateTo({
            url: `${location.origin}${path}?id=${id}&title=${encodeURIComponent(title)}`
          })
        } else {
          this.$router.push(args);
        }
      }
    },
    mounted() {

    },
    created() {
      this.v2 = routePrefix.routePrefix;
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/variables";
  @import "../../../assets/scss/mixins";

  .course-list-item {
    position: relative;
    padding: 20px 0;
    @include border-bottom(#E5E5E5);
    &:last-child {
      @include border-bottom(transparent);
    }
    dl {
      display: flex;
    }
    dt {
      height: 140px;
      flex-shrink: 0;
      flex-grow: 0;
      flex-basis: 105px;
      border-radius: 5px;
      overflow: hidden;
      position: relative;
      .play-cnt {
        position: absolute;
        left: 5px;
        bottom: 2px;
        color: #fff;
        font-size: 12px;
        i {
          font-size: 16px;
        }
      }
    }
    dd {
      position: relative;
      padding-left: 14px;
      min-width: 0;
      flex-grow: 1;
      h3 {
        font-size: 16px;
        font-weight: bold;
        @include text-overflow;
      }
      h4 {
        font-size: 14px;
        @include text-overflow;
      }
      .course-use-info {
        padding: 10px 0;
        p {
          font-size: 12px;
          color: #7A808F;
        }
      }
      .course-price{
        position: absolute;
        bottom: 3px;
        left: 14px;
        p {
          font-size: 16px;
          font-weight: bold;
          color: $color-price;
          span{
            font-size: 10px;
          }
          .del{
            margin-left: 3px;
            font-size: 11px;
            color: #999999;
            letter-spacing: 0;
            text-decoration:line-through;
          }
        }
      }
      .course-tip {
        margin-top: 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        width: 100%;
        .listeners{
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          top: 0;
          left: 0;
          ul{
            li{
              float: left;
              margin-left: -6px;
              &:first-child {
                margin-left:0;
              }
              img{
                width: 23px;
                height: 23px;
                display: inline-block;
                border-radius: 50%;
                border: 1px solid #FFFFFF;
              }
            }
            .lessonsCnt{
              width: 23px;
              height: 23px;
              text-align: center;
              display: inline-block;
              border-radius: 50%;
              background: #F4F4F4;
              color: #999999;
              border: 1px solid #F4F4F4;
              font-size: 9px;
              line-height: 23px;
            }
          }
        }
      }
      .btn {
        background: #fff;
        border-radius: 28px;
        border-color: #333;
        height: 28px;
        line-height: 26px!important;
        color: #333;
        margin-right: 0px;
        padding: 0px 16px!important;
        position: absolute;
        right: 0;
        bottom: 2px;
        img {
          width: 15px;
          margin-left: 3px;
        }
      }
    }
  }
  .course-list-item.course--list-object {
    @include border-bottom(#E5E5E5);
  }
</style>
