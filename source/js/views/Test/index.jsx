import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CalendarSlider from 'components/Global/CalendarSlider';


const employeeObj = {
  'Andy Baudoin': {
    projects: ['Apple - C3PO Content Strategy'],
    location: 'New York',
    discipline: 'Technology',
    src: '',
    pto: [
      { start: '11/22/2017',
        end: '11/30/2017' },
      { start: '12/10/2017',
        end: '12/12/2017' },
      { start: '02/01/2018',
        end: '02/05/2018' },
    ],
    remote: [
      { start: '12/05/2017',
        end: '12/05/2017' },
    ],
  },
  'Chris Alden': {
    projects: ['Apple - Future of Retail'],
    location: 'New York',
    discipline: 'Technology',
    src: '',
    pto: [
      { start: '11/23/2017',
        end: '12/05/2017' },
      { start: '12/22/2017',
        end: '12/30/2017' },
    ],
    remote: [
      { start: '12/06/2017',
        end: '12/07/2017' },
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
