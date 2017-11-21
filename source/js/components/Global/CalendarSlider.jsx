import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import FilterGroup from 'components/Global/FilterGroup';
import ScrollButtons from 'components/Global/ScrollButtons';
import EmployeeRow from 'components/Global/EmployeeRow';
import workAndCoLogoImg from '../../../assets/img/workco-logo.svg';


const ANIMATION_DURAION = 2000;

export default class CalendarSlider extends Component {
  static propTypes = {
    allEmployees: PropTypes.object,
  }

  constructor() {
    super();

    this.state = {
      animate: '',
      allWeeks: null,
      weeksToJump: null,
      weekStart: null,
    };

    this.offsetCalendar = this.offsetCalendar.bind(this);
  }

  componentWillMount() {
    this.getDates();
  }

  getDates() {
    const { weeksToJump, startWeek } = this.state;
    // izdvajanje datuma
    const allWeeks = [];
    let weekStart;
    let calendarStart = startWeek || moment().subtract(4, 'week').startOf('isoWeek');
    if (this.state.weeksToJump > 0) {
      calendarStart = calendarStart.add(weeksToJump, 'week')
      .startOf('isoWeek');
    } else if (this.state.weeksToJump < 0) {
      calendarStart = calendarStart.subtract(Math.abs(weeksToJump), 'week')
      .startOf('isoWeek');
    }
    for (let k = 0; k < 12; k++) {
      weekStart = calendarStart.clone().add(k, 'week');
      const oneWeek = [];
      oneWeek.push(weekStart.format('D'));
      for (let i = 1; i < 5; i++) {
        const oneDay = weekStart.clone().add(i, 'day').format('D');
        oneWeek.push(oneDay);
      }
      allWeeks.push(oneWeek);
    }

    this.setState({
      startWeek: calendarStart,
      weeksToJump: null,
      allWeeks,
    });
  }

  offsetCalendar(number) {
    if (this.state.animate) {
      return;
    }
    this.setState({
      animate: number < 0 ? 'left' : 'right',
    });

    setTimeout(() => {
      this.setState({
        animate: null,
        weeksToJump: 4 * number,
      }, () => {
        this.getDates();
      });
    }, ANIMATION_DURAION);
  }


  render() {
    return (
      <div>
        <div className='hedder'>
          <div className='logoGroup'>
            <img
              src={ workAndCoLogoImg }
              alt='Work & Co logo'
            />
            <FilterGroup />
          </div>
          <ScrollButtons
            scrollClick={ this.offsetCalendar }
          />
        </div>
        <EmployeeRow
          animate={ this.state.animate }
          allWeeks={ this.state.allWeeks }
        />
      </div>
    );
  }
}
