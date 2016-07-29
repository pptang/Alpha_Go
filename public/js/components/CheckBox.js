import React, { Component } from 'react';

class CheckBox extends Component {

  render() {

    const { isChecked, handleCheck, title } = this.props;

    return (
      <div>
        <input type="checkbox" checked={isChecked} onChange={handleCheck} />
        <span>{title}</span>
      </div>
    );
  }
}

export default CheckBox;
