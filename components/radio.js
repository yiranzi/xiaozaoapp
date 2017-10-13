import React from 'react'
import {FormCell, CellBody, CellFooter, Radio} from 'react-weui'

export default class Layout extends React.Component {
  render () {
    const {params, onChange} = this.props
    const {name, value, defaultValue, label, disabled} = params

    let checked = defaultValue === value

    return (
      <FormCell radio>
        <CellFooter>
          {disabled &&
          <Radio
            name={name}
            value={value}
            defaultChecked={checked}
            disabled
          />
          }
          {!disabled &&
          <Radio
            name={name}
            value={value}
            defaultChecked={checked}
            onClick={() => {
              onChange(value)
            }}
          />
          }
        </CellFooter>
        <CellBody>{label}</CellBody>
        <style global jsx>{`
          /*背景*/
          .weui-cells,
          .weui-check__label:active {
            background: transparent !important;
          }
          .weui-cell:before,
          .weui-cells:before,
          .weui-cells:after {
            border-top: none !important;
            border-bottom: none !important;
          }
          span.weui-icon-checked {
            width: 1.25rem;
            height: 1.25rem;
            background: transparent;
            border-radius: 1rem;
            margin-right: 1rem;
            position: relative;
            border: 1px solid #2b3a64;
          }
          .weui-cells_radio .weui-check:checked+.weui-icon-checked:before {
            content: '' !important;
            color: transparent;
            background: url(/static/img/interview/check.png) no-repeat;
            background-size: 100%;
            width: 2rem;
            height: 2rem;
            position: absolute;
            left: -0.5rem;
            top: -0.1rem;
          }
          .weui-cell {
            padding: 0 !important;
          }
        `}
        </style>
      </FormCell>
    )
  }
}
