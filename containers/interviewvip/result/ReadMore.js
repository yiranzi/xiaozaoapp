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
    console.log(key + 'get')
    switch (key) {
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
        <style jsx>{`
        .pratice {
          margin-bottom: 5rem;
        }
      `}</style>
      </div>
    )
  }


  renderModal1 () {
    return (<div>
      <h4>推荐阅读：如何阅读图表</h4>
      <p>下载链接：http://pan.baidu.com/s/1cNfxAQ </p>
      <p>密码：wzc6</p>
      <h4>推荐练习：</h4>
      <p>进入小灶官网主页，点击笔试题库，进入英语练练练免费练习</p>
    </div>)
  }

  renderModal2 () {
    return (<div>
      <h4>提升自己的结构化思维，我有以下的建议：</h4>
      <div className='contain'>
        <h4>推荐阅读</h4>
        <ul>
          <li>{this.addA('http://www.fengtang.com/blog/?p=113', '老聃的金字塔原理')}</li>
          <li>{this.addA('https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654874201&idx=1&sn=278dd82037a1e4d3fae9857549320e57&mpshare=1&scene=1&srcid=0705aUtsXXevo4PHQOPN0SNl#rd', '面试被问到“沃尔玛战略入股京东，你怎么看？”一脸懵逼or非常牛逼')}</li>
        </ul>
      </div>
      <div>

      </div>
      <h4>日常练习</h4>
      <p>1. 累积别人的结构框架：无论是影视、书籍、文章，看到别人用的结构，记录下来，成为自己的素材。比如麦肯锡的 2016 China Consumer Report 中，你会发现麦肯锡就是按照“购买意愿、购买地点、购买方式，以及购买分配”对消费者进行分析的。</p>
      <p>下载链接：{this.addA('http://pan.baidu.com/s/1i4K9dAH')}</p>
      <p>密码: solz</p>
      <p>2. 主动思考：每天给出一个小题目，花 10 分钟时间，建立结构，尽量符合 MECE 原则、八二原则、神奇数字“3”来进行分析。你可以把结构写下来，也可以说给同伴听，让 ta 进行评价。比如今天你可以问自己：摩拜单车如何削减成本？你可以尝试列出这样的框架：</p>
      <ul>
        <li>生产成本</li>
        <li>运营调度成本</li>
        <li>市场推广成本</li>
      </ul>
      <style jsx>
        {`
         ul li{
          list-style: inside
         }
         h4 {
          margin-bottom: 10px;
         }
         .contain {
          margin-bottom: 10px;
         }
        `}
      </style>
    </div>)
  }

  renderModal3 () {
    return (<div>
      <h4>提升自己的对商业分析框架的运用，我们有以下的建议：</h4>
      <br />
      <h4>阅读推荐</h4>
      <p>学了很多框架，却还是不会分析 <a href='http://mp.weixin.qq.com/s/CJjKG6FjUlNGTzVJWDkZ-w' target='_blank'>http://mp.weixin.qq.com/s/CJjKG6FjUlNGTzVJWDkZ-w</a>
      </p>
      <br />
      <h4>练习</h4>
      <p>真正深入理解一个商业分析框架，需要阅读相应的著作，可以试着从 3C 模型和五力模型作为例子开始：</p>
      <p><a href='http://pan.baidu.com/s/1o85LqX0' target='_blank'>阅读材料1</a></p>
      <p><a href='http://pan.baidu.com/s/1cCVu9K' target='_blank'>阅读材料2</a></p>
    </div>)
  }

  renderModal4 () {
    let day = 'day4'
    return (<div>
      <h4>阅读推荐：</h4>
      <br />
      {this.addImageContent(1, 6, day)}
    </div>)
  }

  renderModal51 () {
    let day = 'day5'
    return (<div>
        <h4>群面时准备 presentation 的建议：</h4>
        <br />
        {this.addImageContent(1, 12, day)}
      </div>)
  }

  renderModal52 () {
    return (
      <div>
        <h4>更多练习材料：</h4>
        <br />
        <h4>推荐阅读</h4>
        <p><a href='http://mp.weixin.qq.com/s/6_FVLCicKjS0Y8_goXH07A' target='_blank'>http://mp.weixin.qq.com/s/6_FVLCicKjS0Y8_goXH07A</a>
        </p>
        <br />
        <h4>更多练习</h4>
        <p>链接: <a href='https://pan.baidu.com/s/1nvigGJJ'>https://pan.baidu.com/s/1nvigGJJ</a> 密码: mnwy</p>
      </div>
    )
  }

  renderModal61 () {
    let day = 'day6'
    return (<div>
      <h4>群面时获取信息（听力）的建议：</h4>
      <br />
      {this.addImageContent(1, 7, day)}
      <h4>推荐练习</h4>
      <p>需要练习英文听力的同学，可以点击下载听力练习题。</p>
      <p><a href='https://pan.baidu.com/s/1hr4vtXU'>https://pan.baidu.com/s/1hr4vtXU</a></p>
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

  addImageContent (from, to, day, name) {
    let arr = []
    if (!name) {
      name = day
    }
    let style = {
      width: '100%'
    }
    for (let i = from; i < to + 1; i++) {
      arr.push(<img style={style}key={i} src={`/static/img/interview/${day}/${name}_result%20(${i}).jpg`} />)
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
