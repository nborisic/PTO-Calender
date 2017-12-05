import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
          <svg width='30px' height='30px' viewBox='0 0 27 27' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
            <g id='Horizontally-Scrolling' transform='translate(-1343.000000, -66.000000)'>
              <g id='Group' transform='translate(1307.000000, 66.000000)'>
                <g id='Group-9' transform='translate(36.720000, 0.000000)'>
                  <rect
                    id='Rectangle-6'
                    fill='#272727'
                    transform='translate(12.960000, 13.500000) rotate(-180.000000) translate(-12.960000, -13.500000) '
                    x='0'
                    y='0'
                    width='25.92'
                    height='27'
                    rx='12.96'
                  />
                  <polyline
                    id='Page-1'
                    fill='#FFFFFF'
                    transform='translate(13.983158, 13.144737) rotate(-360.000000) translate(-13.983158, -13.144737) '
                    points='15.9116603 12.0703308 12.0891297 8.52631579 10.9470515 9.58415414 14.770689 13.1293421 10.9136842 16.7053195 12.0546555 17.7631579 17.0526316 13.1293421'
                  />
                </g>
              </g>
            </g>
          </svg>
        </button>
        <button
          className='rightButton'
          onClick={ () => { this.props.scrollClick(1); } }
        >
          <svg width='30px' height='30px' viewBox='0 0 27 27' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
            <g id='Horizontally-Scrolling' transform='translate(-1343.000000, -66.000000)'>
              <g id='Group' transform='translate(1307.000000, 66.000000)'>
                <g id='Group-9' transform='translate(36.720000, 0.000000)'>
                  <rect
                    id='Rectangle-6'
                    fill='#272727'
                    transform='translate(12.960000, 13.500000) rotate(-180.000000) translate(-12.960000, -13.500000) '
                    x='0'
                    y='0'
                    width='25.92'
                    height='27'
                    rx='12.96'
                  />
                  <polyline
                    id='Page-1'
                    fill='#FFFFFF'
                    transform='translate(13.983158, 13.144737) rotate(-360.000000) translate(-13.983158, -13.144737) '
                    points='15.9116603 12.0703308 12.0891297 8.52631579 10.9470515 9.58415414 14.770689 13.1293421 10.9136842 16.7053195 12.0546555 17.7631579 17.0526316 13.1293421'
                  />
                </g>
              </g>
            </g>
          </svg>
        </button>
      </div>
    );
  }
}
