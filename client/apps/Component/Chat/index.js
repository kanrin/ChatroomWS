import React from 'react';
import $ from 'jquery'
import classNames from 'classnames'
import {Col} from 'react-bootstrap'
import style from './style.css'


class Chat extends React.Component {

  constructor() {
    super();
    this.state = {
      height: null
    };
  }

  componentDidMount(){
    let height = window.innerHeight - 48 - 54 - 34
    this.setState({height: height})
    window.addEventListener('resize', () => {
      let height = window.innerHeight - 48 - 54 - 34
      this.setState({height: height})
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
  }

  render() {
    return (
      <div className="row">
        <div id="info" className={classNames(style.chat)} style={{height: this.state.height}}>
        </div>
      </div>
    );
  }
}

export default Chat;
