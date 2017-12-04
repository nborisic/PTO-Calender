import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sortDropdownArray } from 'utils/global';
import { addFilter, removeFilter } from 'actions/filter';
import filterSvg from '../../../assets/img/filterButton.svg';

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

      highlightCounter: -1,
      selectItem: false,

      discipline: null,
      location: null,
      projects: null,
      empolyees: null,

      newProjects: null,
      newDiscipline: null,
      newLocation: null,
      newEmployees: null,

      heiglightPart: '',
    };

    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.setDropdownItem = this.setDropdownItem.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.deleteElement = this.deleteElement.bind(this);
    this.handleOffClick = this.handleOffClick.bind(this);
    this.handleArrowPress = this.handleArrowPress.bind(this);
  }

  componentWillMount() {
    this.setDropdown();
  }

  setDropdownItem(e) {
    const { dispatch } = this.props;
    const { projects, discipline, location, empolyees } = this.state;
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
    const newEmployeesState = empolyees.concat([]);
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
      case 'EMPLOYEES':
        position = empolyees.indexOf(e.target.value);
        newEmployeesState.splice(position, 1);
        break;
      default:
        return true;
    }

    this.setState({
      projects: newProjectState,
      location: newLocationState,
      discipline: newDisciplineState,
      empolyees: newEmployeesState,
      selectItem: false,
      heiglightPart: '',
      highlightCounter: -1,
      buttonsArray,
      inputValue: '',
      openDropdown: false,
      click: false,
      newProjects: null,
      newDiscipline: null,
      newLocation: null,
      newEmployees: null,
    });
    return true;
  }

  // vadi sve stvari za pocetni dropdown
  setDropdown = () => {
    const { usersData } = this.props;
    const projects = [];
    const discipline = [];
    const location = [];
    const empolyees = [];
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
        if (!empolyees.includes(user.name)) {
          empolyees.push(user.name);
        }
        return true;
      });

      this.setState({
        projects,
        discipline,
        location,
        empolyees,
      });
    }
  }

  handleHighlightDiv(noToBe, itemsCount) {
    const { newProjects, newLocation, newDiscipline, newEmployees } = this.state;
    const projectsCount = newProjects.length;
    const locationCount = newLocation.length;
    const disciplineCount = newDiscipline.length;
    const employeeCount = newEmployees.length;
    let heiglightPart;
    if (projectsCount && new RegExp(`[0-${ projectsCount - 1 }]`).test(noToBe)) {
      heiglightPart = `PROJECT${ noToBe }`;
    } else if (locationCount && new RegExp(`[${ projectsCount }-${ projectsCount + (locationCount - 1) }]`).test(noToBe)) {
      const noAddOn = noToBe - projectsCount;
      heiglightPart = `LOCATION${ noAddOn }`;
    } else if (disciplineCount && new RegExp(`[${ projectsCount + locationCount }-${ projectsCount + locationCount + (disciplineCount - 1) }]`).test(noToBe)) {
      const noAddOn = noToBe - projectsCount - locationCount;
      heiglightPart = `DISCIPLINE${ noAddOn }`;
    } else if (employeeCount && new RegExp(`[${ projectsCount + locationCount + disciplineCount }-${ itemsCount - 1 }]`).test(noToBe)) {
      const noAddOn = noToBe - projectsCount - locationCount - disciplineCount;
      heiglightPart = `EMPLOYEES${ noAddOn }`;
    }
    return heiglightPart;
  }

  handleArrowPress(e) {
    if (this.state.inputValue === '') return;
    const { newProjects, newLocation, newDiscipline, newEmployees } = this.state;
    const stateArray = [newProjects, newLocation, newDiscipline, newEmployees];
    const itemsCount = stateArray.reduce((acc, cur) => {
      return acc + cur.length;
    }, 0);
    if (e.which === 40) {
      const noToBe = this.state.highlightCounter + 1 === itemsCount ? 0 : this.state.highlightCounter + 1;
      const heiglightPart = this.handleHighlightDiv(noToBe, itemsCount);
      this.setState({
        heiglightPart,
        highlightCounter: noToBe % itemsCount,
      });
    } else if (e.which === 38) {
      if (this.state.highlightCounter === 0 || this.state.highlightCounter === -1) {
        const noToBe = itemsCount - 1;
        const heiglightPart = this.handleHighlightDiv(noToBe, itemsCount);
        this.setState({
          heiglightPart,
          highlightCounter: itemsCount - 1,
        });
      } else {
        const noToBe = this.state.highlightCounter - 1 === itemsCount ? 0 : this.state.highlightCounter - 1;
        const heiglightPart = this.handleHighlightDiv(noToBe, itemsCount);
        this.setState({
          heiglightPart,
          highlightCounter: (this.state.highlightCounter - 1) % itemsCount,
        });
      }
    } else if (e.which === 13) {
      this.setState({
        selectItem: true,
      });
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
    const { projects, discipline, location, empolyees } = this.state;
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
    const newEmployeesState = empolyees.concat([]);
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
      case 'EMPLOYEES':
        newEmployeesState.push(e.target.value);
        break;
      default:
        return true;
    }
    this.setState({
      projects: newProjectState,
      location: newLocationState,
      discipline: newDisciplineState,
      empolyees: newEmployeesState,
      buttonsArray: newArray,
    });
    return true;
  }

  changeInput(e) {
    const { projects, discipline, location, empolyees } = this.state;
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
      const newEmployees = empolyees.filter((term) => {
        const termToTest = new RegExp(e.target.value.toUpperCase());
        return termToTest.test(term.toUpperCase());
      });
      this.setState({
        newProjects,
        newDiscipline,
        newLocation,
        newEmployees,
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
      heiglightPart: '',
      highlightCounter: -1,
    });
  }

  renderDropdownPart = (stateParts, label) => {
    if (stateParts) {
      sortDropdownArray(stateParts);
      return (
        stateParts.map((statePart, i) => {
          const fucusedElement = this.state.heiglightPart === `${ label }${ i }`;
          const buttonClass = fucusedElement ? 'arrowHiglight' : '';
          if (fucusedElement && this.state.selectItem) {
            const e = {
              target: {
                value: statePart,
                dataset: {
                  category: label,
                },
              },
            };
            this.setDropdownItem(e);
          }
          return (
            <button
              key={ label + i }
              className={ `filterButton ${ buttonClass }` }
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
    const { projects, discipline, location, empolyees, newProjects, newDiscipline, newLocation, newEmployees }
    = this.state;
    const categroyArray = [
      ['PROJECT', newProjects || projects],
      ['DISCIPLINE', newDiscipline || discipline],
      ['LOCATION', newLocation || location],
      ['EMPLOYEES', newEmployees || empolyees],
    ];
    const dropdownArray = [];

    categroyArray.map(category => {
      if (category[1] && category[1].length) {
        dropdownArray.push(
          <div key={ category[0] } className='categoryClass'>{category[0]}</div>
        );
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
            >
              <img src={ filterSvg } alt='filterButton' />
            </button>
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
