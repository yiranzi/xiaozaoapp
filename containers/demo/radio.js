import React from 'react'
import {Form} from 'react-weui'
import Radio from '../../xz-components/radio'

export default class extends React.Component {
  render () {
    return (
      <div className='up'>
        <div className='title'>Radio：</div>
        <Form radio>
              <Radio
                params={{
                  name: 'name1',
                  value: '正常1',
                  label: '正常1'
                }}
                onChange={(e) => console.log('name1选中:', e)}
              />
              <Radio
                params={{
                  name: 'name1',
                  value: '正常2',
                  label: '正常2'
                }}
                onChange={(e) => console.log('name1选中:', e)}
              />
            </Form>
            <Form radio>
              <Radio
                params={{
                  name: 'name2',
                  value: '默认1',
                  label: '默认1'
                }}
                onChange={(e) => console.log('name2选中:', e)}
              />
              <Radio
                params={{
                  name: 'name2',
                  value: '默认2',
                  label: '默认2',
                  defaultValue: '默认2'
                }}
                onChange={(e) => console.log('name2选中:', e)}
              />
            </Form>
            <Form radio>
              <Radio
                params={{
                  name: 'name3',
                  value: 'disable1',
                  label: 'disable1',
                  disabled: true
                }}
              />
              <Radio
                params={{
                  name: 'name3',
                  value: 'disable2',
                  label: 'disable2',
                  defaultValue: 'disable2',
                  disabled: true
                }}
              />
            </Form>
      </div>
    )
  }
}
