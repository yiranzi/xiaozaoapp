import React from 'react'
import ThemeConfig from '../../config/theme'
import Button from '../../xz-components/button'

export default class extends React.Component {
  render () {
    return (
      <div className='experience'>
        <section>
          <div className='sub-title'>面试考验了一个人的综合实力，逻辑思维、分析、表达、协作等，如何能够在群面中脱颖而出？你只需要全程跟着学！</div>
          <a href='/interviewvip/experience/intro'><img src='/static/img/learncard/01.jpg' /></a>
          <p>该课程已有 5000+ 人学习，从面试官角度出发，透彻分析群面打分表，精心制作本次群面快速提升计划。5大案例实例解决，7大核心技能提升，6人组队群面实战，4场在线答疑讲座，掌控群面全场，你只需要全程跟着学！</p>
          <div className='btn'><a href='/interviewvip/experience/intro'><Button text='立即体验' bg='#218ee9' /></a></div>
        </section>
        <section>
          <div className='sub-title'>想要一份好简历，你需要的绝不是模版，而是掌握写好一份简历的秘籍！</div>
          <a href='https://www.xiaozao.org/learn/course/60'><img src='/static/img/learncard/02.jpg' /></a>
          <p>该课程已有 2000+ 人学习，斩获了腾迅、花旗、毕马威、某 MBB、苹果 Offer 的大神，1原则先行：教你掌握撰写简历的3大原则：“既能一见钟情， 又能日久生情”、“以读者为中心”、“用 YOLO 打败 FOMO”，2 无微不至：教你细致到联系方式怎么写，标点符号要怎么注意。3 出彩的经历：教育经历、实习经历、工作经历写得精彩有套路！</p>
          <div className='btn'><a href='https://www.xiaozao.org/learn/course/60'><Button text='立即体验' bg='#218ee9' /></a></div>
        </section>
        <p>【上面的简历秘籍课程，电脑端体验更佳哦，稍后为大家开放。大家可以先感受下课程内容】</p>
        <section>
          <div className='sub-title'>除了以上课程体验，2018你即将拥有的能力：</div>
          <img src='/static/img/learncard/03.jpg' />
        </section>
        <style jsx>{`
          .experience {
            padding: 1rem;
          }
          .sub-title {
            padding: 1rem;
            text-align: center;
          }
          p {
            color: ${ThemeConfig.color.content};
            font-size: 14px;
          }
          .btn {
            margin-top: 1rem;
            margin-bottom: 1rem;
          }
          a {
            display: inline-block;
            width: 100%;
          }
          section img {
            width: 100%;
            margin-bottom: 1rem;
          }
        `}</style>
      </div>
    )
  }
}
