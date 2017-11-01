import React from 'react'
import {Form} from 'react-weui'
import Layout from '../../components/layout'

import Audio from '../../components/audio'
import Back from '../../components/back'
import Button from '../../components/button'
import Card from '../../components/card'
import Checkbox from '../../components/checkbox'
import { Confirm } from '../../components/confirm'
import FixFooter from '../../components/fixfooter'
import Loading from '../../components/loading'
import More from '../../components/more'
import Motal from '../../components/motal'
import Radio from '../../components/radio'
import ShareWx from '../../components/sharewx'
import tabbar from '../../components/tabbar'
import TextArea from '../../components/textarea'
import TimeDown from '../../components/timedown'
import TimeUp from '../../components/timeup'
import Uploader from '../../components/uploader'
import Video from '../../components/video'
import wxRecord from '../../components/wxrecord'

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
            <Card title='标题' content='内容' />
          </div>
          <br />
          <div className='title'>Checkbox：</div>
          <div className='checkbox'>
            <Checkbox
              name='group1'
              options={[{value: '正常1', label: '正常1'}, {value: '正常2', label: '正常2'}]}
            />
            <br />
            <Checkbox
              name='group2'
              defaultValue='默认1'
              options={[{value: '默认1', label: '默认1'}, {value: '默认2', label: '默认2'}]}
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
            <Button text='confirm弹框' onClick={() => { this.openConfirm() }} />
            {this.state.confirmText && <p>你点击了：{this.state.confirmText}</p>}
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
            />
            <Radio
              params={{
                name: 'name1',
                value: '正常2',
                label: '正常2'
              }}
            />
          </Form>
          <Form radio>
            <Radio
              params={{
                name: 'name2',
                value: '默认1',
                label: '默认1'
              }}
            />
            <Radio
              params={{
                name: 'name2',
                value: '默认2',
                label: '默认2',
                defaultValue: '默认2'
              }}
            />
          </Form>
          <Form radio>
            <Radio
              params={{
                name: 'name3',
                value: 'disable1',
                label: 'disable1'
              }}
            />
            <Radio
              params={{
                name: 'name3',
                value: 'disable2',
                label: 'disable1',
                defaultValue: 'disable1'
              }}
            />
          </Form>
          <br />
          <div className='title'>ShareWx：</div>
          <br />
          <div><strong style={{color: 'red'}}>待补全</strong></div>
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
  }
}