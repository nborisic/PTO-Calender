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
      openDropdown: false,
      highlightIndex: 0,
    };

    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.setDropdownItem = this.setDropdownItem.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.deleteElement = this.deleteElement.bind(this);
    this.handleOffClick = this.handleOffClick.bind(this);
  }


  setDropdownItem(e) {
    const newElement = (
      <span
        className='elementDiv'
        key={ e.target.value }
      >
        <span>{ e.target.value }</span>
        <button
          className='filterButton'
          value={ e.target.value }
          onClick={ this.deleteElement }
        />
      </span>);
    const buttonsArray = this.state.buttonsArray;
    buttonsArray.push(newElement);
    this.setState({
      buttonsArray,
      inputValue: '',
      openDropdown: false,
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
      openDropdown: e.target.value && true,
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

  handleOffClick(e) {
    if (this.state.openDropdown && e.target.parentElement.className !== 'filterDrop') {
      this.setState({
        openDropdown: false,
      });
    }
  }

  handleArrowPress = (e) => {
    if (e.which === 40) {
      this.setState({
        highlightIndex: (this.state.highlightIndex + 1) % 5, // ovde ide lenght niza koji renderujes
      });
    } else if (e.which === 38) {
      if (this.state.highlightIndex === 0) {
        this.setState({
          highlightIndex: (5 - 1) % 5, // lenght
        });
      } else {
        this.setState({
          highlightIndex: (this.state.highlightIndex - 1) % 5,
        });
      }
    }
  }


  render() {
    const buttonClass = this.state.click ? 'rotate' : 'addFilter';
    const inputClass = this.state.click ? 'filterInput' : 'invisible';
    if (this.state.openDropdown) {
      document.addEventListener('click', this.handleOffClick);
    } else {
      document.removeEventListener('click', this.handleOffClick);
    }

    return (
      <div className='filterGroup'>
        <span>Filter by:</span>
        <div className='buttons'>
          { this.state.buttonsArray }
          <div className='searchGrop'>
            <button
              className={ buttonClass }
              onClick={ this.handleFilterClick }
            />
            <div className='filterDrop'>
              <div style={ { overflow: 'hidden', display: 'inline-flex' } }>
                <input
                  onKeyDown={ this.handleArrowPress }
                  type='text'
                  onChange={ this.changeInput }
                  value={ this.state.inputValue }
                  className={ inputClass }
                  placeholder='Filter by project, discipline, or location'
                  ref={ (a) => { this.filterInput = a; } }
                />
              </div>
              <div className={ this.state.openDropdown ? 'dropMenu' : 'invisible' }>
                <button
                  className='filterButton'
                  onClick={ this.setDropdownItem }
                  value='Apple - C3PO Content Strategy'
                >Apple - C3PO Content Strategy</button>
                <button
                  className='filterButton'
                  onClick={ this.setDropdownItem }
                  value='Apple - Corporate Events'
                >
                  Apple - Corporate Events
                </button>
                <button className='filterButton' onClick={ this.setDropdownItem } value='Apple - Future of Retail'>Apple - Future of Retail</button>
                <button className='filterButton' onClick={ this.setDropdownItem } value='Apple - Wall 2.0'>Apple - Wall 2.0</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
