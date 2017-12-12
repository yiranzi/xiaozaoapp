import React from 'react'


// 滑动基础组件

export default class extends React.Component {
  render () {
    let {divList} = this.props

    let list = divList.map((div, index) => {
      if (index < 3) {
        return (div)
      }
    })
    return (<div className='swipe-container'>
      {list}
      <style jsx>{`
        .swipe-container {
          width: 100%;
          display: flex;
          flex-wrap: nowrap;
        }
      `}</style>
    </div>)
  }
}
