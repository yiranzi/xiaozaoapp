import React from 'react'
import {Button} from 'react-weui'
import Card from '../../xz-components/card'
import Back from '../../containers/interview/back'
import InterviewLayout from '../../containers/interview/layout'

export default class extends React.Component {
  renderContent () {
    return (
      <div>
        <h4>背景信息：</h4>
        <p>很多外资企业，包括四大、管理咨询、快消、银行等等，都会要求在群面时，用英文来完成 presentation
          和问答环节，部分管理咨询公司更是要求全英文完成整个面试流程。随着对人才的英文能力要求越来越普遍，很多领先的国企和民营企业在面试过程中测试英文能力。</p>
        <br />
        <p>很多同学在日常也有进行英语的训练，或者是在四六级中考出不错的成绩。但在群面中，面对英语的讨论，或者是面试官的英文提问，却有可能不能及时作出反应。出现这种情况，原因是多方面的：</p>
        <ul className='ul1'>
          <li>平日的英语训练相对局限，只涉及某些生活题材，面试中是针对工作或者是某个案例背景进行提问，不能即时理解</li>
          <li>讲话的对象，包括面试同伴或者是面试官吗，本身的英文能力不强，或者是存在口音较重等问题，让人难以听懂</li>
          <li>意思能够听懂，但应该怎么做，心理没有底</li>
        </ul>
        <br />
        <h4>今日打卡目的</h4>
        <p>1、提升求职者在英文面试中获取关键信息的方法</p>
        <ul className='ul2'>
          <li>利用已有笔记和案例材料中标记关键词，定位伙伴 presentation 中的关键信息</li>
          <li>提前熟悉相关术语，提供面试中常用术语资料</li>
        </ul>
        <p>2、告知求职者在听不懂面试官问题时，应对尴尬的方法</p>
        <ul className='ul2'>
          <li>不确定听到的内容，如何进行澄清</li>
          <li>不理解听到的内容，如何礼貌的请面试官重新提问</li>
        </ul>
        <br />
        <h4>题目介绍：</h4>
        <p>听全英文 presentation + 面试官提问 的音频（非标准英文发音—模板话和短句的组合材料）并完成3道选择题（两次测试共6题）</p>
        <style jsx>{`
          .ul1 {
            margin-left: 20px;
          }
          .ul2 {
            margin-left: 30px;
          }
          .ul2 li {
            list-style: lower-alpha;
          }
        `}</style>
      </div>
    )
  }

  render () {
    return (
      <InterviewLayout>
        <Back text='< 返回打卡主页' url='/interview/main' />
        <div>
          <Card content={this.renderContent()} />
          <a href='/interview/task'><Button>下一页</Button></a>
        </div>
      </InterviewLayout>
    )
  }
}
