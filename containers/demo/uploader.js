import React from 'react'
import Uploader from '../../xz-components/uploader'

export default class extends React.Component {
  render () {
    return (
      <div className='up'>
        <div className='title'>Uploader：</div>
        <p>defaultValue: 数组，默认显示的图片，没有置为空数组</p>
        <p>maxCount: 能上传多少张图片</p>
        <p>onChange: 上传图片后的回调</p>
        <Uploader
          title='图片上传'
          defaultValue={[]}
          maxCount={1}
          onChange={(value) => console.log('上传图片', value)}
        />
      </div>
    )
  }
}
