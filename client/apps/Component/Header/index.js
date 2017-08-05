import React from 'react';
import $ from 'jquery'
import classNames from 'classnames'
import {Well} from 'react-bootstrap'
import style from './style.css'
import ws from '../WebSocket'


class Header extends React.Component {
  render() {
    return (
      <div className="row">
        <div className={classNames("bg-success", "col-xs-12", "text-right", style.header_text)}>
          聊天室在线人数:{this.props.online}人
        </div>
      </div>
    );
  }
}

export default Header;
