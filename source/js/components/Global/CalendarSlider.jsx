import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EmployeeRow from 'components/Global/EmployeeRow';
import CalenderHeadrer from 'components/Global/CalenderHeadrer';
import ScrollButtons from 'components/Global/ScrollButtons';
import { sortEmployeesArray } from 'utils/global.js';

@connect(state => ({
  breakpoint: state.app.get('breakpoint'),
  projects: state.filter.get('PROJECT'),
  location: state.filter.get('LOCATION'),
  discipline: state.filter.get('DISCIPLINE'),
  staff: state.filter.get('EMPLOYEES'),
}))
export default class CalendarSlider extends Component {
  static propTypes = {
    allEmployees: PropTypes.array,
    animate: PropTypes.string,
    allWeeks: PropTypes.array,
    breakpoint: PropTypes.string,
    scrollFunction: PropTypes.func,
    location: PropTypes.array,
    projects: PropTypes.array,
    discipline: PropTypes.array,
    staff: PropTypes.array,
  }

  constructor(props) {
    super(props);

    this.state = {
      emplyeesToRender: this.props.allEmployees,
    };

    this.renderRows = this.renderRows.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.filterEmployees(nextProps);
  }

/**
 * chenking if all filter values are contained insede employee values
 * @param { object } employee
 * @param { object } checkFilter
 */
  checkEmployee(employee, checkFilter) {
    const statement = [];
    if (checkFilter.key === 'location' || checkFilter.key === 'name') {
      for (let j = 0; j < checkFilter.value.length; j++) {
        statement.push(employee[checkFilter.key] === checkFilter.value[j]);
      }
    } else {
      for (let i = 0; i < employee[checkFilter.key].length; i++) {
        for (let j = 0; j < checkFilter.value.length; j++) {
          statement.push(employee[checkFilter.key][i] === checkFilter.value[j]);
        }
      }
    }
    let counter = 0;
    for (let k = 0; k < statement.length; k++) {
      if (statement[k]) {
        counter += 1;
      }
    }
    // number of filter values equals number of true values that were matched in employee obj
    return counter === checkFilter.value.length;
  }
/**
 * filtering employees depending on filter selected, returning filted elements back to state
 * @param { object } nextProps
 */
  filterEmployees = (nextProps) => {
    const { location, discipline, projects, staff } = nextProps;
    const { allEmployees } = this.props;
    let newSetOfEmploees = [];
    if (location.length || discipline.length || projects.length || staff.length) {
      allEmployees.map((employee) => {
        if (
          this.checkEmployee(employee, { key: 'location', value: location }) &&
          this.checkEmployee(employee, { key: 'discipline', value: discipline }) &&
          this.checkEmployee(employee, { key: 'projects', value: projects }) &&
          this.checkEmployee(employee, { key: 'name', value: staff })
        ) {
          newSetOfEmploees.push(employee);
        }
        return true;
      });
    } else {
      newSetOfEmploees = allEmployees;
    }
    this.setState({
      emplyeesToRender: newSetOfEmploees,
    });
  }


  renderRows() {
    const { allEmployees } = this.props;
    if (allEmployees) {
      const newEmploeesToRender = this.state.emplyeesToRender.concat([]);
      sortEmployeesArray(newEmploeesToRender);
      return newEmploeesToRender.map((employee, i) => {
        return (
          <EmployeeRow
            key={ `employee${ i }` }
            oneEmployee={ employee }
            animate={ this.props.animate }
            allWeeks={ this.props.allWeeks }
            breakpoint={ this.props.breakpoint }
          />
        );
      });
    }
    return true;
  }


  render() {
    if (this.state.emplyeesToRender && !this.state.emplyeesToRender.length) {
      return (
        <div className='noMatch'>
          No one matches the filters
        </div>
      );
    }
    return (
      <div className='calendarTable'>
        <div className='calendarHedder'>
          <CalenderHeadrer
            breakpoint={ this.props.breakpoint }
            allWeeks={ this.props.allWeeks }
            animate={ this.props.animate }
          />
          <div className='mobileScreenScrollButtons'>
            <ScrollButtons
              scrollClick={ this.props.scrollFunction }
            />
          </div>
        </div>
        { this.renderRows() }
      </div>
    );
  }
}
