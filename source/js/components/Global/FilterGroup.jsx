import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class FilterGroup extends Component {
  static propTypes = {

  }

  constructor() {
    super();

    this.state = {
      click: false,
      inputValue: '',
      buttonsArray: [],
    };

    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.setDropdownItem = this.setDropdownItem.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.deleteElement = this.deleteElement.bind(this);
  }


  setDropdownItem(e) {
    const newElement = (
      <div
        className='elementDiv'
        key={ e.target.value }
      >
        <span>{ e.target.value }</span>
        <button
          value={ e.target.value }
          onClick={ this.deleteElement }
        >x
        </button>
      </div>);
    const buttonsArray = this.state.buttonsArray;
    buttonsArray.push(newElement);
    this.setState({
      buttonsArray,
      inputValue: '',
      click: false,
    });
  }

  handleFilterClick() {
    this.setState({
      click: true,
    }, () => {
      setTimeout(() => { this.filterInput.focus(); }, 1000);
    });
  }

  changeInput(e) {
    this.setState({
      inputValue: e.target.value,
    });
  }

  deleteElement(e) {
    let indexOfElement;
    for (let i = 0; i < this.state.buttonsArray.length; i++) {
      if (this.state.buttonsArray[i].props.children[1].props.value === e.target.value) {
        indexOfElement = i;
      }
    }
    const newArray = this.state.buttonsArray.concat([]);
    newArray.splice(indexOfElement, 1);
    this.setState({
      buttonsArray: newArray,
    });
  }

  render() {
    const buttonClass = this.state.click ? 'rotate' : 'addFilter';
    const inputClass = this.state.click ? 'filterInput' : 'invisible';

    return (
      <div className='FilterGroup'>
        { this.state.buttonsArray }
        <button
          className={ buttonClass }
          onClick={ this.handleFilterClick }
        />
        <div className='filterDrop'>
          <div style={ { overflow: 'hidden', display: 'inline-flex' } }>
            <input
              type='text'
              onChange={ this.changeInput }
              value={ this.state.inputValue }
              onClick={ this.openDropdown }
              className={ inputClass }
              placeholder='Filter by project, discipline, or location'
              ref={ (a) => { this.filterInput = a; } }
            />
          </div>
          <div className={ this.state.inputValue ? 'dropMenu' : 'invisible' }>
            <button className='filterButton' onClick={ this.setDropdownItem } value='1'>1</button>
            <button className='filterButton' onClick={ this.setDropdownItem } value='2'>2</button>
            <button className='filterButton' onClick={ this.setDropdownItem } value='3'>3</button>
          </div>
        </div>
      </div>
    );
  }
}
