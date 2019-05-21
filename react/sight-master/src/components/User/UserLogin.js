import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { login, clear } from './../../actions/UserAction';
import { userTips } from './../../util.js'; 
import * as styles from './UserLogin.less';
const FormItem = Form.Item;
class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputOne: 1,
      inputTwo: 1,
    }
    this.account = '';
    this.password = '';
  }
  componentDidUpdate() {
    const { userRedu, dispatch, history } = this.props;
    const { code } = userRedu;
    if(code === 200) {
      let datas = {};
      datas.userRedu = userRedu;
      datas.dispatch = dispatch;
      datas.clear = clear;
      datas.history = history;
      userTips.alertMessage.call(datas);
    }
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    clear(dispatch);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    let datas = {};
    datas.account = this.account;
    datas.password = this.password;
    login(dispatch, datas);
  }
  inputHanlder = (id, e) => {
    let value = e.target.value;
    switch(id) {
      case 0:
        if(!value) {
          this.account = value;
          this.setState({
            inputOne: 3
          });
          break;
        }
        this.setState({
          inputOne: 2
        });
        this.account = value;
      break;
      case 1:
        if(!value) {
          this.password = value;
          this.setState({
            inputTwo: 3
          });
          break;
        }
        this.setState({
          inputTwo: 2
        });
        this.password = value;
      break;
    }
  }
  render() {
    const { inputOne, inputTwo } = this.state;
    let validateStatus, validateStatus2;
    if( inputOne === 2) {
      validateStatus = 'success';
    } else if( inputOne === 3) {
      validateStatus = 'error';
    }
    if(inputTwo === 2) {
      validateStatus2 = 'success';
    } else if( inputTwo === 3 ) {
      validateStatus2 = 'error';
    }
    const { forgetPassword, form, userRedu: { tips, loading, code } } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem hasFeedback validateStatus={validateStatus}>
          <Input placeholder="账号或手机号" onInput={this.inputHanlder.bind(this, 0)} />
        </FormItem>
        <FormItem validateStatus={validateStatus2} hasFeedback>
          <Input type="password" placeholder="密码" onInput={this.inputHanlder.bind(this, 1)} />
        </FormItem>
        <FormItem>
          <a className="login-form-forgot" onClick={forgetPassword}>忘记密码</a>
          <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">登录</Button>
          {/*<section className="login-form-thirdparty">
            <span className="wexin-login"></span>&nbsp;&nbsp;
            <span className="qq-login"></span>&nbsp;&nbsp;
            <span className="weibo-login"></span>&nbsp;&nbsp;
          </section>*/}
        </FormItem>
        {
          code === 200 ? <p className="login-text-tips" style={{ color: '#1ac51b' }}>{tips}</p> : <p className="login-text-tips">{tips}</p>
        }
      </Form>
    );
  }
}
const WrappedNormalLoginForm = Form.create()(UserLogin);
function mapStateToProps(state, oWnprops) {
  return state;
}
export default connect(mapStateToProps)(withRouter(WrappedNormalLoginForm));