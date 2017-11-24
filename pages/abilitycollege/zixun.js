import React from 'react'
import Layout from '../../components/layout'
import PlanCourse from '../../containers/abilitycollege/main/plancourse'

export default class extends React.Component {
  static getInitialProps () {
    let data = [{
      'subTitle': '咨询顾问必备核心能力1 -问题解决 (Problem-solving)与案例分析 (case interview)',
      'subContent': '管理咨询顾问的使命就是帮助客户解决问题。解决问题指的是能够把空泛的问题进行准确的定义并进行陈述、把复杂的问题不断进行结构化的分解，直到可以导出可执行的解决方案。案例分析，是咨询公司招聘中最经典的测试手段，考察的重点就是候选人是否具备问题解决能力。案例面试中，候选人需要对一个案例进行分析，并且给出解决方案。',
      'recommand': [4]
    }, {
      'subTitle': '咨询顾问必备核心能力2 -领导力 (leadership) 与成就导向 (achievement)',
      'subContent': '管理咨询作为专业服务，是面向客户的、团队制、项目制的。咨询行业的初级员工 (一般称为分析师) 逐渐发展成咨询顾问、项目经理，乃至合伙人级别，需要从个人贡献者的角色，逐渐成长为能够领导一个团队，到领导一个项目 (对项目成果负责)，再到领导一项业务甚至是一家公司。因此很多咨询公司在考察候选人的时候，也会强调领导力和成就导向，确保人才能在公司长期成长和发展。此外，聘请咨询公司的客户会有非常高的要求，咨询的工作强度也比较大，因此也要求候选人具备精益求精的精神。',
      'recommand': []
    }, {
      'subTitle': '咨询顾问必备核心能力3 -商业敏感 (business acumen)',
      'subContent': '在咨询的项目中，经常需要借鉴行业内外的实践和案例。因此具备一定的履历和视野，尤其是公众认可的明星企业的工作履历，更容易受到青睐。而在咨询求职的案例面试中，也需要具备较强的商业知识和商业概念，才能在解题过程中迅速抓住要点。同时，你也需要名企实习经历来接触更多的实践案例。',
      'recommand': [3]
    }, {
      'subTitle': '咨询顾问必备核心能力4：PPT 制作与基本 Excel 操作',
      'subContent': '通过积累 PTA 和咨询公司的实习经验，可以提升你对咨询行业的理解和显示你对咨询行业的热诚。对于应聘 PTA 和实习职位，如果掌握了一定咨询相关工作技能，会更有把握——毕竟分担部分工作就是招聘 PTA 和实习生的原因。',
      'recommand': [8, 9, 10]
    }, {
      'subTitle': '咨询顾问求职必备1：对咨询的认可 (commitment to consulting)',
      'subContent': '咨询的面试中，几乎必问的问题是：你为什么选择咨询行业 (why consulting)？如果候选人对行业非常了解，认可咨询工作的价值，会更愿意在行业内、在公司里长期的发展，作出贡献，而非短暂停留就离开。同时，强烈建议小伙伴在大二大三的时候就寻找咨询公司 PTA 和实习的机会，这样的实习经历会非常有助于校招。',
      'recommand': [18]
    }, {
      'subTitle': '咨询顾问求职必备2：面试与行为面试',
      'subContent': '在案例面试之前，咨询公司一般会先询问候选人的基本情况、选择咨询行业的原因和个人经历。部分公司比如麦肯锡，会采用行为面试的方式考察候选人，麦肯锡称之为 PEI (Personal Experience Interview)。咨询行业万里挑一，很多求职者会把几乎所有精力投入在案例面试中。但其实之前的经历面试也不能掉以轻心。',
      'recommand': [20, 16]
    }]
    return {
      data
    }
  }
  render () {
    return (
      <Layout>
        <div className='bigfour'>
          <div className='header'>小马哥告诉你咨询顾问的4大必备核心能力和2大求职必备能力</div>
          <img style={{width: '100%'}} src='/static/img/abilitycollege/2.png' />
          <div className='detail'>
            <PlanCourse data={this.props.data} />
          </div>
          <style jsx>{`
            .bigfour {
              background-color: #f0f2f6;
            }
            .bigfour .header {
              background-color: #241d66;
              color: #fff;
              text-align: center;
              font-weight: bold;
              line-height: 180%;
              padding: 2rem 3rem;
            }
          `}</style>
        </div>
      </Layout>
    )
  }
}
