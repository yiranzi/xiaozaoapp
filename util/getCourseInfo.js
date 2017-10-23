import AxiosUtil from '../util/axios'

let payStatus = null

let groupArrayInfo = [
]

let courseInfo = {

}

courseInfo.makeGroupArray = function (list, type) {
  let currentGroupName = ''
  let currentElementName = ''
  let groupLength = -1
  let isDoingTag = false
  list.forEach((currentElement, index) => {
    currentElementName = currentElement.groupName
    if (currentElementName !== currentGroupName) {
      // 更改组名逻辑标记
      currentGroupName = currentElementName
      // 修改插入的计数
      groupLength++

      // 通用的构造流程
      // 新建组
      let group = {}
      group.groupName = currentElement.groupName + currentElement.title
      group.group = []
      group.group.push(currentElement)
      groupArrayInfo.push(group)
    } else {
      // 加旧组
      groupArrayInfo[groupLength].group.push(currentElement)
    }
    // 特殊构建
    if (type === 'list') {
      let ifChange = courseInfo.setTopicStatus(currentElement, isDoingTag)
      isDoingTag = ifChange ? true : isDoingTag
    }
  })
}

/*
  personInfo界面需求
  根据题目回答情况 设置准确率
 */

/*
  list界面需求
  根据进度 设置标记
  会在第一个未完成上 使用doing
 */
courseInfo.setTopicStatus = (currentElement, isDoingTag) => {
  console.log(isDoingTag)
  if (currentElement.over) {
    currentElement.finishStatus = 'done'
    return false
  } else {
    if (isDoingTag) {
      currentElement.finishStatus = 'not-do'
      return false
    } else {
      console.log('!!!!!!!1')
      currentElement.finishStatus = 'doing'
      return true
    }
  }
}

/*
  result界面需求
  是否显示下一题按钮 按钮内容设置
 */
courseInfo.isLast = function (topicKey) {
  // let group = groupArrayInfo.group
  let lastGroup = false
  let lastElement = false
  let targetElementIndex
  // 在外部遍历
  groupArrayInfo.forEach((currentGroup, targetGroupIndex) => {
    lastGroup = targetGroupIndex === groupArrayInfo.length - 1
    // 在内部根据topicKey遍历查找
    targetElementIndex = currentGroup.findIndex((currentElement, index) => {
      return currentElement.topicKey === topicKey
    })
    if (targetElementIndex !== -1) {
      // 是否是最后一个子元素?
      lastElement = targetElementIndex === currentGroup.length - 1
      if (lastElement) {
        // 是否是最后一章节?
        if (lastGroup) {
          console.log('结束')
          return ({
            url:'',
            word: '按钮',
            show: false,
          })
        } else {
          console.log('下一章')
          courseInfo.getNext(++targetGroupIndex, 0)
        }
      } else {
        console.log('下一节')
        courseInfo.getNext(targetGroupIndex, ++targetElementIndex)
      }
    }
  })
  console.log('not found')
  return ({
    url:'',
    word: '按钮',
    show: 'show',
  })
}

/*
 result界面需求
 是否显示下一题按钮 按钮内容设置
 */

courseInfo.getNext = (groupIndex, elementIndex) => {
  console.log(groupArray)
  console.log(groupIndex)
  console.log(elementIndex)
  let result = groupArrayInfo.groups[groupIndex][elementIndex]
  if (true) {
    return ({
      url:'',
      word: '按钮',
      show: 'show',
    })
  } else {
    return ({
      url:'',
      word: '按钮',
      show: false,
    })
  }
}

/*

 */

courseInfo.getList = async (pageType) => {
  return new Promise((resolve, reject) => {
    AxiosUtil.get('/api/interview/getList').then((res) => {
      // 1 set pay status
      payStatus = true
      // 2 new array by group
      courseInfo.makeGroupArray(res, pageType)
      // 3 return group array
      resolve(groupArrayInfo)
    }).catch((e) => {
      if (e.status === 10001) {
        payStatus = false
      }
      reject(e)
    })
  })
}

// get

courseInfo.getPayStatus = function () {
  return payStatus
}

courseInfo.getGroupArray = function () {
  return groupArrayInfo
}

module.exports = courseInfo
