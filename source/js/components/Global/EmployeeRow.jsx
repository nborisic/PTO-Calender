import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Andy from '../../../assets/img/Andy_01.png';

const ANIMATION_DURAION = 2000;


export default class EmplyeeRow extends Component {
  static propTypes = {
    allWeeks: PropTypes.array,
    animate: PropTypes.string,
  }


  renderDates() {
    const weekDays = [];
    const weekClass = this.props.animate ? 'animateClass' : 'oneWeek';
    this.props.allWeeks.map((oneWeek, index) => {
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
    let transform = `translateX(-${ 100 / 3 }%)`;
    if (this.props.animate === 'left') {
      transform = 'translateX(0)';
    } else if (this.props.animate === 'right') {
      transform = 'translateX(-66.66666%)';
    }

    return (
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
              transition: this.props.animate ? `transform ${ ANIMATION_DURAION }ms ease-in-out` : null,
            } }
          >
            {this.renderDates()}
          </div>
        </div>
      </div>
    );
  }
}
