import React, { Component } from 'react';

class CheckBox extends Component {

  render() {

    const { isChecked, handleCheck, title, shouldShowCheckbox } = this.props;

    if (shouldShowCheckbox) {
      return (
        <div className="input-group">
          <div className="input-group-addon">
            <input type="checkbox" checked={isChecked} onChange={handleCheck} />
          </div>
          {title}
        </div>

      );
    } else {
      return (
        <div>
          {title}
        </div>
      );
    }


  }
}

export default CheckBox;
