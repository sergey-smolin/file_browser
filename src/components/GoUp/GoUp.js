import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItems } from '../../actions/rootActions';

class GoUp extends Component {
  constructor () {
    super();
    this.navigate = this.navigate.bind(this);
  }
  navigate() {
    const parts = window.location.pathname.substring(1).split('/');
    parts.pop();
    const newPath = parts.join('/');
    this.props.getItems(`/${newPath}`);
  }
  renderButton() {
    return this.props.currentDir === '/' ? 
      null :
      <button type="button" className="btn btn-primary" onClick={this.navigate}>Go up</button>;

  }
  render() {
    return <div className="button-container container">
      {this.renderButton()}
    </div>
  }
}

const mapStateToProps = state => ({
  currentDir: state.root.currentDir,
});

const mapDispatchToProps = {
  getItems
}

export default connect(mapStateToProps, mapDispatchToProps)(GoUp);

