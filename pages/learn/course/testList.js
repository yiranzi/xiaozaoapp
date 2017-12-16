import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
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
      }
    }
  }

  componentDidMount = async () => {
    let courseId = ToolsUtil.getQueryString('courseId')
    let testList = await AxiosUtil.get(`/api/learning-test/getByCourseId/${courseId}`)

    this.setState({
      query: {
        courseId: courseId
      },
      testList: testList
    })
  }
  isFinish (answerDTOList) {
    return answerDTOList.length > 0
  }
  render () {
    const _this = this
    const {query, testList} = this.state
    return (
      <Layout>
        <div className='test-page'>
          {DataUtil.isEmpty(testList) ? <LoadingIcon /> : (
            <div className='test-detail'>
              {testList.map((item, index) => {
                return (
                  <Card key={`test-item-${index}`}>
                    <Link href={{pathname: '/learn/course/testDetail', query: {courseId: query.courseId, testId: item.testId}}}>
                      {_this.isFinish(item.answerDTOList) ? (
                        <div className='test-item wx-space-center'>
                          <div className='left wx-space-left'>
                            <div className='icon'><img src='/static/img/icon/prise.png' /></div>
                            <div className='chapter-title'>{item.chapterTitle}</div>
                          </div>
                          <div className='result'>
                            {`${item.answerTotalScore}分/${item.totalScore}分`}
                          </div>
                        </div>
                      ) : (
                        <div className='test-item wx-space-center'>
                          <div className='left wx-space-left'>
                            <div className='icon'><img src='/static/img/icon/uprise.png' /></div>
                            <div className='chapter-title'>{item.chapterTitle}</div>
                          </div>
                          <div className='result'>未完成</div>
                        </div>
                      )}
                    </Link>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
        <FixFooter style={{textAlign: 'center'}} onClick={() => { Router.push(`/learn/course/detail${location.search}`) }}>继续学习</FixFooter>
        <style jsx>{`
          .test-page {
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
