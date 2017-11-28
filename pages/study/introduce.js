import React from 'react'
import Introduce from '/containers/study/introduce'
import Button from '/xz-components/button'

export default class extends React.Component {
  render () {
    return (<div className='introduce'>
      <Introduce />
      <a href={'/study/course'}>
        <Button>进入课程</Button>
      </a>

      <style jsx>{`
        .introduce {

        }
      `}</style>
    </div>)
  }
}
