import React from 'react'
import ThemeConfig from '../../../config/theme'
import ToolsUtil from '../../../util/tools'
import AxiosUtil from '../../../util/axios'
import DataUtil from '../../../util/data'
import DateUtil from '../../../util/date'
import Layout from '../../../containers/learn/layout'
import Topic from '../../../containers/clock/topic'
import Loading from '../../../xz-components/loading'
import Button from '../../../xz-components/button'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      query: {
        courseId: '',
        testId: '',
        testDetail: {}
      },
      answerList: {}
    }
  }
  componentDidMount = async () => {
    let courseId = ToolsUtil.getQueryString('courseId')
    let testId = ToolsUtil.getQueryString('testId')
    let testDetail = await AxiosUtil.get(`/api/learning-test/getByTestId/${testId}`)

    this.setState({
      query: {
        courseId: courseId,
        testId: testId
      },
      testDetail: testDetail
    })
  }
  onChange (id, value) {
    let {answerList} = this.state
    answerList[id] = value
    this.setState({answerList: answerList})
  }
  render () {
    const {testDetail} = this.state
    if (DataUtil.isEmpty(testDetail)) return <Layout><Loading /></Layout>
    return (
      <Layout type='test'>
        <div className='test-detail'>
          <div className='header wx-text-center'>
            <div className='name'>{testDetail.chapterTitle}--</div>
            <div className='end-date'>
              本章测试截止时间为<span style={{color: ThemeConfig.color.red}}>{DateUtil.format(testDetail.endTime, 'yyyy-MM-dd hh:mm')}</span>
            </div>
            <div className='tips'>超过截止时间完成的测试将不会被助教点评</div>
          </div>
          <div className='content'>
            {testDetail.topicDTOList.map((item, index) => {
              return <Topic key={`topic_${index}`} topic={item} onChange={(id, value) => this.onChange(id, value)} />
            })}
          </div>
          <div className='submit wx-text-center'>
            <Button style={{width: 'auto', margin: 'auto', backgroundColor: ThemeConfig.color.red}}>提交测试</Button>
          </div>
        </div>
        <style jsx>{`
          .content {
            margin-top: 0.5rem;
            background-color: #fff;
          }
          .submit {
            margin: 2rem 0;
          }
        `}</style>
      </Layout>
    )
  }
}
