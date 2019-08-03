import React, { Component } from 'react';
import classnames from 'classnames';
import { getHumanReadableSize } from '../../utils/utils';

class FSItem extends Component {
  constructor() {
    super();
    this.navigate = this.navigate.bind(this);
  }
  navigate() {
    this.props.navigate(this.props.path);
  }
  getNavigateCallback() {
    return this.props.type === 'dir' ? this.navigate : undefined;
  }
  getIcon() {
    return this.props.type === 'dir' ? <div className="item-icon"><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 1h6l1.5 2H16v11H0z" fill="#FDEFB2"/><path d="M0 1h6l1.5 2H16v11H0z" fillOpacity=".3" fill="#FFDD0D"/><path stroke="#EFD429" d="M.5 1.5v12h15v-10H7.25l-1.5-2z"/></g></svg></div> : null;
  }
  getItemSize() {
    return this.props.type === 'file' ? <div className="item_size">{getHumanReadableSize(this.props.size)}</div> : null;
  }
  render() {
    const { type, name } = this.props;
    return <li
      className={classnames(type === 'dir' ? 'item_dir' : 'item_file', "list-group-item", "fs_item")}
      onClick={this.getNavigateCallback()}
    >
      <div className="item-container">
        <div className="item_icon_and_name">
          {this.getIcon()}
          <div className="item_name">{name}</div>
        </div>
        {this.getItemSize()}
      </div>
    </li>
  }
}

export default FSItem;