import React from 'react'

export default class Layout extends React.Component {
  render () {
    const {params, onChange} = this.props
    const {name, value, defaultValue, label, disabled} = params

    let checked = defaultValue === value

    return (
      <div>
        {disabled &&
        <label>
          <input
            className='radio'
            type='radio'
            name={name}
            value={value}
            checked={checked}
            disabled
          />
          {label}
        </label>
        }
        {!disabled &&
        <label>
          <input
            className='radio'
            type='radio'
            name={name}
            value={value}
            checked={checked}
            onClick={() => onChange(value)}
          />
          <div className='text'>{label}</div>
        </label>
        }
        <style jsx>{`
          label {
            height: 1.25rem;
          }
          .text {
            display: inline-block;
            vertical-align: middle;
          }
          .radio {
            width: 1rem;
            height: 1rem;
            display: inline-block;
            position: relative;
            margin-right: 1rem;
            vertical-align: middle;
          }
          .radio::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background-color: #F9F9F9;
            border: 1px solid #2b3a64;
            border-radius: 2rem;
            box-sizing: border-box;
          }
          input[type="radio"]:checked::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background-color: #F9F9F9;
            border-radius: 2rem;
          }
          input[type="radio"]:checked::after {
            content: '';
            position: absolute;
            width: 1.5rem;
            height: 1.25rem;
            left: -0.15rem;
            top: -0.25rem;
            background: url(/static/img/interview/check.png) no-repeat;
            background-size: 100%;
          }
        `}</style>
      </div>
    )
  }
}
