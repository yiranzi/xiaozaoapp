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
  if (currentElement.over) {
    currentElement.finishStatus = 'done'
    return false
  } else {
    if (isDoingTag) {
      currentElement.finishStatus = 'not-do'
      return false
    } else {
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
  let group // 章节内部保存小节的数组
  let lastGroup = false // 是否是最后一章节
  let lastElement = false // 是否是该章节最后最后一门课
  let targetElementIndex // 搜索目标index
  let findResult // 最终查找到的
  // 在外部遍历
  groupArrayInfo.find((currentGroup, targetGroupIndex) => {
    group = currentGroup.group
    lastGroup = targetGroupIndex === groupArrayInfo.length - 1
    // 在内部根据topicKey遍历查找
    targetElementIndex = group.findIndex((currentElement, index) => {
      return currentElement.topicKey === topicKey
    })
    if (targetElementIndex !== -1) {
      // 是否是最后一个子元素?
      lastElement = targetElementIndex === group.length - 1
      if (lastElement) {
        // 是否是最后一章节?
        if (lastGroup) {
          console.log('结束')
          findResult = {
            url:'',
            word: '按钮',
            show: false,
          }
        } else {
          console.log('下一章')
          findResult = courseInfo.getNext(++targetGroupIndex, 0, '下一章')

        }
      } else {
        console.log('下一节')
        findResult = courseInfo.getNext(targetGroupIndex, ++targetElementIndex, '下一节')
      }
      // 查找到则退出.
      return true
    }
  })

  if (findResult) {
    console.log(findResult)
    return findResult
  } else {
    // 未找到
    console.log('not found')
    return ({
      taskUrl: '123',
      word: '按钮',
      show: true,
    })
  }
}

/*
 result界面需求
 是否显示下一题按钮 按钮内容设置
 */

courseInfo.getNext = (groupIndex, elementIndex, buttonWord) => {
  let nextElement = groupArrayInfo[groupIndex].group[elementIndex]
  // 如果没有完成
  if (!nextElement.over) {
    return ({
      taskUrl: nextElement.topicKey,
      word: buttonWord,
      show: true,
    })
  } else {
    return ({
      taskUrl:'',
      word: '',
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
