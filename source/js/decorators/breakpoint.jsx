import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setBreakopint } from 'actions/app';


@connect(state => ({
  breakpoint: state.app.get('breakpoint'),
}))
export default InsertedComponent => class AppBreakopintDecorator extends Component {
  static propTypes = {
    breakpoint: PropTypes.string,
    dispatch: PropTypes.func,
  }

  constructor() {
    super();

    this.handleResize = this.handleResize.bind(this);
    this.getBreakoint = this.getBreakoint.bind(this);
  }

  getBreakoint() {
    const width = window.innerWidth;
    if (width < 769) {
      return 'mobile';
    } else {
      return 'lg';
    }
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(setBreakopint(this.getBreakoint()));
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
   clearTimeout(this.timeoutId);
   this.timeoutId = null;
  }

  handleResize() {
    const {
      breakpoint,
      dispatch,
    } = this.props;
    const newBreakopint = this.getBreakoint();

    if (breakpoint != newBreakopint) {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        dispatch(setBreakopint(newBreakopint));
      },200)
    }
  }

  render() {
    return (
      <InsertedComponent  { ...this.props } />
    );
  }
}
