import React from 'react'
export default class NavBlock extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const { CompanyName, Image, Time, Href } = this.props
    return (
      <div className='container'>
        <a href={Href}><img src={Image} /></a>
        <div className='right'>
          <div><a>{CompanyName}</a><span>{Time}</span></div>
          <div><span className='work'>工作体验</span><span className='exp'>面经/笔经</span>
          </div>
        </div>
        <style jsx>{`
          .container {
            display:flex;
            margin-top:20px;
            width: 90%;
            margin-left: auto;
            margin-right: auto;
          }
          img {
            width:80px;
            height:80px;
          }
          .right {
            display:flex;
            flex-direction:column;
            justify-content:center;
            margin-left:10px;
          }
          .right a + span {
            color:#BFBFBF;
            font-size:0.8rem;
            padding-left:10px;
          }
          .work,.exp {
            color:#79A1E1;
            font-size:0.8rem;
            position:relative;
            margin-left:5px;
          }
          .exp {
            margin-left:30px;
          }
          .work:before,.exp:before {
            content:"";
            width:4px;
            height:4px;
            border-radius:100%;
            border:1px solid #79A1E1;
            display:inline-block;
            position:absolute;
            top:5px;
            left:-8px;
          }
        `}</style>
      </div>
    )
  }
}
