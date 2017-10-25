import React from 'react'// 库
import Card from '../../components/card'
import More from '../../components/more'
import Motal from '../../components/motal'
import SignUpButton from '../../containers/interviewvip/signUpButton'// 自定义组件
import InterviewLayout from '../../containers/interviewvip/layout'// container
import GetPayInfo from '../../util/getPayInfo'// 工具类
import ThemeConfig from '../../config/theme'

// 介绍页

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      payInfo: null,
      canBuy: null,
      payStatus: null,
      canEnter: null,
      isRender: true,
      error: '',
      totalUserCount: null,
      headimgList: null,
      price: null,
      isHelpShow: false // 二维码弹框
    }
  }

  componentDidMount = async () => {
    try {
      // 获取常规数据
      let payInfo = await GetPayInfo.getPayInfo()
      // 设置
      this.setPageInfo(payInfo)
      this.setPayStatus()
      this.setPrice()
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
    this.setState({
      isRender: false
    })
  }

  /*
   设置页面的总人数/头像
  */
  setPageInfo (payInfo) {
    let {totalUserCount, headimgList} = payInfo
    this.setState({
      totalUserCount: totalUserCount,
      headimgList: headimgList
    })
  }

  /*
   设置报名状态信息
   */
  setPayStatus () {
    // 获取报名信息
    let payStatus = GetPayInfo.getPayStatus()
    let canEnter = GetPayInfo.getCanEnter()
    this.setState({
      payStatus: payStatus,
      canBuy: GetPayInfo.getCanBuy(),
      canEnter: canEnter
    })
  }

  /*
   设置价格
   */
  setPrice () {
    // 设置价格
    let {price} = GetPayInfo.getPriceInfo()
    this.setState({
      price: price
    })
  }

  courseIntro () {
    return (
      <div>
        <p><span className='boldTxt'>小马哥教你过群面</span>系列由小灶教育联合创始人、国内顶尖求职指导专家，小马哥研发，
          从面试官的角度出发，透彻分析打分表，精心制作本次群面快速提升计划，帮助学员通关群面，首期已有 5000 人内测。</p>
        <p style={{marginTop: '10px'}}>在内测版本基础上，本次群面课程新增 5 个案例，并优化练习环境，以“7 项核心群面技能
          快速提升+ 6 人组队群面实战 + 4 场线上群面答疑讲座”的形式，贯彻了模块化、体系化、轻松学、效果好的学习模式，服务于各
          行业群面的同学，帮助同学通过群面！</p>
        <style jsx>{`.boldTxt{font-weight: bold}`}</style>
      </div>
    )
  }

  teacherIntro () {
    return (
      <div>
        <div className='name'>小马哥</div>
        <div className='photo'><img src='/static/img/interviewvip/marc.jpg' /></div>
        <div className='exper'>
          <p>小灶教育联合创始人，国内顶尖求职指导专家，杜克大学 MBA，拒掉某 MBB 的 offer，决心创业。</p>
          <p>小马哥在本科及 MBA 期间获得的 offer 有：某 MBB，苹果、花旗银行、腾讯、京东、太古、毕马威、甫瀚等。</p>
          <p>创业以来，参与过四大、咨询、快消、金融、互联网领域的所有小灶线上课程研发，并参与超过 20 场线下训练营的辅导，研发的第1期群面课，<span className='boldTxt'>已有 5000+ 名大学生报名学习。</span></p>
          <p>MBA 期间获得 Adobe Analytics 商业分析大赛全美 20 强，中欧商学院全球 MBA 创业大赛 INNOVATEChina 全球 6 强。</p>
          <p>辅导过的学生拿到的 offer 包括：埃森哲、联合利华、欧莱雅、怡安翰威特、科尔尼、BCG、德勤、IBM GBS、IMSHealth、光辉合益、麦肯锡、美世、久谦、奥纬、安永帕特农、普华永道、腾讯、招商银行。</p>
        </div>
        <style jsx>{`
          .photo img {
            width: 100%;
          }
          .exper p {
            margin-top: 0.25rem;
          }
          .boldTxt {
            font-weight: bold;
          }
        `}</style>
      </div>
    )
  }
  courseDetail () {
    return (
      <div>
        <div className='sub'>本次课程，关注群面的六大核心能力：案例阅读技巧、问题分析能力、结构化思维、商业思维、沟通与表达能力、时间管理能力，组织以下三部分课程内容：</div>
        <div className='content'>
          <section>
            <div className='title'>第一部分：7 大模块核心群面技能</div>
            <ul>
              <li>模块 1：如何快速读懂长案例？</li>
              <li>模块 2：怎样运用结构化思维找到案例的突破口？</li>
              <li>模块 3：怎样利用常见的商业分析框架提升分析效率？</li>
              <li>模块 4：如何把握节奏，引导小组讨论？</li>
              <li>模块 5：群面中如何做到“好好说话” （表达观点、总结、打断、提问）？</li>
              <li>模块 6：如何做一个条理清晰娓娓道来的 presentation（模板解读）？</li>
              <li>模块 7：如何回答面试官刁钻的提问？</li>
            </ul>
          </section>
          <section>
            <div className='title'>第二部分：6 人线上群面实战</div>
            <ul>
              <li>群面方式：线上微信群，6 人一组</li>
              <li>群面时间：<span className='red'>多时段可选</span>（每个时间段开放 300 个名额，请务必确保能参加其中的任意一次）</li>
              <li>参与规则：参加线上模拟需要先完成所有模块的学习，学完后模拟更有效哦</li>
            </ul>
          </section>
          <section>
            <div className='title'>第三部分：4 场群面答疑讲座</div>
            <ul>
              <li>场群面线上模拟案例解析+答疑</li>
              <li>
                <div className='sub-title'>场行业（四大、快消、金融）群面讲解，包括：</div>
                <ul>
                  <li>行业群面案例的形式</li>
                  <li>行业群面考察点</li>
                  <li>行业群面应对策略</li>
                </ul>
              </li>
              <li>PS. 具体讲座时间请关注“小灶求职顾问”通知哦</li>
            </ul>
          </section>
        </div>
        <style jsx>{`
          section {
            margin-top: 1rem;
          } 
          .title {
            font-weight: bold;
            color: ${ThemeConfig.color.dark_black};
          }
          ul li {
            list-style: none;
          }
          .red {
            color: red;
          }
          .boldTxt {
            font-weight: bold;
          }
        `}</style>
      </div>
    )
  }
  fit () {
    return (
      <div>
        <ul>
          <li>看过无数面经却还是不知道如何准备群面</li>
          <li>不会熟练运用 3C、4P 等案例分析框架</li>
          <li>正在准备群面但找不到人一起模拟</li>
          <li>面试通知太仓促，没时间线下模拟</li>
          <li>搜不到完整、靠谱的案例题和学习材料</li>
          <li>碰到案例题尤其是英文的长案例，瞬间懵逼</li>
          <li>遇到英文 presentation，双腿直发抖</li>
          <li>不知如何和成员友好合作，同时凸显优势</li>
        </ul>
        <p>反正，你能想到或者想不到的群面中可能存在的问题，这里都有解答！</p>
        <style jsx>{`
          ul li {
            list-style: inside;
          }
          p {
            margin-top: 1rem;
          }
        `}</style>
      </div>
    )
  }
  howJoin () {
    return (
      <div>
        <ul>
          <li>课程学习：关注【小灶求职顾问】，在移动端随时随地进行学习，我们会进行课程上线提醒</li>
          <li>模块训练：训练形式灵活，可一天完成全部训练，也可每天完成一个模块训练</li>
          <li>群面模拟：6 人一组，完成全部模块训练后才能进行群面模拟时间选择，保证模拟最好效果</li>
          <li>答疑讲座：答疑讲座具体时间请关注“小灶求职顾问”通知哦</li>
        </ul>
        <style jsx>{`
          ul li {
            list-style: none;
          }
        `}</style>
      </div>
    )
  }
  render () {
    const {isRender, error} = this.state
    return (
      <InterviewLayout isRender={isRender} error={error}>
        <div className='page'>
          <div className='header'>
            <img src='/static/img/interview/interview.png' />
          </div>
          <div className='title'>小马哥教你过群面</div>
          <div className='content'>
            <div className='join'>
              <div className='avatar'>{this.renderAvatar()}</div>
              <div className='count'>{this.state.totalUserCount}人已经报名,名额有限...</div>
            </div>
            <div className='intro'>
              <More
                title='课程介绍'
                content={this.courseIntro()}
                height={120}
              />
            </div>
            <div className='teacher-intro'>
              <Card
                title='导师介绍'
                content={this.teacherIntro()}
              />
            </div>
            <div className='course-detail'>
              <Card
                title='课程内容'
                content={this.courseDetail()}
              />
            </div>
            <div className='fit'>
              <Card
                title='适合哪些同学报名'
                content={this.fit()}
              />
            </div>
            <div className='how-join'>
              <Card
                title='参与方式'
                content={this.howJoin()}
              />
            </div>
            {this.renderStartTime()}
            {this.renderButton()}
            {this.renderMotal()}
          </div>
        </div>
        <style jsx>{`
          .page{
            padding-bottom: 50px;
            width: 100%;
          }
          .header img{
            width: 100%;
          }
          .title {
            padding: 0 1rem;
            color: ${ThemeConfig.color.dark_black};
            font-size: 26px;
          }
          .content {
            padding: 1rem 1rem 5rem 1rem;
            color: ${ThemeConfig.color.content};
          }
          .content .join {
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
          .content .join .count {
            margin-left: 1rem;
          }
        `}</style>
        <style global jsx>{`
          .interviewvip {
            padding: 0 !important;
          }
        `}</style>
      </InterviewLayout>
    )
  }

  renderAvatar () {
    let style = {
      width: '30px',
      height: '30px',
      borderRadius: '30px'
    }
    let headArray = this.state.headimgList
    if (headArray && headArray.length > 0) {
      return headArray.map((item, index) => {
        return <img style={style} key={index} src={item} />
      })
    }
  }

  renderStartTime () {
    if (this.state.payStatus && !this.state.canEnter) {
      return (
        <div className='bg'>
          <p>正式打卡将于2017年11月1日开始</p>
          <style>{`
            .bg {
              background-color: ${ThemeConfig.color.yellow};
              color: #fff;
              text-align: center;
              padding: 0.25rem 0;
            }
          `}</style>
        </div>
      )
    }
  }

  // 根据条件渲染按钮
  renderButton () {
    return (
      <SignUpButton
        canBuy={this.state.canBuy}
        payStatus={this.state.payStatus}
        canEnter={this.state.canEnter}
        buttonContent={'在线咨询'}
        price={this.state.price}
        onClickButton={this.onShowTryTask.bind(this)}
      />
    )
  }

  onShowTryTask () {
    console.log('onShowTryTask')
    this.setState({isHelpShow: true})
  }

  goPath (goPath) {
    console.log(goPath)
    location.href = goPath
  }

  renderMotal () {
    let style = {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '20px',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(35,24,21,0.5)',
      textAlign: 'center',
      color: 'white'
    }
    let styleImg = {
      width: '256px',
      height: '297px'
    }
    return (
      <Motal
        onClickBg={() => { this.setState({isHelpShow: false}) }}
        isShow={this.state.isHelpShow}>
        <div style={style}>
          <div>
            <p>扫描二维码加小助手咨询 微信号：xiaozao025 </p>
            <img style={styleImg} src='/static/img/interviewvip/qrHelpCode.jpeg' />
          </div>
        </div>
      </Motal>
    )
  }
}
