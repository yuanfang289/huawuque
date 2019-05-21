import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import { register, clear, tips } from './../../actions/UserAction';
import * as styles from './UserRegister.less';
import { userTips } from './../../util.js';
const FormItem = Form.Item;
class UserRegister extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      formItems: ['text|手机号|0', 'text|用户名|0', 'password|密码|0'],
    };
    this.numbers = [];
    this.phone = 0;
    this.userName = '';
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
    const phonePattern = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    const namePattern = /^\d/;
    let tipsArray = {};
    if(!(phonePattern.test(this.phone)) || !this.phone) {
      tipsArray.code = 500;
      tipsArray.tips = '手机号输入不正确';
      tips(dispatch, tipsArray);
      return;
    }
    if(namePattern.test(this.userName) || !this.userName) {
      tipsArray.code = 500;
      tipsArray.tips = '用户名输入不正确';
      tips(dispatch, tipsArray);
      return;
    }
    if(!this.password) {
      tipsArray.code = 500;
      tipsArray.tips = '密码输入不正确';
      tips(dispatch, tipsArray);
      return;
    }
    let datas = {};
    datas.phone = this.phone;
    datas.userName = this.userName;
    datas.password = this.password;
    register(dispatch, datas);
  }
  inputHanlder = (id, e) => {
    let value = e.target.value;
    let { formItems } = this.state;
    switch(id) {
      case 0:
        const phonePattern = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if(!value) {
          this.phone = value;
          formItems[0] = formItems[0].replace(/[0-9]/, 2);
          break;
        }
        if(phonePattern.test(value)) {
          formItems[0] = formItems[0].replace(/[0-9]/, 1);
        } else {
          formItems[0] = formItems[0].replace(/[0-9]/, 2);
        }
        this.phone = value;
      break;
      case 1:
        const namePattern = /^\d/;
        if(!value) {
          this.userName = value;
          formItems[1] = formItems[1].replace(/[0-9]/, 2);
          break;
        }
        if(!(namePattern.test(value))) {
          formItems[1] = formItems[1].replace(/[0-9]/, 1);
        } else {
          formItems[1] = formItems[1].replace(/[0-9]/, 2);
        }
        this.userName = value;
      break;
      case 2:
        if(!value) {
          this.password = value;
          formItems[2] = formItems[2].replace(/[0-9]/, 2);
          break; 
        }
        formItems[2] = formItems[2].replace(/[0-9]/, 1);
        this.password = value;
      break;
    }
    this.setState(() => ({
      formItems
    }));
  }
  renderFormItem() {
    let formItemsArray = [];
    const { formItems } = this.state;
    formItemsArray = formItems.map((list, id) => {
      let validateStatus, hasFeedback;
      if(parseInt(list.split('|')[2]) === 1) {
        hasFeedback = true;
        validateStatus = 'success';
      } else if(parseInt(list.split('|')[2]) === 2) {
        hasFeedback = true;
        validateStatus = 'error';
      }
      return (
        <FormItem key={id} hasFeedback validateStatus={validateStatus} >
          <Input type={list.split('|')[0]} placeholder={list.split('|')[1]} onInput={this.inputHanlder.bind(this, id)} />
        </FormItem>   
      )
    });
    return formItemsArray;
  }
  render() {
    const { userRedu: { tips, loading, code } } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h2 className="register-title">注册视线，进入你的世界</h2>
        {this.renderFormItem()}
        <FormItem>
          <Button loading={loading} type="primary" htmlType="submit" className="login-form-button user-register">注册</Button>
        </FormItem>
        <p className="register-clause">
          注册即表示你同意接受我们的<a target="_blank" href="javascript:void(0)">条款</a> 、 <a target="_blank" href="javascript:void(0)">数据使用政策</a>
        </p>
        {
          code === 200 ? <p className="register-text-tips" style={{ color: '#1ac51b' }}>{tips}</p> : <p className="register-text-tips">{tips}</p>
        }
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(UserRegister);
function mapStateToProps(state, oWnprops) {
  return state;
}
export default connect(mapStateToProps)(WrappedRegistrationForm);