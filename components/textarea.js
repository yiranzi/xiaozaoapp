import React from 'react'
import {Form, FormCell, CellBody, TextArea} from 'react-weui'

export default class Layout extends React.Component {
  render () {
    const {placeholder, maxLength} = this.props
    return (
      <Form className='textarea'>
        <FormCell>
          <CellBody>
            <TextArea placeholder={placeholder} maxLength={maxLength} onChange={(e) => this.props.onChange(e)} />
          </CellBody>
        </FormCell>
      </Form>
    )
  }
}
