import React, {Component} from 'react';

class OptionList extends Component {

  renderOptions(options) {
    return options.map((option, index) => {
      return (
        <li className="list-group-item" key={index}>
          <h4 className="list-group-item-heading">{option}</h4>
          <button type="button" onClick={() => this.props.onDelete(index)}>Delete</button>
        </li>
      );
    });
  }

  render() {
    const options = this.props.options;
    console.log("options::" + options);
    return (
      <ul className="list-group">
        {this.renderOptions(options)}
      </ul>
    );
  }
}

export default OptionList;
