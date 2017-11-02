import React from 'react'
import { Tab, TabBody, TabBar, TabBarItem } from 'react-weui'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tab: this.props.tab
    }
  }

  toLink (href) {
    location.href = href
  }

  render () {
    return (
      <Tab>
        <TabBody>
          {this.props.children}
        </TabBody>
        <TabBar>
          <TabBarItem
            icon={<img src='/static/img/forum/center.png' />}
            active={this.state.tab === 0}
            onClick={e => this.toLink('/courseList')}
            label='学院'
          />
          <TabBarItem
            icon={<img src='/static/img/forum/enterprise.png' />}
            active={this.state.tab === 1}
            onClick={e => this.toLink('/jobs/practice')}
            label='实习'
          />
          <TabBarItem
            icon={<img src='/static/img/forum/center.png' />}
            active={this.state.tab === 2}
            onClick={e => this.toLink('/ucenter/portal')}
            label='我的'
          />
        </TabBar>
      </Tab>
    )
  }
}
