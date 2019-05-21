import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { passwordChange, clear } from './../../actions/SettingAction';
import { tips } from './../../util.js';
import * as styles from './PasswordChange.less';
const FormItem = Form.Item;
class PasswordChange extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    console.log(1);
    const { settingRedu } = nextProps;
    const { dispatch, history } = this.props;
    let datas = {};
    datas.userRedu = settingRedu;
    datas.dispatch = dispatch;
    datas.clear = clear;
    datas.history = history;
    tips.alertMessage.call(datas);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        passwordChange(dispatch, values);
      }
    });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两个密码输入不一致！');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    const passWordPattern = /^(?=.*\d)(?=.*[a-z]).{6,20}$/;
    if(value) {
      if(!passWordPattern.test(value)) {
        callback('密码应为6-20位，由大小写字母及数字组成');
      } else {
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    } else {
      callback();
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="passwordchange-login-form">
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '新密码',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <div>
              <Input className="input-two" type="password" placeholder="新密码" />
            </div>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请再次输入新密码!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input  className="input-three" type="password" placeholder="请再次输入新密码" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="passwordchange-login-form-button">修改</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(PasswordChange);
function mapStateToProps(state,oWnprops) {
  return state;
}
export default connect(mapStateToProps)(WrappedRegistrationForm);