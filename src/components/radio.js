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
            <Radio name={name}
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
              onClick={() => { onChange(value) }}
            />
          }
        </CellFooter>
        <CellBody>{label}</CellBody>
      </FormCell>
    )
  }
}
