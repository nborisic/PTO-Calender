import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmployeeRow from 'components/Global/EmployeeRow';

export default class CalendarSlider extends Component {
  static propTypes = {
    allEmployees: PropTypes.object,
    animate: PropTypes.string,
    allWeeks: PropTypes.array,
  }

  constructor() {
    super();

    this.renderRows = this.renderRows.bind(this);
  }

  renderRows() {
    const { allEmployees } = this.props;
    const allEmployeesArray = [];
    const allEmployeesKeys = Object.keys(allEmployees);
    for (let i = 0; i < allEmployeesKeys.length; i++) {
      allEmployeesArray.push(
        <EmployeeRow
          key={ allEmployeesKeys[i] }
          employeeName={ allEmployeesKeys[i] }
          oneEmployee={ allEmployees[allEmployeesKeys[i]] }
          animate={ this.props.animate }
          allWeeks={ this.props.allWeeks }
        />
      );
    }
    return allEmployeesArray;
  }

  render() {
    return (
      <div className='calendarTable'>
        { this.renderRows() }
      </div>
    );
  }
}
