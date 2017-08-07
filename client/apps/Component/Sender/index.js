import React from 'react';
import $ from 'jquery'
import classNames from 'classnames'
import {Col, FormControl, Button, ButtonGroup, Tooltip, OverlayTrigger} from 'react-bootstrap'
import ws from '../WebSocket'
import style from './style.css'


class Sender extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      tooltip: true,
      img: null
    };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  send(){
    if (this.refs.msg.props.value && !this.state.img) {
      let nickname = sessionStorage.getItem('nickname')
      let send = {"name":nickname, "msg": this.refs.msg.props.value, "type": 'text'}
      ws.send(JSON.stringify(send))
      this.setState({ value: '' });
    }else if (this.state.img) {
      let nickname = sessionStorage.getItem('nickname')
      let send = {"name":nickname, "msg": this.state.img, "type": 'img'}
      ws.send(JSON.stringify(send))
      this.setState({ img: null, value: ''});
    } else {
      this.setState({ tooltip: false });
    }
  }

  clear(){
    $("div[name='msg']").remove()
    $("p[name='msg']").remove()
  }

  clearTooltips(){
    this.setState({ tooltip: true });
  }

  fileState(e){
    let _this = this;
    _this.setState({ tooltip: true })
    let file = e.target.files[0];
    if(!/image\/\w+/.test(file.type)){
      alert("请确保文件为图像类型");
      return false;
    }
    let  reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e){
      _this.setState({img: this.result, value: '[图片]'});
    }
  }

  imageClick(){
    path.click()
  }

  render() {
    return (
      <div className="row">
        <div id="info" className="center-block">
          <Tooltip id="tooltip" placement="top" className={classNames("in", {"hide": this.state.tooltip})}>必须输入内容</Tooltip>
          <FormControl
            className={classNames(style.text)}
            ref="msg"
            type="text"
            value={this.state.value}
            componentClass="textarea"
            onChange={this.handleChange.bind(this)}
            onFocus={this.clearTooltips.bind(this)}
          />
        </div>
        <input type="file" id="path" className="hide" onChange={this.fileState.bind(this)}/>
        <ButtonGroup justified>
          <ButtonGroup>
            <Button ref="send" bsStyle="primary" onClick={this.send.bind(this)}>发送</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button ref="image" bsStyle="success" onClick={this.imageClick}>选择图片</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button ref="clear" bsStyle="danger" onClick={this.clear.bind(this)}>清屏</Button>
          </ButtonGroup>
        </ButtonGroup>
      </div>
    );
  }
}

export default Sender;
