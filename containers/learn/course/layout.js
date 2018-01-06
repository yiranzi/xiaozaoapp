import React from 'react'
import DataUtil from '../../../util/data'
import classNames from 'classnames'
import {Cell, CellHeader, CellBody, CellFooter, Icon} from 'react-weui'
import ThemeConfig from '../../../config/theme'
import Layout from '../../../components/layout'
import Footer from '../../../containers/learn/footer'
import Button from '../../../xz-components/button'
import Popup from '../../../xz-components/popup'
import LoadingIcon from '../../../xz-components/loadingicon'
import Accordion from '../../../xz-components/accordion'

const {Panel} = Accordion

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      courseMenuShow: false,
      homeWorkShow: false
    }
  }
  toggleCourseMenuPop () {
    this.setState({
      courseMenuShow: !this.state.courseMenuShow
    })
  }
  renderCourseMenu () {
    const {query, menuContent} = this.props
    const {courseId, menuId, sectionId} = query
    const {menuDTOList} = menuContent
    const {courseMenuShow} = this.state

    return (
      <Popup
        key='courseMenu'
        show={courseMenuShow}
        onRequestClose={() => { this.toggleCourseMenuPop() }}
        position='left'
        close={false}
      >
        {DataUtil.isEmpty(menuDTOList) ? <LoadingIcon /> : (
          <div className='course-menu'>
            <div className='title'>{menuContent.courseName}</div>
            <div className='content'>
              {menuDTOList.map((menu, index) => {
                return (
                  <Accordion
                    show={Number(menu.id) === Number(menuId)}
                    key={`accord_${index}`}
                    header={<div className='wrap'><span className='file' />{menu.name}</div>}
                  >
                    {menu.sectionMenuDTOList && menu.sectionMenuDTOList.map((section, index) => {
                      return (
                        <Panel key={`section_${index}`} className={classNames({'active': Number(section.id) === Number(sectionId)})}>
                          <Cell access>
                            <CellHeader><span className='icon' /></CellHeader>
                            <CellBody>
                              <a
                                onClick={() => {
                                  this.toggleCourseMenuPop()
                                  location.href = `/learn/course/detail?courseId=${courseId}&menuId=${menu.id}&sectionId=${section.id}&pageNumber=1`
                                }}
                              >{section.name}</a>
                            </CellBody>
                            <CellFooter />
                          </Cell>
                        </Panel>
                      )
                    })}
                  </Accordion>
                )
              })}
            </div>
          </div>
        )}
        <style jsx>{`
          .title {
            text-align: center;
            font-weight: bold;
          }
          li {
            list-style-type: none;
          }
          li.active {
            color: red;
          }
          span.file {
            display: inline-block;
            width: 20px;
            height: 20px;
            margin-right: 10px;
            background: url(/static/img/learn/course/file.png) no-repeat;
            background-size: 100%;
          }
          span.icon {
            display: inline-block;
            width: 10px;
            height: 10px;
            margin-right: 10px;
            background-color: #3ea6f7;
            border-radius: 1rem;
          }
        `}</style>
      </Popup>
    )
  }
  toggleHomeWorkPop () {
    this.setState({
      homeWorkShow: !this.state.homeWorkShow
    })
  }
  renderHomeWork () {
    const {homeWorkShow} = this.state
    const {homeworkContent, onChangeHomeWork} = this.props

    return (
      <Popup
        key='homework'
        show={homeWorkShow}
        onRequestClose={() => { this.toggleHomeWorkPop() }}
        position='right'
        close={false}
      >
        {DataUtil.isEmpty(homeworkContent) ? <LoadingIcon /> : (
          <div className='homework'>
            {homeworkContent.map((chapter, index) => {
              return (
                <div className='chapter' key={`h_${index}`}>
                  <div className='header'><img src='/static/img/learn/course/file.png' />{chapter.chapterName}</div>
                  {chapter.childLearningCourseWorkDTOList.map((work, index) => {
                    return (
                      <div key={`w_${index}`} className='work wx-space-center' onClick={() => { this.toggleHomeWorkPop(); onChangeHomeWork(work) }}>
                        <div className='sub-title'>{work.title}</div>
                        <div className='over'>{work.overWork ? <Icon style={{color: '#3ea6f7', fontSize: '1rem'}} value='success-no-circle' /> : <Icon style={{color: ThemeConfig.color.content, fontSize: '1rem'}} value='success-no-circle' />}</div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        )}
        <style jsx>{`
          .chapter {
            margin-top: 20px;
          }
          .homework {
            padding: 10px;
          }
          .header {
            font-weight: bold;
          }
          .header img {
            width: 20px;
            height: 20px;
          }
          .title {
            text-align: center;
          }
          li {
            list-style-type: none;
          }
        `}</style>
      </Popup>
    )
  }

  render () {
    return (
      <Layout>
        <div className='course-page'>
          <div className='header wx-space-center'>
            <div className='course-menu' onClick={() => { this.toggleCourseMenuPop() }}>...</div>
            <Button
              type='normal'
              style={{width: 'auto', borderColor: ThemeConfig.color.content, color: ThemeConfig.color.content}}
              onClick={() => { this.toggleHomeWorkPop() }}
            >作业</Button>
          </div>
          {this.props.children}
        </div>
        <div className='popup'>
          {this.renderCourseMenu()}
          {this.renderHomeWork()}
        </div>
        <Footer type='learn' courseId={this.props.query.courseId} />
        <style jsx>{`
          .course-page {
            padding: 1rem;
            background-color: #F8F8F8;
            min-height: 100vh;
          }
          .course-menu {
            width: 1.5rem;
            height: 1.5rem;
            line-height: 1rem;
            text-align: center;
            border: 1px solid #646464;
            border-radius: 1rem;
          }
        `}</style>
      </Layout>
    )
  }
}
