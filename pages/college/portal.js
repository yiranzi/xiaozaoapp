import React from 'react'
import AxiosUtil from '../../util/axios'
import CollegeLayout from '../../containers/college/layout'
import ThemeConfig from '../../config/theme'
import { } from 'react-weui'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount = async () => { }

  tolink () {
    location.href = '/interviewvip/introPage'
  }

  render () {
    return <CollegeLayout tabbar={0}>
      <section className='header'>
        <img src='/static/img/college/banner1.jpg' className='header__image' />
      </section>
      <section className='main-content'>
        <section className='interview-plan'>
          <h2 className='fixMargin'>小灶能力学院2018年课表新鲜出炉</h2>
          <img src='/static/img/college/courselist.jpg'
            className='header__image' />
          <h2 className='fixMargin wx-text-center'
            style={{borderBottom: '1px solid #efefef', lineHeight: 0}}>
            <span style={{padding: '0 10px', backgroundColor: '#fff'}}>
              <span style={{color: '#F5CC46'}}>限时福利</span>&nbsp;
              能力卡可兑换2018课表所有课程</span></h2>
          <a href='/learncard/detail'>
            <img src='/static/img/ucenter/banner2.jpg'
              className='header__image' />
          </a>
          <a href='/learncard/detail?tab=2'>
            <img src='/static/img/college/courselink.jpg'
              className='header__image' />
          </a>
        </section>
        <section className='signUp'
          onClick={e => this.tolink(e)}>
          <h2 className='fixMargin'>打卡专区</h2>
          <img src='/static/imgs/test-bg.png?v=1' className='header__image' />
          <div className='subContent'>
            <p className='subTitle'>小马哥教你过群面 </p>
            <a className='more'
              href='/interviewvip/introPage'>点击报名</a>
          </div>
        </section>
        <section className='interview-plan'>
          <h2 className='fixMargin'>面试课程</h2>
          <a href='https://mp.weixin.qq.com/s/T8SsDkKDZXr6_leFM3Z8jg'>
            <img src='/static/img/interview/interview_adv.jpg'
              className='header__image' />
          </a>
        </section>
        <section className='recommend'>
          <h2>课程推荐</h2>
          <a className='more'
            href='https://h5.youzan.com/v2/showcase/homepage?alias=ph3y0wi'>更多</a>
          <div className='wrapper'>
            <a className='course__block' href='https://kdt.im/i053_h'>
              <img src='/static/imgs/course/course-1.png' />
              <div className='title'>三三原则-90%面试题都适用</div>
            </a>
            <a className='course__block'
              href='https://h5.youzan.com/v2/showcase/homepage?alias=ph3y0wi'>
              <img src='/static/imgs/course/course-2.png' />
              <div className='title'>四大行业一路通关</div>
            </a>
            <a className='course__block' href='https://kdt.im/Xju3_h'>
              <img src='/static/imgs/course/course-3.png' />
              <div className='title'>咨询行业秋招一路通关</div>
            </a>
            <a className='course__block' href='https://kdt.im/cVu3_h'>
              <img src='/static/imgs/course/course-4.png' />
              <div className='title'>快消行业秋招一路通关</div>
            </a>
          </div>
        </section>
        <section className='nav__block'>
          <a className='item'
            href='https://mp.weixin.qq.com/mp/homepage?__biz=MzIyNjAwMDc3Mg==&hid=15&sn=9ded9df774fcdb4ee570dec7e15387dc&uin=&key=&devicetype=Windows+10&version=6204014f&lang=zh_CN&winzoom=1'>
            <div className='image-wrapper'>
              <img src='/static/imgs/course/assistant_09.png' />
            </div>
            <div className='container'>
              <div className='title'>求职干货</div>
              <div className='sub'>简历、面试、视频指导</div>
            </div>
          </a>
          <a className='item'
            href='https://m.qlchat.com/wechat/page/live/540000007060032'>
            <div className='image-wrapper'>
              <img src='/static/imgs/course/assistant_11.png' />
            </div>
            <div className='container'>
              <div className='title'>在线直播</div>
              <div className='sub'>40余场直播，可回看</div>
            </div>
          </a>
          <a className='item'
            href='http://mp.weixin.qq.com/s/s4fpMoTQeGqB0c3rM2V59Q'>
            <div className='image-wrapper'>
              <img src='/static/imgs/course/assistant_15.png' />
            </div>
            <div className='container'>
              <div className='title'>简历工具</div>
              <div className='sub'>10分钟收获专业简历</div>
            </div>
          </a>
          <a className='item'
            href='http://mp.weixin.qq.com/s?__biz=MzA4ODU5NTY1Mw==&mid=501160894&idx=1&sn=9862c7af997f7394de43ebdd64267e3f&chksm=080c76143f7bff02c1a6e03b6f0c26ac89bef63d9794424db45e7fd08b9753d9570dbfe72bb5#rd'>
            <div className='image-wrapper'>
              <img src='/static/imgs/course/assistant_16.png' />
            </div>
            <div className='container'>
              <div className='title'>笔试题库</div>
              <div className='sub'>模拟真实做题环境</div>
            </div>
          </a>
          <a className='item'
            href='https://mp.weixin.qq.com/s/3wWHU0F2NBdwaCFGcwRLqg'>
            <div className='image-wrapper'>
              <img src='/static/imgs/course/assistant_20.png' />
            </div>
            <div className='container'>
              <div className='title'>四大红宝书</div>
              <div className='sub'>人手一本，持续更新</div>
            </div>
          </a>
          <a className='item' href='http://cn.mikecrm.com/xaflF9L'>
            <div className='image-wrapper'>
              <img src='/static/imgs/course/assistant_22.png' />
            </div>
            <div className='container'>
              <div className='title'>心愿树洞</div>
              <div className='sub'>烦恼的和小灶说说</div>
            </div>
          </a>
        </section>
      </section>
      <style global jsx>{`
        html, body, div, span, applet, object, iframe,
        h1, h2, h3, h4, h5, h6, p, blockquote, pre,
        a, abbr, acronym, address, big, cite, code,
        del, dfn, em, img, ins, kbd, q, s, samp,
        small, strike, strong, sub, sup, tt, var,
        b, u, i, center,
        dl, dt, dd, ol, ul, li,
        fieldset, form, label, legend,
        table, caption, tbody, tfoot, thead, tr, th, td,
        article, aside, canvas, details, embed,
        figure, figcaption, footer, header, hgroup,
        menu, nav, output, ruby, section, summary,
        time, mark, audio, video {
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 100%;
          font: inherit;
          vertical-align: baseline;
        }
        article, aside, details, figcaption, figure,
        footer, header, hgroup, menu, nav, section {
          display: block;
        }
        body {
          line-height: 1;
          font-family: 'Helvetica Neue For Number',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'PingFang SC','Hiragino Sans GB','Microsoft YaHei','Helvetica Neue',Helvetica,Arial,sans-serif;
        }
        ol, ul {
          list-style: none;
        }
        blockquote, q {
          quotes: none;
        }
        blockquote:before, blockquote:after,
        q:before, q:after {
          content: '';
          content: none;
        }
        table {
          border-collapse: collapse;
          border-spacing: 0;
        }
        .header__image {
          width:100%;
        }
        .header {
          border-bottom: 10px solid #EEEEEE;
        }
        .exam img {
          width:100%;
          display: block;
          margin:5px auto;
        }
        .exam {
          border-top: 1px solid #F2F3F3;
          margin-bottom: 20px;
        }
        .nav__block {
          display:flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          border-top: 1px solid #F2F3F3;
          padding-top: 20px;
          margin-left: 2%;
        }
        .wrapper {
          display: flex;
          justify-content: center;
        }
        .course__block{
          display: inline-block;
          width: 22%;
          margin: 0 4px;
          font-size: 10px;
          text-decoration: none;
          color: black;
        }
        .course__block .price {
          color:red;
          font-size: 12px;
          display: inline-block;
          width: 40px;
          height: 14px;
        }
        .course__block .price + span {
          padding-left: 5px;
          color:#D8D9DA;
          position: relative;
        }
        .course__block .price + span::after {
          content: '';
          height: 1px;
          background:#D8D9DA;
          width: 25px;
          position: absolute;
          display: block;
          left:3px;
          transform: rotate(16deg);
          bottom: 5px;
        }
        .course__block .price::before,
        .course__block .price + span::before {
          content: '¥';
          font-size: 7px;
        }
        .course__block img {
          width: 100%;
          box-shadow: 0px 5px 8px 2px #c7c7c7;
          margin-bottom: 10px;
          display: block;
        }
        .course__block .title {
          height:20px;
          margin-bottom: 5px;
          line-height: 1.3;
        }
        h2 {
          font-weight: bolder;
          margin-top: 20px;
          margin-bottom: 20px;
          margin-left: 10px;
        }
        .exam h2::after {
          content: '进行中';
          font-size: 10px;
          margin-left: 10px;
          background: #DA3F38;
          color:white;
          padding: 5px;
          border-radius: 10px;
        }
        .main-content {
          width: 95%;
          margin: 0 auto;
        }
        .goinfor a {
          float: right;
          margin-right: 10px;
          padding: 3px 7px;
          display: inline-block;
          color:blue;
          text-decoration: none;
          font-size: 12px;
          border-radius: 8px;
          background: #E7E9EA;
        }
        .goinfor span {
          padding-left: 6px;
        }
        .nav__block .item {
          display: flex;
          margin-bottom: 25px;
          text-decoration: none;
          width: 50%;
        }
        .nav__block .container {
          margin-left: 5px;
          display: flex;
          flex-direction: column;
        }
        .nav__block .container .title {
          margin: 5px 0;
          color: black;
          font-size: 14px;
        }
        .nav__block .container .sub {
          color:#B5B6B7;
          padding-bottom: 8px;
          border-bottom: 1px solid #F2F3F3;
        }
        .nav__block .item img {
          width:100%
        }
        .image-wrapper {
          width:25%;
        }
        .sub {
          font-size: 10px;
        }
        .signUp{
          border-bottom: 1px solid #EEEEEE;
          margin-left: 10px;
          margin-right: 10px;
        }
        .fixMargin{
          margin-left: 0px;
        }
        .subContent{
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
          margin-bottom: 20px;
        }
        .subTitle{
          margin: auto 0 auto 0px;
        }
        .interview-plan{
          border-bottom: 1px solid #EEEEEE;
          margin-left: 10px;
          margin-right: 10px;
          padding-bottom: 20px;
        }
        .recommend {
          margin-bottom: 20px;
        }
        .recommend h2 {
          display: inline-block;
        }
        .more {
          font-size: 10px;
          margin-left: 10px;
          padding: 5px;
          border-radius: 8px;
          color:white;
          background: #B6B7B8;
          text-decoration: none;
        }
      `}</style>
    </CollegeLayout>
  }
}
