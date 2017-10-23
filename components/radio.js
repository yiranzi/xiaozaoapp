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
          .weui-cells_radio .weui-check:checked+.weui-icon-checked:before {
            content: '\\EA06' !important;
            color: #108ee9 !important;
            font-size: 23px !important;
          }
          .weui-cells_radio .weui-icon-checked:before {
            content: '\\EA01';
            color: #C9C9C9;
            font-size: 23px;
            display: block;
          }
          [class^="weui-icon-"]:before, [class*=" weui-icon-"]:before {
            display: inline-block;
            margin-left: .2em;
            margin-right: .2em;
          }

          /*背景*/
          .weui-cells,
          .weui-check__label:active {
            background: transparent !important;
            line-height: 1.6 !important;
            font-size: 14px !important;
          }
          .weui-cell:before,
          .weui-cells:before,
          .weui-cells:after {
            border-top: none !important;
            border-bottom: none !important;
          }
          .weui-cell {
            padding: 10px 0 !important;
            align-items: flex-start !important;
          }
          .weui-cells_radio .weui-cell__ft {
            padding-left: 0 !important;
          }
        `}
        </style>
      </FormCell>
    )
  }
}
