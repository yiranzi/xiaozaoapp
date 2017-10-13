import React from 'react'

export default class Layout extends React.Component {
  render () {
    const {params, onChange} = this.props
    const {name, value, defaultValue, label, disabled} = params

    let checked = defaultValue === value

    return (
      <div>
        {disabled &&
          <div className='radio-wrapper'>
            <div className='input'>
              <input
                type='radio'
                name={name}
                value={value}
                checked={checked}
                disabled
              />
            </div>
            <div className='text'>{label}</div>
          </div>
        }
        {!disabled &&
          <div className='radio-wrapper' onClick={() => onChange(value)}>
            <div className='input'>
              <input
                type='radio'
                name={name}
                value={value}
                defaultChecked={checked}
              />
            </div>
            <div className='text'>{label}</div>
          </div>
        }
        <style jsx>{`
          .radio-wrapper {
            display: flex;
            justify-content: flex-start;
          }
          .text {
            word-wrap: break-word;
            width: calc(100vw - 5rem);
          }
          input[type="radio"] {
            width: 1rem;
            height: 1rem;
            position: relative;
            margin-right: 1rem;
          }
          input[type="radio"]::before {
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
