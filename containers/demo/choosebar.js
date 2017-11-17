import React from 'react'
import {ChooseBar, ChooseItem} from '../../xz-components/choosebar'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text1: 'choose1',
      text2: 'choose2'
    }
  }
  render () {
    return (
      <div className='up'>
        <div className='title'>ChooseBar：</div>
        {this.renderChooseBar()}
        <p>选择框1是{this.state.text1}</p>
        <br />
        {this.renderChooseBarWithStyle()}
        <p>选择框2是{this.state.text2}</p>
      </div>
    )
  }

  renderChooseBar () {
    return (<ChooseBar defaultActiveKey={0} onChange={(e) => { this.setState({text1: e}) }}>
      <ChooseItem title='1' />
      <ChooseItem title='2' />
      <ChooseItem title='3' />
    </ChooseBar>)
  }

  renderChooseBarWithStyle () {
    let tabStyle = {
      display: 'flex',
      backgroundColor: 'green'
    }
    let chooseStyle = {
      color: 'white',
      backgroundColor: 'blue'
    }
    let normalStyle = {
      margin: 'auto 5px'
    }
    let disableStyle = {
      margin: 'auto 5px',
      backgroundColor: 'gray'
    }
    return (<ChooseBar defaultActiveKey={1} style={tabStyle} chooseStyle={chooseStyle} onChange={(e) => { this.setState({text2: e}) }}>
      <ChooseItem style={normalStyle} title='1' />
      <ChooseItem style={normalStyle} title='2' />
      <ChooseItem style={normalStyle} title='3' />
      <ChooseItem style={disableStyle} title='4' disabled />
    </ChooseBar>)
  }
}
