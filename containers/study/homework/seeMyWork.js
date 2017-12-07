import React from 'react'
import { Tabbar, TabItem } from '/xz-components/tabbar'
import DateUtil from '/util/date'

/**
 * 渲染团购的卡片
 */
export default class extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount = async () => {
    console.log('componentDidMount seemywork')
  }
  render () {
    console.log('see my work render')
    return (<div>
      seemywork
    </div>)
  }
}

