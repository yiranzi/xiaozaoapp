import React from 'react'
import Layout from '../../components/layout'
import Footer from '../../components/footer'
import {
  Swiper,
  Flex,
  FlexItem,
  LoadMore
} from 'react-weui'
import AxiosUtil from '../../util/axios'
import ThemeConfig from '../../config/theme'
import Slider from 'react-slick'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      demoIndex: 0,
      topBanner: null,
      courseType2List: null,
      courseType3List: null,
      courseType4List: null,
      feedbackBanner: null,
      advBanner: null
    }
  }

  settings = {
    className: 'center slider-banner',
    mobileFirst: true,
    arrows: false,
    centerMode: true,
    infinite: true,
    centerPadding: '15px',
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    adaptiveHeight: false
  }

  componentDidMount = async () => {
    this.loadTopBannerData()
    this.loadCourseTypeList()
  }

  loadTopBannerData = async () => {
    try {
      const _this = this
      AxiosUtil.get(`/api/adv/getAdvByTypeAndObjId/10/1`).then(function (res) {
        _this.setState({
          topBanner: res
        })

        _this.loadOtherBannerData()
      })
    } catch (e) {
      console.error(e)
    }
  }

  loadOtherBannerData = async () => {
    try {
      const _this = this
      AxiosUtil.get(`/api/adv/getAdvByTypeAndObjId/11/1`).then(function (res) {
        _this.setState({
          feedbackBanner: res
        })
      })
      AxiosUtil.get(`/api/adv/getAdvByTypeAndObjId/12/1`).then(function (res) {
        _this.setState({
          advBanner: res
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  loadCourseTypeList = async () => {
    try {
      const _this = this
      AxiosUtil.get(`/api/learning/courseList/2`).then(function (res) {
        _this.setState({
          courseType2List: res
        })
        _this.loadOtherCourseTypeList()
      })
    } catch (e) {
      console.error(e)
    }
  }

  loadOtherCourseTypeList = async () => {
    try {
      const _this = this
      await AxiosUtil.get(`/api/learning/courseList/3`).then(function (res) {
        _this.setState({
          courseType3List: res
        })
      })
      await AxiosUtil.get(`/api/learning/courseList/4`).then(function (res) {
        _this.setState({
          courseType4List: res
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  renderTopBanner () {
    const {topBanner} = this.state
    if (topBanner) {
      const bannerElements = topBanner.map(function (item, index) {
        return (<div key={index}>
          <a href={item.url}>
            <img className='banner-img' src={item.img} /></a>
        </div>)
      })

      return (<div className='block'>
        <Swiper className='top-banner block-radius' height={150} onChange={(prev, next) => this.setState({demoIndex: next})} >
          {bannerElements}
        </Swiper>
        <style global jsx>{`
          .top-banner {
            overflow: hidden;
          }
          .top-banner .banner-img {
            height: 100%;
            width: 100%;
          }
          .top-banner .react-weui-swiper__item {
            text-align: center;
          }
        `}</style>
      </div>)
    } else {
      return (<div className='block' style={{height: '150px'}}><LoadMore loading>Loading</LoadMore></div>)
    }
  }

  reneerNavbar () {
    return (<div className='college-nav-bar block'>
      <Flex>
        <FlexItem>
          <div className='item'>
            <img src='/static/img/icon/course_type22.png' /><br /><label>限时免费</label>
          </div>
        </FlexItem>
        <FlexItem>
          <div className='item'>
            <a href='#course3'>
              <img src='/static/img/icon/course_type33.png' /><br /><label>精品课程</label>
            </a>
          </div>
        </FlexItem>
        <FlexItem>
          <div className='item'>
            <a href='#course4'>
              <img src='/static/img/icon/course_type44.png' /><br /><label>线上训练营</label>
            </a>
          </div>
        </FlexItem>
        <FlexItem>
          <div className='item'>
            <a href='javascript:;' onClick={() => { location.href = 'https://static.meiqia.com/dist/standalone.html?_=t&eid=63917&agentid=ed8f6b7c96fc339a6fcd6f8985624f82)' }}>
              <img src='/static/img/icon/course_contact11.png' /><br /><label>在线咨询</label>
            </a>
          </div>
        </FlexItem>
        <style global jsx>{`
          .college-nav-bar {

          }
          .college-nav-bar .weui-flex {
            margin: auto -15px;
          }
          .college-nav-bar img {
            width: 50px;
          }
          .college-nav-bar .item {
            text-align: center;
            font-size: 0.7rem;
          }
          .college-nav-bar .item label {
            color: gray;
          }
        `}</style>
      </Flex>
    </div>)
  }

  renderCourseType2 () {
    const {courseType2List} = this.state
    if (courseType2List) {
      const col = 2
      let courseLineArray = []
      for (let i = 0; i < courseType2List.length; i += col) {
        let lineArray = courseType2List.slice(i, i + col)
        if (lineArray.length < col) {
          lineArray = lineArray.concat([col - lineArray.length])
        }
        courseLineArray.push(lineArray)
      }
      let courseElements = courseLineArray.map(function (item, index) {
        return (<Flex key={index}>
          {
            item.map(function (item2, index2) {
              return (<FlexItem key={index2}>
                {item2.cover && <div className='item block-radius'>
                  <a href={item2.path}>
                    <div className='img-block'><img className='img' src={item2.cover} /></div>
                    <div className='info-block'>
                      <h4 className='name wx-line-clamp'>{item2.name}</h4>
                      <p className='info wx-clearfix'><span className='buy-count wx-pull-left'>{item2.buyCount}人学习</span><span className='course-tag wx-pull-right'>限时免费</span></p>
                    </div>
                  </a>
                </div>}
              </FlexItem>)
            })
          }
        </Flex>)
      })

      return (<div className='course-type2 block'>
        <h3 id='course2' className='block-title'>限时免费</h3>
        {courseElements}
        <style global jsx>{`
          .course-type2 {

          }
          .course-type2 .weui-flex {
            margin: 0 -8px;
          }
          .course-type2 .item {
            box-shadow: 2px 2px 54px 10px #f0f0f0;
            background-color: #fff;
            overflow: hidden;
            margin: 8px;
          }
          .course-type2 .item .img-block {
            max-height: 140px;
            overflow: hidden;
            line-height: 1px;
            height: 100px;
          }
          .course-type2 .item .img {
            width: 100%;                  
          }
          .course-type2 .item .info-block {
            padding: 5px 0;
          }
          .course-type2 .item .name,
          .course-type2 .item .info {
            padding: 0 12px;
            margin: 3px 0;
            line-height: 20px;
            height: 20px;
          }
          .course-type2 .buy-count {
            font-size: 0.7rem;
            color: gray;
          }
          .course-type2 .course-tag {
            font-size: 0.7rem;
            color: ${ThemeConfig.color.red};
          }
        `}</style>
      </div>)
    } else {
      return (<div className='block' style={{height: '150px'}}><LoadMore loading>Loading</LoadMore></div>)
    }
  }

  renderCourseType3 () {
    const {courseType3List} = this.state
    if (courseType3List) {
      let courseElements = courseType3List.map(function (item, index) {
        return (<Flex key={index}>
          <FlexItem>
            <div className='item block-radius'>
              <a href={item.path}>
                <div className='img-block'><img className='img' src={item.cover} /></div>
                <div className='info-block'>
                  <h4 className='name wx-line-clamp'>{item.name}</h4>
                  <br /><br /><br />
                  <p className='info wx-clearfix'><span className='buy-count wx-pull-left'>{item.buyCount}人学习</span>
                    <span className='course-tag wx-pull-right'><small>&yen;</small> {item.price}</span></p>
                </div>
              </a>
            </div>
          </FlexItem>
        </Flex>)
      })

      return (<div className='course-type3 block'>
        <h3 id='course3' className='block-title'>精品课程</h3>
        {courseElements}
        <p className='wx-text-center block-tips'><small>更多课程持续更新中</small></p>
        <style global jsx>{`
          .course-type3 {

          }
          .course-type3 .item {
            overflow: hidden;
            position: relative;
          }
          .course-type3 .item .img-block {
            max-height: 180px;
            height: 180px;
          }
          .course-type3 .item .img {
            width: 100%;
          }
          .course-type3 .item .info-block {
            padding: 15px 0;
            position: absolute;
            top: 0;
            width: 100%;
          }
          .course-type3 .item .name,
          .course-type3 .item .info {
            padding: 0 20px;
            margin: 5px 0;
            line-height: 20px;
            height: 20px;
            color: #fff;
          }
        `}</style>
      </div>)
    } else {
      return (<div className='block' style={{height: '150px'}}><LoadMore loading>Loading</LoadMore></div>)
    }
  }

  renderCourseType4 () {
    const {courseType4List} = this.state
    if (courseType4List) {
      let courseElements = courseType4List.map(function (item, index) {
        return (<Flex key={index}>
          <FlexItem>
            <div className='item'>
              <a href={item.path}>
                <div className='img-block block-radius'><img className='img' src={item.cover} /></div>
                <div className='info-block'>
                  <h4 className='name wx-line-clamp'>{item.name}</h4>
                </div>
              </a>
            </div>
          </FlexItem>
        </Flex>)
      })

      return (<div className='block'>
        <h3 id='course4' className='block-title'>线上训练营</h3>
        <div className='course-type4 block-radius'>
          {courseElements}
        </div>
        <p className='wx-text-center block-tips'><small>更多课程持续更新中</small></p>
        <style global jsx>{`
          .course-type4 {
            background-color: #f0f0f0;
            padding: 15px;
          }
          .course-type4 .item {

          }
          .course-type4 .item .img-block {
            max-height: 200px;
            height: 200px;
            overflow: hidden;
          }
          .course-type4 .item .img {
            width: 100%;
          }
          .course-type4 .item .info-block {

          }
          .course-type4 .item .name,
          .course-type4 .item .info {
            margin: 5px 0;
            line-height: 20px;
            height: 20px;
          }
        `}</style>
      </div>)
    } else {
      return (<div className='block' style={{height: '150px'}}><LoadMore loading>Loading</LoadMore></div>)
    }
  }

  renderFeedbackBanner () {
    const {feedbackBanner} = this.state
    if (feedbackBanner) {
      const bannerElements = feedbackBanner.map(function (item, index) {
        return (<div key={index}>
          <a className='block-a' href={item.url}>
            <img className='banner-img' src={item.img} /></a>
        </div>)
      })

      return (<div className='block'>
        <h3 className='block-title'>学员反馈</h3>
        <Slider {...this.settings}>
          {bannerElements}
        </Slider>
        <style global jsx>{`
          .slider-banner {
            margin: 0 -15px;
          }
          .slider-banner .block-a {
            display: inline-block;
            padding: 0 5px;
          }
          .slider-banner .banner-img {
            width: 100%;
          }
        `}</style>
      </div>)
    } else {
      return (<div className='block' style={{height: '150px'}}><LoadMore loading>Loading</LoadMore></div>)
    }
  }

  renderAdvBanner () {
    const {advBanner} = this.state
    if (advBanner) {
      const bannerElements = advBanner.map(function (item, index) {
        return (<div key={index}>
          <a className='block-a' href={item.url}>
            <img className='banner-img' src={item.img} /></a>
        </div>)
      })

      return (<div className='block'>
        <h3 className='block-title'>小灶优势</h3>
        <img className='pic' src='/static/img/college/pic1.png' style={{height: '32px', marginBottom: '10px'}} />
        <Slider {...this.settings}>
          {bannerElements}
        </Slider>
        <img className='pic' src='/static/img/college/pic22.png' style={{width: '100%', margin: '15px 0'}} />
        <h3 className='block-title'>小灶与学校、企业的合作（部分）</h3>
        <img className='pic' src='/static/img/college/pic33.png' style={{width: '100%', margin: '0'}} /><br /><br />
        <img className='pic' src='/static/img/college/pic44.png' style={{width: '100%', margin: '0'}} />
        <style global jsx>{`
          .slider-banner {
            margin: 0 -15px;
          }
          .slider-banner .block-a {
            display: inline-block;
            padding: 0 5px;
          }
          .slider-banner .banner-img {
            width: 100%;
          }
        `}</style>
      </div>)
    } else {
      return (<div className='block' style={{height: '150px'}}><LoadMore loading>Loading</LoadMore></div>)
    }
  }

  render () {
    const {topBanner, courseType2List} = this.state
    return (
      <Layout>
        {(!topBanner || !courseType2List) &&
          <div className='wrapper'>
            <div className='loading'>
              <img className='loading-img' src='/static/img/icon/loading.gif' />
            </div>
          </div>
        }
        <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css' />
        <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css' />
        <div className='main'>
          {topBanner && courseType2List &&
            <div className='content'>
              {this.renderTopBanner()}
              {this.reneerNavbar()}
              {this.renderCourseType2()}
              {this.renderCourseType3()}
              {this.renderCourseType4()}
              {this.renderFeedbackBanner()}
              {this.renderAdvBanner()}
            </div>
          }
          <Footer type='college' />
        </div>
        <style jsx>{`
          .content {
            padding: 0 15px 5rem 15px;
          }
          .wrapper {
            display: table;
            height: 90vh;
            width: 100%;
          }
          .loading {
            display: table-cell;
            vertical-align: middle;
          }
          .loading-img {
            width: 100%;
          }
        `}</style>
        <style global jsx>{`
          .block {
            padding: 15px 0;
          }
          .block-title {
            margin: 0 0 15px 0;
          }
          .block-radius {
            border-radius: 8px;
          }
          .block-tips {
            margin: 5px 0;
          }
          a {
            color: initial;
          }
        `}</style>
      </Layout>
    )
  }
}
