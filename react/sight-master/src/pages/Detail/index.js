import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Affix } from 'antd';
import LayoutHead from './../../components/Layout/LayoutHead.js';
import LayoutFooter from './../../components/Layout/LayoutFooter.js';
import * as styles from './index.less';
class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { history } = this.props;
    const img = sessionStorage.getItem('img');
    const imgName = sessionStorage.getItem('imgName');
    return (
      <div className="detail">
        <Affix>
          <LayoutHead history={history} />
        </Affix>
        <main>
          <header className="detail-header">
            <h1 className="detail-name">{imgName}</h1>
          </header>
          <img className="detail-img" src={img} />
        </main>
      </div>
    );
  }
}
function mapStateToProps(state, oWnprops) {
  return state;
}

export default connect(mapStateToProps)(Index);