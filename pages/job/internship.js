import React from 'react'
import AxiosUtil from '../../util/axios'
import JobLayout from '../../containers/job/layout'
import DateUtil from '../../util/date'
import { Button, Panel, PanelBody, MediaBox, MediaBoxHeader, MediaBoxTitle,
  MediaBoxBody, LoadMore,
  SearchBar, Tab, NavBar, NavBarItem, TabBody} from 'react-weui'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: null,
      params: {
        cityIdList: [54],
        sectionIdList: [],
        pn: 0
      },
      tab: 0,
      isRender: true,
      dataState: 'none', /* none 未加载，loading 正在加载，null 没有数据，more 继续加载 */
      error: ''
    }
  }

  componentDidMount = async () => {
    this.setState({dataState: 'loading'})
    try {
      let list = await AxiosUtil.post('/api/private/job/internship', this.state.params)
      console.log(list)

      this.setState({
        list: list,
        isRender: false
      })
    } catch (e) {
      this.setState({
        isRender: false,
        error: e.message
      })
    }
  }

  handleSearchBarChange (e) {
    console.log(e)
    location.href = '/job/search'
    e.stopPropagation()
    return false
  }

  handleCollectionChange (e, id) {
    console.log(e)
    console.log(id)
    e.stopPropagation()
    return false
  }

  toJob = (id) => {
    location.href = '/job?jobId=' + id
  }

  renderSearchBar () {
    return <div onClick={e => this.handleSearchBarChange(e)}>
      <SearchBar
        placeholder='搜索职位或公司'
        lang={{
          cancel: '取消'
        }} />
    </div>
  }

  renderBanner () {
    // return <Banner />
  }

  renderTabbar () {
    return <Tab>
      <NavBar>
        <NavBarItem active={this.state.tab === 0}
          onClick={e => this.setState({tab: 0})}>名企实习</NavBarItem>
      </NavBar>
      <TabBody>
        <Panel>
          {this.renderList()}
        </Panel>
      </TabBody>
    </Tab>
  }

  renderList () {
    const {list} = this.state
    if (list) {
      const listElement = list.data.map((item, index) => {
        return <div key={index} className='job-item'
          onClick={e => this.toJob(item.id)}>
          <MediaBox type='appmsg'>
            <MediaBoxHeader><img className='company-logo'
              src={item.companyLogo} /></MediaBoxHeader>
            <MediaBoxBody>
              <a href='javascript:;'
                onClick={e => this.handleCollectionChange(e, item.id)}
                className='wx-pull-right'>★☆收藏</a>
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
      })
      return <PanelBody>
        {listElement}
        {this.state.dataState === 'none' && <LoadMore showLine showDot />}
        {this.state.dataState === 'more' && <Button type='default'>More</Button>}
      </PanelBody>
    } else {
      return <PanelBody className='wx-text-center'>
        {this.state.dataState === 'loading' && <LoadMore loading>Loading</LoadMore>}
        {this.state.dataState === 'null' && <LoadMore showLine>No Data</LoadMore>}
      </PanelBody>
    }
  }

  render () {
    return (
      <JobLayout tabbar>
        {this.renderSearchBar()}
        {this.renderBanner()}
        <div className='job-list'>
          {this.renderTabbar()}
        </div>
        <style global jsx>{`
          .job-list {

          }
        `}</style>
      </JobLayout>
    )
  }
}
