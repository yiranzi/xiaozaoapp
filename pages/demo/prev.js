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
import WxShare from '../../xz-components/wxshare'
import tabbar from '../../xz-components/tabbar'
import TextArea from '../../xz-components/textarea'
import TimeDown from '../../xz-components/timedown'
import TimeUp from '../../xz-components/timeup'
import Uploader from '../../xz-components/uploader'
import Video from '../../xz-components/video'
import wxRecord from '../../xz-components/wxrecord'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      confirmText: '',
      isLoading: false,
      textArea: ''
    }
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
  render () {
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
            <Back direct='left'>向左</Back>
            <br />
            <Back direct='right'>向右</Back>
          </div>
          <br />
          <div className='title'>Button：</div>
          <div className='button'>
            <Button>默认</Button>
            <Button disabled>默认 disable</Button>
            <Button type='normal'>normal</Button>
            <Button type='normal' disabled>normal disable</Button>
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
          <div className='title'>Modal：</div>
          <br />
          <div><strong style={{color: 'red'}}>待补全</strong></div>
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
          <div className='title'>WxShare：引入组件!!就可以分享!!</div>
          <WxShare title={'组件demo'} desc={'一起学习'} link={'http://rcwx.review.xiaozao.org/demo/prev'} imgUrl={'http://wx.xiaozao.org/static/img/apollo/share-icon.jpg'} />
          <br />
          <div>参数为 标题 内容 图片 链接</div>
          <br />
          <div className='title'>Tabber：</div>
          <br />
          <div><strong style={{color: 'red'}}>待补全</strong></div>
          <br />
          <div className='title'>TextArea：</div>
          <br />
          <TextArea
            placeholder='请输入文字'
            maxLength={200}
            onChange={(e) => { this.changeTextArea(e) }}
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
  }
}
