import React from 'react'

export default class extends React.Component {
  render () {
    return (<div className='discuss'>
      即将开放，敬请期待！
      <style jsx>{`
        .discuss {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 150px;
        }
      `}</style>
    </div>)
  }
}
