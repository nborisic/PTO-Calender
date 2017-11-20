import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import FilterGroup from 'components/Global/FilterGroup';
import workAndCoLogoImg from '../../../assets/img/workco-logo.svg';
import Andy from '../../../assets/img/Andy_01.png';


const ANIMATION_DURAION = 2000;

@connect()
export default class Test extends Component {
  static propTypes = {
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
  }

  componentWillMount() {
    this.getDates();
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

  renderDates() {
    const weekDays = [];
    const weekClass = this.state.animate ? 'animateClass' : 'oneWeek';
    this.state.allWeeks.map((oneWeek, index) => {
      const oneWeekDay = [];
      for (let i = 0; i < 5; i++) {
        oneWeekDay.push(<div className='circle' key={ `${ index }/${ i }` } >{ oneWeek[i] }</div>);
      }
      weekDays.push(<div className={ weekClass } key={ index } style={ { width: '8.33333333%' } }>{ oneWeekDay }</div>);
      return true;
    });
    return weekDays;
  }

  render() {
    //  animacija kalendara
    let transform = `translateX(-${ 100 / 3 }%)`;
    if (this.state.animate === 'left') {
      transform = 'translateX(0)';
    } else if (this.state.animate === 'right') {
      transform = 'translateX(-66.66666%)';
    }

    return (
      <div className='Dashboard'>
        <img
          src={ workAndCoLogoImg }
          alt='Work & Co logo'
        />
        <div>Wellcome to Dashboard!</div>
        <button
          className='leftButton'
          onClick={ () => { this.offsetCalendar(-1); } }
        />
        <button
          className='rightButton'
          onClick={ () => { this.offsetCalendar(1); } }
        />
        <div className='employeeContainer'>
          <div className='employeeInfo'>
            <img
              src={ Andy }
              alt='Andy'
            />
            <span>Andy Baudoin</span>
          </div>
          <div className='weekContainer'>
            <div
              className='daysRow'
              style={ {
                transform,
                transition: this.state.animate ? `transform ${ ANIMATION_DURAION }ms ease-in-out` : null,
              } }
            >
              {this.renderDates()}
            </div>
          </div>
        </div>
        <FilterGroup />
      </div>
    );
  }
}
