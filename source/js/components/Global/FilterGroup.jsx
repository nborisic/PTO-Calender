import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sortDropdownArray } from 'utils/global';
import { addFilter, removeFilter } from 'actions/filter';

@connect(state => ({
  filter: state.filter.get('filter'),
}))
export default class FilterGroup extends Component {
  static propTypes = {
    usersData: PropTypes.array,
    dispatch: PropTypes.func,
  }

  constructor() {
    super();

    this.state = {
      click: false,
      inputValue: '',
      buttonsArray: [],
      openDropdown: false,
      highlightIndex: 0,
      discipline: null,
      location: null,
      projects: null,
      newProjects: null,
      newDiscipline: null,
      newLocation: null,
      newEmploee: null,
    };

    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.setDropdownItem = this.setDropdownItem.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.deleteElement = this.deleteElement.bind(this);
    this.handleOffClick = this.handleOffClick.bind(this);
  }

  componentWillMount() {
    this.setDropdown();
  }

  setDropdownItem(e) {
    const { dispatch } = this.props;
    const { projects, discipline, location } = this.state;
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
          data-category={ e.target.dataset.category }
        />
      </span>
    );
    const buttonsArray = this.state.buttonsArray;
    buttonsArray.push(
      newElement
    );

    dispatch(addFilter(e.target.dataset.category, e.target.value));

    let position;
    const newProjectState = projects.concat([]);
    const newLocationState = location.concat([]);
    const newDisciplineState = discipline.concat([]);
    switch (e.target.dataset.category) {
      case 'PROJECT':
        position = projects.indexOf(e.target.value);
        newProjectState.splice(position, 1);
        break;
      case 'DISCIPLINE':
        position = discipline.indexOf(e.target.value);
        newDisciplineState.splice(position, 1);
        break;
      case 'LOCATION':
        position = location.indexOf(e.target.value);
        newLocationState.splice(position, 1);
        break;
      default:
        return true;
    }

    this.setState({
      projects: newProjectState,
      location: newLocationState,
      discipline: newDisciplineState,
      buttonsArray,
      inputValue: '',
      openDropdown: false,
      click: false,
      newProjects: null,
      newDiscipline: null,
      newLocation: null,
      newEmploee: null,
    });
    return true;
  }

  // vadi sve stvari za pocetni dropdown
  setDropdown = () => {
    const { usersData } = this.props;
    const projects = [];
    const discipline = [];
    const location = [];
    if (usersData) {
      usersData.map(user => {
        for (let i = 0; i < user.projects.length; i++) {
          if (!projects.includes(user.projects[i])) {
            projects.push(user.projects[i]);
          }
        }
        for (let j = 0; j < user.discipline.length; j++) {
          if (!discipline.includes(user.discipline[j])) {
            discipline.push(user.discipline[j]);
          }
        }
        if (!location.includes(user.location)) {
          location.push(user.location);
        }
        return true;
      });

      this.setState({
        projects,
        discipline,
        location,
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

  handleOffClick(e) {
    if (this.state.openDropdown && e.target.parentElement.className !== 'filterDrop') {
      this.setState({
        openDropdown: false,
      });
    }
  }

  deleteElement(e) {
    const { dispatch } = this.props;
    const { projects, discipline, location } = this.state;
    let indexOfElement;
    for (let i = 0; i < this.state.buttonsArray.length; i++) {
      if (this.state.buttonsArray[i].props.children[1].props.value === e.target.value) {
        indexOfElement = i;
      }
    }
    const newArray = this.state.buttonsArray.concat([]);
    newArray.splice(indexOfElement, 1);

    dispatch(removeFilter(e.target.dataset.category, e.target.value));

    const newProjectState = projects.concat([]);
    const newLocationState = location.concat([]);
    const newDisciplineState = discipline.concat([]);
    switch (e.target.dataset.category) {
      case 'PROJECT':
        newProjectState.push(e.target.value);
        break;
      case 'DISCIPLINE':
        newDisciplineState.push(e.target.value);
        break;
      case 'LOCATION':
        newLocationState.push(e.target.value);
        break;
      default:
        return true;
    }
    this.setState({
      projects: newProjectState,
      location: newLocationState,
      discipline: newDisciplineState,
      buttonsArray: newArray,
    });
    return true;
  }

  changeInput(e) {
    const { projects, discipline, location } = this.state;
    if (!e.target.value) {
      this.setDropdown();
    } else {
      const newProjects = projects.filter((term) => {
        const termToTest = new RegExp(e.target.value.toUpperCase());
        return termToTest.test(term.toUpperCase());
      });
      const newDiscipline = discipline.filter((term) => {
        const termToTest = new RegExp(e.target.value.toUpperCase());
        return termToTest.test(term.toUpperCase());
      });
      const newLocation = location.filter((term) => {
        const termToTest = new RegExp(e.target.value.toUpperCase());
        return termToTest.test(term.toUpperCase());
      });
      this.setState({
        newProjects,
        newDiscipline,
        newLocation,
      });
    }


    this.setState({
      openDropdown: e.target.value && true,
      inputValue: e.target.value,
    });
  }

  handleFilterClick() {
    this.setState({
      click: true,
    }, () => {
      setTimeout(() => { this.filterInput.focus(); }, 1000);
    });
  }

  handleCancelClick = () => {
    this.setState({
      inputValue: '',
    });
  }

  renderDropdownPart = (stateParts, label) => {
    if (stateParts) {
      sortDropdownArray(stateParts);
      return (
        stateParts.map((statePart, i) => {
          return (
            <button
              key={ label + i }
              className='filterButton'
              onClick={ this.setDropdownItem }
              value={ statePart }
              data-category={ label }
            > { statePart }
            </button>
          );
        })
      );
    }
    return true;
  }

  renderDropdown = () => {
    const { projects, discipline, location, newProjects, newDiscipline, newLocation } = this.state;
    const categroyArray = [['PROJECT', newProjects || projects], ['DISCIPLINE', newDiscipline || discipline], ['LOCATION', newLocation || location]];
    const dropdownArray = [];

    categroyArray.map(category => {
      if (category[1] && category[1].length) {
        dropdownArray.push(<div key={ category[0] } className='categoryClass'>{category[0]}</div>);
        dropdownArray.push(
          this.renderDropdownPart(category[1], category[0])
        );
      }
      return true;
    });
    return dropdownArray;
  }

  render() {
    const buttonClass = this.state.click ? 'rotate' : 'addFilter';
    const inputClass = this.state.click ? 'filterInput' : 'invisible';
    const cancelButtonClass = this.state.inputValue ? 'cancelInput' : 'invisible';

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
              <div>
                <input
                  onKeyDown={ this.handleArrowPress }
                  type='text'
                  onChange={ this.changeInput }
                  value={ this.state.inputValue }
                  className={ inputClass }
                  placeholder='Filter by project, discipline, or location'
                  ref={ (a) => { this.filterInput = a; } }
                />
                <button
                  className={ cancelButtonClass }
                  onClick={ this.handleCancelClick }
                />
              </div>
              <div className={ this.state.openDropdown ? 'dropMenu' : 'invisible' }>
                { this.renderDropdown() }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
