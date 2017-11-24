import React from 'react'
import {Form} from 'react-weui'
import Layout from '../../components/layout'

import Audio from '../../xz-components/audio'
import Back from '../../xz-components/back'
import Button from '../../xz-components/button'
import Card from '../../xz-components/card'
import Checkbox from '../../xz-components/checkbox'
import { Confirm } from '../../xz-components/confirm'
import { Alert } from '../../xz-components/alert'
import FixFooter from '../../xz-components/fixfooter'
import Loading from '../../xz-components/loading'
import More from '../../xz-components/more'
import Radio from '../../xz-components/radio'
// import {Tabbar} from '../../xz-components/tabbar'
import TextArea from '../../xz-components/textarea'
import TimeDown from '../../xz-components/timedown'
import TimeUp from '../../xz-components/timeup'
import Uploader from '../../xz-components/uploader'
import Video from '../../xz-components/video'
import wxRecord from '../../xz-components/wxrecord'
import {ModalBoxPopFunc} from '../../xz-components/modalbox'
import {showShareBg} from '../../xz-components/wxshareBg'
import WxShare from '../../xz-components/wxshare'

export default class extends React.Component {
  shareContent = '这是组件页'
  constructor (props) {
    super(props)
    this.state = {
      confirmText: '',
      isLoading: false,
      textArea: '',
      shareTitle: this.shareContent,
      canRender: false
    }
    this.renderTabbar = this.renderTabbar.bind(this)
  }

  componentDidMount () {
    this.setState({
      canRender: true
    })
  }

  openConfirm () {
    const _this = this
    Confirm({
      title: '标题',
      content: '确认提交？确认提交？确认提交？',
      okText: '确定',
      cancelText: '取消',
      ok: () => _this.setState({confirmText: 'ok'}),
      cancel: () => _this.setState({confirmText: 'cancel'})
    })
  }
  openAlert () {
    Alert({
      title: '标题',
      content: '这是alert内容',
      okText: '好的,知道了',
      ok: () => console.log('知道了')
    })
  }
  openLoading () {
    this.setState({isLoading: true})
  }
  changeTextArea (e) {
    this.setState({textArea: e})
  }

  renderShare () {
    return (<div>
      <div className='title'>WxShare：</div>

      <WxShare title={this.state.shareTitle}
               desc={'一起学习'}
               link={'http://wx.xiaozao.org/demo/prev'}
               imgUrl={'http://wx.xiaozao.org/static/img/apollo/share-icon.jpg'} />
      <p>在input中输入。点击按钮后修改props->修改分享标题。</p>
      <div>
        <span>当前分享内容为</span>
        <Button text={this.state.shareTitle} onClick={() => { this.setState({shareTitle: this.shareContent}) }} />
      </div>
      <TextArea
        placeholder={this.shareContent}
        maxLength={200}
        onChange={(text) => { this.shareContent = text }}
      />
    </div>)
  }

  renderModalBox () {
    return (<Button text='点击弹出弹窗' onClick={this.renderModalBoxImageStyle.bind(this)} />)
    return (<Button text='点击弹出弹窗' onClick={this.renderModalBoxDiv.bind(this)} />)
  }

  // 默认内置div
  renderModalBoxDiv () {
    let bgStyle = {
      width: '100%',
      height: '100%'
    }
    let imageProps = {
      cancelCallBack: () => { console.log('点击背景关闭回调1') },
      innerDiv: <div>
        <p>123</p>
        <img style={bgStyle} src='/static/img/apollo/share-icon.jpg' />
      </div>
    }
    return (ModalBoxPopFunc(imageProps))
  }

  // 自定义样式的内置div
  renderModalBoxImageStyle () {
    let outStyle = {
      backgroundColor: 'rgba(0,0,0, 0.5)',
    }
    let imgStyle = {
      position: 'relative',
      top: '-200px'
    }
    let imageProps = {
      cancelCallBack: () => { console.log('点击背景关闭回调') },
      innerDiv: <img style={imgStyle} src='/static/img/apollo/share-icon.jpg' />,
      style: outStyle
    }
    return (ModalBoxPopFunc(imageProps))
  }

  onTabbarClick (index) {
    // 是否可以点击？
    this.setState({
      currentSelect: index
    })
  }

  renderTabbar () {
    let tabs = [
      {title: 't1'},
      {title: 't2'},
      {title: 't3'},
    ]

    let normalStyle = {
      width: '100px',
      height: '40px',
      color: 'red',
      backgroundColor: 'white',
      borderRadius: '5px',
      border: '2px solid black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '3px auto'
    }
    let chooseStyle = {
      color: 'blue',
      backgroundColor: 'yellow'
    }
    // return(<div>
    //   <Tabbar
    //     normalStyle={normalStyle}
    //     chooseStyle={chooseStyle}
    //     tabs={tabs}
    //     onChange={this.onChange}
    //     defaultActiveKey={0} />
    // </div>)
  }

  renderTabbarLine () {
    let tabs = [
      {title: 't1'},
      {title: 't2'},
      {title: 't3'},
      {title: 't3', disabled: true}
    ]
    let normalStyle = {
      width: '100px',
      height: '40px',
      color: 'red',
      backgroundColor: 'white',
      borderRadius: '5px',
      border: '2px solid black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '3px',
      flexGrow: 1,
    }
    let chooseStyle = {
      color: 'blue',
      backgroundColor: 'yellow'
    }
    let disabledStyle = {
      color: 'yellow',
      backgroundColor: 'gray'
    }
    let tabStyle = {
      display: 'flex',
      backgroundColor: 'green',
      margin: 'auto -1rem'
    }
    // return(<div className='line'>
    //   <Tabbar defaultActiveKey={0} />
    // </div>)
  }

  onTabClick (e) {
    console.log(e)
  }

  onChange (e) {
    console.log(e)
  }

  render () {
    if (this.state.canRender) {
      return (
        <Layout>
          <div className='wrapper'>
            <div className='title'>音频：</div>
            <div className='audio'>
              <Audio idTag='audio-id' audioUrl='http://xiaozaoresource.oss-cn-shanghai.aliyuncs.com/interview/mp3/S1-3-m.mp3' />
            </div>
            <br />
            <div className='title'>返回：</div>
            <div className='back'>
              <br />
              <Back direct='left' text='向左' />
              <br />
              <Back direct='right' text='向右' />
            </div>
            <br />
            <div className='title'>Button：</div>
            <div className='button'>
              <br />
              <Button text='默认' />
              <br />
              <Button
                text='自定义背景和文字颜色'
                bg='red'
                color='white'
              />
              <br />
              <Button text='half' half />
              <br />
              <Button text='其他，样式通过style属性传入' />
            </div>
            <br />
            <div className='title'>Card：</div>
            <div className='card'>
              <br />
              <Card title='标题'>
                <div>内容1</div>
                <div>内容2</div>
                <div>内容3</div>
                <div>内容4</div>
                <div>内容5</div>
              </Card>
            </div>
            <br />
            <div className='title'>Checkbox：</div>
            <div className='checkbox'>
              <Checkbox
                name='group1'
                options={[{value: '正常1', label: '正常1'}, {value: '正常2', label: '正常2'}]}
                onChange={(e) => { console.log('group1 选中：', e) }}
              />
              <br />
              <Checkbox
                name='group2'
                defaultValue='默认1'
                options={[{value: '默认1', label: '默认1'}, {value: '默认2', label: '默认2'}]}
                onChange={(e) => { console.log('group2 选中：', e) }}
              />
              <br />
              <Checkbox
                name='group3'
                defaultValue='disable1'
                options={[{value: 'disable1', label: 'disable1'}, {value: 'disable2', label: 'disable2'}]}
                disabled
              />
            </div>
            <br />
            <div className='title'>confirm：</div>
            <br />
            <div className='confirm'>
              <Button text='Confirm弹框' onClick={() => { this.openConfirm() }} />
              {this.state.confirmText && <p>你点击了：{this.state.confirmText}</p>}
            </div>
            <br />
            <div className='title'>Alert:</div>
            <br />
            <div className='alert'>
              <Button text='Alert弹框' onClick={() => { this.openAlert() }} />
            </div>
            <br />
            <FixFooter
              content={(
                <div>
                  <div>这是fix在底部的样式</div>
                </div>
              )}
            />
            <br />
            <div className='title'>Loading：</div>
            <br />
            <Button text='Loading' onClick={() => { this.openLoading() }} />
            {this.state.isLoading && <Loading />}
            <br />
            <div className='title'>More：</div>
            <br />
            <More
              title='这是标题'
              content={(
                <div>
                  <p>有三个props:</p>
                  <p>title: 标题（可有可无）</p>
                  <p>content: 内容（必须要有）</p>
                  <p>height: 高度，<strong style={{color: 'red'}}>数字</strong>（超出显示查看全部）</p>
                  <p>1</p>
                  <p>1</p>
                  <p>1</p>
                  <p>1</p>
                  <p>1</p>
                </div>
              )}
              height={120}
            />
            <br />
            <br />
            <div className='title'>Radio：</div>
            <br />
            <Form radio>
              <Radio
                params={{
                  name: 'name1',
                  value: '正常1',
                  label: '正常1'
                }}
                onChange={(e) => console.log('name1选中:', e)}
              />
              <Radio
                params={{
                  name: 'name1',
                  value: '正常2',
                  label: '正常2'
                }}
                onChange={(e) => console.log('name1选中:', e)}
              />
            </Form>
            <Form radio>
              <Radio
                params={{
                  name: 'name2',
                  value: '默认1',
                  label: '默认1'
                }}
                onChange={(e) => console.log('name2选中:', e)}
              />
              <Radio
                params={{
                  name: 'name2',
                  value: '默认2',
                  label: '默认2',
                  defaultValue: '默认2'
                }}
                onChange={(e) => console.log('name2选中:', e)}
              />
            </Form>
            <Form radio>
              <Radio
                params={{
                  name: 'name3',
                  value: 'disable1',
                  label: 'disable1',
                  disabled: true
                }}
              />
              <Radio
                params={{
                  name: 'name3',
                  value: 'disable2',
                  label: 'disable2',
                  defaultValue: 'disable2',
                  disabled: true
                }}
              />
            </Form>
            <br />
            {/*分享*/}
            {this.renderShare()}
            {/*分享背景弹窗*/}
            <Button onClick={() => { showShareBg(<div>分享右上角<br />现在就分享</div>) }} text={'弹出分享右上角'} />
            {/*modal弹框*/}
            {this.renderModalBox('image')}
            {/*tabbar*/}
            <div className='title'>Tabber：</div>
            <br />
            <p>普通的</p>
            {/*{this.renderTabbar()}*/}
            <br />
            <p>有不可点击的的</p>
            {/*{this.renderTabbarLine()}*/}
            <br />
            <div className='title'>TextArea：</div>
            <br />
            <TextArea
              placeholder='请输入文字'
              maxLength={200}
              onChange={(e) => {this.changeTextArea(e)}}
            />
            {this.state.textArea && <p>输入文字：{this.state.textArea}</p>}
            <br />
            <TextArea
              defaultValue='默认文字默认文字默认文字默认文字默认文字'
              disabled
            />
            <br />
            <div className='title'>TimeDown：</div>
            <br />
            <p>回调方法：timeDown</p>
            <p>参数limitTime<strong style={{color: 'red'}}>只支持分钟</strong>，没做小时</p>
            <TimeDown limitTime='60' timeDown={() => { alert('时间到') }} />
            <br />
            <div className='title'>TimeUp：</div>
            <br />
            <p>回调方法：timeUp</p>
            <TimeUp />
            <br />
            <div className='title'>Uploader：</div>
            <br />
            <p>defaultValue: 数组，默认显示的图片，没有置为空数组</p>
            <p>maxCount: 能上传多少张图片</p>
            <p>onChange: 上传图片后的回调</p>
            <Uploader
              title='图片上传'
              defaultValue={[]}
              maxCount={1}
              onChange={(value) => console.log('上传图片', value)}
            />
            <br />
            <div className='title'>Video：</div>
            <br />
            <p>video 使用HTML5原生，如果有需要在改components, <strong style={{color: 'red'}}>只有一个参数src</strong></p>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
          <style jsx>{`
          .wrapper {
            padding: 1rem;
          }
          .title {
            border-bottom: 1px solid #e5e5e5;
          }
        `}</style>
        </Layout>
      )
    } else {
      return (<Layout />)
    }
  }
}