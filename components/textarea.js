import React from 'react'
import {Form, FormCell, CellBody, TextArea} from 'react-weui'

export default class Layout extends React.Component {
  render () {
    const {placeholder, defaultValue, maxLength, onChange} = this.props
    return (
      <Form className='textarea'>
        <FormCell>
          <CellBody>
            <TextArea
              placeholder={placeholder}
              defaultValue={defaultValue}
              maxLength={maxLength}
              onChange={(e) => onChange(e.target.value)} />
          </CellBody>
        </FormCell>
        <style global jsx>{`
          .weui-cells {
            font-size: 14px !important;
          }
        `}</style>
      </Form>
    )
  }
}
