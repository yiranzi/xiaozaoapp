import React from 'react'
import Audio from '../../../components/audio'

/*
 props
 topicKey:

 */

/*
  阅读更多组件.
 根据key 进行对应的规则渲染.
 渲染出最后的内容.
 */
export default class ReadMore extends React.Component{

  render () {
    return (this.renderByKey(this.props.topicKey))
  }

  renderByKey (key) {
    let arr = []
    switch (key) {
      case 'free':
        arr = this.renderModalFree()
        break
      case '1':
        arr = this.renderModal1()
        break
      case '2':
        arr = this.renderModal2()
        break
      case '3':
        arr = this.renderModal3()
        break
      case '4':
        arr = this.renderModal4()
        break
      case '5':
        arr = this.renderModal5()
        break
      case '6':
        arr = this.renderModal6()
        break
      case '7':
        arr = this.renderModal7()
        break
      default:
        console.log(key + 'not found')
    }
    return (
      <div className='pratice'>
        {arr}
        <style global jsx>
          {`
         .readmore-ul li{
          list-style: inside
         }
         .readmore-h4 {
          margin-bottom: 10px;
         }
         .readmore-div {
          margin-bottom: 10px;
         }
         .readmore-red {
          color: red;
         }
        `}
        </style>
      </div>
    )
  }


  renderModalFree () {
    return (<div>
      <h4 className='readmore-h4'>推荐阅读?：如何阅读图表</h4>
      <div className='readmore-div'>
        下载链接：{this.addA('http://pan.baidu.com/s/1boAChyR')}
        <p>密码：fx9t</p>
      </div>
      <h4 className='readmore-h4'>推荐练习：</h4>
      <div className='outer'>
        {this.addImageContent(1, 1, 'resultBg')}
      </div>
      <p>进入小灶官网主页，点击笔试题库，进入英语练练练免费练习</p>

      <style jsx>
        {`
        .outer {
          margin: 1rem 0 1rem 0;
        }
        `}
      </style>
    </div>)
  }

  renderModal1 () {
    return (<div>
      <h4 className='readmore-h4'>推荐阅读：如何阅读图表</h4>
      <div className='readmore-div'>
        下载链接：{this.addA('http://pan.baidu.com/s/1boAChyR')}
        <p>密码：fx9t</p>
      </div>
      <h4 className='readmore-h4'>推荐练习：</h4>
      <div className='outer'>
        {this.addImageContent(1, 1, 'resultBg')}
      </div>
      <p>进入小灶官网主页，点击笔试题库，进入英语练练练免费练习</p>

      <style jsx>
        {`
        .outer {
          margin: 1rem 0 1rem 0;
        }
        `}
      </style>
    </div>)
  }

  renderModal2 () {
    return (<div>
      <h4 className='readmore-h4'>提升自己的结构化思维，我有以下的建议：</h4>
      <h4 className='readmore-h4'>推荐阅读</h4>
      <div className='readmore-div'>
        <ul className='readmore-ul'>
          <li>{this.addA('http://www.fengtang.com/blog/?p=113', '老聃的金字塔原理')}</li>
          <li>{this.addA('https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654874201&idx=1&sn=278dd82037a1e4d3fae9857549320e57&mpshare=1&scene=1&srcid=0705aUtsXXevo4PHQOPN0SNl#rd', '面试被问到“沃尔玛战略入股京东，你怎么看？”一脸懵逼or非常牛逼')}</li>
        </ul>
      </div>
      <h4 className='readmore-h4'>日常练习</h4>
      <div className='readmore-div'>
        <p>1. 累积别人的结构框架：无论是影视、书籍、文章，看到别人用的结构，记录下来，成为自己的素材。比如麦肯锡的 2016 China Consumer Report 中，你会发现麦肯锡就是按照“购买意愿、购买地点、购买方式，以及购买分配”对消费者进行分析的。</p>
        <p>下载链接：{this.addA('http://pan.baidu.com/s/1i4K9dAH')}</p>
        <p>密码: solz</p>
      </div>
      <div className='readmore-div'>
        <p>2. 主动思考：每天给出一个小题目，花 10 分钟时间，建立结构，尽量符合 MECE 原则、八二原则、神奇数字“3”来进行分析。你可以把结构写下来，也可以说给同伴听，让 ta 进行评价。比如今天你可以问自己：摩拜单车如何削减成本？你可以尝试列出这样的框架：</p>
        <ul className='readmore-ul'>
          <li>生产成本</li>
          <li>运营调度成本</li>
          <li>市场推广成本</li>
        </ul>
      </div>
    </div>)
  }

  renderModal3 () {
    return (<div>
      <h4 className='readmore-h4'>推荐阅读</h4>
      <div className='readmore-div'>
        <ul className='readmore-ul'>
          <li>{this.addA('http://mp.weixin.qq.com/s/ySmE1WqxUauPnantr6CZfw', '学了很多框架，却还是不会分析 ')}</li>
        </ul>
      </div>
      <h4 className='readmore-h4'>日常练习</h4>
      <div className='readmore-div'>
        <p>真正深入理解一个商业分析框架，需要阅读相应的著作，可以试着从 3C 模型和五力模型作为例子开始：</p>
        下载链接：{this.addA('http://pan.baidu.com/s/1hrOESHQ')}
        <p>密码: msad</p>
        下载链接：{this.addA('http://pan.baidu.com/s/1qYWgrj2')}
        <p>密码: xj74</p>
      </div>
      <div className='readmore-div'>
        <p>结合结构化思维、商业分析框架和商业管理知识 (比如一些概念的理解，比如什么是 ROI)，尝试自己分析一些商业新闻，比如</p>
        <ul className='readmore-ul'>
          <li>小米为什么要做线下和使用代理模式？</li>
          <li>共享充电宝有没有市场？</li>
        </ul>
        </div>
      <h4 className='readmore-h4'>这些问题都没有标准答案，但多思考和锻炼，成果会在你面试以及工作的时候显示出来！</h4>
    </div>)
  }

  renderModal4 () {
    return (<div>
      <h4 className='readmore-h4'>附件下载：群面关键步骤 Check List</h4>
      下载链接：{this.addA('http://pan.baidu.com/s/1jI7WpmA')}
      <p>密码: cevb</p>
    </div>)
  }

  renderModal5 () {
    return (<div>
      <h4 className='readmore-h4'>附件下载：群面沟通与表达常用句型</h4>
      下载链接：{this.addA('http://pan.baidu.com/s/1hseUh84')}
      <p>密码: kj5x</p>
    </div>)
  }

  renderModal6 () {
    return (<div>
      <h4 className='readmore-h4'>附件下载</h4>
      <div className='readmore-div'>
        下载链接：{this.addA('http://pan.baidu.com/s/1hrFR2sO')}
        <p>密码: kx5q</p>
      </div>
      <h4 className='readmore-h4'>推荐阅读</h4>
      <div className='readmore-div'>
        <ul className='readmore-ul'>
          <li>{this.addA('http://mp.weixin.qq.com/s/6_FVLCicKjS0Y8_goXH07A', '快速训练逻辑表达的方法')}</li>
        </ul>
      </div>

      <div className='readmore-div'>
        <p>长按扫码，进入「小灶计划」，后台回复关键词“<span className='readmore-red'>case</span>”，</p>
        <p>获取小灶精选 Casebook 大礼包</p>
        <div className="outer">
          {this.addImageContent(6, 6, 'resultBg')}
        </div>
      </div>
      <style jsx>
        {`
        .outer {
          margin: auto;
          margin-top: 20px;
          text-align: center;
          width: 70%;
        }
        `}
      </style>
    </div>)
  }

  renderModal7 () {
    return (<div>
      <h4 className='readmore-h4'>附件下载</h4>
      <div className='readmore-div'>
        下载链接：{this.addA('http://pan.baidu.com/s/1cEXWvG')}
        <p>密码: iou8</p>
      </div>
      <h4 className='readmore-h4'>内容总结</h4>
      <div className='readmore-div'>
        <p>我们将这 7 章的内容，汇总在下面的这张图片上，建议你保存到手机相册，随时可以查找翻阅。</p>
      </div>
      <div className='outer'>
        {this.addImageContent(7, 7, 'resultBg')}
      </div>
      <style jsx>
        {`
        .outer {
          margin: 1rem -1rem 0 -1rem;
        }
        `}
      </style>
    </div>)
  }

  addVedio (audioSrc) {
    return (
      <div>
        <br />
        {/*<Audio src={audioSrc} />*/}
        <br />
      </div>)
  }

  addImageContent (from, to, name) {
    let arr = []
    let styleInner = {
      width: '100%',
    }
    for (let i = from; i < to + 1; i++) {
      arr.push(
        <img style={styleInner}key={i} src={`/static/img/interviewvip/result/${name}-${i}.jpeg`} />
      )
    }
    return arr
  }

  addA (href, title) {
    if (!title) {
      title = href
    }
    return (<a href={href}>{title}</a>)
  }
}
