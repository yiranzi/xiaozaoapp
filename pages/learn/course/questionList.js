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
  InfiniteLoader
} from 'react-weui'
import FixFooter from '../../../xz-components/fixfooter'
import MyTextArea from '../../../xz-components/textarea'

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
        pn: 0
      },
      form: {
        courseId: null,
        sectionId: null,
        pageNumber: null,
        title: null,
        question: null
      },
      tab: 1,
      textareaKey: 1,
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
    this.state.body.title = decodeURI(decodeURI(title))
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
          this.state.form.question = ''
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
      const {sectionId, pageNumber} = this.state.query
      if (sectionId && (!this.state.body.pageQuestionList.ended || !isConcat)) {
        this.state.query.pn = (isConcat ? this.state.query.pn + 1 : 1)
        const list = await AxiosUtil.get(`/api/learning-question/pageQuestionList/${sectionId}/${pageNumber}?pn=${this.state.query.pn}`)
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
      this.state.textareaKey += 1
      this.loadMyPageQuestionList()
      this.loadPageQuestionList(false)
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

  handleChange (value) {
    this.state.form.question = value
  }

  changeTabbar () {
    this.state.tab = 1 - this.state.tab
    this.setState({tab: this.state.tab})
    if (this.state.tab === 0 && this.state.body.myPageQuestionList.totalSize === 0) {
      this.loadMyPageQuestionList()
    }
  }

  keepOnCourse () {
    history.go(-1)
  }

  renderTabbar () {
    return (
      <div>
        <CoursePageTitle title={this.state.body.title} pageNumber={this.state.query.pageNumber} />
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
                font-size: 12px;
                width: 16px;
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
          {((this.state.tab === 0 && this.state.body.myPageQuestionList.totalSize === 0) ||
            (this.state.tab === 1 && this.state.body.pageQuestionList.totalSize === 0)) && (
              <LoadMore showLine>暂时还没有提问哦</LoadMore>)}
        </PanelBody>
      )
    } else {
      return (<LoadMore loading>loading</LoadMore>)
    }
  }

  renderPutQuestion () {
    return (
      <FixFooter style={{paddingTop: '0'}}>
        <div className='add-question-block'>
          <MyTextArea maxLength={140} className='question-textarea' rows={2} onChange={(value) => this.handleChange(value)} key={'question-' + this.state.textareaKey} placeholder='输入自己的问题，我们的导师看到后会来回答你哦' />
          <Button style={{marginTop: '0.5rem'}} size='small' type='warn' onClick={(e) => this.putQuestion()} className='wx-pull-right'>提问</Button>
          <p className='tips'><small>每个课程页最多可提5个问题</small></p>
          <style global jsx>{`
            .question-textarea {
              height: auto !important;
            }
            .tips {
              color: #999999;
              margin-top: 0.5rem;
            }
          `}</style>
        </div>
      </FixFooter>
    )
  }

  render () {
    return (
      <Layout className='main-style'>
        {this.state.tab === 0 &&
          <div className='wx-navbar-margin'>
            {this.renderTabbar()}
          </div>
        }
        {this.state.tab === 1 &&
          <InfiniteLoader height='80vh'
            onLoadMore={(resolve, finish) => this.onLoadMore(resolve, finish)}
          >
            <div className='data-list'>
              {this.renderTabbar()}
            </div>
          </InfiniteLoader>
        }
        {this.renderPutQuestion()}
        <style global jsx>{`
          .wx-navbar-margin {
            padding-bottom: 120px;
          }
          .react-weui-infiniteloader {
            overflow: scroll;
            -webkit-overflow-scrolling:touch;
          }
          body {
            background-color: ${ThemeConfig.color.gray};
          }
          .main-style {
            padding: 1rem 0;
            box-sizing: border-box;
          }
        `}</style>
      </Layout>
    )
  }
}
