import React from 'react'
import Link from 'next/link'
import DataUtil from '../../../util/data'
import classNames from 'classnames'
import {Cells, Cell, CellHeader, CellBody, CellFooter, Icon} from 'react-weui'
import ThemeConfig from '../../../config/theme'
import Layout from '../../../components/layout'
import Footer from '../../../containers/learn/footer'
import Button from '../../../xz-components/button'
import Popup from '../../../xz-components/popup'
import LoadingIcon from '../../../xz-components/loadingicon'
import Accordion from '../../../xz-components/accordion'
import Router from 'next/router'

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
                    show={menu.id.toString() === menuId.toString()}
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
                                className='section'
                                onClick={() => {
                                  this.toggleCourseMenuPop()
                                  let url = `/learn/course/detail?courseId=${courseId}&menuId=${menu.id}&sectionId=${section.id}&pageNumber=1`
                                  Router.replace(url)
                                  window.history.go(0)
                                }}
                              >{section.name}</a>
                            </CellBody>
                            <CellFooter />
                          </Cell>
                        </Panel>
                      )
                    })}
                    {menu.afterTestId && (
                      <Cells>
                        <Cell access>
                          <CellHeader><span className='blank' /></CellHeader>
                          <CellBody><Link href={`/learn/course/testDetail?courseId=${query.courseId}&testId=${menu.afterTestId}`}><a className='wx-block'>测试</a></Link></CellBody>
                          <CellFooter />
                        </Cell>
                      </Cells>
                    )}
                  </Accordion>
                )
              })}
            </div>
          </div>
        )}
        <style jsx>{`
          .course-menu {
            padding: 0.5rem;
          }
          .title {
            text-align: center;
            font-weight: bold;
            padding: 0.5rem;
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
          span.blank {
            display: inline-block;
            width: 10px;
            height: 10px;
            margin-right: 10px;
            border-radius: 1rem;
          }
          span.icon {
            display: inline-block;
            width: 10px;
            height: 10px;
            margin-right: 10px;
            background-color: #3ea6f7;
            border-radius: 1rem;
          }
          a.section {
            font-size: 0.85rem;
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
    const {query, homeworkContent, menuContent} = this.props

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
            <div className='title'><img src='/static/img/learn/cover_long.jpeg' /><h2 className='course-name'>{menuContent.courseName}</h2></div>
            {homeworkContent.map((chapter, index) => {
              return (
                <div className='chapter' key={`h_${index}`}>
                  <div className='header wx-space-left'><img src='/static/img/learn/course/file.png' /><span>{chapter.chapterName}</span></div>
                  {chapter.childLearningCourseWorkDTOList.map((work, index) => {
                    return (
                      <div key={`w_${index}`} className='work wx-space-center' onClick={() => {
                        let url = `/learn/course/detail?courseId=${query.courseId}&menuId=${work.chapterId}&sectionId=${work.sectionId}&pageNumber=${work.pageNumber}`
                        Router.replace(url)
                        window.history.go(0)
                      }}>
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
          .homework {
            min-height: 100%;
            background-color: #fff;
          }
          .title {
            position: relative;
            color: #fff;
          }
          .title img{
            width: 100%;
          }
          .title .course-name {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
          .chapter {
            padding: 1rem 1.5rem;
          }
          .chapter img,
          .chapter span {
            display: block;
          }
          .homework 
          .header {
            display: flex;
            align-items: center;
            font-weight: bold;
          }
          .header img {
            display: block;
            width: 20px;
            height: 20px;
          }
          .header span {
            display: block;
          }
          .work {
            margin-top: 5px;
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
            <div className='course-menu-btn' onClick={() => { this.toggleCourseMenuPop() }}>...</div>
            <Button
              type='normal'
              size='small'
              style={{borderColor: ThemeConfig.color.content, color: ThemeConfig.color.content}}
              onClick={() => { this.toggleHomeWorkPop() }}
            >作业</Button>
          </div>
          <div style={{paddingTop: '4rem'}}>
            {this.props.children}
          </div>
        </div>
        <div className='popup'>
          {this.renderCourseMenu()}
          {this.renderHomeWork()}
        </div>
        <Footer type='learn' courseId={this.props.query.courseId} />
        <style jsx>{`
          .course-page {
            background-color: #F8F8F8;
            min-height: 100vh;
          }
          .header {
            padding: 0.5rem 1rem;
            position: fixed;
            z-index: 1;
            width: 100%;
            box-sizing: border-box;
            background-color: #fff;
          }
          .course-menu-btn {
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
