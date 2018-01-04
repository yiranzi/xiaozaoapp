import React from 'react'
import {Panel, MediaBox, MediaBoxTitle, MediaBoxDescription} from 'react-weui'
import AxiosUtil from '/util/axios'
import HocRenderContent from '/containers/learn/main/hocRenderContent'
import Accordion from '/xz-components/accordion'
import {Cells, Cell, CellHeader, CellBody, CellFooter, Icon} from 'react-weui'
import classNames from 'classnames'
import DataUtil from '../../../util/data'
import Link from 'next/link'
import Router from "next/router";
// 原始组件
class innerComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sectionId: undefined,
      chapterId: undefined
    }
  }

  componentWillMount = async () => {
    let {data: menuContent} = this.props
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
    Router.replace(url)
    window.history.go(0)
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

  render () {
    let {data: menuContent, courseId} = this.props
    let {chapterId, sectionId} = this.state

    const {menuDTOList} = menuContent
    if (menuDTOList && menuDTOList.length > 0) {
      return (<div className='introduce-div'>
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
                      <CellBody>
                        <Link
                          href={`/learn/course/testDetail?courseId=${courseId}&testId=${menu.preTestId}`}
                        ><a className='wx-block' style={{fontSize: '1rem'}}><span className='written' />课前测试</a></Link></CellBody>
                      <CellFooter />
                    </Cell>
                  </Cells>
                )}
                {menu.sectionMenuDTOList && menu.sectionMenuDTOList.map((section, index) => {
                  return (
                    <a key={`section_${index}`} onClick={() => { this.jumpTo(courseId, menu.id, section.id, 1) }}>
                      <Panel className={classNames({'active': Number(section.id) === Number(sectionId)})}>
                        <Cell access>
                          <CellHeader>{this.renderMenuStatus(section.overSection, sectionId, section.id)}</CellHeader>
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
                      <CellBody>
                        <Link
                          href={`/learn/course/testDetail?courseId=${courseId}&testId=${menu.afterTestId}`}
                        ><a className='wx-block' style={{fontSize: '1rem'}}><span className='written' />课后测试</a></Link></CellBody>
                      <CellFooter />
                    </Cell>
                  </Cells>
                )}
              </Accordion>
            )
          })}
        </div>
        <style jsx>{`
        .introduce-div {
          text-align: left;
          padding: 10px;
        }
        .introduce-section {
          margin: 10px auto;
        }
        .introduce-section h1 {
          font-size: 16px;
        }
        .introduce-section .content {
          font-size: 14px;
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
// 自定义拉取数据的方法
const getData = async function (courseId) {
  let menuContent = await AxiosUtil.get(`/api/learning/course/${courseId}`)
  return menuContent
}

// 返回包裹后的组件
export default class extends React.Component {
  RenderComponent = HocRenderContent(innerComponent, getData)
  render () {
    let RenderComponent = this.RenderComponent
    return (<RenderComponent {...this.props} />)
  }
}