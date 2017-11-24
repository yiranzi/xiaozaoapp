import React from 'react'
import Button from '../../xz-components/button'
import ThemeConfig from '../../config/theme'
import {Alert} from '../../xz-components/alert'

export default class extends React.Component {
  constructor (props) {
    super(props)

    this.paddingIsBuy = this.paddingIsBuy.bind(this)
  }

  paddingIsBuy () {
    const {studyCard} = this.props
    if (studyCard && studyCard.buyCount > 0) {
      location.href = '/abilitycollege/coupon'
    } else {
      Alert({content: '购买任一能力卡，即可获得邀请权限哦~能力卡限时特惠，低至2折，购买后即可邀请好友，多邀多得！', okText: '知道了'})
    }
  }

  render () {
    return (
      <div>
        <h2 className='title'>邀请好友购买，免费再得能力卡</h2>
        <p className='red-content'>成功购买能力卡后，享专属权利------邀请好友成功购买任意能力卡，你将再次获得 1 张能力卡（原价 ¥199），多邀多得！</p>
        <div className='share-button wx-text-center'>
          <Button half color={'white'} bg={ThemeConfig.color.blue} style={{width: '50%'}}
            onClick={this.paddingIsBuy} >立即邀请好友</Button>
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
          .title {
            font-size: 22px;
            text-align: center;
          }
        `}</style>
      </div>
    )
  }
}
