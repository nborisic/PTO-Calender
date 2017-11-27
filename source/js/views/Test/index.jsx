import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import FilterGroup from 'components/Global/FilterGroup';
import CalendarSlider from 'components/Global/CalendarSlider';
import ScrollButtons from 'components/Global/ScrollButtons';
import breakpoint from 'decorators/breakpoint';
import { fetchUsers } from 'actions/app';
import workAndCoLogoImg from '../../../assets/img/workco-logo.svg';


const ANIMATION_DURAION = 500;


@breakpoint
@connect(state => ({
  breakpoint: state.app.get('breakpoint'),
  usersData: state.app.get('fetchUsersData'),
  fetchUsersLoading: state.app.get('fetchUsersLoading'),
}))
export default class Test extends Component {
  static propTypes = {
    breakpoint: PropTypes.string,
    usersData: PropTypes.array,
    fetchUsersLoading: PropTypes.bool,
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
    const { dispatch } = this.props;
    dispatch(fetchUsers());
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
    if (this.props.fetchUsersLoading) {
      return (
        <div style={ { fontSize: '35px' } }>Loading....</div>
      );
    }

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
          <div className='wideScreenScrollButtons'>
            <ScrollButtons
              scrollClick={ this.offsetCalendar }
            />
          </div>
        </div>
        <CalendarSlider
          allEmployees={ this.props.usersData }
          animate={ this.state.animate }
          allWeeks={ this.state.allWeeks }
          scrollFunction={ this.offsetCalendar }
        />
      </div>
    );
  }
}
