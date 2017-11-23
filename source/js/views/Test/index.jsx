import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import FilterGroup from 'components/Global/FilterGroup';
import CalendarSlider from 'components/Global/CalendarSlider';
import ScrollButtons from 'components/Global/ScrollButtons';
import breakpoint from 'decorators/breakpoint';
import workAndCoLogoImg from '../../../assets/img/workco-logo.svg';
import Andy from '../../../assets/img/Andy_01.png';
import Chris from '../../../assets/img/Chris_Alden.png';


const ANIMATION_DURAION = 500;


const employeeObj = {
  'Andy Baudoin': {
    projects: ['Apple - C3PO Content Strategy'],
    location: 'New York',
    discipline: 'Technology',
    src: `${ Andy }`,
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
    src: `${ Chris }`,
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

@breakpoint
@connect(state => ({
  breakpoint: state.app.get('breakpoint'),
}))
export default class Test extends Component {
  static propTypes = {
    breakpoint: PropTypes.string,
    dispatch: PropTypes.func,
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
    this.getDates(this.props.breakpoint);
  }

  componentWillReceiveProps(nextProps) {
    this.getDates(nextProps.breakpoint);
  }

  getDates(breakpointSize) {
    const { weeksToJump, startWeek } = this.state;
    const weekToModify = breakpointSize === 'mobile' ? 1 : 4;
    // izdvajanje datuma
    const allWeeks = [];
    let weekStart;
    let calendarStart = startWeek || moment().subtract(weekToModify, 'week').startOf('isoWeek');
    if (this.state.weeksToJump > 0) {
      calendarStart = calendarStart.add(weeksToJump, 'week')
      .startOf('isoWeek');
    } else if (this.state.weeksToJump < 0) {
      calendarStart = calendarStart.subtract(Math.abs(weeksToJump), 'week')
      .startOf('isoWeek');
    }
    const weeksToIterate = breakpointSize === 'mobile' ? 3 : 12;
    for (let k = 0; k < weeksToIterate; k++) {
      weekStart = calendarStart.clone().add(k, 'week');
      const oneWeek = [];
      oneWeek.push(weekStart);
      for (let i = 1; i < 5; i++) {
        const oneDay = weekStart.clone().add(i, 'day');
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
    const offsetNo = this.props.breakpoint === 'mobile' ? 1 : 4;
    setTimeout(() => {
      this.setState({
        animate: null,
        weeksToJump: offsetNo * number,
      }, () => {
        this.getDates(this.props.breakpoint);
      });
    }, ANIMATION_DURAION);
  }

  render() {
    return (
      <div className='Dashboard'>
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
        <CalendarSlider
          allEmployees={ employeeObj }
          animate={ this.state.animate }
          allWeeks={ this.state.allWeeks }
        />
      </div>
    );
  }
}
