import React from 'react'
import Card from '../../xz-components/card'

export default class extends React.Component {
  render () {
    return (
      <div className='up'>
        <div className='title'>卡片：</div>
        <Card title='这是标题'>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
        </Card>
      </div>
    )
  }
}