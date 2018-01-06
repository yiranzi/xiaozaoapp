import React from 'react'
import Link from 'next/link'
import ToolsUtil from '../../../util/tools'
import AxiosUtil from '../../../util/axios'
import DataUtil from '../../../util/data'
import LoadingIcon from '../../../xz-components/loadingicon'
import Card from '../../../xz-components/card'
import Layout from '../../../containers/learn/layout'
import Footer from '../../../containers/learn/footer'

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
                          <div className='icon'><img src='/static/img/learn/test/prise.png' /></div>
                          <div className='result'>
                            {`${item.answerTotalScore}分/${item.totalScore}分`}
                          </div>
                        </div>
                      ) : (
                        <div className='test-item wx-space-center'>
                          <div className='icon'><img src='/static/img/learn/test/prise.png' /></div>
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
        <Footer type='test' courseId={query.courseId} />
        <style jsx>{`
          .test-page .test-detail .test-item .icon img {
            width: 2rem;
          }
        `}</style>
      </Layout>
    )
  }
}
