import React from 'react'
import ToolsUtil from '../util/tools'

export default class extends React.Component {
  componentDidMount () {
    const url = ToolsUtil.getQueryString('url')
    location.href = url
  }

  render () {
    return <div />
  }
}
