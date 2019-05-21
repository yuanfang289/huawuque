import React,{ Component } from 'react';
import { connect } from 'react-redux';
import UserLogin from './../../components/User/UserLogin.js';
import UserRegister from './../../components/User/UserRegister.js';
import UserForgetPassword from './../../components/User/UserForgetPassword.js';
import * as styles from './index.less';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: 1,
    };
  }
  goRegister = () => {
    const { isLogin } = this.state;
    if(isLogin === 1) {
      this.setState(() => ({
        isLogin: 2,
      }));
    } else {
      this.setState(() => ({
        isLogin: 1,
      }));
    }
  };
  forgetPassword = () => {
    this.setState(() => ({
      isLogin: 3,
    }));
  }
  renderContent() {
    const { isLogin } = this.state;
    const { history, page, handleCancel } = this.props;
    switch(isLogin) {
      case 1:
        return (
          <UserLogin forgetPassword={this.forgetPassword} history={history} page={page} handleCancel={handleCancel} />
        );
      case 2:
        return (
          <UserRegister history={history} page={page} handleCancel={handleCancel} />
        );
      case 3:
        return (
          <UserForgetPassword history={history} page={page} handleCancel={handleCancel} />
        );
    }
  }
  render() {
    const { isLogin } = this.state;
    return (
      <main className="user-main">
        <div className="user-main-div">
          <div className="user-main-div-logo">
          </div>
          {this.renderContent()}
          <div className="user-main-div-button">{ isLogin === 1 ? '没有账号' : '已有账号' }？<a onClick={this.goRegister}>{ isLogin === 1 ? '注册' : '登录' }</a>
          </div>
        </div>
      </main>
    );
  }
}
function mapStateToProps(state, oWnprops) {
  return state;
}

export default connect(mapStateToProps)(Index);