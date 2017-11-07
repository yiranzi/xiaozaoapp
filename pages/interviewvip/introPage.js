import React from 'react'// 库
import Card from '../../xz-components/card'
import More from '../../xz-components/more'
import Motal from '../../xz-components/motal'
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
    let {discountPrice} = GetPayInfo.getPriceInfo()
    this.setState({
      price: discountPrice
    })
  }

  saleInfo () {
    return (
      <div>
        <p>
          本次小马哥群面课程有大优惠哦！原价 ¥399，支持好友帮砍价！最多邀请8人砍价哦！
          合计最多<span className='boldTxt'>优惠104元！</span>
          点击下方的<span className='red'>邀请砍价</span>按钮，邀请小伙伴一起帮忙砍价啦！（砍价仅限 10.26-10.30 期间，之后逐步恢复原价哦！）
        </p>

        <style jsx>
          {`
          .boldTxt{
            font-weight: bold
          }
          .red{
            color: red
          }
          `}
        </style>
      </div>
    )
  }

  courseIntro () {
    return (
      <div>
        <p><span className='boldTxt'>小马哥教你过群面</span>系列由小灶教育联合创始人、国内顶尖求职指导专家，小马哥研发，
          从面试官的角度出发，透彻分析群面打分表，精心制作本次群面快速提升计划，帮助学员通关群面，
          <span className='boldTxt'>首期已有 5000 人内测，87% 的学员评分 7~10 分。</span></p>
        <p style={{marginTop: '10px'}}>在内测版本基础上，本次群面课程新增 5 个案例实例讲解，
          并优化练习环境，以<span className='boldTxt'>“7 项核心群面技能快速提升+ 6 人组队群面实战+ 4 场线上群面答疑讲座”</span>的形式，
          贯彻了模块化、体系化、轻松学、重实战、讲效果的学习模式，服务于各行业群面的同学，<span className='boldTxt'>帮助同学通过群面！</span></p>
        <style jsx>{`.boldTxt{font-weight: bold}`}</style>
      </div>
    )
  }

  teacherIntro () {
    return (
      <div className='teacherIntro'>
        <div className='photo'><img src='/static/img/interviewvip/marc.jpg' /></div>
        <div className='name'>小马哥</div>
        <div className='exper'>
          <p><b>小灶教育联合创始人，国内顶尖求职指导专家，</b>资深咨询顾问，杜克大学 MBA，拒掉某 MBB 的 offer，决心创业。</p>
          <ul className='dot'>
            <li>小马哥在本科及 MBA 期间获得的 offer 有：<b>某 MBB，苹果、花旗银行、腾讯、京东、太古、毕马威、甫瀚等。</b></li>
            <li>创业以来，参与过四大、咨询、快消、金融、互联网领域的所有小灶线上课程研发，并参与超过 20 场线下训练营的辅导，<b>研发的第一期群面课，5000+学员参加，87%反馈评分7-10分。</b></li>
            <li>MBA 期间获得 Adobe Analytics 商业分析大赛全美 20 强，中欧商学院全球 MBA 创业大赛 INNOVATEChina 全球 6 强。</li>
            <li>JA 连续 4 年志愿者，知乎 2013 年互联网领域优秀回答者。</li>
            <li>5 年外资咨询公司工作经验，领域包括财务、风险管理、战略实施、运营咨询、 人力资本，对各个领域的管理咨询公司有深刻理解。</li>
            <li>辅导过的学生拿到的 offer 包括：<b>埃森哲、联合利华、欧莱雅、怡安翰威特、科尔尼、BCG、德勤、IBM GBS、IMSHealth、光辉合益、麦肯锡、美世、久谦、奥纬、安永帕特农、普华永道、腾讯、招商银行。</b></li>
        </ul>
        </div>
        <style jsx>{`
          .teacherIntro{
          }
          .dot li{
            list-style: inside !important;
          }
          .name {
            text-align: center
            font-weight: bold;
          }
          .photo img {
            width: 100%;
          }
          .exper p {
            margin-top: 0.5rem;
          }
          .boldTxt {
            font-weight: bold;
          }
        `}</style>
      </div>
    )
  }

  courseLearn () {
    {
      return (
        <div>
          <p>本次课程<b>不限学校，不限专业，不限求职方向，</b>这里教的方法和核心群面技能
            <b>各行业通用，</b>不论你是<b>正在备战秋招、春招还是实习还是想提高思维和合作等核心能力，</b>
            这都是一次极其难得的学习和实战机会。</p>
          <br />
          <ul className='dot'>
            <li>小马哥亲自透彻<b>分析群面打分表，</b>带你快速学习7 大模块核心群面成功技能</li>
            <li>小马哥教你<b>使用案例分析框架，</b>让你面对案例不再毫无头绪</li>
            <li>本次群面课程应用金融、四大、互联网、咨询行业中出现的<b>代表类型群面案例进行教授，</b>一次课程的学习，
              学会你所关注行业的案例解题和群面思路<span className='red'>（不承诺包含所有公司案例）</span></li>
            <li>小马哥携行业导师进行<b>群面案例解析讲座 ，</b>涵盖四大、快消、金融行业真实案例解读</li>
            <li>线上群面实战<b>（6 人一组）</b>，结识志同道合的战友，一起实战演练真实群面流程</li>
            <li>通过学习、参与式练习和实战，了解群面环节中各角色需要具备的能力，掌握群面中团队合作和<span>凸显自己</span>的诀窍</li>
            <li>更有<span>福利赠送，</span>小马哥精选的 casebook 合集和各行业面经</li>
          </ul>
          <style>
            {`
            .dot li{
              list-style: inside !important;
            }
            .red {
              color: red;
            }
            `}
          </style>
        </div>
      )
    }
  }

  courseDetail () {
    return (
      <div>
        <div className='sub'>本次课程，关注群面的六大核心能力：案例阅读技巧、问题分析能力、结构化思维、商业思维、沟通与表达能力、时间管理能力，组织以下<b>三部分课程内容：</b></div>
        <div className='content'>
          <section>
            <div className='subTitle'>第一部分：7 大模块核心群面技能</div>
            <p>本部分将于<b>11月1日全部</b>上线，关注“小灶求职顾问”等待通知哦</p>
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
            <div className='subTitle'>第二部分：6 人线上群面实战</div>
            <ul>
              <li>群面方式：线上微信群，6 人一组</li>
              <li>分组方式：6 人一组，根据学员模块训练的成绩进行分组，保证最真实的群面模拟环境</li>
              <li>参加线上模拟需要先完成所有模块的学习，学完后模拟更有效哦</li>
              <li>群面时间：<span className='red'>多时段选一</span>(每个时间段开放 300 个名额，为保证群面效果，完成课程学习才可报名群面啦！请务必确认参加哦）</li>
              <div className='introImg'>
                <img src='/static/img/interviewvip/introPage/timeChoose.png'/>
              </div>
              </ul>
          </section>
          <section>
            <div className='subTitle'>第三部分：4 场群面答疑讲座</div>
            <ul>
              <li>1 场群面线上模拟案例解析+答疑</li>
              <li>
                <div className='sub-title'>3 场行业（四大、快消、金融）群面讲解，包括：</div>
                <ul className='dot'>
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
          .introImg {
            text-align: center;
          }
          .introImg img {
            width: 300px;
          }
          .dot li{
            list-style: inside !important;
          }
          section {
            margin-top: 1rem;
          }
          .subTitle {
            font-weight: bold;
            color: ${ThemeConfig.color.dark_black};
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
            list-style: inside;
          }
        `}</style>
      </div>
    )
  }

  renderHelpInfo () {
    return (
      <div>
        <p className='title'>常见问题</p>
        <p>请点击左下角的【在线咨询】，可以查看常见问题哦！若有更多问题，请添加小灶求职顾问-Ted（微信：xiaozao025)，进行咨询。</p>
        <style>
          {`
          .title{
            color: ${ThemeConfig.color.dark_black};
            font-size: 26px;
          }
          .card {
            margin: 30px 0 30px 0 !important;
          }
          `}
        </style>
      </div>
    )
  }

  render () {
    const {isRender, error} = this.state
    return (
      <InterviewLayout isRender={isRender} error={error}>
        <div className='page'>
          <div className='header'>
            <img src='/static/img/interviewvip/main.jpg' />
          </div>
          <div className='title'>小马哥教你过群面</div>
          <div className='content'>
            <div className='join'>
              <div className='avatar'>{this.renderAvatar()}</div>
              <div className='count'>{this.state.totalUserCount}人已经报名,限时优惠...</div>
            </div>
            {/*<div className='teacher-intro'>*/}
              {/*<Card*/}
                {/*title='特别提醒！限时砍价进行中'*/}
                {/*content={this.saleInfo()}*/}
              {/*/>*/}
            {/*</div>*/}
            <div className='intro'>
              <More
                title='课程介绍'
                content={this.courseIntro()}
                height={120}
              />
            </div>
            <div className='teacher-intro'>
              <Card title='导师介绍'>{this.teacherIntro()}</Card>
            </div>
            <div className='course-detail'>
              <Card title='课程内容'>{this.courseDetail()}</Card>
            </div>
            <div className='fit'>
              <Card title='你将收获什么'>{this.courseLearn()}</Card>
            </div>
            {/*<div className='how-join'>*/}
              {/*<Card*/}
                {/*title='参与方式'*/}
                {/*content={this.howJoin()}*/}
              {/*/>*/}
            {/*</div>*/}
            <style>
              {`
                .title{
                  font-size: 20px !important;
                  font-weight: bold;
                }
                .card {
                  margin: 30px 0 30px 0 !important;
                }
                `}
            </style>
            {this.renderStartTime()}
            {this.renderButton()}
            {this.renderMotal()}
            {this.renderHelpInfo()}
            {this.renderBg()}
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
            padding: 1rem 1rem 4rem 1rem;
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
              position: fixed;
              bottom: 4.8rem;
              width: 100%;
              left: 0;
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
        price={this.state.price}
        onClickButton={this.onShowTryTask.bind(this)}
      />
    )
  }

  onShowTryTask () {
    this.setState({isHelpShow: true})
  }

  goPath (goPath) {
    location.href = goPath
  }

  renderBg () {
    let arr = [1, 3, 4, 6, 7, 8, 9]
    let style = {
      width: '100%',
      fontSize: 0
    }
    let result = arr.map((ele, index) => {
      return (
        <img style={style} src={`/static/img/interviewvip/introPage/intro_0${ele}.jpg`} />
      )
    })
    return (<div className='page'>
      <h1 className='title'>第一期群面打卡回顾</h1>
      {result}
      <style jsx>
        {`
        .page {
          margin: -1rem;
          font-size: 0;
          text-align: center;
        }
        .title {
          font-weight: bold;
          color: ${ThemeConfig.color.dark_black};
          font-size: 20px;
          margin: 40px 0 20px 0;
        }
        `}
      </style>
    </div>)
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

    let styleP = {
      margin: '0 30px 0 30px'
    }
    return (
      <Motal
        onClickBg={() => { this.setState({isHelpShow: false}) }}
        isShow={this.state.isHelpShow}>
        <div style={style}>
          <div style={{backgroundColor: '#fff', color: '#242223', padding: '1rem', margin: '1rem'}}>
            <p style={styleP}>扫描二维码生成自己的砍价邀请卡~邀请好友扫码砍价哦~ </p>
            <img style={styleImg} src='/static/img/interviewvip/qrcode.jpg' />
          </div>
        </div>
      </Motal>
    )
  }
}
