import React, { Component } from 'react';
import PropTypes from 'prop-types';


const ANIMATION_DURAION = 500;


export default class EmplyeeRow extends Component {
  static propTypes = {
    allWeeks: PropTypes.array,
    animate: PropTypes.string,
    breakpoint: PropTypes.string,
  }

  constructor() {
    super();

    this.state = {
      months: [],
      monthArray: [],
    };

    this.renderDates = this.renderDates.bind(this);
  }

  componentWillMount() {
    this.renderDates(this.props.allWeeks, this.props.breakpoint);
  }

  componentWillReceiveProps(nextProps) {
    this.renderDates(nextProps.allWeeks, nextProps.breakpoint);
  }

  renderDates(allWeeks, breakpoint) {
    const weekDays = [];
    const monthArray = [];
    const containerWidth = breakpoint === 'mobile' ? 100 / 3 : 100 / 12;
    allWeeks.map((oneWeek, index) => {
      const oneWeekDay = [];
      let setOnFour;
      if (breakpoint === 'mobile' || /^[1-7]$/.test(oneWeek[0].format('D'))) {
        monthArray.push(oneWeek[0].format('MMM'));
        oneWeekDay.push(<div key={ `${ index }` } >{ oneWeek[0].format('MMM') }</div>);
        if (index === 4) {
          setOnFour = true;
        }
      }

      if (index === 4 && !setOnFour) {
        oneWeekDay.push(<div key={ `jump${ index }` } >{ oneWeek[0].format('MMM') }</div>);
      }
      weekDays.push(
        <div key={ index } style={ { width: `${ containerWidth }%` } }>
          <div className='monthContainer'>{ oneWeekDay }</div>
        </div>
      );
      return true;
    });
    this.setState({
      monthArray,
      months: weekDays,
    });
  }

  render() {
    const { monthArray } = this.state;
    const { animate, breakpoint } = this.props;
    let transform = `translateX(-${ 100 / 3 }%)`;
    if (animate === 'left') {
      transform = 'translateX(0)';
      if (breakpoint === 'mobile') {
        transform = monthArray[1] === monthArray[0] ? `translateX(-${ 100 / 3 }%)` : transform;
      }
    } else if (animate === 'right') {
      transform = `translateX(-${ (2 / 3) * 100 }%)`;
      if (breakpoint === 'mobile') {
        transform = monthArray[1] === monthArray[2] ? `translateX(-${ 100 / 3 }%)` : transform;
      }
    }

    return (
      <div className='employeeContainer'>
        <div className='monthToggleDiv' />
        <div className='headerViewContainer'>
          <div
            className='daysRow'
            style={ {
              transform,
              transition: this.props.animate ? `transform ${ ANIMATION_DURAION }ms ease-in-out` : null,
            } }
          >
            {this.state.months}
          </div>
        </div>
      </div>
    );
  }
}
