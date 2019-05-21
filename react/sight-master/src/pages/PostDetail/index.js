import React,{ Component } from 'react';
import { connect } from 'react-redux';
import LayoutHead from './../../components/Layout/LayoutHead';
import { getPostDetail } from './../../actions/PostDetailAction';
import * as styles from './index.less';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.offsetWidth = 0;
  }
  componentDidMount() {
    const { dispatch } = this.props;
    const postId = localStorage.getItem('postId');
    getPostDetail(dispatch, postId);
    this.offsetWidth = document.body.offsetWidth;
  }
  render() {
    const { postDetailRedu: list, history, postDetailRedu } = this.props;
    const { theme, editor_value, classification, user, userAvatar, time} = list;
    let value;
    switch(classification) {
      case 'character':
        value = '人物';
      break;
      case 'bw':
        value = '黑白';
      break;
      case 'city':
        value = '城市';
      break;
      case 'food':
        value = '食物';
      break;
      case 'animal':
        value = '动物';
      break;
      case 'unclassified':
        value = '未分类';
      break;
    }
    return (
      <div>
        <LayoutHead history={history} />
        <section className="detail-main" style={{ width: this.offsetWidth - 300 }}>
          <section className="detail-theme">
            <h1>{theme}</h1>
            <div className="detail-classification">{value}</div>
          </section>
          <section className="detail-editor">
            <div className="detail-avatar">
              <img src={userAvatar} height="45" width="45" alt="头像" />
            </div>
            <section className="detail-editor-right">
              <div className="detail-editor-right-username">{user}</div>
              <div style={{ marginTop: '24px' }} dangerouslySetInnerHTML={{__html: editor_value}} />
              <span style={{ float: 'right' }}>{time}</span>
            </section>
          </section>
        </section>
      </div>
    );
  }
}
function mapStateToProps(state, oWnprops) {
  return state;
}
export default connect(mapStateToProps)(Index);