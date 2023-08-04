import React, { Component } from "react";

export default class ListSideBar extends Component {
  render() {
    const { namesList, getNameElement } = this.props;
    const elementNameList = namesList.map((el) => {
      return (
        <button
          type="button"
          className="list-group-item list-group-item-action bg-dark text-light"
          onClick={() => getNameElement(el)}
        >
          {el}
        </button>
      );
    });
    return <ul className="list-group">{elementNameList}</ul>;
  }
}
