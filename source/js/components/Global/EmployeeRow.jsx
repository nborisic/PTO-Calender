import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Andy from '../../../assets/img/Andy_01.png';

const ANIMATION_DURAION = 2000;


export default class EmplyeeRow extends Component {
  static propTypes = {
    allWeeks: PropTypes.array,
    animate: PropTypes.string,
    employeeName: PropTypes.string,
    oneEmployee: PropTypes.object,
  }

  constructor() {
    super();

    this.state = {
      ptoDays: [],
    };

    this.allPtoDates = this.allPtoDates.bind(this);
  }

  componentWillMount() {
    this.allPtoDates();
  }

  allPtoDates() {
    const { pto } = this.props.oneEmployee;
    let fromDate;
    let endDate;
    const ptoArray = [];
    for (let i = 0; i < pto.length; i++) {
      fromDate = moment(`${ pto[i].start }`, 'MM/DD/YYYY');
      endDate = moment(`${ pto[i].end }`, 'MM/DD/YYYY');
      const daysOnPto = endDate.diff(fromDate, 'days');
      ptoArray.push(fromDate.format('MM/DD/YYYY'));
      for (let j = 0; j < daysOnPto; j++) {
        ptoArray.push(fromDate.add(1, 'day').format('MM/DD/YYYY'));
      }
    }
    this.setState({
      ptoDays: ptoArray,
    });
  }

  renderDates() {
    const weekDays = [];
    const weekClass = this.props.animate ? 'animateClass' : 'oneWeek';
    this.props.allWeeks.map((oneWeek, index) => {
      const oneWeekDay = [];
      for (let i = 0; i < 5; i++) {
        const oneDayStyle = this.state.ptoDays.includes(oneWeek[i].format('MM/DD/YYYY')) ? 'redCircle' : '';
        oneWeekDay.push(<div className={ `circle ${ oneDayStyle }` } key={ `${ index }/${ i }` } >{ oneWeek[i].format('D') }</div>);
      }
      weekDays.push(<div className={ weekClass } key={ index } style={ { width: '8.33333333%' } }>{ oneWeekDay }</div>);
      return true;
    });
    return weekDays;
  }

  render() {
    const { employeeName, oneEmployee } = this.props;
    let transform = `translateX(-${ 100 / 3 }%)`;
    if (this.props.animate === 'left') {
      transform = 'translateX(0)';
    } else if (this.props.animate === 'right') {
      transform = 'translateX(-66.66666%)';
    }


  //  console.log(this.props.oneEmployee);

    return (
      <div className='employeeContainer'>
        <div className='employeeInfo'>
          <img
            src={ Andy }
            alt='Andy'
          />
          <span>{ employeeName }</span>
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
