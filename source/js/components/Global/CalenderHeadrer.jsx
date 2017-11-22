import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';


const ANIMATION_DURAION = 2000;


export default class EmplyeeRow extends Component {
  static propTypes = {
    allWeeks: PropTypes.array,
    animate: PropTypes.string,
  }


  renderDates() {
    const weekDays = [];
    this.props.allWeeks.map((oneWeek, index) => {
      const oneWeekDay = [];
      let setOnFour;
      if (/^[1-7]$/.test(oneWeek[0].format('D'))) {
        oneWeekDay.push(<div key={ `${ index }` } >{ oneWeek[0].format('MMM') }</div>);
        if (index === 4) {
          setOnFour = true;
        }
      }

      if (index === 4) {
        !setOnFour ? oneWeekDay.push(<div key={ `jump${ index }` } >{ oneWeek[0].format('MMM') }</div>) : '';
      }
      weekDays.push(
        <div key={ index } style={ { width: '8.33333333%' } }>
          <div className='monthContainer'>{ oneWeekDay }</div>
        </div>
      );
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
        <div className='employeeInfo' />
        <div className='headerViewContainer'>
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
