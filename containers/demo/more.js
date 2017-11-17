import React from 'react'
import More from '../../xz-components/more'

export default class extends React.Component {
  render () {
    return (
      <div className='up'>
        <div className='title'>More：</div>
        <More title='这是标题' height={120} >
          <p>有三个props:</p>
          <p>title: 标题（可有可无）</p>
          <p>content: 内容（必须要有）</p>
          <p>height: 高度，<strong style={{color: 'red'}}>数字</strong>（超出显示查看全部）</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
        </More>
      </div>
    )
  }
}
