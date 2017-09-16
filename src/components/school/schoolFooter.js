import React from 'react'

export default class SchoolFooter extends React.Component {
  render () {
    return (
      <div>
        <div className='school__footer'>
          <p>更多干货，更多相关企业信息，将会很快更新</p>
          小灶学员有任何需要帮助和小灶提供的，可以联系小灶产品经理(微信:xiaozaoPM)哦
        </div>
        <style jsx>{`
          .school__footer {
            position:absolute;
            bottom:0;
            font-size:0.8rem;
            padding:30px;
            color:#cbcfe0;
            text-align:center;
            margin-bottom:15px;
          }
        `}</style>
      </div>
    )
  }
}
