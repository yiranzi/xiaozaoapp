import React from 'react';
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';
import Theme from '../../config/theme';
import classnames from 'classnames';
import { Toptips } from 'react-weui';
import Action from '../../src/action/writtentestclocksecond';
import Dialog from '../../src/page/writtentestclocksecond/dialog';

export default class extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showMore: false,
      isAdvanced: 0,
      showTips: false,
      tipsMsg: '',
      showPage: false,
      showDialog: false,
      dialogContent: 'dfasdfasdf'
    };
  }

  componentDidMount = async () => {
    try {
      const info = await Action.getEvaluation();
      const { totalScore, writtenTestTopicDTOList } = info;
      const score = Math.round(totalScore / writtenTestTopicDTOList.length * 100);
      this.setState({
        info,
        showPage: true,
        isAdvanced: score ? score > 65 ? 2 : 1 : 0
      });
    } catch (error) {
      this.setState({
        error: true,
        showPage: true,
        tipsMsg: error.message,
        showTips: true
      });
    }
  };

  showMoreClick = () => {
    this.setState({
      showMore: !this.state.showMore
    });
  };

  renderGlobalCss = () => {
    return (
      <style global jsx>{`
          .written-test-clock {
            padding: 0!important;
          }
        `}</style>
    );
  };

  chooseClass = (isAdvanced) => {
    this.setState({
      showDialog: true,
      dialogContent: isAdvanced ? '确认选择提升进阶班' : '确认选择提升基础班'
    });
  };

  doRequest = async (isAdvanced) => {
    try {
      await Action.selectGroups({ group: isAdvanced ? 'H' : 'N' });
      location.href = '/writtentestclock/choose-class';
    } catch (error) {
      clearTimeout(this.timeout);
      this.setState({
        tipsMsg: error.message,
        showTips: true
      });
      this.timeout = setTimeout(() => this.setState({ showTips: false }), 2000);
    }
  }

  dialogConfig = {
    title: '',
    buttons: [
      {
        type: 'default',
        label: '取消',
        onClick: () => {
          this.setState({ showDialog: false });
        }
      }, {
        type: 'primary',
        label: '确定',
        onClick: () => {
          this.doRequest();
          this.setState({ showDialog: false });
        }
      }
    ]
  }

  render () {
    const { showMore, isAdvanced, showTips, tipsMsg, showPage, showDialog, dialogContent } = this.state;
    const { title, buttons } = this.dialogConfig;

    if (!showPage) return <div />;
    return (
      <WrittenTestClock>
        <img className='bg-img' src='/static/writtentestclock/intro.jpeg' />
        <div className='btn-form'>
          {showMore &&
            <div className='choose-class-form'>
              <div className='choose-class-form-inner'>
                <div className={classnames('choose-class', { 'recommend-left': isAdvanced === 1 })}
                  onClick={() => this.chooseClass(false)}>全能提升基础班
                </div>
                <div className={classnames('choose-class', { 'recommend-right': isAdvanced === 2 })}
                  onClick={() => this.chooseClass(true)}>全能提升进阶班
                </div>
              </div>
            </div>
          }
          <div className='btn-img' onClick={this.showMoreClick}>开启我的笔试进阶修炼</div>
        </div>
        <Toptips type='warn' show={showTips}> {tipsMsg} </Toptips>
        <Dialog type='ios' title={title} buttons={buttons} show={showDialog} content={dialogContent} />
        <style jsx>{`
          .bg-img {
            width: 100%;
          }
          .btn-form {
            bottom: 0;
            width: 100%;
            padding-bottom: 10px;
            position: fixed;
          }
          .btn-img {
            color: #000;
            display: block;
            background-image: url(/static/writtentestclock/round-btn.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            text-align: center;
            height: 60px;
            width: 220px;
            margin: 0 auto;
            padding-right: 10px;
            line-height: 46px;
            margin-top: 20px;
          }
          .choose-class-form {
            display: flex;
            margin: 0 auto;
            color: #000;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .choose-class-form-inner {
            display: flex;
            flex-direction: row;
            background: ${Theme.color.writtentestclockmain};
            height: 40px;
            border-radius: 20px;
            width: 340px;
            margin: 0 auto;
            justify-content: center;
            align-items: center;
            position: relative;
          }
          .choose-class {
            padding: 5px 15px;
            height: 10px;
            line-height: 10px;
          }
          .choose-class:first-child {
            border-right: 1px solid #000;
          }
          .choose-class-form:after {
            content: '';
            display: block;
            border-left: 20px solid transparent;
            border-right: 20px solid transparent;
            border-top: 20px solid ${Theme.color.writtentestclockmain};
            margin-top: -10px;
          }
          .recommend-left:before {
            content: '';
            background-image: url(/static/writtentestclock/recommend.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            height: 40px;
            width: 40px;
            display: block;
            top: 0;
            left: 0;
            position: absolute;
          }
          .recommend-right:before {
            content: '';
            background-image: url(/static/writtentestclock/recommend.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            height: 40px;
            width: 40px;
            display: block;
            top: 0;
            right: 0;
            position: absolute;
          }
        `}</style>
        {this.renderGlobalCss()}
      </WrittenTestClock>
    );
  }
}
