import React from 'react'
import {Form, FormCell, CellBody, CellHeader, Checkbox} from 'react-weui'

export default class MyCheckbox extends React.Component {
  constructor (props) {
    super(props)
    let checkboxValue = []
    const {defaultValue} = this.props
    if (defaultValue) {
      for (let i = 0; i < defaultValue.length; i++) {
        checkboxValue.push(defaultValue[i])
      }
    }

    this.state = {
      checkboxValue: checkboxValue
    }
  }
  handleChange (event) {
    const _this = this
    let {checkboxValue} = this.state
    let {value, checked} = event.target

    var index = checkboxValue.indexOf(value)

    if (checked) {
      checkboxValue.push(value)
    } else {
      checkboxValue.splice(index, 1)
    }

    this.setState({
      checkboxValue: checkboxValue
    }, () => {
      _this.props.onChange(checkboxValue.join(''))
    })
  }
  render () {
    const {name, defaultValue, options, disabled} = this.props
    console.log('disabled:', disabled)
    return (
      <Form checkbox >
        {options.map((item, index) => {
          return (
            <FormCell checkbox key={index}>
              <CellHeader>
                {disabled && (
                  <Checkbox
                    name={name}
                    value={item.value}
                    defaultChecked={defaultValue && defaultValue.indexOf(item.value) >= 0}
                    disabled
                  />
                )}
                {!disabled && (
                  <Checkbox
                    name={name}
                    value={item.value}
                    onClick={(e) => { this.handleChange(e) }}
                    defaultChecked={defaultValue && defaultValue.indexOf(item.value) >= 0}
                  />
                )}
              </CellHeader>
              <CellBody>{item.label}</CellBody>
            </FormCell>
          )
        })}
        <style global jsx>{`
          .weui-cells {
            font-size: 14px !important;
            background-color: transparent !important;
          }
          .weui-cells:before {
            border-top: none !important;
          }
          .weui-cells:after {
            border-bottom: none !important;
          }
          .weui-cell {
            padding: 10px 0 !important;
            align-items: flex-start !important;
          }
          .weui-cell:before {
            border-top: none !important;
          }
          .weui-check__label:active {
            background-color: transparent !important;
          }
          .weui-cells_checkbox .weui-check:checked+.weui-icon-checked:before {
            color: #108ee9 !important;
          }
          [class^="weui-icon-"]:before, [class*=" weui-icon-"]:before {
            margin-left: 0 !important;
          }
        `}</style>
      </Form>
    )
  }
}
