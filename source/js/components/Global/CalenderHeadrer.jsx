import React, { Component } from 'react';
import PropTypes from 'prop-types';


const ANIMATION_DURAION = 500;


export default class EmplyeeRow extends Component {
  static propTypes = {
    allWeeks: PropTypes.array,
    animate: PropTypes.string,
    breakpoint: PropTypes.string,
  }


  renderDates() {
    const { breakpoint, allWeeks } = this.props;
    const weekDays = [];
    const containerWidth = breakpoint === 'mobile' ? 100 / 3 : 100 / 12;
    allWeeks.map((oneWeek, index) => {
      const oneWeekDay = [];
      let setOnFour;
      if (breakpoint === 'mobile' || /^[1-7]$/.test(oneWeek[0].format('D'))) {
        oneWeekDay.push(<div key={ `${ index }` } >{ oneWeek[0].format('MMM') }</div>);
        if (index === 4) {
          setOnFour = true;
        }
      }

      if (index === 4) {
        !setOnFour ? oneWeekDay.push(<div key={ `jump${ index }` } >{ oneWeek[0].format('MMM') }</div>) : '';
      }
      weekDays.push(
        <div key={ index } style={ { width: `${ containerWidth }%` } }>
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
      transform = `translateX(-${ (2 / 3) * 100 }%)`;
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
