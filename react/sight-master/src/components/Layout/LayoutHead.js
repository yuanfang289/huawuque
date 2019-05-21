import React,{ PureComponent } from 'react';
import { Row, Col, Icon, Affix, Input } from 'antd';
import { connect } from 'react-redux';
import * as styles from './LayoutHead.less';
import { getAvatar } from './../../actions/LayoutHeadAction.js';
const Search = Input.Search;
class LayoutHead extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { dispatch } = this.props;
    getAvatar(dispatch);
  }
  searchText(e) {

  }
  render() {
    const { layoutHeadRedu: { userName, avatar }, history, onload } = this.props;
    return (
      <nav className="header-nav">
        <Row className="row header-nav-row">
          <Col span={8}>
            <div className="header-logo" onClick={() => {
              if(location.pathname === '/') {
                onload();
              } else {
                history.push('/');
              }
            }} />
          </Col>
          <Col span={8} className="header-nav-row-search-col">
            <Search placeholder="搜索" onSearch={this.searchText.bind(this)} className="header-nav-row-search-col-input" />
          </Col>
          <Col span={8} className="header-nav-row-icon-col">
            <span className="header-nav-row-icon-col-compass">
              <Icon type="compass" className="icon" onClick={() => history.push('/post')} />
            </span>
            <span className="header-nav-row-icon-col-user">
              { userName ? <Icon type="user" className="icon" onClick={() => history.push('/personal') } /> : <Icon type="user" className="icon" onClick={() => history.push('/user') } /> }
            </span>
          </Col>
        </Row>
      </nav>
    );
  }
}
function mapStateToProps(state, oWnprops) {
  return state;
}
export default connect(mapStateToProps)(LayoutHead);