import React from 'react'
import Layout from '../../components/layout'

export default class extends React.Component {
  render () {
    return (
      <Layout>
        <div>
          <div style={{fontSize: '8pt'}}>这是8pt号字体</div>
          <div style={{fontSize: '10pt'}}>这是10pt号字体</div>
          <div style={{fontSize: '12pt'}}>这是12pt号字体</div>
          <div style={{fontSize: '14pt'}}>这是14pt号字体</div>
          <div style={{fontSize: '16pt'}}>这是16pt号字体</div>
          <div style={{fontSize: '18pt'}}>这是18pt号字体</div>
          <div style={{fontSize: '20pt'}}>这是20pt号字体</div>
          <div style={{fontSize: '22pt'}}>这是22pt号字体</div>
          <div style={{fontSize: '24pt'}}>这是24pt号字体</div>
          <div style={{fontSize: '26pt'}}>这是26pt号字体</div>
        </div>
        <div>
          下面是间距效果
          <div style={{lineHeight: '150%'}}>
            <p style={{color: 'red'}}>下面是1.5倍行距离</p>
            <p>内容内容内容内容内容内容内容内容内容</p>
            <p>内容内容内容内容内容内容内容内容内容</p>
            <p>内容内容内容内容内容内容内容内容内容</p>
            <p>内容内容内容内容内容内容内容内容内容</p>
          </div>
          <div>--------------------------------</div>
          <div style={{lineHeight: '180%'}}>
            <p style={{color: 'red'}}>下面是1.8倍行距离</p>
            <p>内容内容内容内容内容内容内容内容内容</p>
            <p>内容内容内容内容内容内容内容内容内容</p>
            <p>内容内容内容内容内容内容内容内容内容</p>
            <p>内容内容内容内容内容内容内容内容内容</p>
          </div>
          <div>--------------------------------</div>
          <div style={{lineHeight: '200%'}}>
            <p style={{color: 'red'}}>下面是2倍行距离</p>
            <p>内容内容内容内容内容内容内容内容内容</p>
            <p>内容内容内容内容内容内容内容内容内容</p>
            <p>内容内容内容内容内容内容内容内容内容</p>
            <p>内容内容内容内容内容内容内容内容内容</p>
          </div>
        </div>
      </Layout>
    )
  }
}