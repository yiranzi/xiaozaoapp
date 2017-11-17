import React from 'react'
import PropTypes from 'prop-types'

export default class Button extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
  }
  static defaultProps = {
    type: 'primary',
    onClick: function () {},
    disabled: false
  }

  render () {
    return (
      <button {...this.props} >
        {this.props.children}
        <style jsx>{`
          /* button 全局样式 */
          button {
            width: 100%;
            color: #fff;
            padding: 8px 0;
            border-radius: 4px;
            margin: 4px 0;
            border: 1px solid transparent;
          }
          button,
          button:active,
          button:focus {
            border: none;
            outline: none;
            border: 1px solid transparent;
          }
          /* button type primary */
          button[type='primary'] {
            background-color: #117ee9;
          }
          button[type='primary']:disabled {
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 1px solid rgba(0, 0, 0, 0.2);
          }
          /* button type normal */
          button[type='normal'] {
            background-color: transparent;
            color: #117ee9;
            border: 1px solid #117ee9;
          }
          button[type='normal']:disabled {
            color: rgba(0, 0, 0, 0.2);
            background-color: transparent;
            border: 1px solid rgba(0, 0, 0, 0.2);
          }
        `}</style>
      </button>
    )
  }
}
