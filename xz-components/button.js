import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Button extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    size: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
  }
  static defaultProps = {
    type: 'primary',
    size: 'normal',
    disabled: false,
    onClick: function () {}
  }

  render () {
    const {type, className, size, disabled} = this.props
    const cls = classNames({
      'xz-btn': true,
      'xz-btn_primary': type === 'primary',
      'xz-btn_small': size === 'small',
      'xz-btn_disabled': disabled,
      [className]: className
    })
    return (
      <button className={cls} {...this.props} >
        {this.props.children}
        <style jsx>{`
          /* button 全局样式 */
          .xz-btn {
            width: 100%;
            padding: 4px 8px;
            border-radius: 4px;
            margin: 4px 0;
            border: 1px solid transparent;
          }
          .xz-btn,
          .xz-btn:active,
          .xz-btn:focus {
            border: none;
            outline: none;
          }
          /* 小号button */
          .xz-btn_small {
            width: auto;
          }
          /* button type primary */
          .xz-btn_primary {
            background-color: #117ee9;
            color: #fff;
          }
          .xz-btn_primary:disabled {
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
