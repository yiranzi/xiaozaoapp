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
          .weui-cells_checkbox .weui-icon-checked:before {
            content: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4ODAzNGIxZi04YTUwLTgxNDAtODhkMy0zMmFhYzBmZDEzOGMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REE0OEJEN0RCRTE4MTFFNzgyOTJBNTI3NzZGMkVFOTUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REE0OEJEN0NCRTE4MTFFNzgyOTJBNTI3NzZGMkVFOTUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDRmYWRjYjUtMGQ4Ny03YzQyLThhYjUtYThiNmI4Mjc3YWYwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjg4MDM0YjFmLThhNTAtODE0MC04OGQzLTMyYWFjMGZkMTM4YyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnfHPRwAAAAySURBVHjaYjx79ux/BioDFijNSEUz/zMx0ACMGjpq6Kiho4aOGjqIDYVVJ1StpwACDADvhQWT1xhDAwAAAABJRU5ErkJggg==') !important;
          }
          .weui-check__label:active {
            background-color: transparent !important;
          }
          .weui-cells_checkbox .weui-check:checked+.weui-icon-checked:before {
            content: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAIAAAAmdTLBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4ODAzNGIxZi04YTUwLTgxNDAtODhkMy0zMmFhYzBmZDEzOGMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0ZGNzdBOERCREU0MTFFNzlGMjFFM0UzQTA2MEMzQkQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0ZGNzdBOENCREU0MTFFNzlGMjFFM0UzQTA2MEMzQkQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODgwMzRiMWYtOGE1MC04MTQwLTg4ZDMtMzJhYWMwZmQxMzhjIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjg4MDM0YjFmLThhNTAtODE0MC04OGQzLTMyYWFjMGZkMTM4YyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnHkGJ8AAACoSURBVHjaYhSse8lAAWBioAyM6qen/nIH7h4fXmQRFpI060mxxK34SI5+oGYXVTa/BR/+/mMgWT9Qc6g+h8ec999//yfg/3JH7nmh/KLcTMiak804wxZ/ePP1H+Hw69z/9eabP0eyhfy12SGa82y4Ipd9vPfuL1anYXE/0AggOT+MH0gCfQsMsLNPfpMWf0AjOg+ATKne8Xn7zZ94goZxNP8OqH6AAAMAPgs69BBGjF4AAAAASUVORK5CYII=') !important;
          }
        `}</style>
      </Form>
    )
  }
}
