import React from 'react'
import PropTypes from 'prop-types'
import AxiosUtil from '../../../util/axios'
import ThemeConfig from '../../../config/theme'
import {
  Button,
  ButtonArea,
  Cell,
  CellHeader,
  CellBody,
  MediaBox,
  MediaBoxTitle,
  MediaBoxDescription,
  MediaBoxInfo
} from 'react-weui'
import DateUtil from '/util/date'

export default class extends React.Component {

  static propTypes = {
    question: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      showEvaluate: false,
      evaluate: null,
      error: null
    }
  }

  showEvaluateInfo = async () => {
    const { evaluate } = this.state
    if (!evaluate) {
      try {
        let evaluate = await AxiosUtil.get(`/api/learning-question/questionEvaluate/${this.props.question.id}`)
        this.setState({
          evaluate: evaluate
        })
      } catch (e) {
        this.setState({
          error: e.message
        })
      }
    }
    this.setState({showEvaluate: !this.state.showEvaluate})
  }

  addFeedback = async (feedback) => {
    let { evaluate } = this.state
    if (evaluate) {
      try {
        await AxiosUtil.get(`/api/learning-question/evaluateFeedback/${evaluate.id}/${feedback}`)
        if (feedback) {
          evaluate.nice += 1
        } else {
          evaluate.bad += 1
        }
        this.setState({
          evaluate: evaluate
        })
      } catch (e) {
        this.setState({
          error: e.message
        })
      }
    }
  }

  renderTitle (headimgurl, nickname, createTime) {
    return (<MediaBoxTitle>
      <Cell style={{padding: '0'}}>
        <CellHeader>
          <img src={headimgurl} style={{display: 'block', width: '20px', marginRight: '5px'}} />
        </CellHeader>
        <CellBody>
          <span>{nickname} {createTime && DateUtil.format(createTime, 'yyyy-MM-dd')}</span>
        </CellBody>
      </Cell>
    </MediaBoxTitle>)
  }

  renderDescription (question) {
    return (<MediaBoxDescription>
      { question }
    </MediaBoxDescription>)
  }

  renderFeedbackBar () {
    const { nice, bad } = this.state.evaluate
    return (<ButtonArea direction='horizontal'>
      <Button size='small' type='default' className='' onClick={e => this.addFeedback(true)}>有帮助{nice > 0 && '+'}{nice}</Button>
      <Button size='small' type='default' className='' onClick={e => this.addFeedback(false)}>无帮助{bad > 0 && '-'}{bad}</Button>
    </ButtonArea>)
  }

  renderEvaluateInfo () {
    const { evaluate } = this.state
    return (<MediaBoxInfo>
      <div className='wx-text-right' onClick={this.showEvaluateInfo} style={{margin: '5px 0'}}>导师已回答</div>
      {evaluate && this.state.showEvaluate &&
        (<div>
          <MediaBox className='evaluate feedback-item'>
            {this.renderTitle(evaluate.headimgurl, evaluate.nickname, evaluate.createTime)}
            {this.renderDescription(evaluate.evaluate)}
          </MediaBox>
          {this.renderFeedbackBar()}
        </div>)
      }
      <style global jsx>{`
        .feedback-item {
          background-color: ${ThemeConfig.color.gray};
        }
      `}</style>
    </MediaBoxInfo>)
  }

  render () {
    let { question } = this.props
    if (question) {
      return (<MediaBox style={{textAlign: 'left', paddingTop: '30px'}}>
        {this.renderTitle(question.headimgurl, question.nickname, question.createTime)}
        {this.renderDescription(question.question)}
        {question.evaluate && this.renderEvaluateInfo()}
        <style global jsx>{`
          .weui-media-box:before {
            border: 0 !important;
          }
          .weui-media-box__info {
            margin-top: 0 !important;
          }
        `}</style>
      </MediaBox>)
    }
  }
}
