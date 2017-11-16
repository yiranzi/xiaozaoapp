import React from 'react'
import Checkbox from '../../xz-components/checkbox'

export default class extends React.Component {
  render () {
    return (
      <div className='up'>
        <div className='title'>复选框：</div>
        <Checkbox
          name='group1'
          options={[{value: '正常1', label: '正常1'}, {value: '正常2', label: '正常2'}]}
          onChange={(e) => { console.log('group1 选中：', e) }}
        />
        <br />
        <Checkbox
          name='group2'
          defaultValue='默认1'
          options={[{value: '默认1', label: '默认1'}, {value: '默认2', label: '默认2'}]}
          onChange={(e) => { console.log('group2 选中：', e) }}
        />
        <br />
        <Checkbox
          name='group3'
          defaultValue='disable1'
          options={[{value: 'disable1', label: 'disable1'}, {value: 'disable2', label: 'disable2'}]}
          disabled
        />
      </div>
    )
  }
}