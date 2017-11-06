import React from 'react'
import DataUtil from '../../util/data'
import AxiosUtil from '../../util/axios'
import Layout from '../../components/layout'
import Loading from '../../xz-components/loading'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      rank: {}
    }
  }
  componentDidMount = async () => {
    let rank = await AxiosUtil.get('/api/apollo/getRank')
    this.setState({rank: rank})
  }
  render () {
    const {rank} = this.state
    if (DataUtil.isEmpty(rank)) { return <Loading /> }
    return (
      <Layout>
        <div className='apollo-rank'>
          <div className='header'>
            <div className='title'>阿波罗实习计划</div>
            <div className='text'>
              <span className='line' />总排行榜<span className='line' />
            </div>
            <div className='mine'>
              <div className='rank'>
                <p>排名</p>
                <p className='text'>{rank.rank}</p>
              </div>
              <div className='headimgurl'><img src={rank.headimgurl} /></div>
              <div className='count'>
                <p>总次数</p>
                <p className='text'>{rank.clockCount}</p>
              </div>
            </div>
          </div>
          <div className='link'>
            <a href='https://shimo.im/doc/iCUzunr03MAucvSs?r=J5P19Z/%E3%80%8C%E5%AE%9E%E4%B9%A0offer%E7%BB%8F%E9%AA%8C%E6%B1%87%E6%80%BB%E3%80%8D'>点击查看已获得offer的同学经验分享</a>
          </div>
          <div className='list'>
            {rank.apolloOrderListDTOList.map((item, index) => {
              return (
                <div className='item' key={index}>
                  <div className='left'>
                    <div className='index'>{index + 1}</div>
                    <div className='headimgurl'><img src={item.headimgurl} /></div>
                    <div className='nickname'>{item.nickname}</div>
                  </div>
                  <div className='right'>
                    <div className='count'>{item.clockCount}次</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <style jsx>{`
          .apollo-rank {
            background-color: #f8f9ff;
          }
          .apollo-rank .header {
            padding: 2rem;
            background: url('/static/img/apollo/bg2.png') no-repeat;
            background-size: cover;
            text-align: center;
          }
          .apollo-rank .header .title {
            font-size: 32px;
            color: #fff;
            font-weight: bold;
          }
          .apollo-rank .header .text {
            font-size: 16px;
            color: #ffd164;
          }
          .apollo-rank .header .text .line {
            display: inline-block;
            width: 40px;
            border-top: 1px solid #ffd164;
            margin: 0px 8px 5px 8px;
          }
          .apollo-rank .header .mine {
            margin-top: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .apollo-rank .header .mine .rank,
          .apollo-rank .header .mine .count {
            color: #fff;
          }
          .apollo-rank .header .mine .rank p.text {
            color: #ffd164;
          }
          .apollo-rank .header .mine .headimgurl {
            margin-left: 2rem;
            margin-right: 2rem;
          }
          .apollo-rank .header .mine .headimgurl img {
            width: 4rem;
            border-radius: 4rem;
          }
          .apollo-rank .link {
            text-align: center;
            padding: 0.5rem 0 0 0;
            font-size: 14px;
            color: #001567;
          }
          .apollo-rank .link a {
            color: #001567;
          }
          /* 列表样式 */
          .apollo-rank .list {
            font-size: 14px;
            color: #001567;
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .apollo-rank .list .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #fff;
            margin-top: 0.5rem;
            padding: 0.4rem 1rem;
            border-radius: 2rem;
            box-shadow: 0 5px 5px rgba(229,229,229, 1);
          }
          .apollo-rank .list .item .left {
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
          .apollo-rank .list .item .headimgurl {
            margin-left: 1rem;
            margin-right: 1rem;
          }
          .apollo-rank .list .item .headimgurl img {
            width: 25px;
            border-radius: 25px;
            display: block;
          }
        `}</style>
      </Layout>
    )
  }
}
