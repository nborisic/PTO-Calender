import React, { Component } from 'react';
import PropTypes from 'prop-types';


const ANIMATION_DURAION = 2500;


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
      startingIndex: [],
      startIndexOfCutMonth: 0,
    };

    this.renderDates = this.renderDates.bind(this);

    this.divArray = [];
  }

  componentWillMount() {
    this.renderDates(this.props.allWeeks, this.props.breakpoint);
  }

  componentWillReceiveProps(nextProps) {
    this.renderDates(nextProps.allWeeks, nextProps.breakpoint);
    this.moveItem(nextProps.animate, nextProps.breakpoint);
  }

  moveItem = (animation, breakpoint) => {
    const { startingIndex, startIndexOfCutMonth } = this.state;
    //  console.log('iz recivea', this.divArray);
    const refDivs = this.divArray;
    const filterdDivs = refDivs.filter(item => item);
    // console.log(refDivs);
    console.log('startingIndex - Current state: ', this.state.startingIndex);
    if (animation === 'left' && breakpoint !== 'mobile') {
      if (filterdDivs.length === 4) {
        refDivs[this.state.startingIndex[0]].style.transform = `translateX(${ (startingIndex[0] + 4) * 100 }%)`;
        refDivs[this.state.startingIndex[0]].style.transition = 'transform 2500ms ease-in-out';

        refDivs[this.state.startingIndex[1]].style.transform = `translateX(${ (startingIndex[1] + startIndexOfCutMonth - 1) * 100 }%)`;
        refDivs[this.state.startingIndex[1]].style.transition = 'transform 2500ms ease-in-out';

        refDivs[this.state.startingIndex[2]].style.transform = `translateX(${ (startingIndex[2] + 4 + 2) * 100 }%)`;
        refDivs[this.state.startingIndex[2]].style.transition = 'transform 2500ms ease-in-out';
      } else {
        refDivs[this.state.startingIndex[0]].style.transform = `translateX(${ (startingIndex[0] + 4) * 100 }%)`;
        refDivs[this.state.startingIndex[0]].style.transition = 'transform 2500ms ease-in-out';

        refDivs[this.state.startingIndex[1]].style.transform = `translateX(${ (startingIndex[1] + 4 - startIndexOfCutMonth + 1) * 100 }%)`;
        refDivs[this.state.startingIndex[1]].style.transition = 'transform 2500ms ease-in-out';

        refDivs[this.state.startingIndex[2]].style.transform = `translateX(${ (startingIndex[2] + 4 + 2) * 100 }%)`;
        refDivs[this.state.startingIndex[2]].style.transition = 'transform 2500ms ease-in-out';
      }
    }
    if (animation === 'right' && breakpoint !== 'mobile') {
      if (filterdDivs.length === 4) {
        refDivs[this.state.startingIndex[0]].style.transform = `translateX(${ (startingIndex[0] - 4) * 100 }%)`;
        refDivs[this.state.startingIndex[0]].style.transition = 'transform 2500ms ease-in-out';

        refDivs[this.state.startingIndex[1]].style.transform = `translateX(${ (startingIndex[1] - 4) * 100 }%)`;
        refDivs[this.state.startingIndex[1]].style.transition = 'transform 2500ms ease-in-out';

        refDivs[this.state.startingIndex[2]].style.transform = `translateX(${ (4 - 2) * 100 }%)`;
        refDivs[this.state.startingIndex[2]].style.transition = 'transform 2500ms ease-in-out';

        refDivs[this.state.startingIndex[3]].style.transform = `translateX(${ (startingIndex[3] - 4 - 3) * 100 }%)`;
        refDivs[this.state.startingIndex[3]].style.transition = 'transform 2500ms ease-in-out';
      } else {
        refDivs[this.state.startingIndex[0]].style.transform = `translateX(${ (startingIndex[0] - 4) * 100 }%)`;
        refDivs[this.state.startingIndex[0]].style.transition = 'transform 2500ms ease-in-out';

        if (startingIndex[2] - startingIndex[1] === 5) {
          refDivs[this.state.startingIndex[1]].style.transform = `translateX(${ (4 - 1) * 100 }%)`;
          refDivs[this.state.startingIndex[1]].style.transition = 'transform 2500ms ease-in-out';
        } else {
          refDivs[this.state.startingIndex[1]].style.transform = `translateX(${ (startingIndex[1] - 4 - 1) * 100 }%)`;
          refDivs[this.state.startingIndex[1]].style.transition = 'transform 2500ms ease-in-out';
        }
        if (startingIndex[2] < 8) {
          refDivs[this.state.startingIndex[2]].style.transform = `translateX(${ (4 - 2) * 100 }%)`;
          refDivs[this.state.startingIndex[2]].style.transition = 'transform 2500ms ease-in-out';
        } else {
          refDivs[this.state.startingIndex[2]].style.transform = `translateX(${ (startingIndex[2] - 4 - 2) * 100 }%)`;
          refDivs[this.state.startingIndex[2]].style.transition = 'transform 2500ms ease-in-out';
        }
      }
    }
  }

  renderDates(allWeeks, breakpoint) {
    const weekDays = [];
    const monthArray = [];
    const startingIndex = [];
    let countInitial = 0;
    const containerWidth = breakpoint === 'mobile' ? 100 / 3 : 100 / 12;
    for (let index = 0; index < allWeeks.length; index++) {
      if (index < 4 && /^[1-7]$/.test(allWeeks[index][0].format('D'))) {
        this.setState({
          startIndexOfCutMonth: index,
        });
      }
      if (index < 4 && countInitial && breakpoint !== 'mobile') {
        continue;
      }
      let oneWeekDay;
      if (index === 4
        || (index === 0 && !countInitial)
        || breakpoint === 'mobile'
        || /^[1-7]$/.test(allWeeks[index][0].format('D'))
      ) {
        const month = allWeeks[index][0].format('MMM');
        monthArray.push(month);
        startingIndex.push(index);
        oneWeekDay = <div key={ `${ month + index }` } >{ month }</div>;
        weekDays.push(
          <div
            key={ `${ month + index }` }
            style={ {
              width: `${ containerWidth }%`,
              transform: breakpoint === 'mobile' ? null : `translateX(${ (index - countInitial) * 100 }%)`,
            } }
            ref={ div => this.divArray[index] = div }
          >
            <div className='monthContainer'>{ oneWeekDay }</div>
          </div>
        );
        countInitial += 1;
      }
    }
    this.setState({
      startingIndex,
      monthArray,
      months: weekDays,
    });
  }

  render() {
    const { monthArray } = this.state;
    const { animate, breakpoint } = this.props;
    let transform = `translateX(-${ 100 / 3 }%)`;
    if (breakpoint === 'mobile') {
      if (animate === 'left') {
        transform = 'translateX(0)';
        transform = monthArray[1] === monthArray[0] ? `translateX(-${ 100 / 3 }%)` : transform;
      } else if (animate === 'right') {
        transform = `translateX(-${ (2 / 3) * 100 }%)`;
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
