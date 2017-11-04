import React from 'react'
import Button from '../../xz-components/button'
import ThemeConfig from '../../config/theme'
import classNames from 'classnames'

/*
  week数组
  1)打卡情况.对应的日期
  2)
  onChange // next before
  onChoose // index 选中其中某一天
  currentSelect // index
 */

export default class extends React.Component {
  constructor () {
    super()
    this.state = {
      seeButton: false
    }
  }
  render () {
    return (
      <div >
        <div className='fixfooter-container'>
          {<div className='button'>周76543</div>}
        </div>
        <style jsx>{`

        `}</style>
      </div>
    )
  }
}
