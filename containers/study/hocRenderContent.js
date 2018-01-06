import React from 'react'

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
        data: undefined // 这是被包裹组件希望的数据接口，通过这个来让组件渲染内容。
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

    // 拉取实际上由hoc的参数完成。这里调用回调。获得需要的数据后
    getContentData = async (courseId) => {
      let data = await getDataFunc(courseId)
      this.setState({
        data: data
      })
    }

    render () {
      // 重组props。包括原有的和包裹后新增的。
      if (this.state.data) {
        // 这样也许保证 子组件的 did一定有数据
        return <WrappedComponent data={this.state.data} {...this.props} />
      } else {
        // 也可以使用loading
        return null
      }
    }
  }
}
