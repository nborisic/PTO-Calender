import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import workAndCoLogoImg from '../../../assets/img/workco-logo.svg';


@connect()
export default class Dashboard extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  }

  constructor() {
    super();
  }

  render() {
    return (
      <div className='Home'>
        <img
          src={ workAndCoLogoImg }
          alt='Work & Co logo'
        />
        <div>Wellcome to Home!</div>
      </div>
    );
  }
}
