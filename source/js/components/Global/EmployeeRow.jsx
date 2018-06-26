import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';


const ANIMATION_DURAION = 500;


export default class EmplyeeRow extends Component {
  static propTypes = {
    allWeeks: PropTypes.array,
    animate: PropTypes.string,
    oneEmployee: PropTypes.object,
    breakpoint: PropTypes.string,
  }

  constructor() {
    super();

    this.state = {
      ptoDays: {},
    };
  }

  componentWillMount() {
    this.allPtoDates(this.props.oneEmployee.pto);
  }

  componentWillReceiveProps(nextProps) {
    this.allPtoDates(nextProps.oneEmployee.pto);
  }
/**
 * formating all days to apropriate categories
 * @param { object } pto - days on payed leave
 */
  allPtoDates = (pto) => {
    let fromDate;
    let endDate;
    const allPtoDays = [];
    for (let i = 0; i < pto.length; i++) {
      const ptoArray = [];
      fromDate = moment(`${ pto[i].start }`, 'MM/DD/YYYY');
      endDate = moment(`${ pto[i].end }`, 'MM/DD/YYYY');
      const daysOnPto = endDate.diff(fromDate, 'days');
      ptoArray.push(fromDate.format('MM/DD/YYYY'));
      for (let j = 0; j < daysOnPto; j++) {
        ptoArray.push(fromDate.add(1, 'day').format('MM/DD/YYYY'));
      }
      const ptoObj = { [pto[i].type]: ptoArray };
      allPtoDays.push(ptoObj);
    }

    this.setState({
      ptoDays: allPtoDays,
    });
  }

  renderDates() {
    const { ptoDays } = this.state;
    const { animate, breakpoint, allWeeks, oneEmployee } = this.props;
    const weekDays = [];
    const weekClass = animate ? 'animateClass' : 'weekContainer';
    const containerWidth = breakpoint === 'mobile' ? 100 / 3 : 100 / 12;
    allWeeks.map((oneWeek, index) => {
      const oneWeekDay = [];
      for (let i = 0; i < 5; i++) {
        let ptoType;
        for (let k = 0; k < ptoDays.length; k++) {
          const key = Object.keys(ptoDays[k])[0];
          const isPto = ptoDays[k][key].includes(oneWeek[i].format('MM/DD/YYYY'));
          if (isPto) {
            ptoType = key;
            break;
          }
        }

        // specific classes depending on position and length of leave type
        let verticalPosition = '';
        let horizontalPosition = '';
        let horizontalPositionTriangle = '';
        let verticalPositionTriangle = '';
        let wideItemClass = '';
        const wideItems = ['Conference', 'Recognition Day', 'Bereavement'];
        const dubbleRowItems = ['Recognition Day', 'Parental leave', 'Jury Duty', 'Client travel'];
        if (dubbleRowItems.includes(ptoType)) {
          verticalPosition = 'dubbleRowPos';
          verticalPositionTriangle = 'dubbleRowTriangle';
        }
        if (wideItems.includes(ptoType)) {
          wideItemClass = 'wideItemClass';
        }
        if ((index % 4 === 3 && i === 4) || (breakpoint === 'mobile' && i === 4)) {
          horizontalPosition = 'rightEdgePos';
          horizontalPositionTriangle = 'rightEdgeTrinagle';
        } else if ((index % 4 === 0 && i === 0) || (breakpoint === 'mobile' && i === 0)) {
          horizontalPosition = 'leftEdgePos';
          horizontalPositionTriangle = 'leftEdgeTrinagle';
        }
        const oneDayStyle = ptoType ? 'redCircle' : '';


        oneWeekDay.push(
          <div key={ `${ oneEmployee.name }/${ i }` }>
            <div className={ `circle ${ oneDayStyle }` }>
              { oneWeek[i].format('D') }
            </div>
            { ptoType ?
              <div className={ `tooltip ${ verticalPosition } ${ horizontalPosition }` }>
                <div className={ `leaveType ${ wideItemClass }` }>
                  { ptoType }
                </div>
                <div className={ `triangle ${ verticalPositionTriangle } ${ horizontalPositionTriangle }` } />
              </div>
              : ''
            }
          </div>
        );
      }
      weekDays.push(
        <div className={ weekClass } key={ `${ oneEmployee.name }/${ index }` } style={ { width: `${ containerWidth }%` } }>
          <div className='oneWeek'>{ oneWeekDay }</div>
        </div>
      );
      return true;
    });
    return weekDays;
  }

  render() {
    const { oneEmployee, animate, breakpoint } = this.props;
    let transform = `translateX(-${ 100 / 3 }%)`;
    if (animate === 'left') {
      transform = 'translateX(0)';
    } else if (animate === 'right') {
      transform = `translateX(-${ (2 / 3) * 100 }%)`;
    }
    const containerClass = `viewContainer ${ animate ? 'blur' : '' }`;
    return (
      <div className='employeeContainer'>
        <div className='employeeInfo'>
          <img
            className={ breakpoint === 'mobile' ? 'invisible' : '' }
            src={ oneEmployee.photoLink }
            alt={ oneEmployee.name }
          />
          <span>{ oneEmployee.name }</span>
        </div>
        <div className={ containerClass }>
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
