import React from 'react'
import ThemeConfig from '../../../config/theme'
import ToolsUtil from '../../../util/tools'
import AxiosUtil from '../../../util/axios'
import DataUtil from '../../../util/data'
import DateUtil from '../../../util/date'
import Layout from '../../../components/layout'
import Topic from '../../../containers/clock/topic'
import Analysis from '../../../containers/clock/analysis'
import Loading from '../../../xz-components/loading'
import Button from '../../../xz-components/button'
import {Confirm} from '../../../xz-components/confirm'
import {Alert} from '../../../xz-components/alert'
// import FixFooter from '../../../xz-components/fixfooter'
import { Toast } from 'react-weui'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      query: {
        courseId: '',
        testId: ''
      },
      isRecording: false,
      isPlaying: false,
      testDetail: {},
      answerList: {},
      isSubmit: false,
      showToast: false,
      showLoading: false
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
  updateRecording (res) {
    this.setState({isRecording: res})
  }
  updatePlaying (res) {
    this.setState({isPlaying: res})
  }
  formatAnswer (answerDTOList) {
    let json = {}
    answerDTOList.map((item, index) => {
      json[item.id] = {answer: item.answer, evaluate: item.evaluate}
    })
    return json
  }
  onChange (id, value) {
    let {answerList} = this.state
    answerList[id] = value
    this.setState({answerList: answerList})
  }
  uploadImg = async (id) => {
    const {query, answerList} = this.state
    let answer = answerList[id]
    if (answer) {
      this.showLoading()
      let uuid = DataUtil.uuid(11)
      let formdata = DataUtil.imgFormat(answer, uuid, 'jpg')
      await AxiosUtil.post(`/api/learning-test/testFileComplete/${query.courseId}/${query.testId}`, formdata)
      this.showToast()
      answerList[id] = uuid + '.jpg'
      this.setState({
        answerList: answerList
      })
    } else {
      Alert({content: '还没有上传图片', ok: () => { this.setState({isSubmit: false}) }})
      return false
    }
  }
  uploadRecord = async (id) => {
    const _this = this
    const {query, answerList} = this.state
    let answer = answerList[id]
    try {
      if (answer) {
        this.showLoading()
        // eslint-disable-next-line
        wx.uploadVoice({
          localId: answer,
          success: function (res) {
            let serverId = res.serverId
            AxiosUtil.get(`/api/learning-test/testAudioComplete/${query.courseId}/${query.testId}?serverId=${serverId}`).then((res) => {
              _this.showToast()
              answerList[id] = serverId
              _this.setState({
                answerList: answerList
              })
            })
          }
        })
      } else {
        Alert({content: '还没有录音', ok: () => { this.setState({isSubmit: false}) }})
        return false
      }
    } catch (err) {
      alert(err)
    }
  }
  verifyAnwerList (testDetail, answerList) {
    let res = ''
    testDetail.topicDTOList.forEach((item, index) => {
      if (ToolsUtil.isUploader(item.type)) {
        if (answerList[item.id].indexOf('base64') >= 0) {
          res = '图片没有上传'
          return false
        }
      }
    })
    return res
  }
  submitConfirm () {
    const _this = this
    let {testDetail, answerList} = this.state
    if (Object.keys(answerList).length === testDetail.topicDTOList.length) {
      let res = this.verifyAnwerList(testDetail, answerList)
      if (res) {
        Alert({content: res})
      } else {
        Confirm({
          content: '确认提交？',
          ok: () => _this.submit(),
          cancelText: '再检查一下'
        })
      }
    } else {
      Alert({content: '您尚未完成测试题目，请完成所有题目后提交', ok: () => { this.setState({isSubmit: false}) }})
    }
  }
  submit = async () => {
    this.setState({isSubmit: true})
    let {answerList} = this.state
    let answerListArray = []
    for (let id in answerList) {
      answerListArray.push({'id': id, 'answer': answerList[id]})
    }
    const data = JSON.stringify({
      answerDTOList: answerListArray,
      testId: this.state.query.testId,
      time: ''
    })

    await AxiosUtil.post('/api/learning-test/complete', data)
    this.setState({isSubmit: false})
    Alert({
      content: (
        <div className='wx-text-center'>
          <div>恭喜你完成<strong>{this.state.testDetail.chapterTitle}</strong>章节测试</div>
        </div>
      ),
      okText: '查看参考答案',
      ok: () => { location.reload() }
    })
  }
  showLoading () {
    this.setState({showLoading: true})
  }
  showToast () {
    this.setState({showToast: true, showLoading: false})

    this.state.loadingTimer = setTimeout(() => {
      this.setState({showToast: false})
    }, 1500)
  }
  render () {
    const _this = this
    const {testDetail} = this.state

    if (DataUtil.isEmpty(testDetail)) return <Layout><Loading /></Layout>
    const {answerDTOList} = testDetail
    let showAnalysis = answerDTOList.length > 0

    let answerList = {}

    if (showAnalysis) {
      answerList = this.formatAnswer(answerDTOList)
    }

    return (
      <Layout type='test'>
        {this.state.isSubmit && <Loading />}
        <Toast icon='success-no-circle' show={this.state.showToast}>Done</Toast>
        <Toast icon='loading' show={this.state.showLoading}>Loading...</Toast>
        <div className='test-detail'>
          <div className='header wx-text-center'>
            <div className='name'>{testDetail.title}</div>
            <div className='end-date'>
              为保证学习效果，请在<span style={{color: ThemeConfig.color.red, fontSize: '1rem', marginLeft: '0.5rem'}}>{DateUtil.format(testDetail.endTime, 'yyyy-MM-dd hh:mm')}</span>前完成本测试
            </div>
          </div>
          <div className='content'>
            {testDetail.topicDTOList.map((item, index) => {
              return (
                <div key={`topic_${index}`} className='wrap'>
                  {showAnalysis ? <Analysis topic={item} myAnswer={answerList[item.id]} /> : (
                    <div>
                      <Topic
                        isPlaying={this.state.isPlaying}
                        isRecording={this.state.isRecording}
                        topic={item}
                        updateRecording={(res) => this.updateRecording(res)}
                        onChange={(id, value) => this.onChange(id, value)}
                        disabled={showAnalysis}
                      />
                      {ToolsUtil.isUploader(item.type) && (
                        <div className='upload'>
                          <div className='wx-text-right'><Button size='small' onClick={() => { _this.uploadImg(item.id) }}>上传图片</Button></div>
                        </div>
                      )}
                      {ToolsUtil.isRecord(item.type) && (
                        <div className='upload'>
                          <div className='wx-text-right'><Button size='small' onClick={() => { _this.uploadRecord(item.id) }}>上传音频</Button></div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          {!showAnalysis && (
            <div className='submit wx-text-center'>
              <Button
                style={{width: 'auto', margin: 'auto', backgroundColor: ThemeConfig.color.red}}
                onClick={() => this.submitConfirm()}
              >提交测试</Button>
            </div>
          )}
        </div>
        {/* <FixFooter style={{textAlign: 'center'}} onClick={() => { history.go(-1) }}>继续学习</FixFooter> */}
        <style jsx>{`
          .test-detail {
            padding-bottom: 3rem;
          }
          .header {
            background: url('/static/img/learn/cover_long.jpeg');
            padding-top: 1rem;
            padding-bottom: 1rem;
            color: #fff;
          }
          .header .name {
            font-weight: bold;
          }
          .header .end-date {
            font-size: 0.85rem;
          }
          .content {
            margin-top: 0.5rem;
            background-color: #fff;
          }
          .submit {
            margin: 2rem 0;
          }
          .upload {
            padding-top: 1rem;
            padding-right: 1rem;
          }
        `}</style>
        <style global jsx>{`
          .learn-page {
            padding-top: 0 !important;
          }
          .analysis img {
            width: 100%;
          }
        `}</style>
      </Layout>
    )
  }
}
