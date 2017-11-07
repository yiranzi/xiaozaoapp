import React from 'react'
import AxiosUtil from '../../util/axios'
import Layout from '../../components/layout'
import Uploader from '../../xz-components/uploader'
import Button from '../../xz-components/button'
import DataUtil from '../../util/data'
import {Alert} from '../../xz-components/alert'

export default class extends React.Component {
  offerPostDate = {}
  constructor (props) {
    super(props)
    this.saveChange = this.saveChange.bind(this)
    this.postOfferInfo = this.postOfferInfo.bind(this)
  }

  saveChange (type, value) {
    if (type === 0) {
      this.offerPostDate.name = value
    } else {
      this.offerPostDate.imageList = value
    }
  }

  postOfferInfo = async function () {
    if (this.offerPostDate.name) {
      let formdata
      if (this.offerPostDate.imageList && this.offerPostDate.imageList.length > 0) {
        let uuid = DataUtil.uuid(11)
        formdata = DataUtil.imgFormat(this.offerPostDate.imageList[0].url, uuid, 'jpg')
      } else {
        let uuid = DataUtil.uuid(11)
        formdata = DataUtil.imgFormat('', uuid, 'jpg')
      }
      try {
        await AxiosUtil.post(`/api/apollo/uploadOffer?title=${this.offerPostDate.name}`, formdata)
      } catch (e) {
        Alert({content: e.message, okText: '确认'})
      }
    } else {
      Alert({content: '没有填写任何职位信息', okText: '确认'})
    }
  }

  render () {
    return (
      <Layout>
        <div className='apollo-finish'>
          <div className='header'>
            <div className='title'>荣誉殿堂</div>
            <div className='text'>
              <span className='line' />记录你的offer<span className='line' />
            </div>
          </div>
          <div className='action'>
            <div className='job'>
              <div className='sub-title'>
                <span className='icon' /><span>请输入收到Offer的企业和岗位</span>
              </div>
              <div className='sub-content'>
                <input type='text' placeholder='例如：宝洁－市场实习生' onChange={(e) => this.saveChange(0, e.target.value)} />
              </div>
            </div>
            <div className='img'>
              <div className='sub-title'>
                <span className='icon' /><span>请上传您的证明截图</span>
              </div>
              <div className='sub-content'>
                <p>截图形式可以使短信截图、邮件截图、微信截图</p>
                <div className='uploader'>
                  <span>上传截图：</span>
                  <Uploader defaultValue={[]} maxCount={1}
                    onChange={(value) => this.saveChange(1, value)} />
                </div>
              </div>
            </div>
            <Button text='提交' bg='#ffd164' color='#001567' onClick={() => { this.postOfferInfo() }} />
          </div>
        </div>
        <style jsx>{`
          .apollo-finish {
            background-color: #f8f9ff;
            min-height: 100vh;
          }
          .apollo-finish .header {
            padding: 2rem;
            background: url('/static/img/apollo/bg3.png') no-repeat;
            background-size: cover;
            text-align: center;
          }
          .apollo-finish .header .title {
            font-size: 32px;
            color: #fff;
            font-weight: bold;
          }
          .apollo-finish .header .text {
            font-size: 24px;
            color: #ffd164;
          }
          .apollo-finish .header .text .line {
            display: inline-block;
            width: 10px;
            border-top: 1px solid #ffd164;
            margin: 0px 8px 5px 8px;
          }
          .apollo-finish .action {
            color: #001567;
            padding: 1rem;
          }
          .apollo-finish .action .sub-title {
            font-size: 16px;
            font-weight: bold;
          }
          .apollo-finish .action .sub-title span {
            display: inline-block;
            vertical-align: middle;
          }
          .apollo-finish .action .sub-title .icon {
            width: 1rem;
            height: 1rem;
            background-color: #ffd164;
            border-radius: 1rem;
            margin-right: 0.5rem;
          }
          .apollo-finish .action .sub-content {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
          .apollo-finish .action .sub-content .uploader {
            margin-top: 2rem;
            display: flex;
          }
          input[type="text"],
          input[type="text"]:focus {
            width: 100%;
            color: #fff;
            font-size: 16px;
            background-color: #cfd0dc;
            margin-top: 0.5rem;
            padding: 0.75rem 1rem;
            box-sizing: border-box;
            border: none;
            outline: none;
          }
          input[type="text"]::placeholder {
            color: #fff;
          }
          .apollo-finish .action .img {
            margin-top: 2rem;
            margin-bottom: 2rem;
          }
        `}</style>
        <style global jsx>{`
          .weui-cells {
            margin-top: 0 !important;
            background-color: transparent !important;
          }
          .weui-cells:before,
          .weui-cells:after {
            border: none !important;
          }
          .weui-cells .weui-uploader__hd {
            display: none;
          }
          .weui-cells .weui-cell__bd {
            background-color: #cfd0dc;
          }
          .weui-uploader__input-box {
            border: none !important;
          }
          .weui-uploader__input-box:before, .weui-uploader__input-box:after {
            background-color: #fff !important;
          }
        `}</style>
      </Layout>
    )
  }
}
