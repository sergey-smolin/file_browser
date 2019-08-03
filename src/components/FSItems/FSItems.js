import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItems } from '../../actions/rootActions';
import FSItem from '../FSItem/FSItem';

class FSItems extends Component {
  constructor() {
    super();
    this.navigate = this.navigate.bind(this);
  }
  componentDidMount() {
    const path = window.location.pathname;
    this.props.getItems(path);
    window.onpopstate = state => {
      this.props.getItems(window.location.pathname)
    };
  }
  navigate(path) {
    this.props.getItems(path);
  }
  render() {
    const { folders, error } = this.props;
    let result;
    if (error) {
      result = error
    } else {
      result = <ul className="list-group">
          {folders.map(folder =>
          {
            return <FSItem
              key={folder.resource_id}
              navigate={this.navigate}
              {...folder}
            />
          }
            )}
        </ul>
    }
    return (
      <div className="container">
        {result}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentDir: state.root.currentDir,
  folders: state.root.folders,
  error: state.root.error,
});

const mapDispatchToProps = {
  getItems
}

export default connect(mapStateToProps, mapDispatchToProps)(FSItems);
