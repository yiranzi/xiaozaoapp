import React from 'react'
import {Panel, MediaBox, MediaBoxTitle, MediaBoxDescription} from 'react-weui'

export default class extends React.Component {
  render () {
    return (
      <div className='achieve'>
        <Panel className='introduce'>
          <MediaBox>
            <MediaBoxTitle />
            <MediaBoxDescription style={{display: 'block'}}>
              即将开放，敬请期待……
            </MediaBoxDescription>
          </MediaBox>
        </Panel>
      </div>
    )
  }
}
