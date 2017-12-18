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

      highlightCounter: -1,

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

  componentWillUpdate(nextProps, nextState) {
    this.manageScroll(nextState);
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

  manageScroll(nextState) {
    if (nextState.heiglightPart) {
      const dropMenu = this.dropMenu;
      const itemFocused = nextState.heiglightPart;

      const category = itemFocused.replace(/\d/g, '');
      const numberOfItem = itemFocused.replace(/\D/g, '');

      const disciplineCount = nextState.newDiscipline.length;
      const locationCount = nextState.newLocation.length;
      const projectsCount = nextState.newProjects.length;

      const countArray = [projectsCount, disciplineCount, locationCount];
      let numberOfCategories;
      let beforeItems;
      switch (category) {
        case 'PROJECT':
          dropMenu.scrollTop = (numberOfItem * 38);
          break;
        case 'DISCIPLINE':
          beforeItems = (projectsCount * 38) + (projectsCount ? 47 : 0);
          dropMenu.scrollTop = (numberOfItem * 38) + beforeItems;
          break;
        case 'LOCATION':
          numberOfCategories = 0;
          for (let i = 0; i < 2; i++) {
            if (countArray[i] !== 0) { numberOfCategories += 1; }
          }
          beforeItems = ((projectsCount + disciplineCount) * 38) + (47 * numberOfCategories);
          dropMenu.scrollTop = (numberOfItem * 38) + beforeItems;
          break;
        case 'EMPLOYEES':
          numberOfCategories = 0;
          for (let i = 0; i < 3; i++) {
            if (countArray[i] !== 0) { numberOfCategories += 1; }
          }
          beforeItems = ((projectsCount + disciplineCount + locationCount) * 38) + (47 * numberOfCategories);
          dropMenu.scrollTop = (numberOfItem * 38) + beforeItems;
          break;
        default:
      }
    }
  }

  handleHighlightDiv(numberToBe, itemsCount) {
    const { newProjects, newLocation, newDiscipline, newEmployees } = this.state;
    const projectsCount = newProjects.length;
    const locationCount = newLocation.length;
    const disciplineCount = newDiscipline.length;
    const employeeCount = newEmployees.length;
    let heiglightPart;
    if (projectsCount && numberToBe >= 0 && numberToBe <= (projectsCount - 1)) {
      heiglightPart = `PROJECT${ numberToBe }`;
    } else if (disciplineCount && numberToBe >= projectsCount && numberToBe <= (projectsCount + (disciplineCount - 1))) {
      const numberAddOn = numberToBe - projectsCount;
      heiglightPart = `DISCIPLINE${ numberAddOn }`;
    } else if (locationCount && numberToBe >= (projectsCount + disciplineCount) && numberToBe <= (projectsCount + disciplineCount + (locationCount - 1))) {
      const numberAddOn = numberToBe - projectsCount - disciplineCount;
      heiglightPart = `LOCATION${ numberAddOn }`;
    } else if (employeeCount && numberToBe >= (projectsCount + locationCount + disciplineCount) && numberToBe <= (itemsCount - 1)) {
      const numberAddOn = numberToBe - projectsCount - locationCount - disciplineCount;
      heiglightPart = `EMPLOYEES${ numberAddOn }`;
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
    if (e.which === 40) { // keyCodes.ARROW_DOWN
      const numberToBe = this.state.highlightCounter + 1 === itemsCount ? 0 : this.state.highlightCounter + 1;
      const heiglightPart = this.handleHighlightDiv(numberToBe, itemsCount);
      this.setState({
        heiglightPart,
        highlightCounter: numberToBe % itemsCount,
      });
    } else if (e.which === 38) { // keyCodes.ARROW_UP
      if (this.state.highlightCounter === 0 || this.state.highlightCounter === -1) {
        const numberToBe = itemsCount - 1;
        const heiglightPart = this.handleHighlightDiv(numberToBe, itemsCount);
        this.setState({
          heiglightPart,
          highlightCounter: itemsCount - 1,
        });
      } else {
        const numberToBe = this.state.highlightCounter - 1 === itemsCount ? 0 : this.state.highlightCounter - 1;
        const heiglightPart = this.handleHighlightDiv(numberToBe, itemsCount);
        this.setState({
          heiglightPart,
          highlightCounter: (this.state.highlightCounter - 1) % itemsCount,
        });
      }
    } else if (e.which === 13) { // keyCodes.ENTER
      const selectedElement = document.querySelector('.arrowHiglight');
      const value = selectedElement.value;
      const category = selectedElement.dataset.category;
      const selectedObj = {
        target: {
          value,
          dataset: {
            category,
          },
        },
      };
      this.setDropdownItem(selectedObj);
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
              <svg width='30px' height='30px' viewBox='0 0 27 27' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
                <circle id='Oval' fill='#272727' cx='13.5' cy='13.5' r='13.5' />
                <g id='Group-3' transform='translate(7.000000, 7.000000)' stroke='#FFFFFF' strokeWidth='2' strokeLinecap='round'>
                  <path d='M2.11472404,2.61799201 L10.1670116,10.6702796' id='Line' transform='translate(6.644136, 6.644136) rotate(-45.000000) translate(-6.644136, -6.644136) ' />
                  <path d='M2.47058824,10.5944081 L10.5587211,2.50627531' id='Line' transform='translate(7.000000, 7.000000) rotate(-45.000000) translate(-7.000000, -7.000000) ' />
                </g>
              </svg>
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
                  ref={ a => { this.filterInput = a; } }
                />
                <button
                  className={ cancelButtonClass }
                  onClick={ this.handleCancelClick }
                />
              </div>
              <div
                className={ this.state.openDropdown ? 'dropMenu' : 'invisible' }
                ref={ c => { this.dropMenu = c; } }
              >
                { this.renderDropdown() }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
