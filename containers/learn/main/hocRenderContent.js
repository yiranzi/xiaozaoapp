import React from 'react'
import LoadingIcon from '/xz-components/loadingicon'

/**
 *
 * @param inner组件（被包裹）
 * @param getDataFunc 一些特性的参数； 相同的高阶函数，调用特性的参数获得外部希望得到的数据，给包裹组件传入不同的数据。
 * @returns react组件。包裹后的react组件
 */
export default function (WrappedComponent, getDataFunc) {
  // ……返回另一个新组件……
  return class extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        data: undefined, // 这是被包裹组件希望的数据接口，通过这个来让组件渲染内容。
        error: undefined
      }
    }

    // 在更新的时候，判定是否拉取。
    componentWillReceiveProps = async (nextProps) => {
      let courseId = nextProps.courseId
      if (courseId) {
        if (this.props.courseId !== courseId) {
          this.getContentData(courseId)
        }
      }
    }

    // 在第一次渲染结束的时候，判定是否拉取。
    componentDidMount = async () => {
      let courseId = this.props.courseId
      if (courseId) {
        this.getContentData(courseId)
      }
    }

    // 刷新
    updataFunc () {
      console.log('updataFunc')
      this.getContentData(this.props.courseId)
    }

    // 拉取实际上由hoc的参数完成。这里调用回调。获得需要的数据后
    getContentData = async (courseId) => {
      try {
        let data = await getDataFunc(courseId)
        this.setState({
          data: data
        })
      } catch (e) {
        this.setState({
          error: e
        })
      }
    }

    render () {
      // 重组props。包括原有的和包裹后新增的。
      if (this.state.data) {
        // 这样也许保证 子组件的 did一定有数据
        return <WrappedComponent updataFunc={() => { this.updataFunc() }} data={this.state.data} {...this.props} />
      } else {
        if (this.state.error) {
          return <div>null</div>
        } else {
          return <LoadingIcon />
        }
      }
    }
  }
}
