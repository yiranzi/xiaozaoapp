import React from 'react'
import ToolsUtil from '../../../util/tools'
import Layout from '../../../components/layout'
import FixFooter from '../../../xz-components/fixfooter'
import AxiosUtil from '../../../util/axios'
import ThemeConfig from '../../../config/theme'
import {
  Panel,
  PanelHeader,
  PanelBody,
  MediaBox,
  MediaBoxTitle,
  MediaBoxDescription,
  LoadMore
} from 'react-weui'
import Button from '../../../xz-components/button'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      query: {
        courseId: null
      },
      list: null
    }
  }

  componentDidMount = async () => {
    let courseId = ToolsUtil.getQueryString('courseId')
    this.state.query.courseId = courseId
    this.setState({
      query: this.state.query})
    this.loadData()
  }

  loadData = async () => {
    try {
      const {courseId} = this.state.query
      if (courseId) {
        const list = await AxiosUtil.get(`/api/learning/getResource/${courseId}`)
        this.setState({list: list})
      }
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
  }

  renderList () {
    const {list} = this.state
    if (list) {
      const listElement = list.map(function (item, index) {
        return (<MediaBox type='text' key={index}>
          <MediaBoxTitle>{item.title}</MediaBoxTitle>
          <MediaBoxDescription dangerouslySetInnerHTML={{__html: item.content}} className='resource-content' />
          <p className='wx-text-right'>
            <a href={item.path}><Button className='download-btn'>下载</Button></a>
          </p>
        </MediaBox>)
      })
      return (<Panel>
        <PanelHeader className='wx-text-center'>
          资料下载
        </PanelHeader>
        <PanelBody>
          {list.length > 0 && listElement}
          {list.length === 0 && <LoadMore showLine>No Data</LoadMore>}
        </PanelBody>
        <style global jsx>{`
          .weui-media-box__desc {
            display: block !important;
          }
          .resource-content {
            background-color: #fff;
            border: 1px solid ${ThemeConfig.color.border};
            padding: 15px;
          }
          .download-btn {
            width: auto !important;
          }
          .weui-panel {
            background-color: transparent !important;
          }
        `}</style>
      </Panel>)
    }
  }

  render () {
    return (
      <Layout className='main-style'>
        {this.renderList()}
        <FixFooter>继续学习</FixFooter>
        <style global jsx>{`
          .main-style {
            background-color: ${ThemeConfig.color.gray};
            height: 100vh;
          }
        `}</style>
      </Layout>
    )
  }
}
