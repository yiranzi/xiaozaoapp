import React from 'react'
import AxiosUtil from '../../util/axios'
import JobLayout from '../../containers/job/layout'
import ThemeConfig from '../../config/theme'
import { Button, Panel, PanelHeader, PanelBody, MediaBox, MediaBoxTitle,
  MediaBoxDescription, MediaBoxInfo, MediaBoxInfoMeta, LoadMore } from 'react-weui'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: null,
      isRender: true,
      dataState: 'none', /* none 未加载，loading 正在加载，null 没有数据，more 继续加载 */
      error: ''
    }
  }

  componentDidMount = async () => {
    this.setState({dataState: 'loading'})
    try {
      const groupId = 1
      let list = await AxiosUtil({method: 'get', url: `/api/forum/getList/${groupId}`})

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

  toLink = (id) => {
    location.href = '/forum/topic/detail?topicId=' + id
  }

  renderSearchBar () {
    return <PanelHeader className='group-title'>
      7天群面闪电计划讨论区
      <style jsx>{`
        .group-title {

        }
      `}</style>
    </PanelHeader>
  }

  renderBanner () {
    return <PanelHeader className='group-title'>
      7天群面闪电计划讨论区
      <style jsx>{`
        .group-title {

        }
      `}</style>
    </PanelHeader>
  }

  renderList () {
    const {list} = this.state
    if (list) {
      const listElement = list.data.map((item, index) => {
        return <MediaBox type='text' key={index} className='topic-item' onClick={e => this.toLink(item.id)}>
          <MediaBoxInfo>
            <MediaBoxInfoMeta><img className='headimg' src={item.headimgurl} /></MediaBoxInfoMeta>
            <MediaBoxInfoMeta>{item.nickname}</MediaBoxInfoMeta>
            <MediaBoxInfoMeta extra>{item.createTime}</MediaBoxInfoMeta>
          </MediaBoxInfo>
          <MediaBoxTitle>{item.title}</MediaBoxTitle>
          <MediaBoxDescription>
            {item.simpleContent}
          </MediaBoxDescription>
          <style jsx>{`
            .headimg {
              width: 20px;
              height: 20px;
              border-radius: 10px;
              border: 1px solid ${ThemeConfig.color.gray}
            }
            .nickname {

            }
            .create-time {

            }
          `}</style>
        </MediaBox>
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

  renderPublishBtn () {
    return <div>
      <a className='publish-btn' href='/forum/topic/publish'>+</a>
      <style jsx>{`
      .publish-btn {
        position: absolute;
        width: 35px;
        height: 35px;
        border-radius: 20px;
        border: 1px solid ${ThemeConfig.color.gray};
        bottom: 70px;
        right: 20px;
        background-color: red;
        color: #fff;
        line-height: 30px;
        text-align: center;
        font-size: 30px;
      }
    `}</style>
    </div>
  }

  render () {
    return (
      <JobLayout tabbar>
        <div className='job-list'>
          <Panel>
            {this.renderSearchBar()}
            {this.renderBanner()}
            {this.renderList()}
          </Panel>
          {this.renderPublishBtn()}
        </div>
        <style global jsx>{`
          .job-list {

          }
        `}</style>
      </JobLayout>
    )
  }
}
