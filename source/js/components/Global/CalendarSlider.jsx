import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EmployeeRow from 'components/Global/EmployeeRow';
import CalenderHeadrer from 'components/Global/CalenderHeadrer';
import ScrollButtons from 'components/Global/ScrollButtons';
import { sortEmployeesArray } from 'utils/global.js';


@connect(state => ({
  breakpoint: state.app.get('breakpoint'),
}))
export default class CalendarSlider extends Component {
  static propTypes = {
    allEmployees: PropTypes.array,
    animate: PropTypes.string,
    allWeeks: PropTypes.array,
    breakpoint: PropTypes.string,
    scrollFunction: PropTypes.func,
  }

  constructor() {
    super();

    this.renderRows = this.renderRows.bind(this);
  }


  renderRows() {
    const { allEmployees } = this.props;
    if (allEmployees) {
      sortEmployeesArray(allEmployees);
      return allEmployees.map((employee, i) => {
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
