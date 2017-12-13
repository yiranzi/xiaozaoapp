import React from 'react'
import StudentAnswer from '/containers/learn/main/homework/studentAnswer'
import LoadingIcon from '/xz-components/loadingicon'
import {
  Panel
} from 'react-weui'
/**
 * 准其他人答案的panel。里面填充了很多学生答案条目
 */
export default class extends React.Component {
  componentDidMount = async () => {
    console.log('componentDidMount seeother')
  }

  render () {
    let {answerList} = this.props
    console.log('see other work render')
    if (answerList) {
      if (answerList.length > 0) {
        let studentAnswerArray = answerList.map((answerData, index) => {
          return (<StudentAnswer key={index} answerData={answerData} />)
        })
        return (<Panel style={{backgroundColor: '#efeff4'}}>
          {studentAnswerArray}
        </Panel>)
      } else {
        return <div>null</div>
      }
    } else {
      return <LoadingIcon />
    }
  }
}

