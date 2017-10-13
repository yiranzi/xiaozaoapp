import React from 'react'
import { Button } from 'react-weui'
import ThemeConfig from '../../config/theme'
import Back from '../../containers/interview/back'
import InterviewLayout from '../../containers/interview/layout'

const intro = [
  {'img': '/static/img/interview/day1.png'},
  {'img': '/static/img/interview/day2.png'},
  {'img': '/static/img/interview/day3.png'},
  {'img': '/static/img/interview/day4.png'},
  {'img': '/static/img/interview/day5.png'},
  {'img': '/static/img/interview/day6.png'}
]

export default class extends React.Component {
  renderLastDay () {
    return (
      <div className='interview-item'>
        <div className='icon'><img src='/static/img/interview/train.png' /></div>
        <div className='intro'>
          <div className='title'>解锁关卡 群面综合训练</div>
        </div>
        <div className='result'>
          <img src='/static/img/interview/lock.png'/>
        </div>
        <div className='enter-icon'> > </div>
      </div>
    )
  }
  renderList () {
    return intro.map((item, index) => {
      return (
        <div key={index} className='interview-item'>
          <div className='icon'><img src={item.img} /></div>
          <div className='intro'>
            <div className='title'>第一天 英语阅读理解</div>
            <div className='sub'>打卡成绩：50%正确率</div>
          </div>
          <div className='result'>
            <div className='finish'>
              <img src='/static/img/interview/finish.png' />已完成</div>
            <div className='sub'>1000人完成</div>
          </div>
          <div className='enter-icon'> > </div>
        </div>
      )
    })
  }

  render () {
    return (
      <InterviewLayout>
        <Back text='< 返回打卡主页' url='/interview/main' />
        <div className='interview-list'>
          {this.renderList()}
          {this.renderLastDay()}
        </div>
        <style global jsx>{`
          .interview {
            padding: 1rem 0 !important;
          }
          .back {
            padding: 0 1rem;
          }

          /* 列表样式 */
          .interview-item {
              border-bottom: 1px solid ${ThemeConfig.color.border_gray};
              padding: 1rem;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .interview-item .icon img {
              width: 100%;
            }
            .interview-item .sub {
              color: ${ThemeConfig.color.font_gray};
              font-size: 0.9rem;
              margin-top: 0.25rem;
            }
            .interview-item .icon {
              flex: 1;
            }
            .interview-item .intro {
              padding: 0 0.5rem;
              flex: 2;
            }
            .interview-item .intro .title {
              font-size: 1rem;
            }
            .interview-item .result {
              flex: 1;
              text-align: center;
            }
            .interview-item .result .finish {
              display: flex;
              align-items: center;
            }
            .interview-item .result .finish img{
              width: 1.25rem;
              height: 1.25rem;
              margin-right: 0.5rem;
            }
            .interview-item .enter-icon {
              color: ${ThemeConfig.color.font_gray};
              margin-left: 1rem;
            }
        `}</style>
      </InterviewLayout>
    )
  }
}
