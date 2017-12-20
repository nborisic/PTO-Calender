import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import FilterGroup from 'components/Global/FilterGroup';
import CalendarSlider from 'components/Global/CalendarSlider';
import ScrollButtons from 'components/Global/ScrollButtons';
import breakpoint from 'decorators/breakpoint';
import { withScroll } from 'react-window-decorators';
import { fetchUsers } from 'actions/app';
import workAndCoLogoImg from '../../../assets/img/workco-logo.svg';
import loadingGif from '../../../assets/img/loading.gif';


const ANIMATION_DURAION = 500;

@withScroll
@breakpoint
@connect(state => ({
  usersData: state.app.get('fetchUsersData'),
  fetchUsersLoading: state.app.get('fetchUsersLoading'),
}))
export default class Test extends Component {
  static propTypes = {
    breakpoint: PropTypes.string,
    usersData: PropTypes.array,
    fetchUsersLoading: PropTypes.bool,
    scrollPosition: PropTypes.number, // from withScroll decorator
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

/**
* functin returns neccessery dates to render depending on the screen width ( mobile, lg ).
* dates are, using moment, only working days.
* @param { string } breakpointSize
*/
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
    } else {
      calendarStart = calendarStart.subtract(Math.abs(weeksToJump), 'week')
      .startOf('isoWeek');
    }
    const weeksToIterate = breakpointSize === 'mobile' ? 3 : 12;
    for (let k = 0; k < weeksToIterate; k++) {
      const oneWeek = [];
      weekStart = calendarStart.clone().add(k, 'week');
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


/**
 * on scroll button clicks determens direction of sliding
 * depending on the brakpoing slides 1 or 4 working weeks
 * @param { number } number
 */
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
        <div className='loading'><img
          src={ loadingGif }
          alt='Loading....'
        /></div>
      );
    }
    // if scrolled, inserts a breaking line
    const headerBorder = this.props.scrollPosition ? 'headerBorder' : '';

    return (
      <div className='Dashboard'>
        <div className={ `header ${ headerBorder }` }>
          <div className='logoGroup'>
            <img
              src={ workAndCoLogoImg }
              alt='Work & Co logo'
            />
            <FilterGroup
              usersData={ this.props.usersData }
            />
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
