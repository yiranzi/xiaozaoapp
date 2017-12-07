import React from 'react'
import StudentAnswer from '../../../containers/study/homework/studentAnswer'
import {
  Panel
} from 'react-weui'
/**
 * 渲染团购的卡片
 */
export default class extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount = async () => {
    console.log('componentDidMount seeother')
  }



  render () {
    let {answerList} = this.props
    console.log('see other work render')
    if (answerList && answerList.length > 0) {
      let studentAnswerArray = answerList.map((answerData, index) => {
        return (<StudentAnswer key={index} answerData={answerData} />)
      })
      return (<Panel style={{backgroundColor: '#efeff4'}}>
        {studentAnswerArray}
        <style jsx>{`
        .weui-panel{

        }
        `}</style>
      </Panel>)
    } else {
      return <div>Loading...</div>
    }
  }
}

