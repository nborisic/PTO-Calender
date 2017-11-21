import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CalendarSlider from 'components/Global/CalendarSlider';


const employeeObj = {
  'Andy Baudoin': {
    Projects: ['Apple - C3PO Content Strategy'],
    Location: 'New York',
    Discipline: 'Technology',
    src: '',
    PTO: [
      { start: '22/11/2017',
        end: '30/11/2017' },
      { start: '22/11/2017',
        end: '30/11/2017' },
    ],
    Remote: [
      { start: '05/12/2017',
        end: '05/12/2017' },
    ],
  },
  'Chris Alden': {
    Projects: ['Apple - Future of Retail'],
    Location: 'New York',
    Discipline: 'Technology',
    src: '',
    PTO: [
      { start: '23/11/2017',
        end: '05/12/2017' },
      { start: '22/12/2017',
        end: '30/12/2017' },
    ],
    Remote: [
      { start: '06/12/2017',
        end: '07/12/2017' },
    ],
  },
};

@connect()
export default class Test extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  }

  constructor() {
    super();

  }

  render() {
    return (
      <div className='Dashboard'>

        <div>Wellcome to Dashboard!</div>
        <CalendarSlider allEmployees={ employeeObj } />
      </div>
    );
  }
}
