import React from 'react'
import AxiosUtil from '../../../util/axios'
import Button from '../../../xz-components/button'

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
    return (
      <div className='training-item'>
        <div className='header'><img src='/static/img/icon/exercise.png' />练习</div>
        <div className='content'>
          <div className='question' dangerouslySetInnerHTML={{__html: train.content}} />
          <Button onClick={() => { this.toggle() }}>{show ? '隐藏答案及解析' : '显示答案及解析'}</Button>
          {show && <div className='analysis' dangerouslySetInnerHTML={{__html: train.analysis}} />}
        </div>
        <style jsx>{`
          .header img {
            width: 1rem !important;
          }
        `}</style>
      </div>
    )
  }
}
