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
  jumpTo (courseId, menuId, sectionId, pageNumber) {
    if (this.state.courseMenuShow) {
      this.toggleCourseMenuPop()
    }
    if (this.state.homeWorkShow) {
      this.toggleHomeWorkPop()
    }
    let url = `/learn/course/detail?courseId=${courseId}&chapterId=${menuId}&sectionId=${sectionId}&pageNumber=${pageNumber}`
    Router.replace(url)
    window.history.go(0)
  }
  renderType (name, type) {
    if (type === 'written-test') {
      return <div className='wrap'><span className='written' />{name}（请在电脑端完成笔试）</div>
    } else {
      return <div className='wrap'><span className='file' />{name}</div>
    }
  }
  renderMenuStatus (overSection, querySectionId, sectionId) {
    let unFinishStyle = {
      'display': 'inline-block',
      'width': '10px',
      'height': '10px',
      'marginRight': '10px',
      'borderRadius': '1rem',
      'backgroundColor': '#646464'
    }
    let finishStyle = {
      'display': 'inline-block',
      'width': '10px',
      'height': '10px',
      'marginRight': '10px',
      'borderRadius': '1rem',
      'backgroundColor': '#3ea6f7'
    }
    let currentStyle = {
      'display': 'inline-block',
      'width': '10px',
      'height': '10px',
      'marginRight': '10px',
      'borderRadius': '1rem',
      'backgroundColor': 'red'
    }

    if (querySectionId.toString() === sectionId.toString()) {
      return <span className='current' style={currentStyle} />
    } else {
      if (overSection) {
        return <span className='finish-icon' style={finishStyle} />
      } else {
        return <span className='unfinish-icon' style={unFinishStyle} />
      }
    }
  }
  accordionIsShow (menuId, chapterId) {
    if (menuId && chapterId) {
      if (menuId.toString() === chapterId.toString()) {
        return true
      }
    }
    return false
  }
  renderCourseMenu () {
    const {query, menuContent} = this.props
    const {courseId, chapterId, sectionId} = query
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
                    show={this.accordionIsShow(menu.id, chapterId)}
                    key={`accord_${index}`}
                    header={this.renderType(menu.name, menu.type)}
                  >
                    {menu.preTestId && (
                      <Cells>
                        <Cell access>
                          <CellHeader><span className='blank' /></CellHeader>
                          <CellBody><Link href={`/learn/course/testDetail?courseId=${query.courseId}&testId=${menu.preTestId}`}><a className='wx-block'>课前测试</a></Link></CellBody>
                          <CellFooter />
                        </Cell>
                      </Cells>
                    )}
                    {menu.sectionMenuDTOList && menu.sectionMenuDTOList.map((section, index) => {
                      return (
                        <a key={`section_${index}`} onClick={() => { this.jumpTo(courseId, menu.id, section.id, 1) }}>
                          <Panel className={classNames({'active': Number(section.id) === Number(sectionId)})}>
                            <Cell access>
                              <CellHeader>{this.renderMenuStatus(section.overSection, query.sectionId, section.id)}</CellHeader>
                              <CellBody>{section.name}</CellBody>
                              <CellFooter />
                            </Cell>
                          </Panel>
                        </a>
                      )
                    })}
                    {menu.secondMenuDTOList && menu.secondMenuDTOList.map((section, index) => {
                      return (
                        <a key={`section_${index}`}>
                          <Panel className={classNames({'active': Number(section.id) === Number(sectionId)})}>
                            <Cell access>
                              <CellHeader><span className='icon' /></CellHeader>
                              <CellBody>{section.name}</CellBody>
                              <CellFooter />
                            </Cell>
                          </Panel>
                        </a>
                      )
                    })}
                    {menu.afterTestId && (
                      <Cells>
                        <Cell access>
                          <CellHeader><span className='blank' /></CellHeader>
                          <CellBody><Link href={`/learn/course/testDetail?courseId=${query.courseId}&testId=${menu.afterTestId}`}><a className='wx-block'>课后测试</a></Link></CellBody>
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
          span.blank {
            display: inline-block;
            width: 10px;
            height: 10px;
            margin-right: 10px;
            border-radius: 1rem;
          }
          a {
            width: 100%;
          }
        `}</style>
        <style jsx global>{`
          span.file {
            display: inline-block;
            width: 20px;
            height: 20px;
            margin-right: 10px;
            background: url(/static/img/learn/course/file.png) no-repeat;
            background-size: 100%;
          }
          span.written {
            display: inline-block;
            width: 20px;
            height: 20px;
            margin-right: 10px;
            background: url(/static/img/icon/written.png) no-repeat;
            background-size: contain;
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
  renderHomeWorkShow (chapter, query) {
    let { workId } = query
    if (DataUtil.isEmpty(workId)) {
      return false
    }
    let res = false
    chapter.childLearningCourseWorkDTOList.map((item, index) => {
      if (workId.indexOf(item.workId) >= 0) {
        res = true
      }
    })
    return res
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
                <Accordion
                  show={this.renderHomeWorkShow(chapter, query)}
                  key={`homework_${index}`}
                  header={(<div className='header wx-space-left'><img src='/static/img/learn/course/file.png' /><span style={{marginLeft: '0.5rem'}}>{chapter.chapterName}</span></div>)}
                >
                  {chapter.childLearningCourseWorkDTOList.map((work, index) => {
                    return (
                      <a
                        key={`section_homework_${index}`}
                        style={{width: '100%'}}
                        onClick={() => { this.jumpTo(query.courseId, work.chapterId, work.sectionId, work.pageNumber) }}>
                        <Panel>
                          <Cell>
                            <CellHeader><span className='icon' /></CellHeader>
                            <CellBody>{work.title} <span className='over' style={{float: 'right'}}>{work.overWork && <Icon style={{color: '#3ea6f7', fontSize: '1rem'}} value='success-no-circle' />}</span></CellBody>
                            <CellFooter />
                          </Cell>
                        </Panel>
                      </a>
                    )
                  })}
                </Accordion>
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
            align-items: flex-start;
            font-weight: bold;
            white-space: nowrap;
            overflow: hidden;
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
            <Button
              type='normal'
              size='small'
              style={{borderColor: ThemeConfig.color.content, color: ThemeConfig.color.content}}
              onClick={() => { this.toggleCourseMenuPop() }}
            >目录</Button>
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
