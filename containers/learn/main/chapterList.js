import React from 'react'
import {Panel, MediaBox, MediaBoxTitle, MediaBoxDescription, Cells, Cell, CellHeader, CellBody, CellFooter} from 'react-weui'
import AxiosUtil from '/util/axios'
import Accordion from '/xz-components/accordion'
import classNames from 'classnames'
import DataUtil from '../../../util/data'
import Link from 'next/link'
import Router from 'next/router'
// 原始组件
export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sectionId: undefined,
      chapterId: undefined
    }
  }

  componentWillMount = async () => {
    let {data: menuContent} = this.props
    if (menuContent) {
      let chapterId
      let sectionId
      let footerPrint = await AxiosUtil.get(`/api/learning/getLearningFootprint/${this.props.courseId}`)
      if (!DataUtil.isEmpty(footerPrint)) {
        sectionId = footerPrint.sectionId
        chapterId = footerPrint.chapterId
      }
      chapterId = chapterId ? chapterId : menuContent.menuDTOList[0].id
      sectionId = sectionId ? sectionId : menuContent.menuDTOList[0].sectionMenuDTOList[0].id
      this.setState({
        sectionId: sectionId,
        chapterId: chapterId
      })
    }
  }

  renderMenuStatus (overSection, querySectionId, sectionId) {
    if (overSection !== undefined && querySectionId !== undefined && sectionId !== undefined ) {
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
  }

  jumpTo (courseId, menuId, sectionId, pageNumber) {
    if (this.state.courseMenuShow) {
      this.toggleCourseMenuPop()
    }
    if (this.state.homeWorkShow) {
      this.toggleHomeWorkPop()
    }
    let url = `/learn/course/detail?courseId=${courseId}&chapterId=${menuId}&sectionId=${sectionId}&pageNumber=${pageNumber}`
    Router.push(url)
  }

  accordionIsShow (menuId, chapterId) {
    if (menuId && chapterId) {
      if (menuId.toString() === chapterId.toString()) {
        return true
      }
    }
    return false
  }

  renderType (name, type) {
    if (type === 'written-test') {
      return <div className='wrap'><span className='written' />{name}（请在电脑端完成笔试）</div>
    } else {
      return <div className='wrap'><span className='file' />{name}</div>
    }
  }

  renderPreTest (menu, courseId) {
    return (
      <div className='pre-test'>
        {menu.preTestId && (
          <Cells>
            <Cell access>
              <CellBody>
                <Link
                  href={`/learn/course/testDetail?courseId=${courseId}&testId=${menu.preTestId}`}
                ><a className='wx-block' style={{fontSize: '1rem', width: '100%'}}><span className='written' />课前测试</a></Link></CellBody>
              <CellFooter />
            </Cell>
          </Cells>
        )}
        <style jsx>{`
          .wx-block {
            margin-left: 10px;
          }
        `}</style>
      </div>
    )
  }

  renderChapter (menu, courseId, sectionId) {
    return (
      <div className='chapter'>
        {menu.sectionMenuDTOList && menu.sectionMenuDTOList.map((section, index) => {
          return (
            <a
              style={{width: '100%'}}
              className='step'
              key={`section_${index}`} onClick={() => { this.jumpTo(courseId, menu.id, section.id, 1) }}>
              <Accordion.Panel className={classNames({'active': Number(section.id) === Number(sectionId)})}>
                <Cell access>
                  <CellHeader>{this.renderMenuStatus(section.overSection, sectionId, section.id)}</CellHeader>
                  <CellBody style={{fontSize: '0.85rem'}}>
                    <div className='chapter-with-time'>
                      <p>{section.name}</p>
                      {true && section.estimate && <span>{section.estimate}</span>}
                    </div>
                  </CellBody>
                  <CellFooter />
                </Cell>
              </Accordion.Panel>
            </a>
          )
        })}
        <style jsx>{`
          .chapter-with-time {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: nowrap;
          }
          .chapter-with-time span {
            min-width: 125px;
            text-align: left;
          }
          .chapter-with-time p {
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .chapter {
            margin-left: 10px;
          }
        `}</style>
      </div>
    )
  }

  renderWritten (menu, sectionId) {
    return (
      <div className='written'>
        {menu.secondMenuDTOList && menu.secondMenuDTOList.map((section, index) => {
          return (
            <a className='step' key={`section_${index}`} style={{width: '100%'}}>
              <Accordion.Panel className={classNames({'active': Number(section.id) === Number(sectionId)})}>
                <Cell access>
                  <CellHeader><span className='icon' /></CellHeader>
                  <CellBody>{section.name}</CellBody>
                  <CellFooter />
                </Cell>
              </Accordion.Panel>
            </a>
          )
        })}
        <style jsx>{`
          .step {
            margin-left: 10px;
          }
        `}</style>
      </div>
    )
  }

  renderAfterTest (menu, courseId) {
    return (
      <div className='after-test'>
        {menu.afterTestId && (
          <Cells>
            <Cell access>
              <CellBody>
                <Link
                  href={`/learn/course/testDetail?courseId=${courseId}&testId=${menu.afterTestId}`}
                ><a className='wx-block' style={{fontSize: '1rem', width: '100%'}}><span className='written' />课后测试</a></Link></CellBody>
              <CellFooter />
            </Cell>
          </Cells>
        )}
        <style jsx>{`
          .wx-block {
            margin-left: 10px;
          }
        `}</style>
      </div>
    )
  }

  render () {
    let {data: menuContent, courseId} = this.props
    let {chapterId, sectionId} = this.state
    if (!menuContent || !courseId) {
      return null
    }
    const {menuDTOList} = menuContent
    if (menuDTOList && menuDTOList.length > 0) {
      return (
        <div className='course-menu'>
          <div className='content'>
            {menuDTOList.map((menu, index) => {
              return (
                <Accordion
                  show={this.accordionIsShow(menu.id, chapterId)}
                  key={`accord_${index}`}
                  header={this.renderType(menu.name, menu.type)}
                >
                  {/* 课前测试 */}
                  {this.renderPreTest(menu, courseId)}
                  {/* 章节列表 */}
                  {this.renderChapter(menu, courseId, sectionId)}
                  {/* 笔试列表 */}
                  {this.renderWritten(menu, sectionId)}
                  {/* 课后测试 */}
                  {this.renderAfterTest(menu)}
                </Accordion>
              )
            })}
          </div>
          <style jsx>{`
            .course-menu {
              padding: 0.5rem;
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
            span.current,
            span.unfinish-icon,
            span.finish-icon {
              position: relative;
            }
            span.current::after,
            span.unfinish-icon::after,
            span.finish-icon::after {
              position: absolute;
              content: '';
              width: 1px;
              height: 3rem;
              background: black;
              left: 50%;
              margin-left: -1px;
              top: 10px;
            }
            span.current::after,
            span.unfinish-icon::after,
            span.finish-icon::after {
              position: absolute;
              content: '';
              width: 1px;
              height: 40px;
              background: #3ea6f7;
              left: 50%;
              margin-left: -1px;
              top: 10px;
            }
            // 章节，笔试最后一个step没有after样式
            .chapter a:last-child span::after,
            .written a:last-child span::after{
              height: 0;
            }
          `}</style>
        </div>)
    } else {
      return (
        <Panel className='introduce'>
          <MediaBox>
            <MediaBoxTitle />
            <MediaBoxDescription style={{display: 'block'}}>
              本课程暂无章节列表
            </MediaBoxDescription>
          </MediaBox>
        </Panel>
      )
    }
  }
}
