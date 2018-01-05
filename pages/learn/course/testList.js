import React from 'react'
import {Panel, PanelBody, LoadMore} from 'react-weui'
import classNames from 'classnames'
import Link from 'next/link'
import ToolsUtil from '../../../util/tools'
import AxiosUtil from '../../../util/axios'
import DataUtil from '../../../util/data'
import LoadingIcon from '../../../xz-components/loadingicon'
import Card from '../../../xz-components/card'
import Layout from '../../../components/layout'
import Footer from '../../../containers/learn/footer'

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
  renderFinish (item) {
    return (
      <div className='test-item'>
        <div className='wx-space-left'>
          <div className='icon'><img src='/static/img/icon/prise.png' /></div>
          <div className='wx-space-center' style={{width: '100%'}}>
            <div className='chapter-title'>{item.title}</div>
            <div className='wx-space-left'>
              <div className='score'>{item.answerTotalScore}/{item.score}</div>
              <div className='stamp'>
                {item.answerTotalScore >= item.passScore && <img src='/static/img/learn/test/pass.png' />}
                {item.answerTotalScore < item.passScore && <img src='/static/img/learn/test/fail.png' />}
              </div>
            </div>
          </div>
        </div>
        <div className='chapter-description'>{item.description}</div>
        <style jsx>{`
          .test-item {
            width: 100%;
            padding: 0.5rem 2rem;
            box-sizing: border-box;
          }
          .icon {
            margin-right: 1rem;
          }
          .icon img {
            width: 1.5rem;
          }
          .chapter-description {
            margin-left: 2.5rem;
            font-size: 0.85rem;
          }
          .stamp img {
            margin-left: 1rem;
            width: 3rem;
          }
        `}</style>
      </div>
    )
  }
  renderUnFinish (item) {
    return (
      <div className='test-item'>
        <div className='wx-space-left'>
          <div className='icon'><img src='/static/img/icon/uprise.png' /></div>
          <div className='wx-space-center' style={{width: '100%'}}>
            <div className='chapter-title'>{item.title}</div>
            <div className='status'>未完成</div>
          </div>
        </div>
        <div className='chapter-description'>{item.description}</div>
        <style jsx>{`
          .test-item {
            width: 100%;
            padding: 0.5rem 2rem;
            box-sizing: border-box;
          }
          .icon {
            margin-right: 1rem;
          }
          .icon img {
            width: 1.5rem;
          }
          .chapter-description {
            margin-left: 2.5rem;
            font-size: 0.85rem;
          }
          .status {
            margin-right: 4rem;
          }
        `}</style>
      </div>
    )
  }
  renderList () {
    const {query, testList, done} = this.state
    if (DataUtil.isEmpty(testList) && done) {
      return (
        <Panel>
          <PanelBody>
            <LoadMore showLine>本课程暂无测试</LoadMore>
          </PanelBody>
        </Panel>
      )
    }
    return (
      <div className='test-detail'>
        {testList.map((group, index) => {
          return (
            <div className='chapter-item' key={`chapter_group_${index}`}>
              <div className='title'>{group.title}</div>
              <div className='content'>
                {group.learningTestDetailDTOList.map((item, index) => {
                  return (
                    <Link
                      href={{
                        pathname: '/learn/course/testDetail',
                        query: {courseId: query.courseId, testId: item.id}}}
                    >
                      <a style={{width: '100%'}}>
                        <div className='section-detail' key={`section-detail-${index}`}>
                          {this.isFinish(item.answerTotalScore) && this.renderFinish(item)}
                          {!this.isFinish(item.answerTotalScore) && this.renderUnFinish(item)}
                        </div>
                      </a>
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
  render () {
    const {done} = this.state
    return (
      <Layout>
        <div className='test-page'>
          <div className='title'>测试</div>
          {done && this.renderList()}
          {!done && <LoadingIcon />}
        </div>
        <Footer type='test' />
        <style jsx>{`
          .test-page {
            padding: 2rem 1rem 4rem 1rem;
          }
          .title {
            text-align: center;
            font-weight: bold;
          }
        `}</style>
      </Layout>
    )
  }
}
