import React from 'react';
import $ from 'jquery'
import classNames from 'classnames'
import {Modal, Button, FormGroup, FormControl} from 'react-bootstrap'
import ws from '../WebSocket'

class LoginModal extends React.Component {
  constructor() {
    super();
    this.state = {
      login: true,
      check:false,
      value: ''
    };
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length >0) return 'success';
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  sublimt(){
    if (this.refs.nickname.props.value == '') {
      this.setState({ check: true });
    } else {
      sessionStorage.setItem('nickname', this.refs.nickname.props.value)
      let send = `"${this.refs.nickname.props.value}"加入了聊天室`
      ws.send(send)
      this.setState({ login: false });
    }
  }

  checkClose(){
    this.setState({ check: false });
  }

  render() {
    return (
      <span>
      <Modal show={this.state.login}>
        <Modal.Header>
          <Modal.Title>登陆</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup
            controlId="name"
            validationState={this.getValidationState()}
          >
            <FormControl
              ref="nickname"
              type="text"
              value={this.state.value}
              placeholder="请输入你的昵称"
              onChange={this.handleChange.bind(this)}
            />
            <FormControl.Feedback />

          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.sublimt.bind(this)}>加入</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={this.state.check}>
        <Modal.Header>
          <Modal.Title>信息</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>没名字，滚粗！</h1>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.checkClose.bind(this)}>关闭</Button>
        </Modal.Footer>
      </Modal>
    </span>
    );
  }
}

export default LoginModal;
