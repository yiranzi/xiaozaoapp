import React from 'react'
import {ModalBoxPopFunc} from '../../xz-components/modalbox'
import Button from '../../xz-components/button'
import ThemeConfig from '../../config/theme'
import {Alert} from '../../xz-components/alert'
import AxiosUtil from '../../util/axios'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      studyCard: null
    }
    this.paddingIsBuy = this.paddingIsBuy.bind(this)
  }

  componentDidMount = async function () {
    try {
      const studyCard = await AxiosUtil.get('/api/vip/getStudyCard')
      this.setState({
        studyCard: studyCard
      })
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
  }

  paddingIsBuy () {
    const {studyCard} = this.state
    if (studyCard && studyCard.buyCount > 0) {
      this.renderPop('1')
    } else {
      Alert({content: '购买任一能力卡，即可获得邀请权限哦~能力卡限时特惠，低至2折，购买后即可邀请好友，多邀多得！', okText: '知道了'})
    }
  }

  render () {
    return (
      <div>
        <h2 className='wx-text-center'>邀请好友购买，免费再得能力卡</h2>
        <p className='red-content'>成功购买能力卡后，享专属权利------邀请好友成功购买任意能力卡，你将再次获得 1 张能力卡（原价 ¥199），多邀多得！</p>
        <p className='main-content'>*好友购买时在推荐人一栏填写你的手机号即可。</p>
        <div className='share-button'>
          <Button half text={'立即邀请好友'} color={'white'} bg={ThemeConfig.color.blue} onClick={this.paddingIsBuy} />
        </div>
        <style jsx>{`
          .share-button {
            margin: 20px auto 30px auto;
          }
          .red-content {
            color: red;
          }
          .main-content {
          }
        `}</style>
      </div>
    )
  }

  renderPop () {
    let defaultStyle = {
      backgroundColor: 'rgba(0, 10, 49, 0.5)'
    }
    let imgStyle = {
      position: 'absolute',
      top: '0',
      right: '0',
      width: '150px',
      height: '300px'
    }
    let innerContent = {
      position: 'absolute',
      top: '288px',
      right: '10px'
    }
    let dom = <div>
      <img style={imgStyle} src='/static/img/apollo/shareArrow.png' />
      <p style={innerContent}>点击右上角发给好友<br />再得邀请卡！！</p>
    </div>
    let prop = {
      innerDiv: dom,
      style: defaultStyle
    }
    ModalBoxPopFunc({...prop})
  }
}
