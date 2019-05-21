import React,{ Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Spin, message, BackTop, Skeleton, SkeletonAvatarProps } from 'antd';
import ItemCard from './../../components/ItemCard/ItemCard.js';
import LayoutHead from './../../components/Layout/LayoutHead.js';
import LayoutFooter from './../../components/Layout/LayoutFooter.js';
import PropTypes from 'prop-types';
import { getData, userClick, clearListData } from './../../actions/HomeAction';
import './index.less';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      hasMore: true,
      renderImages: false,
    };
    this.isSetState = true;
    this.images = [];
  }

  componentDidMount() {
    const { dispatch } = this.props;
    getData(dispatch, 7);
    this.handleScroll();
    this.onBodyResize();
  }

  componentDidUpdate() {
    const { history, homeRedu: { listData } } = this.props;
    const { renderImages } = this.state;
    setTimeout(() => {
      if(listData.length && !(renderImages)) {
        this.setState({
          renderImages: true,
        });
      }
    }, 500);
  }

  componentWillUnmount() {
    document.body.onresize = null;
    document.onscroll = null;
  }

  async onloadImaegs({ src, like, avatar, name }, index) {
    const self = this;
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.src = src;
      img.onload = function (e) {
        resolve(index);
        self.images[index] = {
          src,
          like,
          avatar,
          name
        };
      };
    });
  }

  onBodyResize = () => {
    document.body.onresize = () => {
      let sectionMain = this.refs.sectionMain;
      let left = sectionMain.offsetLeft + 600 + 81;
      this.setState({
        styles: {
          position: 'fixed',
          left,
        }
      });
    }
  }

  handleScroll = () => {
    document.onscroll = () => {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let sectionMain = this.refs.sectionMain;
      if(scrollTop > 0) {
        if(this.isSetState) {
          this.isSetState = false;
          let left = sectionMain.offsetLeft + 600 + 81;
          this.setState({
            styles: {
              position: 'fixed',
              left
            }
          });
        }
      } else {
        this.isSetState = true;
        this.setState({
          styles: {
            position: 'absolute',
          }
        });
      }
    }
  }

  handleInfiniteOnLoad = (page) => {
    const { dispatch, homeRedu: { count, total } } = this.props;
    if(total > count) {
      this.setState(() => ({
        loading: true,
      }));
      setTimeout(() => {
        getData(dispatch, count + 7);
      }, 700);
      setTimeout(() => {
        this.setState(() => ({
          loading: false,
        }));
      }, 700);
    }
  };

  renderList(listData) {
    const listArray = listData.map((list, index) => {
      return (
        <ItemCard
          list={list}
          key={"card" + index}
          renderImages={this.renderImages}
        />
      );
    });
    return listArray;
  }

  onload = () => {
    const { dispatch } = this.props;
    clearListData(dispatch);
    setTimeout(() => {
      getData(dispatch, 16);
    }, 500);
  }

  render() {
    const { loading, hasMore, styles, renderImages } = this.state;
    const { history, homeRedu: { listData, isRender } } = this.props;
    let datas = {};
    ({ datas: datas.initialLoad = false, datas: datas.pageStart = 0, datas: datas.loadMore = this.handleInfiniteOnLoad, datas: datas.hasMore = !loading && hasMore, datas: datas.useWindow = true, datas: datas.threshold = 10 } = {});
    return (
      <section>
        <LayoutHead history={history} onload={this.onload.bind(this)} />
        {
          isRender && <Spin size="large" />
        }
        <main className="home-main">
          <section ref="sectionMain" className="home-main-section">
            {
              renderImages ? <InfiniteScroll
                {...datas}
              >
                <div className="home-main-section-left">
                  {this.renderList(listData)}
                </div>
                { loading && <Spin className="public-spin" /> }
              </InfiniteScroll> : <article className="home-main-section-card">
                    <header className="home-main-section-card-header">
                      <span className="home-main-section-card-header-avatar" />
                      <span className="home-main-section-card-header-name" />
                    </header>
                    <div className="home-main-section-card-img"/>
                  </article>
            }
            <section ref="sectionRight" className="home-main-section-right" style={styles}>
              <div className="home-main-section-right-avatar">
                <img className="home-main-section-right-avatar-img" alt="src" src="https://img.downfuture.com/images/4qigLk8TygbuJW1GFwellx3y.jpeg-avatar2" />
                <p className="home-main-section-right-avatar-name">
                  test
                </p>
              </div>
              <ul className="home-main-section-right-list">
                <li>
                  <span>帖子</span>
                  <span>0</span>
                </li>
                <li>
                  <span>收藏</span>
                  <span>0</span>
                </li>
                <li>
                  <span>关注</span>
                  <span>0</span>
                </li>
                <li>
                  <span>粉丝</span>
                  <span>0</span>
                </li>
              </ul>
              <div className="home-main-section-right-footer">
                © 2018 视线
              </div>
            </section>
          </section>
        </main>
        <BackTop />
      </section>
    );
  }
}

function mapStateToProps(state, oWnprops) {
  return state;
}

export default connect(mapStateToProps)(Index);