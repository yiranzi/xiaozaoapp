import React from 'react'
import AxiosUtil from '../../../util/axios'
import ToolsUtil from '../../../util/tools'
import JobLayout from '../../../containers/job/layout'
import {
  Button,
  Panel,
  PanelBody,
  LoadMore,
  InfiniteLoader,
  Tab,
  TabBody,
  NavBar,
  NavBarItem,
  TextArea
} from 'react-weui'
import QuestionItem from '../../../containers/learn/course/questionItem'
import {Alert} from '../../../xz-components/alert'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      body: {
        myPageQuestionList: {
          data: [],
          totalSize: 0,
          ended: false
        },
        pageQuestionList: {
          data: [],
          totalSize: 0,
          ended: false
        }
      },
      params: {
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
    this.state.form.courseId = courseId
    this.state.form.sectionId = sectionId
    this.state.form.pageNumber = pageNumber
    this.state.params.sectionId = sectionId
    this.state.params.pageNumber = pageNumber
    this.setState({})
  }

  loadMyPageQuestionList = async () => {
    try {
      const {sectionId, pageNumber} = this.state.params
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
      const {sectionId, pageNumber, pn} = this.state.params
      if (sectionId && !this.state.body.pageQuestionList.ended) {
        const list = await AxiosUtil.get(`/api/learning-question/pageQuestionList/${sectionId}/${pageNumber}?pn=${pn}`)
        this.state.params.pn = this.state.params.pn + 1
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

  changeTabbar (tab) {
    if (tab === this.state.tab) {
      return
    }
    this.setState({tab: tab})
    if (tab === 0) {
      this.loadMyPageQuestionList()
    } else if (tab === 1) {
      this.loadPageQuestionList(true)
    }
  }

  renderTabbar () {
    return (
      <Tab>
        <NavBar>
          <NavBarItem
            active={this.state.tab === 0}
            onClick={e => this.changeTabbar(0)}
          >
            我的提问
          </NavBarItem>
          <NavBarItem
            active={this.state.tab === 1}
            onClick={e => this.changeTabbar(1)}
          >
            全部提问
          </NavBarItem>
        </NavBar>
        <TabBody>
          <Panel>
            {this.renderList()}
          </Panel>
        </TabBody>
      </Tab>
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
            <QuestionItem question={item} />
            <style global jsx>{`
              .question-item {
                border-bottom: 1px solid #E5E5E5;
              }
            `}</style>
          </div>
        )
      })
      return (
        <PanelBody>
          {listElement}
          {this.state.body.pageQuestionList.ended === false}
          {(this.state.tab === 0 && this.state.body.myPageQuestionList.totalSize === 0) && (
            <LoadMore showLine>No Data</LoadMore>)}
        </PanelBody>
      )
    }
  }

  renderPutQuestion () {
    return (<div>
      <TextArea onChange={(e) => this.handleChange(e)} defaultValue={this.state.form.question} placeholder='输入自己的问题，我们的导师看到后会来回答你哦' />
      <Button size='small' onClick={(e) => this.putQuestion()} className='wx-pull-right'>提问</Button>
      <p className='tips'>每个课程页最多可提5个问题</p>
    </div>)
  }

  render () {
    return (
      <JobLayout>
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
          .weui-popup {
            position: fixed;
            left: 0;
            bottom: 0;
            -webkit-transform: translate(0, 100%);
            -ms-transform: translate(0, 100%);
            transform: translate(0, 100%);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            z-index: 5000;
            width: 100%;
            background-color: #efeff4;
            -webkit-transition: -webkit-transform 0.3s;
            transition: -webkit-transform 0.3s;
            transition: transform 0.3s;
            transition: transform 0.3s, -webkit-transform 0.3s;
          }
          .weui-popup_toggle {
            -webkit-transform: translate(0, 0);
            -ms-transform: translate(0, 0);
            transform: translate(0, 0);
          }
        `}</style>
      </JobLayout>
    )
  }
}
