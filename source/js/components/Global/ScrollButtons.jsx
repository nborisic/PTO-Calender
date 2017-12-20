import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationArrow from '../../../assets/svg/navigationArrow';

export default class ScrollButtons extends Component {
  static propTypes = {
    scrollClick: PropTypes.func,
  }

  render() {
    return (
      <div className='buttonGroup'>
        <button
          className='leftButton'
          onClick={ () => { this.props.scrollClick(-1); } }
        >
          <NavigationArrow />
        </button>
        <button
          className='rightButton'
          onClick={ () => { this.props.scrollClick(1); } }
        >
          <NavigationArrow />
        </button>
      </div>
    );
  }
}
