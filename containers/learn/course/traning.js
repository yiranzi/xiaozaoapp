import React from 'react'
import ThemeConfig from '../../../config/theme'
import AxiosUtil from '../../../util/axios'
import DataUtil from '../../../util/data'
import LoadingIcon from '../../../xz-components/loadingicon'
import Button from '../../../xz-components/button'
import Material from '../../clock/material'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      train: {},
      show: false
    }
  }
  componentDidMount = async () => {
    let id = this.props.id
    let train = await AxiosUtil.get(`/api/learning/getTraining/${id}`)
    this.setState({
      train: train
    })
  }
  toggle () {
    this.setState({show: !this.state.show})
  }
  render () {
    const {train, show} = this.state
    if (DataUtil.isEmpty(train)) return <LoadingIcon />
    return (
      <div className='training-item'>
        <div className='header'><img src='/static/img/icon/exercise.png' />练习</div>
        <div className='content'>
          <div className='question' dangerouslySetInnerHTML={{__html: train.content}} />
          <Button style={{background: ThemeConfig.color.red, margin: '1rem 0'}} size='small' onClick={() => { this.toggle() }}>{show ? '隐藏答案及解析' : '显示答案及解析'}</Button>
          {show && <Material content={train.analysis} />}
        </div>
        <style jsx>{`
          .training-item {
            background: #fff;
            margin-left: -1rem;
            padding-right: -1rem;
            padding: 2rem 1rem;
          }
          .header img {
            width: 1rem !important;
            margin-right: 0.5rem;
          }
          .content {
            padding: 1rem;
          }
        `}</style>
      </div>
    )
  }
}
