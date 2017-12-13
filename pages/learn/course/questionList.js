import React from 'react'
import AxiosUtil from '../../../util/axios'
import ToolsUtil from '../../../util/tools'
import ThemeConfig from '../../../config/theme'
import Layout from '../../../components/layout'
import {Alert} from '../../../xz-components/alert'
import QuestionItem from '../../../containers/learn/course/questionItem'
import CoursePageTitle from '../../../containers/learn/course/coursePageTitle'
import {
  Button,
  ButtonArea,
  PanelBody,
  LoadMore,
  InfiniteLoader,
  TextArea
} from 'react-weui'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      body: {
        myPageQuestionList: {
          data: null,
          totalSize: 0,
          ended: false
        },
        pageQuestionList: {
          data: null,
          totalSize: 0,
          ended: false
        },
        title: null,
        totalSize: null
      },
      query: {
        sectionId: null,
        pageNumber: null,
        pn: 1
      },
      form: {
        courseId: null,
        sectionId: null,
        pageNumber: null,
        title: null,
        question: null
      },
      tab: 1,
      error: null
    }
  }

  componentDidMount = async () => {
    this.initParams()
    this.loadPageQuestionList(false)
  }

  initParams () {
    const courseId = ToolsUtil.getQueryString('courseId')
    const sectionId = ToolsUtil.getQueryString('sectionId')
    const pageNumber = ToolsUtil.getQueryString('pageNumber')
    const title = ToolsUtil.getQueryString('title')
    const totalSize = ToolsUtil.getQueryString('totalSize')
    this.state.form.courseId = courseId
    this.state.form.sectionId = sectionId
    this.state.form.pageNumber = pageNumber
    this.state.query.sectionId = sectionId
    this.state.query.pageNumber = pageNumber
    this.state.body.title = title
    this.state.body.totalSize = totalSize
    this.setState({})
  }

  loadMyPageQuestionList = async () => {
    try {
      const {sectionId, pageNumber} = this.state.query
      if (sectionId && !this.state.body.myPageQuestionList.ended) {
        const list = await AxiosUtil.get(`/api/learning-question/myPageQuestionList/${sectionId}/${pageNumber}`)
        if (list) {
          let { myPageQuestionList } = this.state.body
          myPageQuestionList.totalSize = list.length
          myPageQuestionList.data = list
          myPageQuestionList.ended = list.length === 5
          this.state.body.myPageQuestionList = myPageQuestionList
          this.setState({})
        }
      }
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
  };

  loadPageQuestionList = async (isConcat) => {
    try {
      const {sectionId, pageNumber, pn} = this.state.query
      if (sectionId && !this.state.body.pageQuestionList.ended) {
        const list = await AxiosUtil.get(`/api/learning-question/pageQuestionList/${sectionId}/${pageNumber}?pn=${pn}`)
        this.state.query.pn = this.state.query.pn + 1
        if (list.data) {
          let { pageQuestionList } = this.state.body
          pageQuestionList.totalSize = list.totalSize
          pageQuestionList.data = isConcat ? pageQuestionList.data.concat(list.data) : list.data
          pageQuestionList.ended = list.data.length < 10 && list.data.length > 0
          this.state.body.pageQuestionList = pageQuestionList
          this.setState({body: this.state.body})
        } else {
          let { pageQuestionList } = this.state.body
          pageQuestionList.ended = true
          this.state.body.pageQuestionList = pageQuestionList
          this.setState({})
        }
      }
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
  };

  onLoadMore (resolve, finish) {
    setTimeout(() => {
      if (this.state.body.pageQuestionList.data.length >= this.state.body.pageQuestionList.totalSize) {
        finish()
      } else {
        this.loadPageQuestionList(true)
        this.setState({}, () => resolve())
      }
    }, 1000)
  }

  putQuestion = async () => {
    try {
      if (ToolsUtil.strIsEmpty(this.state.form.question)) {
        Alert({
          content: '请输入提问内容',
          okText: '确定'
        })
        return
      }
      await AxiosUtil.post('/api/learning-question/newPageQuestion', this.state.form)
      this.state.form.question = ''
      this.loadMyPageQuestionList()
      Alert({
        content: '提交成功',
        okText: '确定'
      })
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
  }

  handleChange (e) {
    this.state.form.question = e.target.value
  }

  changeTabbar () {
    this.state.tab = 1 - this.state.tab
    this.setState({tab: this.state.tab})
    if (this.state.tab === 0) {
      this.loadMyPageQuestionList()
    } else if (this.state.tab === 1) {
      this.loadPageQuestionList(true)
    }
  }

  keepOnCourse () {
    location.href = '/learn/course/detail?courseId=' + this.state.form.courseId + '&sectionId=' +
      this.state.query.sectionId + '&pageNumber=' + this.state.query.pageNumber
  }

  renderTabbar () {
    return (
      <div>
        <CoursePageTitle title={this.state.body.title} pageNumber={this.state.query.pageNumber} totalSize={this.state.body.totalSize} />
        <ButtonArea direction='horizontal'>
          <Button size='small' type='default' className='' onClick={e => this.changeTabbar()}>
            {this.state.tab === 1 ? '我的提问' : '全部提问'}
          </Button>
          <Button size='small' type='default' className='' onClick={e => this.keepOnCourse()}>继续学习</Button>
        </ButtonArea>
        {this.renderList()}
        <style global jsx>{`
          .weui-btn-area_inline {
            margin-top: 0.3em !important;
          }
        `}</style>
      </div>
    )
  }

  renderList () {
    const list = this.state.tab === 0 ? this.state.body.myPageQuestionList : this.state.body.pageQuestionList
    if (list.data) {
      const listElement = list.data.map((item, index) => {
        return (
          <div
            key={index}
            className='question-item'>
            <span className='item-no'>{index + 1}</span>
            <QuestionItem question={item} />
            <style global jsx>{`
              .question-item {
                background-color: #fff;
                border: 1px solid ${ThemeConfig.color.border};
                margin-bottom: 15px;
                position: relative;
              }
              .item-no {
                position: absolute;
                left: 15px;
                top: -1px;
                background-color: #3ea6f7;
                color: #fff;
                font-style: italic;
                width: 20px;
                text-align: center;
                padding-right: 2px;
              }
            `}</style>
          </div>
        )
      })
      return (
        <PanelBody style={{padding: '15px'}}>
          {listElement}
          {this.state.body.pageQuestionList.ended === false}
          {(this.state.tab === 0 && this.state.body.myPageQuestionList.totalSize === 0) && (
            <LoadMore showLine>No Data</LoadMore>)}
        </PanelBody>
      )
    } else {
      return (<LoadMore loading>loading</LoadMore>)
    }
  }

  renderPutQuestion () {
    return (<div className='add-question-block'>
      <TextArea className='question-textarea' onChange={(e) => this.handleChange(e)} defaultValue={this.state.form.question} placeholder='输入自己的问题，我们的导师看到后会来回答你哦' />
      <Button size='small' type='warn' onClick={(e) => this.putQuestion()} className='wx-pull-right'>提问</Button>
      <p className='tips'>每个课程页最多可提5个问题</p>
      <style global jsx>{`
        .add-question-block {
          padding: 0 15px;
        }
        .add-question-block .question-textarea {
          border: 1px solid ${ThemeConfig.color.border};
          padding: 5px;
        }
      `}</style>
    </div>)
  }

  render () {
    return (
      <Layout className='main-style'>
        {this.state.tab === 0 &&
          <div>
            {this.renderTabbar()}
            {this.renderPutQuestion()}
          </div>
        }
        {this.state.tab === 1 &&
          <InfiniteLoader className='wx-navbar-margin'
            onLoadMore={(resolve, finish) => this.onLoadMore(resolve, finish)}
          >
            <div className='data-list'>
              {this.renderTabbar()}
            </div>
          </InfiniteLoader>
        }
        <style global jsx>{`
          .wx-navbar-margin {
          }
          .data-list {
          }
          .react-weui-infiniteloader {
            overflow: scroll;
            -webkit-overflow-scrolling:touch;
          }
          .main-style {
            background-color: ${ThemeConfig.color.gray};
            height: 100vh;
          }
        `}</style>
      </Layout>
    )
  }
}
