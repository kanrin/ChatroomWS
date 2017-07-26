import React from 'react';
import $ from 'jquery'
import classNames from 'classnames'
import {Well} from 'react-bootstrap'
import style from './style.css'


class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      nickname: sessionStorage.getItem('nickname')
    };
  }

  componentDidMount(){
    if (sessionStorage.getItem('nickname')) {
      this.setState({nickname: sessionStorage.getItem('nickname')});
    }
  }

  render() {
    return (
      <div className="row">
        <div className={classNames("bg-success", "col-xs-12", "text-right", style.header_text)}>
          聊天室在线人数:
          <span id="online"></span>
        </div>
      </div>
    );
  }
}

export default Header;
