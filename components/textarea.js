import React from 'react'
import {Form, FormCell, CellBody, TextArea} from 'react-weui'

export default class Layout extends React.Component {
  render () {
    const {placeholder, defaultValue, maxLength, onChange, disabled} = this.props
    return (
      <Form className='textarea'>
        <FormCell>
          <CellBody>
            {disabled && (
              <TextArea
                placeholder={placeholder}
                defaultValue={defaultValue}
                maxLength={maxLength}
                disabled />
            )}
            {!disabled && (
              <TextArea
                placeholder={placeholder}
                defaultValue={defaultValue}
                maxLength={maxLength}
                onChange={(e) => onChange(e.target.value)} />
            )}
          </CellBody>
        </FormCell>
        <style global jsx>{`
          .weui-cells {
            font-size: 14px !important;
          }
          .weui-textarea {
            height: 150px !important;
            max-height: 150px !important;
          }
          textarea:disabled {
            background-color: #fff;
          }
        `}</style>
      </Form>
    )
  }
}
