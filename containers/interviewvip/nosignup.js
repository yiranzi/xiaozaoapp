import React from 'react'
import InterviewLayout from '../../containers/interviewvip/layout'
import { Toptips } from 'react-weui'
import Button from '../../xz-components/button'

export default class extends React.Component {
  render () {
    return (
      <InterviewLayout>
        <Toptips type='warn' show >未报名</Toptips>
        <div className='no-sign-up'>
          <p>小伙伴你还没有报名哦，已经有700+ 同学参加训练啦！</p>
          <p>点击立即报名！</p>
          <p>（若已报名请扫描二维码联系客服）</p>
          <img src='/static/img/interviewvip/Ted.jpg' />
        </div>
        <a href='/interviewvip/introPage'>
          <Button text='优惠报名' bg='rgb(255, 93, 93)' />
        </a>
        <style jsx>{`
          .no-sign-up {
            text-align: center;
            margin-top: 4rem;
          }
          .no-sign-up p {
            margin-top: 1rem;
          }
          .no-sign-up img {
            width: 80%;
          }
          a {
            display: block;
          }
        `}</style>
      </InterviewLayout>
    )
  }
}
