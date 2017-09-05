import React from 'react';

export default class companyDetail extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="company__detail_header">
                <img src={this.props.headerimage} className="company__logo"/>
                <div className="right">
                    <div className="trade">
                        <div className="trade__text my-text-rowsingle">
                            {this.props.trade}
                            <span>{this.props.isOnlineApply && <span className="trade__isOnlineApply">申</span>}</span>
                        </div>
                    </div>
                    <div className="company__name">{this.props.companyName}</div>
                    <div className="tag my-text-rowsingle">{this.props.tag}</div>
                </div>
                <style jsx>{`
                    .company__detail_header {
                        background-color:#FFFFFF;
                        display:flex;
                        border-bottom:1px solid #E9E9EB;
                    }
                    .company__logo {
                        width:70px;
                        height:70px;
                        object-fit: contain;
                        border: 1px solid #efefef;
                        margin:10px 0 20px 10px;
                    }
                    .trade__text {
                        font-size:0.6rem;
                        color:white;
                        font-weight:100;
                        text-align:center;
                        width:100px;
                        background-color:#DDAD62;
                        padding:0 5px;
                        border-radius:9px;
                    }
                    .trade__isOnlineApply {
                        background-color:#E3252B;
                        position:absolute;
                        right:-25px;
                        color:white;
                        padding:0 5px;
                        border-radius:9px;
                    }
                    .company__name {
                        font-weight:bold;
                        font-size:0.9rem;
                    }
                    .tag {
                        color:#A7A5AC;
                        font-size:0.7rem;
                        font-weight:100;
                        border:1px solid #A7A5AC;
                        border-radius:9px;
                        padding:0 5px;
                        width:80px;
                    }
                    .right {
                        display:flex;
                        flex-direction:column;
                        align-content:center;
                        justify-content:center;
                        margin-left:10px;
                        position:relative;
                    }
                    .right div {
                        margin:2px 0;
                    }
                `}</style>
            </div>
        );
    }
}