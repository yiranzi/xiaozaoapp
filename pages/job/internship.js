import React from 'react'
import AxiosUtil from '../../util/axios'
import JobLayout from '../../containers/job/layout'
import ToolsUtil from '../../util/tools'
import DateUtil from '../../util/date'
import Banner from '../../xz-components/banner'
import { Button, Panel, PanelBody, MediaBox, MediaBoxHeader, MediaBoxTitle,
  MediaBoxBody, LoadMore, InfiniteLoader, Popup,
  SearchBar, Tab, NavBar, NavBarItem, TabBody} from 'react-weui'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: {
        data: [],
        totalSize: 0
      },
      params: {
        city: '全国',
        cityIdList: [],
        section: '全部',
        sectionIdList: [],
        pn: 1,
        inside: true
      },
      tab: 0,
      bannerList: null,
      cityList: null,
      sectionList: null,
      cityfullpage_show: false,
      sectionfullpage_show: false,
      isRender: true,
      dataState: 'none', /* none 未加载，loading 正在加载，null 没有数据，more 继续加载 */
      error: ''
    }
  }

  componentDidMount = async () => {
    const city = ToolsUtil.getQueryString('city')
    const inside = ToolsUtil.getQueryString('inside')
    if (city) {
      this.state.params.cityIdList[0] = Number(city)
    }
    if (inside) {
      this.state.params.inside = inside === 'true' ? true : null
      this.state.tab = this.state.params.inside ? 0 : 1
    }
    if (city || inside) {
      this.setState({params: this.state.params})
    }
    this.loadBannerList()
    this.loadCityData()
    this.loadSectionData()
    this.loadJobList(true)
  }

  loadBannerList = async () => {
    const type = 8
    try {
      let bannerList = await AxiosUtil.get(`/api/adv/getAdvByTypeAndObjId/${type}/1`)
      this.setState({
        bannerList: bannerList
      })
    } catch (e) {
      this.setState({
        isRender: false,
        error: e.message
      })
    }
  }

  loadCityData = async () => {
    try {
      let cityList = await AxiosUtil.get('/api/dictionary/city')
      this.setState({
        cityList: cityList
      })
      if (cityList && this.state.params.cityIdList.length > 0) {
        const _this = this
        cityList.map(function (item, index) {
          if (_this.state.params.cityIdList[0] === item.id) {
            _this.state.params.city = item.name
            _this.setState({params: _this.state.params})
          }
        })
      }
    } catch (e) {
      this.setState({
        isRender: false,
        error: e.message
      })
    }
  }

  loadSectionData = async () => {
    try {
      let sectionList = await AxiosUtil.get('/api/dictionary/section')
      this.setState({
        sectionList: sectionList
      })
    } catch (e) {
      this.setState({
        isRender: false,
        error: e.message
      })
    }
  }

  loadJobList = async (isConcat) => {
    this.setState({dataState: 'loading'})
    try {
      let pageList = await AxiosUtil.post('/api/private/job/internship',
        this.state.params)
      this.state.params.pn = this.state.params.pn + 1
      if (pageList) {
        let {list} = this.state
        list.totalSize = pageList.totalSize
        list.data = isConcat ? list.data.concat(pageList.data) : pageList.data

        this.setState({
          list: list,
          isRender: false
        })
      }
    } catch (e) {
      this.setState({
        isRender: false,
        error: e.message
      })
    }
  }

  selectCity (e, name, id) {
    this.state.params.city = name
    this.state.params.cityIdList = (id === null ? [] : [id])
    this.state.params.pn = 1
    this.setState({
      params: this.state.params,
      cityfullpage_show: false
    })
    this.loadJobList(false)
  }

  selectSection (e, name, id) {
    this.state.params.section = name
    this.state.params.sectionIdList = (id === null ? [] : [id])
    this.state.params.pn = 1
    this.setState({
      params: this.state.params,
      sectionfullpage_show: false
    })
    this.loadJobList(false)
  }

  handleSearchBarChange (e) {
    location.href = '/job/search'
    e.stopPropagation()
    return false
  }

  handleCollectionChange (e, id) {
    console.log(id)
    e.stopPropagation()
    return false
  }

  toJob = (id) => {
    location.href = '/job/detail?jobId=' + id
  }

  onLoadMore (resolve, finish) {
    setTimeout(() => {
      if (this.state.list.data.length >= this.state.list.totalSize) {
        finish()
      } else {
        this.loadJobList(true)
        this.setState({
        }, () => resolve())
      }
    }, 1000)
  }

  changeTabbar (tab) {
    if (tab === this.state.tab) {
      return
    }
    if (tab === 0) {
      this.state.params.inside = true
    } else {
      this.state.params.inside = null
    }
    this.state.params.pn = 1
    this.setState({tab: tab, params: this.state.params})
    this.loadJobList(false)
  }

  renderSearchBar () {
    return <div onClick={e => this.handleSearchBarChange(e)} className='wx-top-fixed'>
      <SearchBar
        placeholder='搜索职位或公司'
        lang={{
          cancel: '取消'
        }} />
    </div>
  }

  renderBanner () {
    return <Banner bannerList={this.state.bannerList} />
  }

  renderSelect () {
    const city = this.state.params.city
    const section = this.state.params.section
    return <div className='selects'>
      城市：<span className='param'
        onClick={e => this.setState({cityfullpage_show: true})}>
        {city}</span>
      职能：<span className='param'
        onClick={e => this.setState({sectionfullpage_show: true})}>
        {section}</span>
      <style jsx>{`
        .selects {
          padding: 10px 15px;
          font-size: 16px;
          border-bottom: 1px solid #ddd;
        }
        .param {
          margin-right: 20px;
          margin-left: 10px;
        }
        .param:after {
          content: ' v'
        }
      `}</style>
    </div>
  }

  renderCityPopup () {
    const {cityList} = this.state
    if (cityList) {
      const cityElements = cityList.map((item, index) => {
        return <Button key={index} size='small' className='select-btn'
          onClick={e => this.selectCity(e, item.name, item.id)}>{item.name}</Button>
      })
      return (
        <div>
          <Popup
            show={this.state.cityfullpage_show}
            onRequestClose={e => this.setState({cityfullpage_show: false})}>
            <div className='select-list'
              onClick={e => this.setState({cityfullpage_show: false})}>
              <h3 className='label'>选择城市：</h3>
              <div>
                <Button size='small' className='select-btn'
                  onClick={e => this.selectCity(e, '全国', null)}>全国</Button>
                {cityElements}
              </div>
            </div>
          </Popup>
          <style jsx>{`
            .label {
              margin: 15px;
            }
            .selects {
              padding: 15px;
            }
            .param {
              margin-right: 10px;
            }
            .param:after {
              content: ' v'
            }
            .select-list {
              height: 100vh;
              overflow: scroll;
            }
          `}</style>
        </div>
      )
    }
  }

  renderSectionPopup () {
    const {sectionList} = this.state
    if (sectionList) {
      const sectionElements = sectionList.map((item, index) => {
        return <Button key={index} size='small' className='select-btn'
          onClick={e => this.selectSection(e, item.name, item.id)}>{item.name}</Button>
      })
      return (
        <div>
          <Popup
            show={this.state.sectionfullpage_show}
            onRequestClose={e => this.setState({sectionfullpage_show: false})}>
            <div className='select-list'
              onClick={e => this.setState({sectionfullpage_show: false})}>
              <h3 className='label'>选择职能：</h3>
              <div>
                <Button size='small' className='select-btn'
                  onClick={e => this.selectSection(e, '全部', null)}>全部</Button>
                {sectionElements}
              </div>
            </div>
          </Popup>
          <style jsx>{`
            .label {
              margin: 15px;
            }
            .selects {
              padding: 15px;
            }
            .param {
              margin-right: 10px;
            }
            .param:after {
              content: ' v'
            }
            .select-list {
              height: 100vh;
              overflow: scroll;
            }
          `}</style>
        </div>
      )
    }
  }

  renderTabbar () {
    return (
      <Tab>
        <NavBar>
          <NavBarItem active={this.state.tab === 0}
            onClick={e => this.changeTabbar(0)}>HR直聘</NavBarItem>
          <NavBarItem active={this.state.tab === 1}
            onClick={e => this.changeTabbar(1)}>全部职位</NavBarItem>
        </NavBar>
        <TabBody>
          <Panel>
            {this.renderSelect()}
            {this.renderList()}
          </Panel>
        </TabBody>
      </Tab>
    )
  }

  renderList () {
    const {list} = this.state
    if (list) {
      const listElement = list.data.map((item, index) => {
        return (
          <div key={index} className='job-item'
            onClick={e => this.toJob(item.id)}>
            <MediaBox type='appmsg'>
              <MediaBoxHeader><img className='company-logo'
                src={item.companyLogo} /></MediaBoxHeader>
              <MediaBoxBody>
                {/* <a href='javascript:;'
                  onClick={e => this.handleCollectionChange(e, item.id)}
                  className='wx-pull-right'>★☆收藏</a> */}
                {item.inside && <span className='wx-pull-right hr-inside'>HR直聘</span>}
                <MediaBoxTitle className='title'>{item.title}</MediaBoxTitle>
                <MediaBoxTitle className='info'>{item.companyName}</MediaBoxTitle>
                <MediaBoxTitle className='info'>{item.address}
                  <span className='wx-pull-right'>
                    {DateUtil.format(item.createTime, 'MM月dd日')}</span></MediaBoxTitle>
              </MediaBoxBody>
            </MediaBox>
            {item.comment &&
              <div className='comment'>
                <img className='comment-icon'
                  src='/static/img/common/recommend.png' /> {item.comment}
              </div>
            }
            <div className='tags'>
              {item.trade && <span className='tagName'>{item.trade}</span>}
              {item.tagName && <span className='tagName'>{item.tagName}</span>}
            </div>
            <style jsx>{`
              .company-logo {
                width: 50px;
                height: 50px;
                border-radius: 8px;
                border: 1px solid #ddd;
              }
              .job-item {
                padding-bottom: 15px;
                border-bottom: 1px dotted #ddd;
                color: #6f6f6f;
              }
              .comment,
              .tags {
                padding: 0 15px;
                margin-bottom: 5px;
              }
              .comment-icon {
                width: 20px;
                margin: 0 0 -3px 0;
              }
              .tagName {
                background-color: #efefef;
                color: #666;
                margin-right: 5px;
                padding: 2px 4px;
              }
              .hr-inside {
                color: #F7412D;
              }
            `}</style>
            <style global jsx>{`
              .title {
                font-size: 16px !important;
                width: 70% !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
                white-space: nowrap !important;
              }
              .info {
                font-size: 14px !important;
              }
            `}</style>
          </div>
        )
      })
      return (
        <PanelBody>
          {listElement}
          {this.state.dataState === 'none' && <LoadMore showLine>No Data</LoadMore>}
          {this.state.dataState === 'more' && <Button type='default'>More</Button>}
        </PanelBody>
      )
    } else {
      return (
        <PanelBody className='wx-text-center'>
          {this.state.dataState === 'loading' && <LoadMore loading>Loading</LoadMore>}
          {this.state.dataState === 'null' && <LoadMore showLine>No Data</LoadMore>}
        </PanelBody>
      )
    }
  }

  render () {
    return (
      <JobLayout tabbar={1} footer>
        {this.renderSearchBar()}
        <br /><br />
        <InfiniteLoader
          onLoadMore={(resolve, finish) => this.onLoadMore(resolve, finish)}>
          {this.renderBanner()}
          <div className='job-list'>
            {this.renderTabbar()}
          </div>
        </InfiniteLoader>
        {this.renderCityPopup()}
        {this.renderSectionPopup()}
        <style global jsx>{`
          .job-list {

          }
          .react-weui-infiniteloader {
            overflow: scroll;
          }
          .weui-popup {
            position: fixed;
            left: 0;
            bottom: 0;
            -webkit-transform: translate(0, 100%);
            -ms-transform: translate(0, 100%);
            transform: translate(0, 100%);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            z-index: 5000;
            width: 100%;
            background-color: #EFEFF4;
            -webkit-transition: -webkit-transform .3s;
            transition: -webkit-transform .3s;
            transition: transform .3s;
            transition: transform .3s, -webkit-transform .3s;
          }
          .weui-popup_toggle {
            -webkit-transform: translate(0, 0);
            -ms-transform: translate(0, 0);
            transform: translate(0, 0);
          }
          .select-btn {
            margin-left: 15px !important;
          }
        `}</style>
      </JobLayout>
    )
  }
}
