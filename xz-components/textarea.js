import React from 'react'
import PropTypes from 'prop-types'
import {Form, FormCell, CellBody, TextArea} from 'react-weui'

export default class MyTextArea extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    maxLength: PropTypes.number,
    onChange: PropTypes.func,
    disabled: PropTypes.bool
  }
  static defaultProps = {
    onChange: function () {}
  }
  render () {
    const {placeholder, defaultValue, maxLength, onChange, disabled} = this.props
    return (
      <Form className='textarea'>
        <FormCell>
          <CellBody>
            <TextArea
              placeholder={placeholder}
              defaultValue={defaultValue}
              maxLength={maxLength}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
            />
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
