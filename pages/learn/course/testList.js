import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import ToolsUtil from '../../../util/tools'
import AxiosUtil from '../../../util/axios'
import DataUtil from '../../../util/data'
import LoadingIcon from '../../../xz-components/loadingicon'
import Card from '../../../xz-components/card'
import Layout from '../../../containers/learn/layout'
import FixFooter from '../../../xz-components/fixfooter'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      query: {
        courseId: ''
      },
      testList: [],
      done: false
    }
  }

  componentDidMount = async () => {
    let courseId = ToolsUtil.getQueryString('courseId')
    let testList = await AxiosUtil.get(`/api/learning-test/getByCourseId/${courseId}`)
    this.setState({
      query: {
        courseId: courseId
      },
      testList: testList,
      done: true
    })
  }
  isFinish (answerTotalScore) {
    return !DataUtil.isNull(answerTotalScore)
  }
  renderTestType (type) {
    let nextStyle = {
      'backgroundColor': '#3ea6f7',
      'color': '#fff',
      'fontSize': '0.75rem',
      'padding': '2px 8px',
      'borderRadius': '10px'
    }
    let prevStyle = {
      'backgroundColor': '#646464',
      'color': '#fff',
      'fontSize': '0.75rem',
      'padding': '2px 8px',
      'borderRadius': '10px'
    }
    if (type === 1) {
      return <span className='prev' style={prevStyle}>课前</span>
    } else if (type === 2) {
      return <span className='next' style={nextStyle}>课后</span>
    }
  }
  renderList () {
    const _this = this
    const {query, testList} = this.state
    if (DataUtil.isEmpty(testList)) return <div className='test-detail'>本课程暂无测试</div>
    return (
      <div className='test-detail'>
        {testList.map((item, index) => {
          return (
            <Card key={`test-item-${index}`} className={classNames({'next': item.type === 2})}>
              <Link href={{pathname: '/learn/course/testDetail', query: {courseId: query.courseId, testId: item.testId}}}>
                {_this.isFinish(item.answerTotalScore) ? (
                  <div className='test-item wx-space-center'>
                    <div className='left wx-space-left'>
                      <div className='icon'><img src='/static/img/icon/prise.png' /></div>
                      <div className='chapter-title'><div>{this.renderTestType(item.type)}</div>{item.chapterTitle}</div>
                    </div>
                    <div className='result'>
                      {`${item.answerTotalScore}分/${item.totalScore}分`}
                    </div>
                  </div>
                ) : (
                  <div className='test-item wx-space-center'>
                    <div className='left wx-space-left'>
                      <div className='icon'><img src='/static/img/icon/uprise.png' /></div>
                      <div className='chapter-title'><div>{this.renderTestType(item.type)}</div>{item.chapterTitle}</div>
                    </div>
                    <div className='result'>未完成</div>
                  </div>
                )}
              </Link>
            </Card>
          )
        })}
        <style jsx>{`
          .icon img {
            width: 1.5rem;
          }
          .left {
            flex: 3;
            white-space: nowrap;
            overflow: hidden;
            min-width: 0;
          }
          .result {
            flex: 1;
            text-align: right;
          }
        `}</style>
        <style global jsx>{`
          .card.next {
            margin-bottom: 2rem;
          }
        `}</style>
      </div>
    )
  }
  render () {
    const {done} = this.state
    return (
      <Layout>
        <div className='test-page'>
          {done && this.renderList()}
          {!done && <LoadingIcon />}
        </div>
        <FixFooter style={{textAlign: 'center'}} onClick={() => { history.go(-1) }}>继续学习</FixFooter>
        <style jsx>{`
          .test-page {
            font-size: 1rem;
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .test-page .test-detail .test-item .left .chapter-title {
            margin-left: 0.5rem;
          }
          .test-page .test-detail .test-item .icon {
            width: 2rem;
          }
          .test-page .test-detail .test-item .icon img {
            width: 100%;
          }
        `}</style>
      </Layout>
    )
  }
}
