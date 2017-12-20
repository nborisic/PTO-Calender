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

    const styles = Array(12).fill({
      transform: null,
    });

    this.state = {
      months: [],
      monthArray: [],
      startingIndex: [],
      startIndexOfCutMonth: 0,
      styles,
    };
    this.divArray = [];
  }

  componentWillMount() {
    this.renderDates(this.props.allWeeks, this.props.breakpoint);
  }

  componentWillReceiveProps(nextProps) {
    this.moveItem(nextProps.animate, nextProps.breakpoint, nextProps.allWeeks);
  }
/**
 * moving indipendently month tags
 * @param { string } animation - direction of animation
 * @param { string } breakpoint
 * @param { object[] } allWeeks
 */
  moveItem = (animation, breakpoint, allWeeks) => {
    const { startingIndex, startIndexOfCutMonth } = this.state;
    const refDivs = this.divArray;
    const filterdDivs = refDivs.filter(item => item);
    const newStyles = [];
    for (let k = 0; k < 12; k++) { // 12 weeks
      newStyles.push({
        transform: null,
      });
    }
    // based on start and end of month in off view, calculating next position and changing styles
    if (animation === 'left' && breakpoint !== 'mobile') {
      if (filterdDivs.length === 4) {
        if (refDivs[startingIndex[1]].textContent === refDivs[startingIndex[0]].textContent) {
          newStyles[startingIndex[0]].transform = '';
        } else {
          newStyles[startingIndex[0]].transform = `translateX(${ (startingIndex[0] + 4) * 100 }%)`;
        }
        if (refDivs[startingIndex[1]].textContent === refDivs[startingIndex[0]].textContent) {
          newStyles[startingIndex[1]].transform = '300%';
        } else {
          newStyles[startingIndex[1]].transform = `translateX(${ (startingIndex[1] + startIndexOfCutMonth - 1) * 100 }%)`;
        }
        newStyles[startingIndex[2]].transform = `translateX(${ (startingIndex[2] + 4 + 2) * 100 }%)`;
      } else {
        if (refDivs[startingIndex[1]].textContent === refDivs[startingIndex[0]].textContent) {
          newStyles[startingIndex[0]].transform = `translateX(${ (startingIndex[0] + 4) * 100 }%)`;
        } else {
          newStyles[startingIndex[0]].transform = `translateX(${ (startingIndex[0] + 4) * 100 }%)`;
        }
        newStyles[startingIndex[1]].transform = `translateX(${ (startingIndex[1] + 4 - startIndexOfCutMonth + 1) * 100 }%)`;
        newStyles[startingIndex[2]].transform = `translateX(${ (startingIndex[2] + 4 + 2) * 100 }%)`;
      }
    }
    if (animation === 'right' && breakpoint !== 'mobile') {
      if (filterdDivs.length === 4) {
        if (refDivs[startingIndex[1]].textContent === refDivs[startingIndex[0]].textContent) {
          refDivs[startingIndex[0]].transform = '';
        } else {
          newStyles[startingIndex[0]].transform = `translateX(${ (startingIndex[0] - 4) * 100 }%)`;
        }
        newStyles[startingIndex[1]].transform = `translateX(${ (startingIndex[1] - 4 - 1) * 100 }%)`;
        newStyles[startingIndex[2]].transform = `translateX(${ (4 - 2) * 100 }%)`;
        newStyles[startingIndex[3]].transform = `translateX(${ (startingIndex[3] - 4 - 3) * 100 }%)`;
      } else {
        newStyles[startingIndex[0]].transform = `translateX(${ (startingIndex[0] - 4) * 100 }%)`;
        if (startingIndex[2] - startingIndex[1] === 5) {
          newStyles[startingIndex[1]].transform = `translateX(${ (4 - 1) * 100 }%)`;
        } else {
          newStyles[startingIndex[1]].transform = `translateX(${ (startingIndex[1] - 4 - 1) * 100 }%)`;
        }
        if (startingIndex[2] < 8) {
          newStyles[startingIndex[2]].transform = `translateX(${ (4 - 2) * 100 }%)`;
        } else {
          newStyles[startingIndex[2]].transform = `translateX(${ (startingIndex[2] - 4 - 2) * 100 }%)`;
        }
      }
    }
    this.setState({
      styles: newStyles,
    }, () => {
      this.renderDates(allWeeks, breakpoint);
    });
  }
/**
 * renering dates after the animation has been done/ component will mount
 * @param { string } breakpoint
 * @param { object[] } allWeeks
 */
  renderDates = (allWeeks, breakpoint) => {
    const { styles } = this.state;
    const weekDays = [];
    const monthArray = [];
    const startingIndex = [];
    let countInitial = 0;
    const containerWidth = breakpoint === 'mobile' ? 100 / 3 : 100 / 12;
    // determming the position of first working week in month
    let startIndexOfCutMonth = 0;
    for (let index = 0; index < allWeeks.length; index++) {
      if (index < 4 && /^[1-7]$/.test(allWeeks[index][0].format('D'))) {
        startIndexOfCutMonth = index;
      }
      // if in off view there is already a month tag, skip to the view port indexes
      if (index < 4 && countInitial && breakpoint !== 'mobile') {
        continue;
      }
      let oneWeekDay;
      // positioning month tags on firs index in view port ( idex === 4)
      // on the firs index to be able to slide into a viewport
      // all three positions in moblie view
      // on the startgin weeks
      if (index === 4
        || (index === 0 && !countInitial)
        || breakpoint === 'mobile'
        || /^[1-7]$/.test(allWeeks[index][0].format('D'))
      ) {
        const month = allWeeks[index][0].format('MMM');
        monthArray.push(month);
        startingIndex.push(index);
        oneWeekDay = <div key={ `${ month + index }` } >{ month }</div>;
        const hasAnimation = (breakpoint === 'mobile' ? null : styles[index].transform);
        const defaultPosition = (breakpoint === 'mobile' ? null : `translateX(${ (index - countInitial) * 100 }%)`);
        const divPosition = hasAnimation || defaultPosition;
        weekDays.push(
          <div
            key={ `${ month + index }` }
            style={ {
              width: `${ containerWidth }%`,
              transform: divPosition,
              transition: styles[index].transform && 'transform 500ms ease-in-out',
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
      startIndexOfCutMonth,
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
