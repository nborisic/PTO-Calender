import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EmployeeRow from 'components/Global/EmployeeRow';
import CalenderHeadrer from 'components/Global/CalenderHeadrer';


@connect(state => ({
  breakpoint: state.app.get('breakpoint'),
}))
export default class CalendarSlider extends Component {
  static propTypes = {
    allEmployees: PropTypes.object,
    animate: PropTypes.string,
    allWeeks: PropTypes.array,
    breakpoint: PropTypes.string,
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
          breakpoint={ this.props.breakpoint }
        />
      );
    }
    return allEmployeesArray;
  }


  render() {
    return (
      <div className='calendarTable'>
        <CalenderHeadrer
          breakpoint={ this.props.breakpoint }
          allWeeks={ this.props.allWeeks }
          animate={ this.props.animate }
        />
        { this.renderRows() }
      </div>
    );
  }
}
