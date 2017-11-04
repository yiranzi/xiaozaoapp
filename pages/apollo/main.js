import React from 'react'
import {Button} from 'react-weui'
import Layout from '../../components/layout'
import {ShareWx} from '../../xz-components/sharewx'

export default class extends React.Component {
  share () {
    ShareWx({
      title: '标题',
      desc: '描述',
      link: 'http://rcwx.review.xiaozao.org/interviewvip/list',
      imgUrl: 'https://www.baidu.com/img/bd_logo1.png'
    })
  }
  render () {
    return (
      <Layout>
        <Button onClick={() => { this.share() }} >分享</Button>
      </Layout>
    )
  }
}
