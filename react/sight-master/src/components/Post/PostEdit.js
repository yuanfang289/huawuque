import React,{ Component } from 'react';
import { Row, Col, Button, Input, Select, message, Modal } from 'antd';
import { connect } from 'react-redux';
import * as styles from './PostEdit.less';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createTheme, saveSelectValue, saveinputThemeValue, clearCode, updateEditorValue } from './../../actions/PostAction';
const Option = Select.Option;
const Options = [
  {
    name:'人物',
    value: 'character'
  },
  {
    name:'黑白',
    value: 'bw'
  },
  {
    name:'城市',
    value: 'city'
  },
  {
    name:'美食',
    value: 'food'
  },
  {
    name:'动物',
    value: 'animal'
  },
  {
    name: '未分类',
    value: 'unclassified'
  }
];
class PostEdit extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      style: {},
      isRender: false,
      clientY: 300,
    };
    this.out = false;
    this.y = 0;
    this.h = 0;
    this.offsetHeight = 0;
    this.childHeight = 0;
  }
  componentDidMount() {
    this.offsetHeight = document.body.offsetHeight;
  }
  componentDidUpdate() {
    const { dispatch, postRedu: { code }, postRedu, cancelBtn, postDatas } = this.props;
    switch(code) {
      case 200:
        message.success('创建主题成功！');
        clearCode(dispatch, postRedu, 1);
        setTimeout(() => {
          cancelBtn();
          postDatas();
        }, 200);
      break;
      case 500:
        clearCode(dispatch, postRedu, 2);
        message.error('创建主题发生错误');
      break;
      case 404:
        clearCode(dispatch, postRedu, 2);
        message.info('请登录之后，再发表主题');
        setTimeout(() => {
          this.props.handleOk();
        }, 200);
      break;
    }
  }
  handleChange = (value) => {
    const { dispatch, postRedu } = this.props;
    saveSelectValue(dispatch, value, postRedu);
  }
  inputThemeChange = (e) => {
    const { dispatch, postRedu } = this.props;
    saveinputThemeValue(dispatch, e.target.value, postRedu);
  }
  crateTheme = () => {
    const { postRedu: { editorSelectValue, inputThemeValue, editorValue }, dispatch } = this.props;
    if(!inputThemeValue) {
      message.info('请输入标题！');
      return;
    }
    if(!editorValue) {
      message.info('请输入内容！');
      return;
    }
    let datas = {};
    datas.editorSelectValue = editorSelectValue;
    datas.inputThemeValue = inputThemeValue;
    datas.editorValue = editorValue;
    createTheme(dispatch, datas);
  }
  grippieMove = () => {
    const self = this;
    document.onmousemove = (b) => {
      if(!this.out) {
        return false;
      }
      let { propsStyle } = this.props;
      const { isRender } = this.state;
      let y = b.clientY - this.y;
      if(y < 0) {
        y = -(y);
        y = this.h + y;
        if(b.clientY <= 60) {
          this.setState((prevState, props) => ({
            isRender: !isRender
          }));
          this.props.propsStyle.height = this.offsetHeight - 56;
          this.props.quillStyle.height = this.offsetHeight - 170 - 56;
          return;
        }
      } else {
        y = this.h - y;
        if(propsStyle.height <= 230) {
          this.props.propsStyle.height = 230;
          this.props.quillStyle.height = 60;
          this.setState((prevState, props) => ({
            isRender: !isRender
          }));
          return;
        }
      }
      this.props.propsStyle.height = y;
      this.childHeight = y - 170;
      if(this.childHeight <= 60) {
        this.childHeight = 60; 
      }
      this.props.quillStyle.height = this.childHeight;
      this.props.quillStyle.display = 'block';
      this.props.quillStyle.transition = 'height 0s ease';
      this.props.quillStyle.MozTransition = 'height 0s ease';
      this.props.quillStyle.WebkitTransition = 'height 0s ease';
      this.props.quillStyle.OTransition = 'height 0s ease';
      this.setState((prevState, props) => ({
        style: {
          transition: 'height 0s ease',
          MozTransition: 'height 0s ease',
          WebkitTransition: 'height 0s ease',
          OTransition: 'height 0s ease'
        },
      }));
    }
  }
  editorChange = (content, delta, source, editor) => {
    const { dispatch } = this.props;
    updateEditorValue(dispatch, content);
  }
  grippieDown = (e) => {
    this.out = true;
    this.y = e.clientY;
    let editor = this.refs.editor;
    this.h = editor.offsetHeight;
    const self = this;
    this.grippieMove();
    e.preventDefault();
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      this.out = false;
      if(this.childHeight === 0) {
        this.childHeight = 160;
      }
      this.props.quillStyle.height = this.childHeight;
      this.props.quillStyle.display = 'block';
      this.props.quillStyle.transition = 'height 0.4s ease';
      this.props.quillStyle.MozTransition = 'height 0.4s ease';
      this.props.quillStyle.WebkitTransition = 'height 0.4s ease';
      this.props.quillStyle.OTransition = 'height 0.4s ease';
      this.setState((prevState, props) => ({
        style: {
          transition: 'height 0.4s ease',
          MozTransition: 'height 0.4s ease',
          WebkitTransition: 'height 0.4s ease',
          OTransition: 'height 0.4s ease'
        },
      }));
    }
  }
  childCancelBtn = () => {
    const { postRedu: { inputThemeValue, editorValue }, dispatch, postRedu, cancelBtn } = this.props;
    if(inputThemeValue || editorValue) {
      Modal.confirm({
        title: '您确定要放弃编辑过的帖子吗？',
        content: '',
        iconType: 'info-circle',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          clearCode(dispatch, postRedu, 1);
          cancelBtn();
        },
        onCancel: () => {

        }
      });
    } else {
      clearCode(dispatch, postRedu, 1);
      cancelBtn();
    }
  };
  render() {
    const { style } = this.state;
    const { cancelBtn, propsStyle, quillStyle, postRedu: { editorSelectValue, inputThemeValue, code, count, editorValue }, isShow  } = this.props;
    let modules = {
      toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold'],
        [{'list': 'ordered'}, {'list': 'bullet'}]
      ],
    };
    let textareaStyle = JSON.parse(JSON.stringify(quillStyle));
    if(quillStyle.height) {
      textareaStyle.height = textareaStyle.height + 44;
      quillStyle.height = quillStyle.height;
    }
    if(propsStyle.height) {
      propsStyle.height = propsStyle.height;
    }
    return (
      <div>
        {
          isShow ? 
          <div ref="editor" className="editor-div" style={{...style, ...propsStyle}}>
            <div className="grippie" onMouseDown={this.grippieDown} ></div>
            <div>
              <Button type="primary" icon="plus" style={{ borderRadius: '0' }} onClick={this.crateTheme} >创建主题</Button>
              <a className="editor-cancel" onClick={this.childCancelBtn}>取消</a>
            </div>
            <div>
              <Input className="title-input" placeholder="输入标题" onChange={this.inputThemeChange} value={inputThemeValue} />
              <Select
                defaultValue="未分类"
                value={editorSelectValue}
                style={{ width: '20%', marginLeft: '30px' }}
                onChange={this.handleChange}
              >
                {
                  Options.map((list, key) => 
                    <Option value={list.value} key={key}>{list.name}</Option>
                  )
                }
              </Select>
            </div>
            <div className="editor-col">
              <div className="editor-col-div">
                <ReactQuill
                  className="editor-quill"
                  style={{...quillStyle}}
                  value={editorValue}
                  onChange={this.editorChange}
                  modules={modules}
                >
                </ReactQuill>
              </div>
              <div className="editor-col-div">
                <div
                  className="monitor"
                  style={{...textareaStyle}}
                  disabled="disabled"
                  readOnly="readonly"
                  dangerouslySetInnerHTML={{__html: editorValue}}
                />
              </div>
            </div>
          </div> : ""
        }
      </div>
    );
  }
}
function mapStateToProps(state, oWnprops) {
  return state;
}
export default connect(mapStateToProps)(PostEdit);