import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import LayoutHead from './../../components/Layout/LayoutHead.js';
import PasswordChange from './../../components/Setting/PasswordChange.js';
import ManageAccess from './../../components/Setting/ManageAccess.js';
import * as styles from './index.less';
const TabPane = Tabs.TabPane;
class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { history } = this.props;
    return (
      <div className="setting-div">
        <LayoutHead history={history} />
        <main>
          <Tabs
            className="setting-tab"
            defaultActiveKey="1"
            tabPosition="left"
            style={{ height: 439 }}
            type="line"
          >
            <TabPane tab="更改密码" key="1">
              <PasswordChange />
            </TabPane>
            <TabPane tab="授权的应用" key="2">
              <ManageAccess />
            </TabPane>
          </Tabs>
        </main>
      </div>
    );
  }
}
function mapStateToProps(state, oWnprops) {
  return state;
}
export default connect(mapStateToProps)(Index);