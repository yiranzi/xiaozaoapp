import React from 'react'
import Layout from '../../components/layout'
import Button from '../../xz-components/button'

export default class extends React.Component {
  render () {
    return (
      <Layout>
        <div className='apollo-entry'>
          <div className='header'>
            <img src='/static/img/apollo/share-bg.png' />
          </div>
          <div className='list'>
            <div className='card'>首批500人已经通过筛选，即日起－15号前，第二批开放申请啦！</div>
            <div className='card'>2017年11月8日~2018年1月8日60天时间，企业HR直聘，提供4000+个实习职位</div>
            <div className='card'>企业HR直接对投递的简历进行反馈，告诉你拿到或者拿不到offer的原因</div>
            <div className='card'>小灶企业业务负责人，精准求职指导，帮你快速提升</div>
            <div className='card'>群内小伙伴一起努力，监督打卡拿offer</div>
          </div>
          <div className='button'>
            <a href='https://cn.mikecrm.com/XHASF7T' style={{display: 'inline-block', width: '100%'}}>
              <Button>立即申请加入阿波罗实习计划</Button>
            </a>
          </div>
        </div>
        <style jsx>{`
          .apollo-entry .header img {
            width: 100%;
          }
          .apollo-entry .list {
            padding: 1rem;
            color: #001567;
          }
          .apollo-entry .list .card {
            box-shadow: 0 5px 5px rgba(229,229,229,1);
            padding: 0.5rem 1rem;
            text-align: center;
            margin-top: 1rem;
            font-size: 14px;
          }
          .apollo-entry .button {
            padding: 1rem;
          }
        `}</style>
      </Layout>
    )
  }
}
