import React from 'react'
import WrittenTestClock from '../../containers/writtentestclocksecond/layout'
import { Flex, FlexItem } from 'react-weui'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      content: ['你一定也很好奇', '以我现在的笔试水平', '到底有多大把握进四大？',
        '为了避免', '你在高级班跟不上节奏的尴尬',
        '在初级班又有孤独求败的体验', '不如趁现在！', '我们花几分钟来个小测试', '选择最适合自己的班级吧！']
    }
  }

  renderGlobalCss = () => {
    return (
      <style jsx global>{`
          .tips-form {
            display: flex;
            flex-direction: column;
            position: relative;
            background: url(/static/writtentestclocksecond/entry-form.png);
            background-size: 100%;
            background-repeat: no-repeat;
            margin: 0 10vw;
            padding: 4vh 0;
            justify-content: space-between;
            height: 79vw;
          }
          .tips-form:before {
            content: ' ';
            position: absolute;
            background: url(/static/writtentestclocksecond/entry-form-left.png);
            left: -34px;
            width: 100px;
            top: 9%;
            height: 111px;
            background-size: 35%;
            background-repeat: no-repeat;
          }
          .tips-form:after {
            content: ' ';
            position: absolute;
            background: url(/static/writtentestclocksecond/entry-form-right.png);
            right: -99px;
            width: 100px;
            top: -25%;
            height: 200px;
            background-size: 45%;
            background-repeat: no-repeat;
          }
          .tips {
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: 200;
          }
          .written-test-clock-second {
            overflow-x: hidden;
          }
      `}</style>
    )
  }

  renderContent () {
    const { content } = this.state
    return content.map((item, i) => (
      <div key={i} className='tips'>{item}</div>
    ))
  }
  render () {
    return (
      <WrittenTestClock>
        <Flex >
          <FlexItem>
            <div className='title'>恭喜你!</div>
            <div className='sub-title'>离 四 大 又 近 了 一 步</div>
          </FlexItem>
        </Flex>
        <div className='tips-form'>
          {this.renderContent()}
        </div>
        <div className='bottom-btn'>
              <a className='btn-test' href='/writtentestclocksecond/task?category=entrance'></a>
              <a className='btn-choose' href='/writtentestclocksecond/clock-in-intro'></a>
            </div>
        
        {this.renderGlobalCss()}
        <style jsx>{`
          .title {
            font-size: 35px;
            font-weight: bold;
            text-align: center;
            margin-top: 20px;
          }
          .sub-title {
            font-size: 25px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 20px;
          }
          .corner {
            height: 20px;
            width: 20px;
            position: absolute;
            border: 1px solid;
            background: rgb(30,31,32);
          }
          .btn-test,
          .btn-choose {
            display: block;
            background-repeat: no-repeat;
            background-size: 100%;
            text-align: center;
            height: 110px;
            width: 45vw;
            margin: 0 auto;
            padding-right: 10px;
            line-height: 36px;
            margin-top: 65px;
          }
          .btn-test {
            background-image: url(/static/writtentestclocksecond/entry-btn-left.png);
          }
          .btn-choose {
            background-image: url(/static/writtentestclocksecond/entry-btn-right.png);
          }
          .bottom-btn {
            display: flex;
            margin-top: -93px;
          }
        `}</style>
      </WrittenTestClock>
    )
  }
}
